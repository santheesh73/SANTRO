import { SpatialZone } from '@/types';
import { CameraJourneyState } from '@/3d/camera/types';
import { TimeOfDayPreset } from '@/3d/lighting/types';
export type {
  PortfolioProject,
  SkillDomain,
  ArchiveRecord,
  PhilosophyPillar,
  ContactData,
  ProfileData,
} from '@/content/types';

export type RoomId =
  | 'exterior'
  | 'entrance'
  | 'foyer'
  | 'gallery'
  | 'project-studio'
  | 'engineering-lab'
  | 'archive'
  | 'study'
  | 'contact'
  | 'terrace';

export interface RoomSpatialBounds {
  min: [number, number, number];
  max: [number, number, number];
  center: [number, number, number];
}

export interface PortfolioRoomConfig {
  id: RoomId;
  order: number;
  name: string;
  purpose: string;
  spatialZone: SpatialZone;
  bounds: RoomSpatialBounds;
  cameraState: CameraJourneyState;
  cameraWaypointId: string;
  cameraFocusPosition: [number, number, number];
  cameraFocusTarget: [number, number, number];
  cameraFov: number;
  lightingPreset: TimeOfDayPreset;
  accent: string;
  exhibitionStyle: string;
  description: string;
}

export type ExhibitVariant = 'featured' | 'standard' | 'compact';

export interface ExhibitProps<T> {
  data: T;
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: ExhibitVariant;
  interactive?: boolean;
}
