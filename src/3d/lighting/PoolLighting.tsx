'use client';

import React from 'react';
import { PoolLightingConfig } from './types';
import { LIGHT_FIXTURE_POSITIONS } from './LightingConfig';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface PoolLightingProps {
  config: PoolLightingConfig;
}

/**
 * SANTRO M5 — Architectural Infinity Pool Lighting
 *
 * Illuminates the crystalline pool basin without artificial game-like saturation:
 * - Submerged pool fixtures cast soft aquamarine radiance upward through the water volume
 * - Vanishing weir rim light accents the infinity edge dropping toward the mountain slope
 * - Respects quality tier settings to preserve mobile GPU framerates
 */
export function PoolLighting({ config }: PoolLightingProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const isLowTier = qualityTier === 'low';

  return (
    <group name="PoolLighting">
      {/* 1. Submerged Center Architectural Pool Fixture */}
      <pointLight
        name="Pool_Submerged_Center"
        position={LIGHT_FIXTURE_POSITIONS.poolSubmergedCenter}
        intensity={config.underwaterIntensity}
        color={config.underwaterColor}
        distance={6.5}
        decay={2.0}
      />

      {/* 2. Submerged Flanking Fixtures (West & East) */}
      {!isLowTier && (
        <>
          <pointLight
            name="Pool_Submerged_West"
            position={LIGHT_FIXTURE_POSITIONS.poolSubmergedWest}
            intensity={config.underwaterIntensity * 0.75}
            color={config.underwaterColor}
            distance={5.0}
            decay={2.0}
          />
          <pointLight
            name="Pool_Submerged_East"
            position={LIGHT_FIXTURE_POSITIONS.poolSubmergedEast}
            intensity={config.underwaterIntensity * 0.75}
            color={config.underwaterColor}
            distance={5.0}
            decay={2.0}
          />
        </>
      )}

      {/* 3. Vanishing Weir Coping Rim Grazing */}
      <pointLight
        name="Pool_Weir_Rim"
        position={LIGHT_FIXTURE_POSITIONS.poolWeirRim}
        intensity={config.weirRimIntensity}
        color={config.weirRimColor}
        distance={4.0}
        decay={2.0}
      />
    </group>
  );
}
