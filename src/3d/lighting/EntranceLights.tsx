'use client';

import React, { useState } from 'react';
import * as THREE from 'three';
import { EntranceLightingConfig } from './types';
import { LIGHT_FIXTURE_POSITIONS } from './LightingConfig';

interface EntranceLightsProps {
  config: EntranceLightingConfig;
}

/**
 * SANTRO M5 — Entrance Portal Architectural Lighting
 *
 * Establishes the primary transition from exterior landscape into interior foyer:
 * - Soffit downlight washes the horizontal walnut planks of the pivot door
 * - Downlight target explicitly bound and registered in the scene graph
 * - Integrated vertical cyan LED channel on the door pull illuminates threshold
 * - Subtle ground bounce highlights the honed cream limestone entrance slab
 */
export function EntranceLights({ config }: EntranceLightsProps) {
  const [soffitTarget] = useState(() => {
    const obj = new THREE.Object3D();
    obj.name = 'Entrance_Soffit_Target';
    obj.position.set(0.15, 0.0, 0.35);
    return obj;
  });

  return (
    <group name="EntranceLights">
      {/* 1. Recessed Soffit Downlight above Pivot Door */}
      <primitive object={soffitTarget} />
      <spotLight
        name="Entrance_Soffit_Downlight"
        position={LIGHT_FIXTURE_POSITIONS.entranceSoffitDownlight}
        target={soffitTarget}
        intensity={config.soffitDownlightIntensity}
        color={config.soffitDownlightColor}
        angle={Math.PI / 3.5}
        penumbra={0.75}
        distance={6.5}
        decay={2.0}
      />

      {/* 2. Pivot Door Pull Handle Cyan LED Channel Glow */}
      <pointLight
        name="Entrance_Door_Cyan_LED"
        position={LIGHT_FIXTURE_POSITIONS.entranceDoorLED}
        intensity={config.doorLEDIntensity}
        color={config.doorLEDColor}
        distance={2.2}
        decay={2.0}
      />

      {/* 3. Travertine Threshold Subtle Warm Bounce */}
      <pointLight
        name="Entrance_Threshold_Bounce"
        position={LIGHT_FIXTURE_POSITIONS.entranceThresholdBounce}
        intensity={config.thresholdBounceIntensity}
        color={config.thresholdBounceColor}
        distance={3.0}
        decay={2.0}
      />
    </group>
  );
}

