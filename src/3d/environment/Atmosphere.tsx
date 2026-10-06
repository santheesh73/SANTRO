'use client';

import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { LIGHTING_PRESETS } from '@/3d/lighting/LightingPresets';

interface AtmosphereProps {
  fogColor?: string;
  fogDensity?: number;
  skyColor?: string;
  horizonGroundColor?: string;
  groundRoughness?: number;
}

/**
 * SANTRO M5 — Architectural Atmospheric Environment
 *
 * Synchronizes background sky color, soft exponential horizon fog, and distant
 * ground horizon disc with the active Time-of-Day lighting preset:
 * - DAY: Soft neutral azure sky with gentle atmospheric depth
 * - GOLDEN_HOUR: Warm ivory-gold horizon scatter with soft raking haze
 * - DUSK: Twilight indigo background with warm mauve horizon glow
 * - INTERIOR: Calm evening exterior envelope focusing spatial focus inside
 */
export function Atmosphere(props: AtmosphereProps) {
  const { scene } = useThree();
  const timeOfDay = useHouseStore((state) => state.timeOfDay);
  const preset = LIGHTING_PRESETS[timeOfDay] ?? LIGHTING_PRESETS.golden_hour;
  const atmosConfig = preset.atmosphere;

  const activeSky = props.skyColor ?? atmosConfig.skyColor;
  const activeFogColor = props.fogColor ?? atmosConfig.fogColor;
  const activeFogDensity = props.fogDensity ?? atmosConfig.fogDensity;
  const activeGroundColor = props.horizonGroundColor ?? atmosConfig.horizonGroundColor;
  const activeGroundRoughness = props.groundRoughness ?? atmosConfig.groundRoughness;

  // Direct scene synchronization ensuring immediate response across all preset changes
  useEffect(() => {
    if (scene) {
      scene.background = new THREE.Color(activeSky);
      scene.fog = new THREE.FogExp2(activeFogColor, activeFogDensity);
    }
  }, [scene, activeSky, activeFogColor, activeFogDensity]);

  return (
    <group name="Atmosphere">
      {/* Dynamic Sky Background Color */}
      <color attach="background" args={[activeSky]} key={activeSky} />

      {/* Subtle Depth Atmospheric Horizon Fog */}
      <fogExp2 attach="fog" args={[activeFogColor, activeFogDensity]} key={`${activeFogColor}_${activeFogDensity}`} />

      {/* Distant Ground Horizon Disc (at site grade Y = -1.8m beneath foundation plinth) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.8, 0]}
        receiveShadow
      >
        <circleGeometry args={[180, 64]} />
        <meshStandardMaterial
          color={activeGroundColor}
          roughness={activeGroundRoughness}
          metalness={0.0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
