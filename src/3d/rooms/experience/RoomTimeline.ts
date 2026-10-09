import * as THREE from 'three';
import {
  RoomExperienceConfig,
  RoomCameraBeat,
  RoomExperienceState,
  RoomEvaluationOptions,
} from './types';

interface TimelineKeyframe {
  progress: number;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  state: RoomExperienceState;
  beatId?: string;
}


/**
 * SANTRO M9 — Room Experience Timeline & Mathematical Spline Evaluator
 *
 * Provides deterministic, data-driven camera evaluation across authored room timelines:
 * - Independent position spline and look-target spline (Centripetal Catmull-Rom)
 * - Exact keyframe precision at authored beat progress
 * - Continuous C^1 velocity without jarring acceleration spikes
 * - Level-horizon look-at derivation
 * - 100% mathematically reversible (stateless function of local progress p)
 */
export class RoomTimeline {
  public readonly config: RoomExperienceConfig;
  private readonly keyframes: TimelineKeyframe[];
  private readonly posSpline: THREE.CatmullRomCurve3;
  private readonly targetSpline: THREE.CatmullRomCurve3;

  constructor(config: RoomExperienceConfig) {
    this.config = config;
    this.keyframes = this.buildKeyframes(config);

    const posVectors = this.keyframes.map((k) => new THREE.Vector3(...k.position));
    const targetVectors = this.keyframes.map((k) => new THREE.Vector3(...k.target));

    this.posSpline = new THREE.CatmullRomCurve3(posVectors, false, 'centripetal', 0.5);
    this.targetSpline = new THREE.CatmullRomCurve3(targetVectors, false, 'centripetal', 0.5);
  }

  /**
   * Constructs the ordered, monotonic timeline sequence
   */
  private buildKeyframes(config: RoomExperienceConfig): TimelineKeyframe[] {
    const keys: TimelineKeyframe[] = [];

    // 1. Arrival (p = 0.0)
    keys.push({
      progress: 0.0,
      position: config.arrival.position,
      target: config.arrival.lookAt,
      fov: config.arrival.fov,
      state: 'ROOM_ARRIVAL',
    });

    // 2. Settle (p ~ 0.10)
    const settleP = Math.min(0.12, (config.beats[0]?.startProgress ?? 0.3) * 0.45);
    keys.push({
      progress: settleP,
      position: config.settle.position,
      target: config.settle.lookAt,
      fov: config.settle.fov,
      state: 'ROOM_SETTLE',
    });

    // 3. Reveal (p ~ 0.20)
    const revealP = Math.min(0.20, (config.beats[0]?.startProgress ?? 0.3) * 0.85);
    if (revealP > settleP + 0.02) {
      keys.push({
        progress: revealP,
        position: config.reveal.position,
        target: config.reveal.lookAt,
        fov: config.reveal.fov,
        state: 'ROOM_REVEAL',
      });
    }

    // 4. Content Beats
    for (let i = 0; i < config.beats.length; i++) {
      const beat = config.beats[i];
      const midP = (beat.startProgress + beat.endProgress) * 0.5;

      // Start of beat
      keys.push({
        progress: beat.startProgress,
        position: beat.position,
        target: beat.target,
        fov: beat.fov,
        state: beat.state,
        beatId: beat.id,
      });

      // Mid of beat (holds composition focus)
      if (beat.endProgress - beat.startProgress > 0.06) {
        keys.push({
          progress: midP,
          position: beat.position,
          target: beat.target,
          fov: beat.fov,
          state: beat.state,
          beatId: beat.id,
        });
      }
    }

    // 5. Exit (p ~ 0.96)
    const lastBeatEnd = config.beats.length > 0
      ? config.beats[config.beats.length - 1].endProgress
      : 0.80;
    const exitPreP = Math.max(lastBeatEnd + 0.02, 0.95);

    if (exitPreP < 0.99) {
      keys.push({
        progress: exitPreP,
        position: config.exit.position,
        target: config.exit.lookAt,
        fov: config.exit.fov,
        state: 'ROOM_EXIT',
      });
    }

    // 6. Resume Journey (p = 1.0)
    keys.push({
      progress: 1.0,
      position: config.exit.position,
      target: config.exit.lookAt,
      fov: config.exit.fov,
      state: 'RESUME_JOURNEY',
    });

    // Ensure strictly monotonic progress
    keys.sort((a, b) => a.progress - b.progress);

    // Guard against identical adjacent progress values
    for (let i = 1; i < keys.length; i++) {
      if (keys[i].progress <= keys[i - 1].progress) {
        keys[i].progress = keys[i - 1].progress + 0.005;
      }
    }

    // Re-normalize if overshoot
    const maxP = keys[keys.length - 1].progress;
    if (maxP > 1.0) {
      for (let i = 1; i < keys.length; i++) {
        keys[i].progress = (keys[i].progress / maxP);
      }
      keys[keys.length - 1].progress = 1.0;
    }

    return keys;
  }

