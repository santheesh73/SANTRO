'use client';

import React from 'react';
import * as THREE from 'three';

interface AtmosphereProps {
  fogColor?: string;
  fogDensity?: number;
  skyColor?: string;
}

/**
 * Architectural atmospheric foundation for M1 validation.
 * Sets background color, soft exponential horizon fog, and distant ground horizon plane.
 * Ground plane is calibrated to Y = -1.8m, grounding the foundation plinth base.
 */
export function Atmosphere({
  fogColor = '#e2e7ec',
  fogDensity = 0.008,
  skyColor = '#d9e2ec',
}: AtmosphereProps) {
  return (
    <group name="Atmosphere">
      <color attach="background" args={[skyColor]} />
      <fogExp2 attach="fog" args={[fogColor, fogDensity]} />

      {/* Distant Ground Horizon Disc (at site grade Y = -1.8m beneath foundation plinth) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, 0]}
        receiveShadow
      >
        <circleGeometry args={[180, 64]} />
        <meshStandardMaterial
          color="#d5d0c7"
          roughness={0.95}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
