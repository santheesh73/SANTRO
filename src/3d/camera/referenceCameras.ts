/**
 * SANTRO M2 — Reference Validation Cameras Specification
 *
 * Defines temporary validation cameras calibrated to the 4 cinematic shots
 * and 7 primary architectural vantage points from the reference media:
 * - Shot 01: Exterior Establishing Drone Descent (Frames 000–034)
 * - Shot 02: Pool Terrace Approach (Frames 035–094)
 * - Shot 02: Entrance Pivot Door Threshold (Frames 095–131)
 * - Shot 03: Foyer Corridor & Walnut Feature Wall (Frames 108–140)
 * - Shot 03: Glass Engineering Workspace (Frames 132–167)
 * - Shot 04: Double-Height Exhibition Atrium (Frames 168–213)
 * - Shot 04: Rear Mountain Twilight Finale (Frames 214–239)
 */

export type ReferenceCameraId =
  | 'exterior'
  | 'approach'
  | 'entrance'
  | 'corridor'
  | 'workspace'
  | 'atrium'
  | 'sunset';

export interface ReferenceCameraConfig {
  id: ReferenceCameraId;
  name: string;
  shotLabel: string;
  frameRef: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  description: string;
}

export const REFERENCE_CAMERAS: Record<ReferenceCameraId, ReferenceCameraConfig> = {
  exterior: {
    id: 'exterior',
    name: 'Exterior Establishing',
    shotLabel: 'Shot 01',
    frameRef: 'frame_000 (t=0.0s)',
    position: [4.2, 12.5, 26.0],
    target: [0.0, 3.8, 2.0],
    fov: 48,
    description: 'Elevated drone establishing view of cantilevered volumes, infinity pool, and hillside',
  },
  approach: {
    id: 'approach',
    name: 'Pool Terrace Approach',
    shotLabel: 'Shot 02',
    frameRef: 'frame_070 (t=2.9s)',
    position: [-1.2, 1.65, 14.8],
    target: [0.0, 1.60, 0.0],
    fov: 54,
    description: 'Human eye-level approach across the travertine pool terrace toward pivot entrance door',
  },
  entrance: {
    id: 'entrance',
    name: 'Entrance Threshold',
    shotLabel: 'Shot 02',
    frameRef: 'frame_108 (t=4.5s)',
    position: [0.0, 1.60, 2.2],
    target: [0.0, 1.60, -6.0],
    fov: 56,
    description: 'Entrance portal framing oversized walnut pivot door, illuminated handle, and glass sidelites',
  },
  corridor: {
    id: 'corridor',
    name: 'Foyer Gallery Corridor',
    shotLabel: 'Shot 03',
    frameRef: 'frame_120 (t=5.0s)',
    position: [0.2, 1.60, -1.8],
    target: [1.8, 1.60, -4.5],
    fov: 58,
    description: 'Corridor progression framing vertical fluted walnut wall and floating stone staircase',
  },
  workspace: {
    id: 'workspace',
    name: 'Glass Engineering Workspace',
    shotLabel: 'Shot 03',
    frameRef: 'frame_133 (t=5.5s)',
    position: [-0.4, 1.60, -7.5],
    target: [-3.2, 1.40, -8.0],
    fov: 60,
    description: 'Frameless glass workspace enclosure with executive walnut desk and dual monitors',
  },
  atrium: {
    id: 'atrium',
    name: 'Double-Height Atrium',
    shotLabel: 'Shot 04',
    frameRef: 'frame_185 (t=7.7s)',
    position: [0.0, 1.60, -11.5],
    target: [0.0, 1.20, -14.0],
    fov: 54,
    description: 'Monumental 6.8m exhibition atrium with mezzanine walkways and travertine plinths',
  },
  sunset: {
    id: 'sunset',
    name: 'Twilight Vista Finale',
    shotLabel: 'Shot 04',
    frameRef: 'frame_239 (t=10.0s)',
    position: [-24.0, 16.0, 36.0],
    target: [2.0, 3.5, -4.0],
    fov: 42,
    description: 'Elevated southwest twilight aerial perspective overlooking the illuminated residence and pool terrace',
  },
};

export const REFERENCE_CAMERA_LIST: ReferenceCameraConfig[] = Object.values(REFERENCE_CAMERAS);
