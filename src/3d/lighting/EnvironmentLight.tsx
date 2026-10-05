'use client';

import React from 'react';
import { EnvironmentLightConfig } from './types';

interface EnvironmentLightProps {
  config: EnvironmentLightConfig;
}

/**
 * SANTRO M5 — Environmental Fill Light
 *
 * Balances ambient sky radiance and ground travertine reflection:
 * - HemisphereLight creates natural vertical diffuse color gradient
 * - AmbientLight provides soft floor fill preventing crushed architectural shadows
 * - Zero artificial game-like saturation
 */
export function EnvironmentLight({ config }: EnvironmentLightProps) {
  return (
    <group name="EnvironmentLight">
      {/* Sky Azure to Travertine Ground Hemisphere */}
      <hemisphereLight
        args={[config.hemiSkyColor, config.hemiGroundColor, config.hemiIntensity]}
        position={[0, 50, 0]}
      />

      {/* Subtle Base Ambient Fill */}
      <ambientLight
        color={config.ambientColor}
        intensity={config.ambientIntensity}
      />
    </group>
  );
}
