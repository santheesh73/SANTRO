import { ValidationShotConfig } from './types';

/**
 * SANTRO M7 — Master Architectural Camera Validation Shots Catalog
 *
 * Defines the 9 calibrated validation states spanning the continuous exterior-to-interior journey:
 * - Shot 01: Establishing Exterior (Frame 000, t=0.0s, p=0.00)
 * - Shot 02: Exterior Approach Glide (Frame 034, t=1.4s, p=0.10)
 * - Shot 03: Pool Terrace Façade Reveal (Frame 070, t=2.9s, p=0.25)
 * - Shot 04: Entrance Portal Approach (Frame 095, t=3.9s, p=0.40)
 * - Shot 05: Door Threshold Passage (Frame 108, t=4.5s, p=0.50) [Seamless Handoff Boundary]
 * - Shot 06: Foyer Settle & Walnut Reveal (Frame 131, t=5.46s, p=0.62)
 * - Shot 07: Gallery Corridor Tracking (Frame 150, t=6.25s, p=0.76)
 * - Shot 08: Glass Workspace & Lab Reveal (Frame 167, t=6.96s, p=0.83)
 * - Shot 09: Double-Height Atrium Core (Frames 185-200, t=7.7s-8.3s, p=1.00)
 *
 * Used for independent visual inspection, automated validation, and one-click HUD jumping.
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
    progress: 0.10,
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
    progress: 0.25,
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
    progress: 0.40,
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
    name: 'Door Threshold Passage',
    state: 'DOOR_THRESHOLD',
    progress: 0.50,
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
  shot_06: {
    id: 'shot_06',
    shotNumber: 6,
    label: 'Shot 06',
    name: 'Foyer Settle & Walnut Reveal',
    state: 'FOYER_HOLD',
    progress: 0.62,
    frameRef: 'frame_131 (t=5.46s)',
    position: [0.20, 1.60, -1.8],
    target: [1.60, 1.60, -4.2],
    fov: 58,
    description:
      'Pacing settles inside the entrance vestibule; framing the 24-batten fluted walnut accent wall, stone typography plinth, and floating staircase anchor pins.',
    focalPoints: [
      '24-batten fluted walnut rhythm',
      'Floating staircase travertine treads',
      'Travertine vestibule floor joints',
      'Recessed ceiling linear trough',
    ],
  },
  shot_07: {
    id: 'shot_07',
    shotNumber: 7,
    label: 'Shot 07',
    name: 'Gallery Corridor Tracking',
    state: 'CORRIDOR_TRAVEL',
    progress: 0.76,
    frameRef: 'frame_150 (t=6.25s)',
    position: [0.0, 1.60, -6.0],
    target: [-0.60, 1.55, -10.5],
    fov: 58,
    description:
      'Smooth tracking shot along the architectural corridor axis; warm recessed downlights grazing travertine floors, guiding the visitor toward the exhibition core.',
    focalPoints: [
      'Linear corridor perspective lines',
      'Recessed 2700K downlight pools',
      'Frameless glass partition boundary',
      'Dark charcoal baseboard reveals',
    ],
  },
  shot_08: {
    id: 'shot_08',
    shotNumber: 8,
    label: 'Shot 08',
    name: 'Glass Workspace Reveal',
    state: 'GALLERY_REVEAL',
    progress: 0.83,
    frameRef: 'frame_167 (t=6.96s)',
    position: [-0.35, 1.60, -7.8],
    target: [-3.20, 1.40, -8.5],
    fov: 60,
    description:
      'Independent camera look-target reveals the glass-walled engineering lab on the left, framing walnut executive desk, credenza, and workstation setup.',
    focalPoints: [
      'Floor-to-ceiling glass transparency',
      'Walnut executive desk joinery',
      'Minimalist workstation monitors',
      'Specular glass reflections',
    ],
  },
  shot_09: {
    id: 'shot_09',
    shotNumber: 9,
    label: 'Shot 09',
    name: 'Double-Height Atrium Core',
    state: 'INTERIOR_ROOM_APPROACH',
    progress: 1.0,
    frameRef: 'frame_185 (t=7.71s)',
    position: [0.0, 1.60, -14.5],
    target: [0.0, 1.30, -19.5],
    fov: 54,
    description:
      'Arrival into the monumental 6.8m double-height exhibition atrium; framing monolithic travertine central plinth, floating mezzanine bridges, and rear glass curtain wall vista.',
    focalPoints: [
      'Monolithic travertine plinth toe-kick glow',
      'Upper mezzanine balustrades and bridges',
      'Linear ceiling indirect cove lighting',
      'Floor-to-ceiling rear curtain wall mountain panorama',
    ],
  },
};

export const VALIDATION_SHOT_LIST: ValidationShotConfig[] = Object.values(
  CAMERA_VALIDATION_SHOTS
);
