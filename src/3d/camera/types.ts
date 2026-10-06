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

export type CameraInteractionMode =
  | 'cinematic'   // Scroll-driven parametric spline progression (Default)
  | 'inspect'     // Interactive orbital exploration around current waypoint
  | 'validation'; // Direct examination of calibrated reference keyframes

export interface CameraWaypoint {
  id: string;
  progress: number; // Normalized progress along path: 0.0 to 1.0
  state: ExteriorCameraState;
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
  state: ExteriorCameraState;
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
  state: ExteriorCameraState;
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
