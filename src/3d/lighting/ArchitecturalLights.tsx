'use client';

import React from 'react';
import { ArchitecturalLightsConfig } from './types';
import { LIGHT_FIXTURE_POSITIONS } from './LightingConfig';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface ArchitecturalLightsProps {
  config: ArchitecturalLightsConfig;
}

/**
 * SANTRO M5 — Architectural Accent & Soffit Lighting
 *
 * Reveals geometric reveals and material depth:
 * - Washes the underside of the deep West and East volumetric cantilevers
 * - Grazes the horizontal formwork seams of the board-formed concrete retaining wall
 * - Enhances spatial dimensionality while preventing flat illumination
 */
export function ArchitecturalLights({ config }: ArchitecturalLightsProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const isLowTier = qualityTier === 'low';

  if (isLowTier) return null;

  return (
    <group name="ArchitecturalLights">
      {/* 1. West Cantilever Soffit Reveal Wash */}
      <spotLight
        name="Cantilever_Soffit_West"
        position={LIGHT_FIXTURE_POSITIONS.soffitWashWest}
        target-position={[-9.0, 0.0, 2.5]}
        intensity={config.soffitWashIntensity}
        color={config.soffitWashColor}
        angle={Math.PI / 3}
        penumbra={0.8}
        distance={7.0}
        decay={2.0}
      />

      {/* 2. East Cantilever Soffit Reveal Wash */}
      <spotLight
        name="Cantilever_Soffit_East"
        position={LIGHT_FIXTURE_POSITIONS.soffitWashEast}
        target-position={[9.0, 0.0, 2.5]}
        intensity={config.soffitWashIntensity}
        color={config.soffitWashColor}
        angle={Math.PI / 3}
        penumbra={0.8}
        distance={7.0}
        decay={2.0}
      />

      {/* 3. Board-Formed Concrete Retaining Wall Grazing Light */}
      <pointLight
        name="Retaining_Wall_Grazer"
        position={LIGHT_FIXTURE_POSITIONS.retainingWallGrazer}
        intensity={config.retainingWallIntensity}
        color={config.retainingWallColor}
        distance={5.0}
        decay={2.0}
      />
    </group>
  );
}