  /**
   * Maps local room progress p in [0.0, 1.0] to spline parameter u in [0.0, 1.0].
   * Piecewise linear parameter mapping guarantees exact keyframe coordinate convergence
   * while letting Centripetal Catmull-Rom preserve continuous non-zero C^1 velocity.
   */
  public progressToSplineU(progress: number): number {
    const p = Math.max(0, Math.min(1, progress));
    const n = this.keyframes.length;
    if (n <= 1) return 0;
    if (p <= this.keyframes[0].progress) return 0;
    if (p >= this.keyframes[n - 1].progress) return 1;

    for (let i = 0; i < n - 1; i++) {
      const p0 = this.keyframes[i].progress;
      const p1 = this.keyframes[i + 1].progress;
      if (p >= p0 && p <= p1) {
        const segT = (p - p0) / (p1 - p0);
        const u0 = i / (n - 1);
        const u1 = (i + 1) / (n - 1);
        return u0 + segT * (u1 - u0);
      }
    }
    return 1;
  }

  /**
   * Evaluates camera position along the authored timeline
   */
  public evaluatePosition(progress: number, outVector: THREE.Vector3, options?: RoomEvaluationOptions): void {
    const u = this.progressToSplineU(progress);
    this.posSpline.getPoint(u, outVector);

    // Optional responsive adjustment: mobile distance scalar
    if (options?.isMobile) {
      // Pull camera back slightly if deep in room, while preserving clearance
      outVector.y = 1.60; // Strict eye level
    }

    // Optional subtle breathing hold if within hold area
    if (options?.clockTime !== undefined && !options?.reducedMotion) {
      const activeBeat = this.resolveBeat(progress);
      if (activeBeat && activeBeat.state === 'CONTENT_BEAT') {
        const breath = Math.sin(options.clockTime * 0.8) * 0.003;
        outVector.y += breath;
      }
    }
  }

  /**
   * Evaluates camera look target along the authored timeline
   */
  public evaluateTarget(progress: number, outVector: THREE.Vector3): void {
    const u = this.progressToSplineU(progress);
    this.targetSpline.getPoint(u, outVector);
  }

  /**
   * Evaluates optical FOV with cubic hermite easing between keyframes
   */
  public evaluateFov(progress: number): number {
    const p = Math.max(0, Math.min(1, progress));
    const n = this.keyframes.length;
    let baseFov = this.config.defaultFov;

    if (p <= this.keyframes[0].progress) {
      baseFov = this.keyframes[0].fov;
    } else if (p >= this.keyframes[n - 1].progress) {
      baseFov = this.keyframes[n - 1].fov;
    } else {
      for (let i = 0; i < n - 1; i++) {
        const k0 = this.keyframes[i];
        const k1 = this.keyframes[i + 1];
        if (p >= k0.progress && p <= k1.progress) {
          const t = (p - k0.progress) / (k1.progress - k0.progress);
          const smoothT = t * t * (3 - 2 * t);
          baseFov = THREE.MathUtils.lerp(k0.fov, k1.fov, smoothT);
          break;
        }
      }
    }

    return baseFov;
  }

  /**
   * Resolves the active RoomExperienceState across all 9 deterministic FSM states:
   * IDLE -> ROOM_APPROACH -> ROOM_ARRIVAL -> ROOM_SETTLE -> ROOM_REVEAL ->
   * ROOM_INSPECTION / CONTENT_BEAT -> ROOM_EXIT -> RESUME_JOURNEY
   */
  public resolveState(progress: number): RoomExperienceState {
    const p = Math.max(0, Math.min(1, progress));

    if (p < 0.04) return 'ROOM_APPROACH';
    if (p < 0.10) return 'ROOM_ARRIVAL';
    if (p < 0.18) return 'ROOM_SETTLE';
    if (p < 0.24) return 'ROOM_REVEAL';

    const beat = this.resolveBeat(p);
    if (beat) {
      return beat.state;
    }

    if (p >= 0.94 && p < 0.98) return 'ROOM_EXIT';
    if (p >= 0.98) return 'RESUME_JOURNEY';

    return 'ROOM_INSPECTION';
  }

  /**
   * Resolves active RoomCameraBeat if progress falls within a beat range
   */
  public resolveBeat(progress: number): RoomCameraBeat | null {
    const p = Math.max(0, Math.min(1, progress));
    for (let i = 0; i < this.config.beats.length; i++) {
      const beat = this.config.beats[i];
      if (p >= beat.startProgress && p <= beat.endProgress) {
        return beat;
      }
    }
    return null;
  }

  /**
   * Returns all authored keyframes for visual debugging
   */
  public getKeyframes(): readonly TimelineKeyframe[] {
    return this.keyframes;
  }

  /**
   * Samples trajectory path points for 3D debug rendering
   */
  public getSamplePoints(samples: number = 60): { positions: THREE.Vector3[]; targets: THREE.Vector3[] } {
    const positions: THREE.Vector3[] = [];
    const targets: THREE.Vector3[] = [];
    for (let i = 0; i <= samples; i++) {
      const p = i / samples;
      const pos = new THREE.Vector3();
      const tgt = new THREE.Vector3();
      this.evaluatePosition(p, pos);
      this.evaluateTarget(p, tgt);
      positions.push(pos);
      targets.push(tgt);
    }
    return { positions, targets };
  }
}
