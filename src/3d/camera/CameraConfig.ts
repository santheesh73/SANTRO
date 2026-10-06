import { CameraBoundaryConfig, InputSensitivityConfig } from './types';

/**
 * SANTRO M6 — Master Camera Configuration
 *
 * Calibrated physics, optical lenses, damping factors, input normalization,
 * and boundary collision safety constraints for the architectural exterior journey.
 */

export const CAMERA_CONFIG = {
  // Optical Lens Defaults
  defaultFov: 48, // Calibrated 40mm equivalent architectural focal length
  nearPlane: 0.1, // Near clipping plane (prevents wall clipping)
  farPlane: 250.0, // Far clipping plane (encompasses mountain ridges)

  // Spline & Interpolation Dynamics
  splineTension: 0.5, // Centripetal Catmull-Rom tension (prevents looping or overshoot)
  subdivisionSamples: 200, // Arc-length cache samples for linear progress mapping

  // Exponential Damping Factors (Higher = faster response, Lower = heavier cinematic inertia)
  // Formula: factor = 1.0 - Math.exp(-lambda * dt)
  damping: {
    position: 4.8, // Position lerp speed (heavy cinematic dolly weight)
    target: 5.8, // Look target lerp speed (deliberate camera operator reframing)
    fov: 4.0, // Field of view transition speed
    scrollInertia: 6.2, // Virtual scroll progress decay
    transitionFast: 10.0, // Quick jump transition rate
  },

  // Multi-Device Input Normalization
  input: {
    wheelMultiplier: 0.00065, // Standard mouse wheel step to progress delta
    touchMultiplier: 0.0018, // Mobile touch swipe sensitivity
    keyboardStep: 0.04, // Arrow key incremental step (~4% journey progress)
    inertiaDecay: 0.92, // Momentum preservation per frame
    springStiffness: 12.0, // Boundary spring tension
  } as InputSensitivityConfig,

  // Camera Spatial Safety Boundaries (Zero clipping through walls, pool floor, or ceiling)
  boundaries: {
    minY: 1.45, // Absolute minimum ground clearance (above human eye-level 1.6m)
    maxY: 16.0, // Maximum aerial altitude
    minZ: 1.8, // Stops right at the entrance door threshold [0, 1.6, 2.2]
    maxZ: 32.0, // Maximum distance out in the south valley
    minX: -8.0, // West boundary limit
    maxX: 8.0, // East boundary limit
    nearPlane: 0.1,
    farPlane: 250.0,
  } as CameraBoundaryConfig,

  // Pivot Door Mechanical Opening Trigger Bounds (CAMERA_SPEC.md §6)
  doorTrigger: {
    startZ: 4.5, // Door starts swinging inward when camera reaches Z = 4.5m
    endZ: 2.2, // Door is fully opened (-85 deg) when camera arrives at Z = 2.2m
    maxAngleRad: -1.484, // -85 degrees in radians
  },

  // Responsive Optical Offsets (Maintains architectural hierarchy on mobile/tablet)
  responsive: {
    mobileBreakpoint: 768,
    tabletBreakpoint: 1024,
    mobileFovOffset: 8.0, // Expands FOV by +8 deg on portrait mobile to preserve building width
    tabletFovOffset: 4.0, // Expands FOV by +4 deg on tablet
    mobileDistanceScalar: 1.12, // Pulls camera back by 12% on narrow screens
  },

  // Micro-Movement (imperceptible subtle natural camera breathing, zero handheld shake)
  microMovement: {
    enabled: true,
    positionAmplitude: 0.006, // Max 6mm positional drift (barely perceptible)
    frequency: 0.25, // 0.25 Hz slow breath cycle
  },
} as const;
