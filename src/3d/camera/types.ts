/**
 * SANTRO M6 — Exterior Cinematic Camera System Types
 *
 * Defines the comprehensive type contracts for:
 * - Exterior camera states (Establishing -> Approach -> Façade -> Entrance -> Door)
 * - Camera modes (Cinematic spline follow, Orbital inspection, Validation shots)
 * - Authored waypoints and spline control points
 * - Damping, physics, input normalization, and debug configurations
 */

export type ExteriorCameraState =
  | 'EXTERIOR_ESTABLISHING' // Shot 01: Aerial elevated perspective (Frame 000, t=0.0s)
  | 'EXTERIOR_APPROACH'     // Shot 01: Descent towards pool terrace (Frame 034, t=1.4s)
  | 'FACADE_REVEAL'         // Shot 02: Eye-level pool terrace tracking (Frame 070, t=2.9s)
  | 'ENTRANCE_APPROACH'     // Shot 02: Intimate approach to entrance portal (Frame 095, t=3.9s)
  | 'DOOR_TRANSITION';      // Shot 02: Door threshold framing into foyer (Frame 108, t=4.5s)

export type InteriorCameraState =
  | 'DOOR_THRESHOLD'          // Threshold passage into entrance vestibule (Frame 108, t=4.5s)
  | 'FOYER_ENTRY'             // Crossing into travertine foyer vestibule (Frame 120, t=5.0s)
  | 'FOYER_HOLD'              // Settle moment framing vertical fluted walnut wall (Frame 131, t=5.46s)
  | 'CORRIDOR_ENTRY'          // Entrance into gallery circulation axis (Frame 133, t=5.54s)
  | 'CORRIDOR_TRAVEL'         // Longitudinal tracking shot past ceiling reveal (Frame 150, t=6.25s)
  | 'GALLERY_REVEAL'          // Lateral reveal of glass engineering workspace (Frame 167, t=6.96s)
  | 'GALLERY_ENTRY'           // Emergence into double-height exhibition volume (Frame 169, t=7.04s)
  | 'INTERIOR_ROOM_APPROACH'; // Controlled approach to central travertine plinth & vista (Frames 185-200)

/**
 * Unified camera journey state bridging Exterior (M6) and Interior (M7)
 */
export type CameraJourneyState = ExteriorCameraState | InteriorCameraState;

export type CameraInteractionMode =
  | 'cinematic'   // Scroll-driven parametric spline progression (Default)
  | 'inspect'     // Interactive orbital exploration around current waypoint
  | 'validation'; // Direct examination of calibrated reference keyframes

export interface CameraWaypoint {
  id: string;
  progress: number; // Normalized progress along path: 0.0 to 1.0
  state: CameraJourneyState;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  label: string;
  shotRef: string;
  description: string;
}

export interface ValidationShotConfig {
  id: string;
  shotNumber: number;
  label: string;
  name: string;
  state: CameraJourneyState;
  progress: number;
  frameRef: string;
  position: [number, number, number];
  target: [number, number, number];
  fov: number;
  description: string;
  focalPoints: string[];
}

export interface CameraRigState {
  currentProgress: number;
  targetProgress: number;
  velocity: number;
  state: CameraJourneyState;
  mode: CameraInteractionMode;
  isReducedMotion: boolean;
}

export interface InputSensitivityConfig {
  wheelMultiplier: number;
  touchMultiplier: number;
  keyboardStep: number;
  inertiaDecay: number;
  springStiffness: number;
}

export interface CameraBoundaryConfig {
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
  minX: number;
  maxX: number;
  nearPlane: number;
  farPlane: number;
}
