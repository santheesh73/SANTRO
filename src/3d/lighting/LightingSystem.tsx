'use client';

import React from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { LIGHTING_PRESETS } from './LightingPresets';
import { SunLight } from './SunLight';
import { EnvironmentLight } from './EnvironmentLight';
import { EntranceLights } from './EntranceLights';
import { InteriorLights } from './InteriorLights';
import { PoolLighting } from './PoolLighting';
import { ArchitecturalLights } from './ArchitecturalLights';
import { LightingDebug } from './LightingDebug';

/**
 * Dynamically synchronizes renderer tone mapping exposure with the active lighting preset,
 * smoothly damping exposure across Time-of-Day transitions for cinematic ocular adaptation.
 */
function ToneMappingExposureController({ exposure }: { exposure: number }) {
  const { gl } = useThree();

  useFrame((_, delta) => {
    if (gl) {
      gl.toneMappingExposure = THREE.MathUtils.damp(
        gl.toneMappingExposure,
        exposure,
        6.0,
        Math.min(delta, 0.1)
      );
    }
  });

  return null;
}

/**
 * SANTRO M5 — Master Architectural Lighting Orchestrator
 *
 * Centralizes all architectural lighting subsystems:
 * - Directional Sun Light (crisp PCF architectural shadows)
 * - Environment Light (sky azure to warm travertine bounce)
 * - Entrance Lights (soffit downlight, door cyan LED, threshold bounce)
 * - Interior Lights (corridor, workspace, atrium cove, plinth toe-kick)
 * - Pool Lighting (aquamarine submerged fixtures and weir rim)
 * - Architectural Lights (cantilever soffit reveals and retaining wall)
 * - Tone mapping exposure management per Time-of-Day preset with smooth iris damping
 * - Developer isolation debug modes ('all', 'sun_only', 'env_only', 'interior_only')
 * - LightingDebug fixture and helper visualization
 */
export function LightingSystem() {
  const timeOfDay = useHouseStore((state) => state.timeOfDay);
  const lightingDebugSolo = useHouseStore((state) => state.lightingDebugSolo);

  // Active preset (Day, Golden Hour, Dusk, Interior)
  const preset = LIGHTING_PRESETS[timeOfDay] ?? LIGHTING_PRESETS.golden_hour;

  const showSun =
    lightingDebugSolo === 'all' || lightingDebugSolo === 'sun_only';

  const showEnv =
    lightingDebugSolo === 'all' || lightingDebugSolo === 'env_only';

  const showInterior =
    lightingDebugSolo === 'all' || lightingDebugSolo === 'interior_only';

  const showEntrance =
    lightingDebugSolo === 'all' || lightingDebugSolo === 'interior_only';

  const showPool =
    lightingDebugSolo === 'all';

  const showArch =
    lightingDebugSolo === 'all';

  return (
    <group name="LightingSystem_Master">
      {/* 1. ACES Filmic Tone Mapping Exposure Synchronization & Smooth Iris Damping */}
      <ToneMappingExposureController exposure={preset.exposure} />

      {/* 2. Primary Directional Sunlight & Shadows */}
      {showSun && <SunLight config={preset.sun} />}

      {/* 3. Environmental Fill (Hemisphere + Ambient) */}
      {showEnv && <EnvironmentLight config={preset.environment} />}

      {/* 4. Entrance Portal Architectural Lighting */}
      {showEntrance && <EntranceLights config={preset.entrance} />}

      {/* 5. Interior Practical Downlights, Coves, and Plinth Lighting */}
      {showInterior && <InteriorLights config={preset.interior} />}

      {/* 6. Infinity Lap Pool Underwater & Weir Edge Lighting */}
      {showPool && <PoolLighting config={preset.pool} />}

      {/* 7. Cantilever Soffits & Concrete Retaining Wall Accent Lighting */}
      {showArch && <ArchitecturalLights config={preset.architectural} />}

      {/* 8. Developer Lighting Debug Helpers */}
      <LightingDebug />
    </group>
  );
}

