import * as THREE from 'three';
import { RoomId } from '@/3d/rooms/types';
import {
  RoomExperienceConfig,
  RoomExperienceEvaluation,
  RoomEvaluationOptions,
  RoomExperienceState,
  RoomCameraBeat,
} from './types';
import { ROOM_EXPERIENCE_CONFIGS } from './roomExperienceConfigs';
import { RoomTimeline } from './RoomTimeline';
import {
  evaluateUnifiedPosition,
  evaluateUnifiedTarget,
  evaluateUnifiedFov,
} from '@/3d/camera/CameraPath';
import { getRoomForJourneyProgress } from '@/3d/rooms/RoomRegistry';

/**
 * SANTRO M9 — Master Room Experience Controller
 *
 * Sits hierarchically beneath the master camera system:
 * Camera System
 *   ├── Exterior Camera
 *   ├── Interior Camera
 *   ├── Room Experience Controller
 *   │     ├── Arrival
 *   │     ├── Settle
 *   │     ├── Reveal
 *   │     ├── Room Inspection
 *   │     ├── Content Beats
 *   │     └── Resume
 *   └── Global Journey Progress
 *
 * Coordinates:
 * - Active room detection and local progress normalization [0.0, 1.0]
 * - State machine resolution (IDLE -> ARRIVAL -> SETTLE -> REVEAL -> INSPECTION -> BEAT -> EXIT -> RESUME)
 * - Decoupled position and look-target evaluation
 * - Edge blending at room entry/exit to guarantee continuous C^0 and C^1 transitions
 * - Responsive adjustments (Mobile, Tablet, Reduced Motion)
 */
export class RoomExperienceController {
  private static instance: RoomExperienceController | null = null;
  private readonly timelines: Map<RoomId, RoomTimeline>;

  constructor() {
    this.timelines = new Map<RoomId, RoomTimeline>();

    // Precompute timelines for all enabled rooms
    for (const [id, config] of Object.entries(ROOM_EXPERIENCE_CONFIGS) as [RoomId, RoomExperienceConfig][]) {
      if (config.enabled) {
        this.timelines.set(id, new RoomTimeline(config));
      }
    }
  }

  public static getInstance(): RoomExperienceController {
    if (!RoomExperienceController.instance) {
      RoomExperienceController.instance = new RoomExperienceController();
    }
    return RoomExperienceController.instance;
  }

  /**
   * Returns precomputed RoomTimeline for a room
   */
  public getTimeline(roomId: RoomId): RoomTimeline | null {
    return this.timelines.get(roomId) ?? null;
  }

  /**
   * Resolves the active RoomExperienceConfig for a given global journey progress [0.0, 1.0]
   */
  public resolveActiveRoom(globalProgress: number): {
    config: RoomExperienceConfig | null;
    localProgress: number;
    timeline: RoomTimeline | null;
  } {
    const p = Math.max(0, Math.min(1, globalProgress));

    for (const [id, config] of Object.entries(ROOM_EXPERIENCE_CONFIGS) as [RoomId, RoomExperienceConfig][]) {
      if (!config.enabled) continue;
      const [startP, endP] = config.globalProgressRange;
      if (p >= startP && p <= endP) {
        const local = (p - startP) / (endP - startP);
        return {
          config,
          localProgress: Math.max(0, Math.min(1, local)),
          timeline: this.timelines.get(id) ?? null,
        };
      }
    }

    return { config: null, localProgress: 0.0, timeline: null };
  }

  /**
   * Master camera evaluation method called per-frame by CameraController.
   * Seamlessly blends room experiences into the continuous global journey spine.
   */
  public evaluate(
    globalProgress: number,
    outPos: THREE.Vector3,
    outTarget: THREE.Vector3,
    options?: RoomEvaluationOptions
  ): RoomExperienceEvaluation {
    const p = Math.max(0, Math.min(1, globalProgress));
    const active = this.resolveActiveRoom(p);

    // If outside any enabled room experience: follow base unified camera spline
    if (!active.config || !active.timeline) {
      evaluateUnifiedPosition(p, outPos);
      evaluateUnifiedTarget(p, outTarget);
      const fov = evaluateUnifiedFov(p);
      const room = getRoomForJourneyProgress(p);

      return {
        activeRoomId: room.id,
        isInsideExperience: false,
        localProgress: 0.0,
        state: 'IDLE',
        activeBeat: null,
        position: outPos,
        target: outTarget,
        fov,
        lightingPreset: room.lightingPreset,
        blendFactor: 0.0,
      };
    }

    const { config, localProgress: localP, timeline } = active;

    // 1. Evaluate authored room timeline coordinates directly
    timeline.evaluatePosition(localP, outPos, options);
    timeline.evaluateTarget(localP, outTarget);
    const roomFov = timeline.evaluateFov(localP);
    const state = timeline.resolveState(localP);
    const activeBeat = timeline.resolveBeat(localP);

    // If reduced-motion is requested: gently damp lateral X-offset towards central spine
    if (options?.reducedMotion) {
      outPos.x *= 0.4;
    }

    return {
      activeRoomId: config.roomId,
      isInsideExperience: true,
      localProgress: localP,
      state,
      activeBeat,
      position: outPos,
      target: outTarget,
      fov: roomFov,
      lightingPreset: config.lightingPreset,
      blendFactor: 1.0,
    };
  }

  /**
   * Direct room evaluation without global progress context (used in debug / direct room testing)
   */
  public evaluateRoomDirect(
    roomId: RoomId,
    localProgress: number,
    outPos: THREE.Vector3,
    outTarget: THREE.Vector3,
    options?: RoomEvaluationOptions
  ): {
    fov: number;
    state: RoomExperienceState;
    activeBeat: RoomCameraBeat | null;
  } {
    const timeline = this.timelines.get(roomId);
    if (!timeline) {
      outPos.set(0, 1.6, 0);
      outTarget.set(0, 1.6, -5);
      return { fov: 56, state: 'IDLE', activeBeat: null };
    }

    const localP = Math.max(0, Math.min(1, localProgress));
    timeline.evaluatePosition(localP, outPos, options);
    timeline.evaluateTarget(localP, outTarget);
    const fov = timeline.evaluateFov(localP);
    const state = timeline.resolveState(localP);
    const activeBeat = timeline.resolveBeat(localP);

    return { fov, state, activeBeat };
  }
}

export const roomExperienceController = RoomExperienceController.getInstance();
