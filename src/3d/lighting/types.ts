/**
 * SANTRO M5 — Architectural Lighting & Environmental Atmosphere Types
 *
 * Strongly typed configurations for the centralized architectural lighting system:
 * - Directional Sun Light & shadow frustum bounds
 * - Hemispherical & Ambient Environmental fill
 * - Dynamic Atmospheric sky & exponential fog
 * - Entrance portal lighting & cyan door LED channel
 * - Practical interior fixtures (corridor downlights, workspace, atrium cove, plinth toe-kick)
 * - Submerged pool illumination & weir rim grazing
 * - Cantilever soffit reveals & architectural accent lights
 * - 4 Canonical Time-of-Day presets: DAY, GOLDEN_HOUR, DUSK, INTERIOR
 * - Developer isolation debug solo modes
 */

export type TimeOfDayPreset = 'day' | 'golden_hour' | 'dusk' | 'interior';

export type LightingDebugSolo = 'all' | 'sun_only' | 'env_only' | 'interior_only';

export interface ShadowCameraBounds {
  left: number;
  right: number;
  top: number;
  bottom: number;
  near: number;
  far: number;
}

export interface SunLightConfig {
  position: [number, number, number];
  intensity: number;
  color: string;
  shadowCameraBounds: ShadowCameraBounds;
  shadowBias: number;
  shadowNormalBias: number;
}

export interface EnvironmentLightConfig {
  hemiSkyColor: string;
  hemiGroundColor: string;
  hemiIntensity: number;
  ambientColor: string;
  ambientIntensity: number;
}

export interface AtmosphereConfig {
  skyColor: string;
  fogColor: string;
  fogDensity: number;
  horizonGroundColor: string;
  groundRoughness: number;
}

export interface EntranceLightingConfig {
  soffitDownlightIntensity: number;
  soffitDownlightColor: string;
  doorLEDIntensity: number;
  doorLEDColor: string;
  thresholdBounceIntensity: number;
  thresholdBounceColor: string;
}

export interface InteriorLightingConfig {
  corridorDownlightIntensity: number;
  corridorDownlightColor: string;
  workspaceLinearIntensity: number;
  workspaceLinearColor: string;
  atriumCoveIntensity: number;
  atriumCoveColor: string;
  plinthToeKickIntensity: number;
  plinthToeKickColor: string;
  stairAccentIntensity: number;
  stairAccentColor: string;
  rearVistaIntensity: number;
  rearVistaColor: string;
}

export interface PoolLightingConfig {
  underwaterIntensity: number;
  underwaterColor: string;
  weirRimIntensity: number;
  weirRimColor: string;
}

export interface ArchitecturalLightsConfig {
  soffitWashIntensity: number;
  soffitWashColor: string;
  retainingWallIntensity: number;
  retainingWallColor: string;
}

export interface LightingPresetConfig {
  id: TimeOfDayPreset;
  name: string;
  shotLabel: string;
  description: string;
  exposure: number;
  sun: SunLightConfig;
  environment: EnvironmentLightConfig;
  atmosphere: AtmosphereConfig;
  entrance: EntranceLightingConfig;
  interior: InteriorLightingConfig;
  pool: PoolLightingConfig;
  architectural: ArchitecturalLightsConfig;
}
