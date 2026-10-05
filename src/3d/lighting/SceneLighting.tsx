'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { QUALITY_CONFIGS } from '@/3d/utils/quality';

/**
 * Architectural lighting foundation for M1 validation.
 * Features:
 * - Directional sunlight casting crisp PCF architectural shadows
 * - Hemisphere light balancing sky ambient (#E8F0FE) and travertine ground bounce (#DDD6C8)
 * - Dynamic shadow map sizing conditioned on quality tier (HIGH: 2048, MEDIUM: 1024, LOW: disabled)
 */
export function SceneLighting() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const quality = QUALITY_CONFIGS[qualityTier];
  const sunLightRef = useRef<THREE.DirectionalLight>(null);

  const shadowSize = quality.shadowMapSize;
  const enableShadows = quality.shadows;

  return (
    <group name="SceneLighting">
      {/* Dynamic Hemisphere Fill: Sky Azure to Warm Travertine Ground */}
      <hemisphereLight
        args={['#e8f0fe', '#ddd6c8', 0.65]}
        position={[0, 50, 0]}
      />

      {/* Subtle Ambient Base */}
      <ambientLight intensity={0.25} color="#ffffff" />

      {/* Primary Directional Sunlight */}
      <directionalLight
        ref={sunLightRef}
        position={[25, 38, 18]}
        intensity={2.6}
        color="#fffbf0"
        castShadow={enableShadows}
        shadow-mapSize-width={shadowSize}
        shadow-mapSize-height={shadowSize}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-bias={-0.0003}
        shadow-normalBias={0.02}
      />
    </group>
  );
}
