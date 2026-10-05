'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { SunLightConfig } from './types';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { QUALITY_CONFIGS } from '@/3d/utils/quality';

interface SunLightProps {
  config: SunLightConfig;
}

/**
 * SANTRO M5 — Controlled Directional Sunlight System
 *
 * Provides primary architectural illumination and crisp soft shadow definition:
 * - Direction and sun elevation driven by active Time-of-Day preset
 * - Calibrated orthographic shadow camera enclosing the full villa and terrace
 * - Shadow map sizing responsive to device Quality Tier (HIGH: 2048, MEDIUM: 1024, LOW: off)
 * - Fine-tuned bias and normalBias to prevent shadow acne and surface disconnection
 */
export function SunLight({ config }: SunLightProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const quality = QUALITY_CONFIGS[qualityTier];
  const lightRef = useRef<THREE.DirectionalLight>(null);

  const shadowSize = quality.shadowMapSize;
  const enableShadows = quality.shadows;
  const bounds = config.shadowCameraBounds;

  return (
    <directionalLight
      ref={lightRef}
      name="SunLight_Primary"
      position={config.position}
      intensity={config.intensity}
      color={config.color}
      castShadow={enableShadows}
      shadow-mapSize-width={shadowSize}
      shadow-mapSize-height={shadowSize}
      shadow-camera-near={bounds.near}
      shadow-camera-far={bounds.far}
      shadow-camera-left={bounds.left}
      shadow-camera-right={bounds.right}
      shadow-camera-top={bounds.top}
      shadow-camera-bottom={bounds.bottom}
      shadow-bias={config.shadowBias}
      shadow-normalBias={config.shadowNormalBias}
    />
  );
}
