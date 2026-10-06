import * as THREE from 'three';
import { CameraWaypoint, CameraJourneyState } from './types';
import {
  EXTERIOR_WAYPOINTS,
  exteriorPositionSpline,
  exteriorTargetSpline,
  getStateAtProgress as getExteriorStateAtProgress,
  progressToSplineU as exteriorProgressToSplineU,
  evaluateCameraPosition as evaluateExteriorPosition,
  evaluateCameraTarget as evaluateExteriorTarget,
  evaluateCameraFov as evaluateExteriorFov,
} from './exteriorCameraPath';
import {
  INTERIOR_WAYPOINTS,
  interiorPositionSpline,
  interiorTargetSpline,
  getInteriorStateAtProgress,
  interiorProgressToSplineU,
  evaluateInteriorPosition,
  evaluateInteriorTarget,
  evaluateInteriorFov,
} from './interiorCameraPath';

export * from './exteriorCameraPath';
export * from './interiorCameraPath';

/**
 * SANTRO M7 — Master Unified Camera Path (Exterior & Interior)
 *
 * Unifies the Exterior Cinematic Journey (M6) and Interior Cinematic Journey (M7)
 * into a single continuous, bidirectional trajectory parameterized over p in [0.0, 1.0].
 *
 * Progression Split:
 * - p in [0.00, 0.50]: Exterior Journey (Aerial Establishing -> Descent -> Pool Terrace -> Entrance Portal -> Door Threshold)
 * - p in [0.50, 1.00]: Interior Journey (Door Threshold -> Foyer -> Corridor -> Workspace Reveal -> Double-Height Atrium)
 *
 * At the critical transition boundary p = 0.50:
 * - Exterior end: Position [0.0, 1.60, 2.2], Target [0.0, 1.60, -6.0], FOV 56 deg
 * - Interior start: Position [0.0, 1.60, 2.2], Target [0.0, 1.60, -6.0], FOV 56 deg
 * Exact C^0 and C^1 continuity with 0.000m error.
 */

export const UNIFIED_SPLIT_PROGRESS = 0.50;

/**
 * Unified waypoints mapped to global journey progress [0.0, 1.0]
 */
export const UNIFIED_WAYPOINTS: CameraWaypoint[] = [
  // Exterior Waypoints (mapped to [0.0, 0.50])
  ...EXTERIOR_WAYPOINTS.slice(0, -1).map((wp) => ({
    ...wp,
    progress: wp.progress * UNIFIED_SPLIT_PROGRESS,
  })),

  // Critical Seamless Boundary Waypoint (p = 0.50)
  {
    ...INTERIOR_WAYPOINTS[0],
    id: 'wp-threshold-unified',
    progress: UNIFIED_SPLIT_PROGRESS,
    state: 'DOOR_THRESHOLD' as CameraJourneyState,
    label: 'Entrance Door Threshold Handoff',
    shotRef: 'Shot 02 Handoff (Frame 108, t=4.5s)',
    description:
      'Seamless architectural handoff from exterior pool terrace tracking into interior foyer gallery corridor',
  },

  // Interior Waypoints (mapped to [0.50, 1.00])
  ...INTERIOR_WAYPOINTS.slice(1).map((wp) => ({
    ...wp,
    progress: UNIFIED_SPLIT_PROGRESS + wp.progress * (1.0 - UNIFIED_SPLIT_PROGRESS),
  })),
];

/**
 * Returns the active camera journey state across the entire continuous journey [0.0, 1.0]
 */
export function getUnifiedStateAtProgress(progress: number): CameraJourneyState {
  const p = Math.max(0, Math.min(1, progress));
  if (p < UNIFIED_SPLIT_PROGRESS) {
    const extP = p / UNIFIED_SPLIT_PROGRESS;
    return getExteriorStateAtProgress(extP);
  } else {
    const intP = (p - UNIFIED_SPLIT_PROGRESS) / (1.0 - UNIFIED_SPLIT_PROGRESS);
    return getInteriorStateAtProgress(intP);
  }
}

/**
 * Evaluates camera 3D position along the unified continuous trajectory [0.0, 1.0]
 */
export function evaluateUnifiedPosition(
  progress: number,
  outVector: THREE.Vector3
): void {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= UNIFIED_SPLIT_PROGRESS) {
    const extP = p / UNIFIED_SPLIT_PROGRESS;
    evaluateExteriorPosition(extP, outVector);
  } else {
    const intP = (p - UNIFIED_SPLIT_PROGRESS) / (1.0 - UNIFIED_SPLIT_PROGRESS);
    evaluateInteriorPosition(intP, outVector);
  }
}

/**
 * Evaluates camera 3D look target along the unified continuous trajectory [0.0, 1.0]
 */
export function evaluateUnifiedTarget(
  progress: number,
  outVector: THREE.Vector3
): void {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= UNIFIED_SPLIT_PROGRESS) {
    const extP = p / UNIFIED_SPLIT_PROGRESS;
    evaluateExteriorTarget(extP, outVector);
  } else {
    const intP = (p - UNIFIED_SPLIT_PROGRESS) / (1.0 - UNIFIED_SPLIT_PROGRESS);
    evaluateInteriorTarget(intP, outVector);
  }
}

/**
 * Evaluates optical field of view along the unified continuous trajectory [0.0, 1.0]
 */
export function evaluateUnifiedFov(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= UNIFIED_SPLIT_PROGRESS) {
    const extP = p / UNIFIED_SPLIT_PROGRESS;
    return evaluateExteriorFov(extP);
  } else {
    const intP = (p - UNIFIED_SPLIT_PROGRESS) / (1.0 - UNIFIED_SPLIT_PROGRESS);
    return evaluateInteriorFov(intP);
  }
}

/**
 * Evaluates interior transition factor [0.0, 1.0] for iris exposure compensation
 * Ramps smoothly as camera crosses from exterior pool terrace through the door threshold into the foyer.
 */
export function evaluateInteriorTransitionFactor(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  // Transition interval: p in [0.46, 0.58] (crossing door threshold)
  if (p <= 0.46) return 0.0;
  if (p >= 0.58) return 1.0;
  const t = (p - 0.46) / (0.58 - 0.46);
  return t * t * (3 - 2 * t); // smoothstep
}
