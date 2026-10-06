import * as THREE from 'three';
import { CameraWaypoint, InteriorCameraState } from './types';
import { CAMERA_CONFIG } from './CameraConfig';
import { interpolateKeys } from './CameraInterpolation';

/**
 * SANTRO M7 — Master Authored Interior Camera Path
 *
 * Centralized, type-safe spline trajectory connecting 8 key cinematic interior waypoints
 * matching the reference video frames (Frames 108–200).
 *
 * Trajectory Sequence:
 * 1. Door Threshold Passage [0.0, 1.60, 2.2] -> Exact M6 Handoff
 * 2. Entrance Vestibule Crossing [0.1, 1.60, -0.6]
 * 3. Foyer Settle & Fluted Walnut Reveal [0.2, 1.60, -1.8]
 * 4. Gallery Circulation Axis [0.1, 1.60, -3.8]
 * 5. Gallery Corridor Tracking [0.0, 1.60, -6.0]
 * 6. Glass Workspace & Lab Reveal [-0.35, 1.60, -7.8]
 * 7. Double-Height Atrium Emergence [0.0, 1.60, -10.2]
 * 8. Atrium Core & Rear Vista Framing [0.0, 1.60, -14.5]
 */

export const INTERIOR_WAYPOINTS: CameraWaypoint[] = [
  {
    id: 'int-wp-01',
    progress: 0.0,
    state: 'DOOR_THRESHOLD',
    position: [0.0, 1.60, 2.2],
    target: [0.0, 1.60, -6.0],
    fov: 56,
    label: 'Door Threshold Passage',
    shotRef: 'Shot 02 Handoff (Frame 108, t=4.5s)',
    description:
      'Arrival at open entrance threshold; seamless handoff from M6 exterior camera, looking directly down foyer corridor axis',
  },
  {
    id: 'int-wp-02',
    progress: 0.12,
    state: 'FOYER_ENTRY',
    position: [0.10, 1.60, -0.6],
    target: [0.40, 1.60, -5.0],
    fov: 57,
    label: 'Entrance Vestibule Crossing',
    shotRef: 'Shot 02-03 Transition (Frame 120, t=5.0s)',
    description:
      'Crossing through the open pivot door portal into the travertine vestibule; exterior sunlight transitions to warm interior lighting',
  },
  {
    id: 'int-wp-03',
    progress: 0.24,
    state: 'FOYER_HOLD',
    position: [0.20, 1.60, -1.8],
    target: [1.60, 1.60, -4.2],
    fov: 58,
    label: 'Foyer Settle & Walnut Reveal',
    shotRef: 'Shot 03 Foyer (Frame 131, t=5.46s)',
    description:
      'Pacing settles momentarily in foyer; framing 24-batten fluted walnut wall, stone typography plinth, and floating staircase pins',
  },
  {
    id: 'int-wp-04',
    progress: 0.38,
    state: 'CORRIDOR_ENTRY',
    position: [0.10, 1.60, -3.8],
    target: [0.0, 1.60, -10.0],
    fov: 58,
    label: 'Gallery Circulation Axis',
    shotRef: 'Shot 03 Corridor Entry (Frame 133, t=5.54s)',
    description:
      'Camera re-orients smoothly along the central corridor axis; ceiling linear reveal and recessed downlights pull the gaze forward',
  },
  {
    id: 'int-wp-05',
    progress: 0.52,
    state: 'CORRIDOR_TRAVEL',
    position: [0.0, 1.60, -6.0],
    target: [-0.60, 1.55, -10.5],
    fov: 58,
    label: 'Gallery Corridor Tracking',
    shotRef: 'Shot 03 Corridor Walk (Frame 150, t=6.25s)',
    description:
      'Controlled axial tracking along honed travertine floor; subtle lateral framing glance toward glass office enclosure on the left',
  },
  {
    id: 'int-wp-06',
    progress: 0.66,
    state: 'GALLERY_REVEAL',
    position: [-0.35, 1.60, -7.8],
    target: [-3.20, 1.40, -8.5],
    fov: 60,
    label: 'Glass Workspace Reveal',
    shotRef: 'Shot 03 Lab Reveal (Frame 167, t=6.96s)',
    description:
      'Independent look-target gracefully pans left through frameless glass partition, revealing walnut executive desk, credenza, and dual monitors',
  },
  {
    id: 'int-wp-07',
    progress: 0.80,
    state: 'GALLERY_ENTRY',
    position: [0.0, 1.60, -10.2],
    target: [0.0, 1.50, -15.0],
    fov: 56,
    label: 'Double-Height Atrium Emergence',
    shotRef: 'Shot 04 Atrium Entry (Frame 169, t=7.04s)',
    description:
      'Camera emerges from the intimate 3.4m corridor into the expansive 6.8m double-height volume, revealing mezzanine walkway bridges and linear ceiling coves',
  },
  {
    id: 'int-wp-08',
    progress: 1.0,
    state: 'INTERIOR_ROOM_APPROACH',
    position: [0.0, 1.60, -14.5],
    target: [0.0, 1.30, -19.5],
    fov: 54,
    label: 'Atrium Core & Rear Vista Framing',
    shotRef: 'Shot 04 Finale (Frames 185-200, t=7.7s-8.3s)',
    description:
      'Pacing settles before the monolithic travertine exhibition plinth with warm toe-kick glow, framing double-height rear glass curtain wall and twilight mountain vista',
  },
];

