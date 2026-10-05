import { LightingPresetConfig, TimeOfDayPreset } from './types';
import { DEFAULT_SHADOW_BOUNDS } from './LightingConfig';

/**
 * SANTRO M5 — Architectural Lighting Presets Catalog
 *
 * Implements the 4 canonical Time-of-Day states required by M5:
 * 1. DAY: Crisp neutral daylight (~5500K), readable white stucco facades, controlled pool reflection
 * 2. GOLDEN_HOUR: Late afternoon sun (~3500K) at 35° elevation, matching Reference Video Shots 1 & 2
 * 3. DUSK: Twilight blue hour & lantern glow (~2400K interior), matching Reference Video Shot 4 Finale
 * 4. INTERIOR: Calibrated interior architectural intimacy through corridor, workspace, and atrium
 */

export const LIGHTING_PRESETS: Record<TimeOfDayPreset, LightingPresetConfig> = {
  // =========================================================================
  // 1. DAY — High Noon Architectural Daylight
  // =========================================================================
  day: {
    id: 'day',
    name: 'Daylight',
    shotLabel: '12:00 PM',
    description:
      'High-sun architectural daylight. Neutral ivory stucco, high shadow contrast under cantilevers, azure sky, and crisp water clarity.',
    exposure: 1.05,
    sun: {
      position: [22, 42, 16],
      intensity: 2.8,
      color: '#fffef4',
      shadowCameraBounds: DEFAULT_SHADOW_BOUNDS,
      shadowBias: -0.00025,
      shadowNormalBias: 0.022,
    },
    environment: {
      hemiSkyColor: '#e6f0fa',
      hemiGroundColor: '#ddd6c8',
      hemiIntensity: 0.70,
      ambientColor: '#f5f7fa',
      ambientIntensity: 0.20,
    },
    atmosphere: {
      skyColor: '#d9e4ee',
      fogColor: '#e2e8ee',
      fogDensity: 0.007,
      horizonGroundColor: '#d2cdc3',
      groundRoughness: 0.95,
    },
    entrance: {
      soffitDownlightIntensity: 1.5,
      soffitDownlightColor: '#fff2de',
      doorLEDIntensity: 0.8,
      doorLEDColor: '#00f0ff',
      thresholdBounceIntensity: 0.4,
      thresholdBounceColor: '#ffeccc',
    },
    interior: {
      corridorDownlightIntensity: 1.2,
      corridorDownlightColor: '#fff0d6',
      workspaceLinearIntensity: 1.5,
      workspaceLinearColor: '#f8f6f0',
      atriumCoveIntensity: 1.8,
      atriumCoveColor: '#fff2dc',
      plinthToeKickIntensity: 1.0,
      plinthToeKickColor: '#ffe4b5',
      stairAccentIntensity: 0.8,
      stairAccentColor: '#ffe9cc',
      rearVistaIntensity: 1.0,
      rearVistaColor: '#fff4e2',
    },
    pool: {
      underwaterIntensity: 0.6,
      underwaterColor: '#48c5c5',
      weirRimIntensity: 0.2,
      weirRimColor: '#80dede',
    },
    architectural: {
      soffitWashIntensity: 0.5,
      soffitWashColor: '#fff1db',
      retainingWallIntensity: 0.3,
      retainingWallColor: '#ece4d8',
    },
  },

  // =========================================================================
  // 2. GOLDEN_HOUR — Late Afternoon Golden Hour (Hero Reference Shots 1 & 2)
  // =========================================================================
  golden_hour: {
    id: 'golden_hour',
    name: 'Golden Hour',
    shotLabel: '05:30 PM',
    description:
      'Low-angle golden sunlight (~3500K) at 35° elevation from West-Southwest. Long raking shadows, warm amber facade highlights, silky travertine specular.',
    exposure: 1.15,
    sun: {
      position: [28, 22, 20],
      intensity: 3.2,
      color: '#ffe9c8',
      shadowCameraBounds: DEFAULT_SHADOW_BOUNDS,
      shadowBias: -0.00025,
      shadowNormalBias: 0.022,
    },
    environment: {
      hemiSkyColor: '#f3e8dc',
      hemiGroundColor: '#d5c2ab',
      hemiIntensity: 0.85,
      ambientColor: '#fff2e0',
      ambientIntensity: 0.25,
    },
    atmosphere: {
      skyColor: '#e5ded6',
      fogColor: '#e8ded2',
      fogDensity: 0.0065,
      horizonGroundColor: '#d4cbbe',
      groundRoughness: 0.95,
    },
    entrance: {
      soffitDownlightIntensity: 2.4,
      soffitDownlightColor: '#ffe4be',
      doorLEDIntensity: 1.5,
      doorLEDColor: '#00f0ff',
      thresholdBounceIntensity: 0.8,
      thresholdBounceColor: '#ffe2b8',
    },
    interior: {
      corridorDownlightIntensity: 2.2,
      corridorDownlightColor: '#ffe8cc',
      workspaceLinearIntensity: 2.5,
      workspaceLinearColor: '#fff0e0',
      atriumCoveIntensity: 3.0,
      atriumCoveColor: '#ffeecf',
      plinthToeKickIntensity: 2.0,
      plinthToeKickColor: '#ffdfab',
      stairAccentIntensity: 1.6,
      stairAccentColor: '#ffe4be',
      rearVistaIntensity: 2.0,
      rearVistaColor: '#ffebd2',
    },
    pool: {
      underwaterIntensity: 1.4,
      underwaterColor: '#48c5c5',
      weirRimIntensity: 0.6,
      weirRimColor: '#80dede',
    },
    architectural: {
      soffitWashIntensity: 1.2,
      soffitWashColor: '#ffe4be',
      retainingWallIntensity: 0.8,
      retainingWallColor: '#e8dccb',
    },
  },

  // =========================================================================
  // 3. DUSK — Twilight Blue Hour & Architectural Lantern Glow (Shot 4 Finale)
  // =========================================================================
  dusk: {
    id: 'dusk',
    name: 'Dusk / Twilight',
    shotLabel: '07:45 PM',
    description:
      'Horizon twilight afterglow with deep indigo sky. Interior practical lights glow warmly through floor-to-ceiling glass, transforming the villa into a luminous lantern.',
    exposure: 1.30,
    sun: {
      position: [30, 6, 25],
      intensity: 0.65,
      color: '#ff9d66',
      shadowCameraBounds: DEFAULT_SHADOW_BOUNDS,
      shadowBias: -0.0003,
      shadowNormalBias: 0.025,
    },
    environment: {
      hemiSkyColor: '#303952',
      hemiGroundColor: '#221d28',
      hemiIntensity: 0.40,
      ambientColor: '#2a2b3d',
      ambientIntensity: 0.12,
    },
    atmosphere: {
      skyColor: '#1e2436',
      fogColor: '#222538',
      fogDensity: 0.009,
      horizonGroundColor: '#2c2a33',
      groundRoughness: 0.95,
    },
    entrance: {
      soffitDownlightIntensity: 4.0,
      soffitDownlightColor: '#ffd89b',
      doorLEDIntensity: 2.5,
      doorLEDColor: '#00f0ff',
      thresholdBounceIntensity: 1.2,
      thresholdBounceColor: '#ffd592',
    },
    interior: {
      corridorDownlightIntensity: 4.2,
      corridorDownlightColor: '#ffdc9e',
      workspaceLinearIntensity: 4.0,
      workspaceLinearColor: '#fff0d8',
      atriumCoveIntensity: 6.0,
      atriumCoveColor: '#ffe0aa',
      plinthToeKickIntensity: 4.5,
      plinthToeKickColor: '#ffd68a',
      stairAccentIntensity: 3.0,
      stairAccentColor: '#ffd89b',
      rearVistaIntensity: 4.0,
      rearVistaColor: '#ffe2b0',
    },
    pool: {
      underwaterIntensity: 3.8,
      underwaterColor: '#38bbbb',
      weirRimIntensity: 1.5,
      weirRimColor: '#6ceeee',
    },
    architectural: {
      soffitWashIntensity: 3.2,
      soffitWashColor: '#ffd89b',
      retainingWallIntensity: 2.0,
      retainingWallColor: '#d0b898',
    },
  },

  // =========================================================================
  // 4. INTERIOR — Architectural Spatial Intimacy
  // =========================================================================
  interior: {
    id: 'interior',
    name: 'Interior Gallery',
    shotLabel: 'Gallery Core',
    description:
      'Calibrated for spatial navigation through corridor, workspace, and exhibition atrium. Balanced daylight filter, warm 2700K recessed downlights, and soft contact shadows.',
    exposure: 1.25,
    sun: {
      position: [20, 30, 15],
      intensity: 1.2,
      color: '#fdfaf2',
      shadowCameraBounds: DEFAULT_SHADOW_BOUNDS,
      shadowBias: -0.00025,
      shadowNormalBias: 0.022,
    },
    environment: {
      hemiSkyColor: '#3a4556',
      hemiGroundColor: '#2c2824',
      hemiIntensity: 0.35,
      ambientColor: '#3a3b48',
      ambientIntensity: 0.25,
    },
    atmosphere: {
      skyColor: '#0f131a',
      fogColor: '#12151e',
      fogDensity: 0.008,
      horizonGroundColor: '#1b1d24',
      groundRoughness: 0.95,
    },
    entrance: {
      soffitDownlightIntensity: 2.8,
      soffitDownlightColor: '#ffe2b8',
      doorLEDIntensity: 1.2,
      doorLEDColor: '#00f0ff',
      thresholdBounceIntensity: 0.9,
      thresholdBounceColor: '#ffdfab',
    },
    interior: {
      corridorDownlightIntensity: 3.5,
      corridorDownlightColor: '#ffe2b8',
      workspaceLinearIntensity: 3.8,
      workspaceLinearColor: '#fff2de',
      atriumCoveIntensity: 5.5,
      atriumCoveColor: '#ffe5be',
      plinthToeKickIntensity: 4.0,
      plinthToeKickColor: '#ffdb98',
      stairAccentIntensity: 2.4,
      stairAccentColor: '#ffe0b0',
      rearVistaIntensity: 3.2,
      rearVistaColor: '#ffe5be',
    },
    pool: {
      underwaterIntensity: 2.0,
      underwaterColor: '#40bfbf',
      weirRimIntensity: 0.8,
      weirRimColor: '#70e0e0',
    },
    architectural: {
      soffitWashIntensity: 2.0,
      soffitWashColor: '#ffe0b0',
      retainingWallIntensity: 1.2,
      retainingWallColor: '#d8c8b4',
    },
  },
};

export const TIME_OF_DAY_LIST: { id: TimeOfDayPreset; label: string; shotLabel: string }[] = [
  { id: 'day', label: 'DAY', shotLabel: '12:00 PM' },
  { id: 'golden_hour', label: 'GOLDEN', shotLabel: '05:30 PM' },
  { id: 'dusk', label: 'DUSK', shotLabel: '07:45 PM' },
  { id: 'interior', label: 'INTERIOR', shotLabel: 'GALLERY' },
];
