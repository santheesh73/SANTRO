import * as THREE from 'three';
import { RoomId } from '@/3d/rooms/types';
import { TimeOfDayPreset } from '@/3d/lighting/types';

/**
 * SANTRO M9 — 360° Room Experience & Immersive Spatial Presentation Types
 *
 * Defines the core architectural contracts for:
 * - Deterministic Room Experience State Machine
 * - Spatial Camera Anchors & Content Beats
 * - Authored Room Timeline Configurations
 * - Motion Intensity & Anti-Motion-Sickness Constraints
 * - Responsive & Reduced-Motion Adaptations
 */

export type RoomExperienceState =
  | 'IDLE'              // Outside active room experience segment
  | 'ROOM_APPROACH'     // Corridor deceleration approaching room threshold
  | 'ROOM_ARRIVAL'      // Crossing room portal; natural momentum decay
  | 'ROOM_SETTLE'       // Velocity stabilizes; framing locks onto primary orientation
  | 'ROOM_REVEAL'       // Deliberate architectural reveal of primary volume
  | 'ROOM_INSPECTION'   // Controlled panoramic movement through spatial compositions
  | 'CONTENT_BEAT'      // Static/subtle framing holding on physical exhibition element
  | 'ROOM_EXIT'         // Controlled forward acceleration toward room portal
  | 'RESUME_JOURNEY';   // Seamless handoff back to global circulation spine

export type RoomExperienceIntensity =
  | 'HIGH'         // Project Studio: Comprehensive 7-project spatial walkthrough
  | 'MEDIUM-HIGH'  // Engineering Lab: Workstations, telemetry & technical stack
  | 'MEDIUM'       // Archive: Documentary proof steles & milestone tablets
  | 'LOW'          // Study & Contact: Quiet contemplative architectural pauses
  | 'MINIMAL';     // Terrace: Pure horizon vista pause

export interface RoomCameraAnchor {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  label?: string;
  duration?: number;       // Relative progress weight within state
  holdDuration?: number;   // Hold duration weight (camera nearly static)
  easing?: string;         // 'easeOutCubic' | 'easeInOutCubic' | 'easeInOutSine'
  priority?: number;
}

export type BeatImportance = 'primary' | 'secondary' | 'supporting';

export interface RoomCameraBeat {
  id: string;
  startProgress: number;     // Normalized progress [0.0, 1.0] within room experience
  endProgress: number;       // Normalized progress [0.0, 1.0] within room experience
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  label: string;
  state: RoomExperienceState;
  contentId?: string;        // E.g. 'orion', 'hearttune', 'sih', 'principle-build'
  importance?: BeatImportance;
  holdDuration?: number;     // Normalized hold fraction within beat
  lightingPreset?: TimeOfDayPreset;
  description?: string;
  focalPoints?: string[];
}

export interface RoomExperienceConfig {
  roomId: RoomId;
  name: string;
  enabled: boolean;
  intensity: RoomExperienceIntensity;
  globalProgressRange: [number, number]; // Global journey [startP, endP]
  arrival: RoomCameraAnchor;
  settle: RoomCameraAnchor;
  reveal: RoomCameraAnchor;
  beats: RoomCameraBeat[];
  exit: RoomCameraAnchor;
  lightingPreset: TimeOfDayPreset;
  defaultFov: number;
  maxRotationYawDeg?: number; // Anti-nausea constraint: max yaw swing (typically <= 45 deg)
}

export interface RoomExperienceEvaluation {
  activeRoomId: RoomId | null;
  isInsideExperience: boolean;
  localProgress: number;          // 0.0 to 1.0 within room
  state: RoomExperienceState;
  activeBeat: RoomCameraBeat | null;
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov: number;
  lightingPreset: TimeOfDayPreset;
  blendFactor: number;            // 0.0 (corridor spine) to 1.0 (authored room)
}

export interface RoomEvaluationOptions {
  isMobile?: boolean;
  isTablet?: boolean;
  reducedMotion?: boolean;
  clockTime?: number;
}
