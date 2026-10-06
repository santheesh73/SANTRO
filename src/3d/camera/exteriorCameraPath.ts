import * as THREE from 'three';
import { CameraWaypoint, ExteriorCameraState } from './types';
import { CAMERA_CONFIG } from './CameraConfig';
import { interpolateKeys } from './CameraInterpolation';

/**
 * SANTRO M6 — Master Authored Exterior Camera Path
 *
 * Centralized, type-safe spline trajectory connecting 5 key cinematic waypoints
 * matching the reference video frames (Frames 000–108).
 *
 * Trajectory:
 * 1. Elevated drone crane establishing view [4.2, 12.5, 26.0]
 * 2. Downward crane glide descent [2.1, 7.2, 19.5]
 * 3. Human eye-level pool terrace approach [-1.2, 1.65, 14.8]
 * 4. Façade & entrance portal approach [-0.4, 1.62, 7.0]
 * 5. Pivot door threshold walkthrough framing [0.0, 1.60, 2.2]
 */

export const EXTERIOR_WAYPOINTS: CameraWaypoint[] = [
  {
    id: 'wp-01',
    progress: 0.0,
    state: 'EXTERIOR_ESTABLISHING',
    position: [4.2, 12.5, 26.0],
    target: [0.0, 3.8, 2.0],
    fov: 48,
    label: 'Exterior Establishing',
    shotRef: 'Shot 01 (Frame 000, t=0.0s)',
    description:
      'Elevated drone establishing view of cantilevered volumes, infinity pool, and hillside',
  },
  {
    id: 'wp-02',
    progress: 0.20,
    state: 'EXTERIOR_APPROACH',
    position: [2.1, 5.8, 19.5],
    target: [0.0, 3.0, 1.8],
    fov: 50,
    label: 'Exterior Approach Glide',
    shotRef: 'Shot 01 (Frame 034, t=1.4s)',
    description:
      'Downward and forward crane glide approaching pool terrace elevation and south façade',
  },
  {
    id: 'wp-02b',
    progress: 0.35,
    state: 'EXTERIOR_APPROACH',
    position: [0.2, 2.2, 16.5],
    target: [0.0, 2.0, 1.0],
    fov: 52,
    label: 'Terrace Plinth Descent',
    shotRef: 'Shot 01-02 Transition',
    description:
      'Decelerating descent meeting the travertine terrace plinth at eye level',
  },
  {
    id: 'wp-03',
    progress: 0.50,
    state: 'FACADE_REVEAL',
    position: [-1.2, 1.65, 14.8],
    target: [0.0, 1.6, 0.0],
    fov: 54,
    label: 'Pool Terrace Reveal',
    shotRef: 'Shot 02 (Frame 070, t=2.9s)',
    description:
      'Human eye-level track across travertine pool terrace toward pivot entrance door',
  },
  {
    id: 'wp-03b',
    progress: 0.65,
    state: 'FACADE_REVEAL',
    position: [-0.8, 1.65, 10.5],
    target: [0.0, 1.6, -0.5],
    fov: 55,
    label: 'Lap Pool Crossing',
    shotRef: 'Shot 02 Walk',
    description:
      'Cruising along the lap pool weir edge with reflections and cantilever overhead',
  },
  {
    id: 'wp-04',
    progress: 0.80,
    state: 'ENTRANCE_APPROACH',
    position: [-0.3, 1.62, 6.5],
    target: [0.0, 1.6, -2.0],
    fov: 55,
    label: 'Entrance Portal Approach',
    shotRef: 'Shot 02 (Frame 095, t=3.9s)',
    description:
      'Intimate approach to entrance portal; framing walnut door leaf and illuminated cyan handle',
  },
  {
    id: 'wp-05',
    progress: 1.0,
    state: 'DOOR_TRANSITION',
    position: [0.0, 1.6, 2.2],
    target: [0.0, 1.6, -6.0],
    fov: 56,
    label: 'Door Threshold Transition',
    shotRef: 'Shot 02 (Frame 108, t=4.5s)',
    description:
      'Entrance portal framing pivot door swung open to -85 deg; framing foyer gallery corridor for M7',
  },
];

// Initialize 3D Centripetal Catmull-Rom Splines
const positionVectors = EXTERIOR_WAYPOINTS.map(
  (wp) => new THREE.Vector3(...wp.position)
);
const targetVectors = EXTERIOR_WAYPOINTS.map(
  (wp) => new THREE.Vector3(...wp.target)
);

export const exteriorPositionSpline = new THREE.CatmullRomCurve3(
  positionVectors,
  false,
  'centripetal',
  CAMERA_CONFIG.splineTension
);

export const exteriorTargetSpline = new THREE.CatmullRomCurve3(
  targetVectors,
  false,
  'centripetal',
  CAMERA_CONFIG.splineTension
);

const fovKeys = EXTERIOR_WAYPOINTS.map((wp) => ({
  progress: wp.progress,
  value: wp.fov,
}));

/**
 * Returns the active camera state based on normalized progress
 */
export function getStateAtProgress(progress: number): ExteriorCameraState {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.18) return 'EXTERIOR_ESTABLISHING';
  if (p < 0.42) return 'EXTERIOR_APPROACH';
  if (p < 0.68) return 'FACADE_REVEAL';
  if (p < 0.92) return 'ENTRANCE_APPROACH';
  return 'DOOR_TRANSITION';
}

/**
 * Evaluates the 3D camera position along the authored spline
 */
export function evaluateCameraPosition(
  progress: number,
  outVector: THREE.Vector3
): void {
  const p = Math.max(0, Math.min(1, progress));
  exteriorPositionSpline.getPointAt(p, outVector);
}

/**
 * Evaluates the 3D look-at target along the authored spline
 */
export function evaluateCameraTarget(
  progress: number,
  outVector: THREE.Vector3
): void {
  const p = Math.max(0, Math.min(1, progress));
  exteriorTargetSpline.getPointAt(p, outVector);
}

/**
 * Evaluates optical field of view with smooth easing between waypoints
 */
export function evaluateCameraFov(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return interpolateKeys(fovKeys, p);
}
