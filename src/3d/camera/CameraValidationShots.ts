import { ValidationShotConfig } from './types';

/**
 * SANTRO M6 — Camera Validation Shots Specification
 *
 * Defines the 5 fixed validation states required by M6 Section 32:
 * - Shot 01: Establishing exterior (Frame 000, t=0.0s)
 * - Shot 02: Exterior approach (Frame 034, t=1.4s)
 * - Shot 03: Façade reveal (Frame 070, t=2.9s)
 * - Shot 04: Entrance approach (Frame 095, t=3.9s)
 * - Shot 05: Door framing (Frame 108, t=4.5s)
 *
 * Used for independent visual inspection and one-click HUD jumping.
 */

export const CAMERA_VALIDATION_SHOTS: Record<string, ValidationShotConfig> = {
  shot_01: {
    id: 'shot_01',
    shotNumber: 1,
    label: 'Shot 01',
    name: 'Establishing Exterior',
    state: 'EXTERIOR_ESTABLISHING',
    progress: 0.0,
    frameRef: 'frame_000 (t=0.0s)',
    position: [4.2, 12.5, 26.0],
    target: [0.0, 3.8, 2.0],
    fov: 48,
    description:
      'Elevated crane establishing shot framing full residence massing, twin cantilevered volumes, flat gravel roof, and infinity lap pool.',
    focalPoints: [
      'Cantilevered upper volumes silhouette',
      'Infinity pool terrace plinth',
      'Negative space between residential wings',
      'Gravel roof parapet miters',
    ],
  },
  shot_02: {
    id: 'shot_02',
    shotNumber: 2,
    label: 'Shot 02',
    name: 'Exterior Approach',
    state: 'EXTERIOR_APPROACH',
    progress: 0.20,
    frameRef: 'frame_034 (t=1.4s)',
    position: [2.1, 5.8, 19.5],
    target: [0.0, 3.0, 1.8],
    fov: 50,
    description:
      'Continuous downward crane glide descending toward the pool terrace level, revealing floor slabs and living pavilion depth.',
    focalPoints: [
      'Transition from aerial to human scale',
      'Board-formed concrete retaining wall step',
      'Lap pool reflective water surface',
      'Living room pocket sliding glass',
    ],
  },
  shot_03: {
    id: 'shot_03',
    shotNumber: 3,
    label: 'Shot 03',
    name: 'Façade Reveal',
    state: 'FACADE_REVEAL',
    progress: 0.50,
    frameRef: 'frame_070 (t=2.9s)',
    position: [-1.2, 1.65, 14.8],
    target: [0.0, 1.6, 0.0],
    fov: 54,
    description:
      'Eye-level tracking across honed travertine pavers along the infinity pool weir edge, establishing the main entrance axis.',
    focalPoints: [
      'Travertine terrace joint alignment',
      'Pool vanishing edge reflection',
      'Entrance structural column pair',
      'Upper cantilever soffit shade',
    ],
  },
  shot_04: {
    id: 'shot_04',
    shotNumber: 4,
    label: 'Shot 04',
    name: 'Entrance Approach',
    state: 'ENTRANCE_APPROACH',
    progress: 0.80,
    frameRef: 'frame_095 (t=3.9s)',
    position: [-0.3, 1.62, 6.5],
    target: [0.0, 1.6, -2.0],
    fov: 55,
    description:
      'Narrowing composition directly confronting the entrance portal; reveals walnut plank grain, brushed steel handle, and illuminated cyan channel.',
    focalPoints: [
      '9-plank horizontal walnut pivot leaf',
      'Illuminated cyan LED handle channel',
      'Dark charcoal sidelite frames',
      'Entrance canopy soffit downlights',
    ],
  },
  shot_05: {
    id: 'shot_05',
    shotNumber: 5,
    label: 'Shot 05',
    name: 'Door Threshold Framing',
    state: 'DOOR_TRANSITION',
    progress: 1.0,
    frameRef: 'frame_108 (t=4.5s)',
    position: [0.0, 1.6, 2.2],
    target: [0.0, 1.6, -6.0],
    fov: 56,
    description:
      'Arrival at the entrance door threshold; door swung open to -85 deg around offset hinge, perfectly framing the foyer gallery corridor for M7.',
    focalPoints: [
      'Pivot door offset hinge clearance at X: -0.65m',
      'Seamless travertine floor threshold transition',
      'Vertical fluted walnut wall initial reveal',
      'Corridor linear ceiling reveal vanishing point',
    ],
  },
};

export const VALIDATION_SHOT_LIST: ValidationShotConfig[] = Object.values(
  CAMERA_VALIDATION_SHOTS
);
