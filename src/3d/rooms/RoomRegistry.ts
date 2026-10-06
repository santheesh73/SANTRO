import { PortfolioRoomConfig, RoomId } from './types';
import { CameraJourneyState } from '@/3d/camera/types';

/**
 * SANTRO M8 — Master Centralized Portfolio Room Registry
 *
 * Authored 10-room spatial sequence defining:
 * - Stable IDs and sequence orders (01 to 10)
 * - Portfolio purpose
 * - Spatial bounding volumes
 * - Camera state & waypoint links
 * - M5 lighting presets & architectural accents
 */
export const PORTFOLIO_ROOMS: PortfolioRoomConfig[] = [
  {
    id: 'exterior',
    order: 1,
    name: 'Exterior Grounds',
    purpose: 'Identity & Architectural Prelude',
    spatialZone: 'EXTERIOR',
    bounds: {
      min: [-20.0, -5.0, 4.0],
      max: [20.0, 15.0, 32.0],
      center: [0.0, 4.0, 18.0],
    },
    cameraState: 'EXTERIOR_ESTABLISHING',
    cameraWaypointId: 'ext-wp-01',
    cameraFocusPosition: [4.2, 12.5, 26.0],
    cameraFocusTarget: [0.0, 3.8, 2.0],
    cameraFov: 48,
    lightingPreset: 'golden_hour',
    accent: 'Golden hour sunlight, water reflections, exposed board-formed concrete',
    exhibitionStyle: 'Architectural landscape & identity portal',
    description: 'Establishing panoramic arrival across the cantilevered modernist villa and infinity pool.',
  },
  {
    id: 'entrance',
    order: 2,
    name: 'Entrance Portal',
    purpose: 'Portal & Spatial Threshold',
    spatialZone: 'ENTRANCE',
    bounds: {
      min: [-3.0, 0.0, 0.0],
      max: [3.0, 4.0, 4.5],
      center: [0.0, 1.7, 2.2],
    },
    cameraState: 'DOOR_TRANSITION',
    cameraWaypointId: 'ext-wp-07',
    cameraFocusPosition: [0.0, 1.6, 2.2],
    cameraFocusTarget: [0.0, 1.6, -6.0],
    cameraFov: 56,
    lightingPreset: 'golden_hour',
    accent: '9-plank fluted walnut pivot door, cyan LED blade handle, stone threshold',
    exhibitionStyle: 'Minimalist architectural transition portal',
    description: 'Physical portal bridging the outdoor terrace with the interior travertine vestibule.',
  },
  {
    id: 'foyer',
    order: 3,
    name: 'Foyer Vestibule',
    purpose: 'About & Personal Identity',
    spatialZone: 'FOYER',
    bounds: {
      min: [-2.5, 0.0, -3.8],
      max: [2.5, 3.5, 0.0],
      center: [0.0, 1.7, -1.9],
    },
    cameraState: 'FOYER_HOLD',
    cameraWaypointId: 'int-wp-03',
    cameraFocusPosition: [0.2, 1.6, -1.8],
    cameraFocusTarget: [1.6, 1.6, -4.2],
    cameraFov: 58,
    lightingPreset: 'interior',
    accent: '24-batten fluted walnut wall, stone typography plinth, floating staircase pins',
    exhibitionStyle: 'Monolithic stone typography & architectural identity totem',
    description: 'Intimate reception space presenting the engineer, disciplines, and design philosophy.',
  },
  {
    id: 'gallery',
    order: 4,
    name: 'Gallery Corridor',
    purpose: 'Selected Work Introduction',
    spatialZone: 'GALLERY',
    bounds: {
      min: [-2.0, 0.0, -8.0],
      max: [2.0, 3.5, -3.8],
      center: [0.0, 1.7, -5.9],
    },
    cameraState: 'CORRIDOR_TRAVEL',
    cameraWaypointId: 'int-wp-05',
    cameraFocusPosition: [0.0, 1.6, -6.0],
    cameraFocusTarget: [-0.6, 1.55, -10.5],
    cameraFov: 58,
    lightingPreset: 'interior',
    accent: 'Linear ceiling reveal, recessed warm downlights, honed travertine floor',
    exhibitionStyle: 'Curatorial gallery bay overview',
    description: 'Circulation corridor guiding the visitor from personal identity into technical exhibits.',
  },
  {
    id: 'project-studio',
    order: 5,
    name: 'Project Studio',
    purpose: 'Projects Exhibition',
    spatialZone: 'STUDIO',
    bounds: {
      min: [-6.0, 0.0, -18.5],
      max: [6.0, 7.0, -10.2],
      center: [0.0, 3.0, -14.5],
    },
    cameraState: 'GALLERY_ENTRY',
    cameraWaypointId: 'int-wp-07',
    cameraFocusPosition: [0.0, 1.6, -10.2],
    cameraFocusTarget: [0.0, 1.5, -15.0],
    cameraFov: 56,
    lightingPreset: 'interior',
    accent: 'Double-height volume, central travertine plinth, mezzanine walkways',
    exhibitionStyle: 'Architectural exhibition plinths with visual hierarchy',
    description: 'Central exhibition space hosting the 7 verified portfolio projects across spatial tiers.',
  },
  {
    id: 'engineering-lab',
    order: 6,
    name: 'Engineering Lab',
    purpose: 'Technical Stack & Systems',
    spatialZone: 'LAB',
    bounds: {
      min: [-7.8, 0.0, -14.0],
      max: [-1.5, 3.5, -6.0],
      center: [-4.65, 1.7, -10.0],
    },
    cameraState: 'GALLERY_REVEAL',
    cameraWaypointId: 'int-wp-06',
    cameraFocusPosition: [-0.35, 1.6, -7.8],
    cameraFocusTarget: [-3.2, 1.4, -8.5],
    cameraFov: 60,
    lightingPreset: 'interior',
    accent: 'Frameless glass enclosure, dual matte IPS monitors, anodized server rack',
    exhibitionStyle: 'Architectural workstation & domain skill steles',
    description: 'Dedicated glass-enclosed engineering space detailing languages, frontend, backend, data, AI, and infra.',
  },
  {
    id: 'archive',
    order: 7,
    name: 'Archive',
    purpose: 'Proof, Hackathons & Milestones',
    spatialZone: 'ARCHIVE',
    bounds: {
      min: [1.6, 0.0, -21.0],
      max: [6.0, 3.5, -13.0],
      center: [3.8, 1.7, -17.0],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [1.0, 1.6, -15.0],
    cameraFocusTarget: [3.4, 1.4, -18.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Muted bronze, travertine proof tablets, under-mezzanine floating stair flank',
    exhibitionStyle: 'Documentary proof steles & milestone tablets',
    description: 'Verified competition awards, SIH national hackathon victory, and open source contributions.',
  },
  {
    id: 'study',
    order: 8,
    name: 'Study',
    purpose: 'Philosophy & Build Process',
    spatialZone: 'STUDIO',
    bounds: {
      min: [-6.0, 0.0, -21.0],
      max: [-1.6, 3.5, -14.0],
      center: [-3.8, 1.7, -17.5],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [-1.0, 1.6, -15.0],
    cameraFocusTarget: [-3.4, 1.4, -18.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Walnut desk, architectural sketches, warm grazing light, restrained calm',
    exhibitionStyle: 'Four monolithic principle steles: BUILD, THINK, EXPLORE, REFINE',
    description: 'Contemplative study communicating principles of problem solving and engineering rigor.',
  },
  {
    id: 'contact',
    order: 9,
    name: 'Contact Pavilion',
    purpose: 'Contact & Collaboration',
    spatialZone: 'CONTACT',
    bounds: {
      min: [-3.0, 0.0, -22.0],
      max: [3.0, 4.0, -17.0],
      center: [0.0, 1.7, -19.5],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [0.0, 1.6, -14.5],
    cameraFocusTarget: [0.0, 1.3, -19.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Central travertine plinth, toe-kick underglow, 6.8m double-height rear glass panorama',
    exhibitionStyle: 'Architectural plinth with verified contact coordinates',
    description: 'Final interior destination inviting dialogue with a backdrop of the mountain vista.',
  },
  {
    id: 'terrace',
    order: 10,
    name: 'Rear Terrace & Vista',
    purpose: 'Final Reflection & Horizon',
    spatialZone: 'TERRACE',
    bounds: {
      min: [-14.0, -2.0, -36.0],
      max: [14.0, 4.0, -21.5],
      center: [0.0, 0.5, -28.0],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [0.0, 1.6, -18.5],
    cameraFocusTarget: [0.0, 1.8, -35.0],
    cameraFov: 52,
    lightingPreset: 'dusk',
    accent: 'Cantilever terrace slab, glass balustrade, twilight mountain silhouette',
    exhibitionStyle: 'Pure architectural contemplative observation space',
    description: 'Visual breathing room providing a cinematic pause overlooking the natural horizon.',
  },
];

/**
 * Keyed dictionary for O(1) room lookup
 */
export const ROOM_REGISTRY: Record<RoomId, PortfolioRoomConfig> = PORTFOLIO_ROOMS.reduce(
  (acc, room) => {
    acc[room.id] = room;
    return acc;
  },
  {} as Record<RoomId, PortfolioRoomConfig>
);

/**
 * Find room by stable ID
 */
export function getRoomById(id: RoomId): PortfolioRoomConfig {
  const room = ROOM_REGISTRY[id];
  if (!room) {
    throw new Error(`[RoomRegistry] Room with id "${id}" does not exist in registry.`);
  }
  return room;
}

/**
 * Find room by sequence order (1-indexed)
 */
export function getRoomByOrder(order: number): PortfolioRoomConfig | undefined {
  return PORTFOLIO_ROOMS.find((r) => r.order === order);
}

/**
 * Determine active room based on unified camera journey progress p in [0.0, 1.0]
 */
export function getRoomForJourneyProgress(progress: number): PortfolioRoomConfig {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.40) return ROOM_REGISTRY['exterior'];
  if (p < 0.50) return ROOM_REGISTRY['entrance'];
  if (p < 0.62) return ROOM_REGISTRY['foyer'];
  if (p < 0.74) return ROOM_REGISTRY['gallery'];
  if (p < 0.84) return ROOM_REGISTRY['project-studio'];
  if (p < 0.90) return ROOM_REGISTRY['engineering-lab'];
  if (p < 0.94) return ROOM_REGISTRY['archive'];
  if (p < 0.97) return ROOM_REGISTRY['study'];
  if (p < 0.995) return ROOM_REGISTRY['contact'];
  return ROOM_REGISTRY['terrace'];
}

/**
 * Maps camera journey state to the most representative portfolio room
 */
export function getRoomForCameraState(state: CameraJourneyState): PortfolioRoomConfig {
  switch (state) {
    case 'EXTERIOR_ESTABLISHING':
    case 'EXTERIOR_APPROACH':
    case 'FACADE_REVEAL':
      return ROOM_REGISTRY['exterior'];
    case 'ENTRANCE_APPROACH':
    case 'DOOR_TRANSITION':
    case 'DOOR_THRESHOLD':
      return ROOM_REGISTRY['entrance'];
    case 'FOYER_ENTRY':
    case 'FOYER_HOLD':
      return ROOM_REGISTRY['foyer'];
    case 'CORRIDOR_ENTRY':
    case 'CORRIDOR_TRAVEL':
      return ROOM_REGISTRY['gallery'];
    case 'GALLERY_REVEAL':
      return ROOM_REGISTRY['engineering-lab'];
    case 'GALLERY_ENTRY':
      return ROOM_REGISTRY['project-studio'];
    case 'INTERIOR_ROOM_APPROACH':
      return ROOM_REGISTRY['contact'];
    default:
      return ROOM_REGISTRY['exterior'];
  }
}