// Initialize 3D Centripetal Catmull-Rom Splines for Interior
const interiorPositionVectors = INTERIOR_WAYPOINTS.map(
  (wp) => new THREE.Vector3(...wp.position)
);
const interiorTargetVectors = INTERIOR_WAYPOINTS.map(
  (wp) => new THREE.Vector3(...wp.target)
);

export const interiorPositionSpline = new THREE.CatmullRomCurve3(
  interiorPositionVectors,
  false,
  'centripetal',
  CAMERA_CONFIG.splineTension
);

export const interiorTargetSpline = new THREE.CatmullRomCurve3(
  interiorTargetVectors,
  false,
  'centripetal',
  CAMERA_CONFIG.splineTension
);

const interiorFovKeys = INTERIOR_WAYPOINTS.map((wp) => ({
  progress: wp.progress,
  value: wp.fov,
}));

/**
 * Returns the active interior camera state based on normalized interior progress [0.0, 1.0]
 */
export function getInteriorStateAtProgress(progress: number): InteriorCameraState {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.06) return 'DOOR_THRESHOLD';
  if (p < 0.18) return 'FOYER_ENTRY';
  if (p < 0.31) return 'FOYER_HOLD';
  if (p < 0.45) return 'CORRIDOR_ENTRY';
  if (p < 0.59) return 'CORRIDOR_TRAVEL';
  if (p < 0.73) return 'GALLERY_REVEAL';
  if (p < 0.88) return 'GALLERY_ENTRY';
  return 'INTERIOR_ROOM_APPROACH';
}

/**
 * Maps normalized interior progress p in [0.0, 1.0] to Catmull-Rom spline curve parameter u in [0.0, 1.0].
 *
 * Guarantees that at each waypoint's authored progress, the spline evaluates to the exact authored coordinates (0.000m error)
 * while preserving smooth C^1 continuity throughout.
 */
export function interiorProgressToSplineU(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  const n = INTERIOR_WAYPOINTS.length;
  if (n <= 1) return 0;
  if (p <= INTERIOR_WAYPOINTS[0].progress) return 0;
  if (p >= INTERIOR_WAYPOINTS[n - 1].progress) return 1;

  for (let i = 0; i < n - 1; i++) {
    const p0 = INTERIOR_WAYPOINTS[i].progress;
    const p1 = INTERIOR_WAYPOINTS[i + 1].progress;
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
 * Evaluates the 3D camera position along the authored interior spline
 */
export function evaluateInteriorPosition(
  progress: number,
  outVector: THREE.Vector3
): void {
  const u = interiorProgressToSplineU(progress);
  interiorPositionSpline.getPoint(u, outVector);
}

/**
 * Evaluates the 3D look-at target along the authored interior spline
 */
export function evaluateInteriorTarget(
  progress: number,
  outVector: THREE.Vector3
): void {
  const u = interiorProgressToSplineU(progress);
  interiorTargetSpline.getPoint(u, outVector);
}

/**
 * Evaluates optical field of view with smooth easing between interior waypoints
 */
export function evaluateInteriorFov(progress: number): number {
  const p = Math.max(0, Math.min(1, progress));
  return interpolateKeys(interiorFovKeys, p);
}
