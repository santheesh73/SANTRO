import { ShadowCameraBounds } from './types';

/**
 * SANTRO M5 — Architectural Lighting Spatial Fixture Positions & Defaults
 *
 * Grounded in exact house geometry coordinates:
 * - Entrance portal centered at [0, 0, 0] to [0, 3.4, 0]
 * - Walnut pivot door at X: -0.65m to +0.65m, Z: -0.2m to +0.2m
 * - Gallery corridor extending from Z: 0.0m to -10.0m along Y: 0.0m to 3.4m
 * - Glass workspace at X: -5.0m, Z: -3.0m to -8.5m
 * - Double-height exhibition atrium at X: 0.0m, Z: -12.0m to -22.0m, Y: 0.0m to 6.8m
 * - Monolithic exhibition plinth at [0.0, 0.45, -16.0]
 * - Infinity lap pool at X: -7.0m to +7.0m, Z: 4.5m to 8.5m, Y: -0.1m to -1.4m
 */

export const DEFAULT_SHADOW_BOUNDS: ShadowCameraBounds = {
  left: -28,
  right: 28,
  top: 26,
  bottom: -26,
  near: 1.0,
  far: 95.0,
};

// Fixture Coordinates
export const LIGHT_FIXTURE_POSITIONS = {
  // Entrance
  entranceSoffitDownlight: [0.15, 3.35, 0.35] as [number, number, number],
  entranceDoorLED: [0.52, 1.45, 0.08] as [number, number, number],
  entranceThresholdBounce: [0.0, 0.05, 0.2] as [number, number, number],

  // Gallery Corridor
  corridorDownlight1: [0.5, 3.35, -2.5] as [number, number, number],
  corridorDownlight2: [0.5, 3.35, -5.5] as [number, number, number],
  corridorDownlight3: [0.5, 3.35, -8.5] as [number, number, number],

  // Glass Workspace
  workspaceCeiling: [-5.2, 3.35, -5.8] as [number, number, number],
  workspaceDeskAccent: [-5.2, 1.25, -5.8] as [number, number, number],

  // Double-Height Atrium
  atriumPlinthToeKick: [0.0, 0.12, -16.0] as [number, number, number],
  atriumCeilingCove: [0.0, 6.6, -16.0] as [number, number, number],
  atriumRearVistaWall: [0.0, 3.2, -23.5] as [number, number, number],
  floatingStairAccent: [2.5, 1.6, -5.0] as [number, number, number],

  // Infinity Pool Submerged Fixtures
  poolSubmergedWest: [-4.5, -0.65, 6.5] as [number, number, number],
  poolSubmergedCenter: [0.0, -0.65, 6.5] as [number, number, number],
  poolSubmergedEast: [4.5, -0.65, 6.5] as [number, number, number],
  poolWeirRim: [0.0, 0.05, 8.6] as [number, number, number],

  // Architectural Cantilever Soffits
  soffitWashWest: [-9.0, 3.38, 2.5] as [number, number, number],
  soffitWashEast: [9.0, 3.38, 2.5] as [number, number, number],
  retainingWallGrazer: [-4.0, 0.15, 8.2] as [number, number, number],
};
