'use client';

import React, { useState } from 'react';
import * as THREE from 'three';
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
 * - Explicit downward target tracking registered in the scene graph
 * - Grazes the horizontal formwork seams of the board-formed concrete retaining wall
 * - Enhances spatial dimensionality while preventing flat illumination
 */
export function ArchitecturalLights({ config }: ArchitecturalLightsProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const isLowTier = qualityTier === 'low';

  const [westTarget] = useState(() => {
    const obj = new THREE.Object3D();
    obj.name = 'Cantilever_Soffit_West_Target';
    obj.position.set(-9.0, 0.0, 2.5);
    return obj;
  });

  const [eastTarget] = useState(() => {
    const obj = new THREE.Object3D();
    obj.name = 'Cantilever_Soffit_East_Target';
    obj.position.set(9.0, 0.0, 2.5);
    return obj;
  });

  if (isLowTier) return null;

  return (
    <group name="ArchitecturalLights">
      {/* 1. West Cantilever Soffit Reveal Wash */}
      <primitive object={westTarget} />
      <spotLight
        name="Cantilever_Soffit_West"
        position={LIGHT_FIXTURE_POSITIONS.soffitWashWest}
        target={westTarget}
        intensity={config.soffitWashIntensity}
        color={config.soffitWashColor}
        angle={Math.PI / 3}
        penumbra={0.8}
        distance={7.0}
        decay={2.0}
      />

      {/* 2. East Cantilever Soffit Reveal Wash */}
      <primitive object={eastTarget} />
      <spotLight
        name="Cantilever_Soffit_East"
        position={LIGHT_FIXTURE_POSITIONS.soffitWashEast}
        target={eastTarget}
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

