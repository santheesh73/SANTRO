'use client';

import React, { useRef, useState, useEffect } from 'react';
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
 * - Explicit target centered at villa core [0, 0, -5.0] registered in the scene graph
 * - Calibrated orthographic shadow camera enclosing the full villa and terrace
 * - Shadow map sizing responsive to device Quality Tier (HIGH: 2048, MEDIUM: 1024, LOW: off)
 * - Automatic updateProjectionMatrix invocation ensuring non-clipped shadow frustums
 * - Fine-tuned bias and normalBias to prevent shadow acne and surface disconnection
 */
export function SunLight({ config }: SunLightProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const quality = QUALITY_CONFIGS[qualityTier];
  const lightRef = useRef<THREE.DirectionalLight>(null);

  // Explicit target object positioned at architectural core of the house
  const [target] = useState(() => {
    const obj = new THREE.Object3D();
    obj.name = 'SunLight_Target_Core';
    obj.position.set(0, 0, -5.0);
    return obj;
  });

  const shadowSize = quality.shadowMapSize;
  const enableShadows = quality.shadows;
  const bounds = config.shadowCameraBounds;

  // Crucial: OrthographicCamera.updateProjectionMatrix must be called when bounds change
  useEffect(() => {
    if (lightRef.current && lightRef.current.shadow) {
      lightRef.current.shadow.camera.updateProjectionMatrix();
      if (lightRef.current.shadow.map) {
        lightRef.current.shadow.map.dispose();
        lightRef.current.shadow.map = null;
      }
    }
  }, [bounds, shadowSize, config.position]);

  return (
    <>
      <primitive object={target} />
      <directionalLight
        ref={lightRef}
        name="SunLight_Primary"
        target={target}
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
    </>
  );
}

