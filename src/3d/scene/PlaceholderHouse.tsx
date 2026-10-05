'use client';

import React, { useEffect } from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface PlaceholderHouseProps {
  visible?: boolean;
}

/**
 * Minimal architectural placeholder massing for M1 validation.
 * Conforms strictly to real-world metric coordinates established in ARCHITECTURE_SPEC.md:
 * - World origin [0, 0, 0] at entrance door threshold
 * - Plinth foundation [36m x 1.8m x 28m] (Y: -1.8m to 0.0m)
 * - Ground floor volume [24m x 3.4m x 16m] (Y: 0.0m to 3.4m)
 * - Upper cantilever volume [20m x 3.6m x 14m] (Y: 3.4m to 7.0m)
 * - Pool placeholder [14m x 0.1m x 4.2m] (recessed on terrace)
 * - Entrance portal indicator [1.8m x 3.2m x 0.1m]
 *
 * Designed to be cleanly replaced by ModelLoader in Milestone M2.
 */
export function PlaceholderHouse({ visible = true }: PlaceholderHouseProps) {
  const setModelLoaded = useHouseStore((state) => state.setModelLoaded);
  const setModelError = useHouseStore((state) => state.setModelError);

  useEffect(() => {
    if (visible) {
      setModelLoaded(true);
      setModelError(null);
    }
  }, [visible, setModelLoaded, setModelError]);

  if (!visible) return null;

  return (
    <group name="PlaceholderHouse" position={[0, 0, 0]}>
      {/* 1. Terrace Foundation Plinth (Base at Y = -1.8m, Top at Y = 0.0m) */}
      <mesh position={[0, -0.9, 2.0]} receiveShadow castShadow>
        <boxGeometry args={[36.0, 1.8, 28.0]} />
        <meshStandardMaterial
          color="#ddd6c8"
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      {/* 2. Pool Water Indicator Plinth (Recessed on Terrace) */}
      <mesh position={[-4.0, 0.02, 10.0]} receiveShadow>
        <boxGeometry args={[14.0, 0.05, 4.2]} />
        <meshStandardMaterial
          color="#38a3a5"
          roughness={0.15}
          metalness={0.1}
        />
      </mesh>

      {/* 3. Ground Floor Massing Core (Y: 0.0m to 3.4m) */}
      <mesh position={[0, 1.7, -4.0]} castShadow receiveShadow>
        <boxGeometry args={[24.0, 3.4, 16.0]} />
        <meshStandardMaterial
          color="#ecebe4"
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* 4. Upper Cantilever Box Volume (Y: 3.4m to 7.0m, Projecting Forward +Z) */}
      <mesh position={[-2.0, 5.2, -1.0]} castShadow receiveShadow>
        <boxGeometry args={[20.0, 3.6, 14.0]} />
        <meshStandardMaterial
          color="#f4f4f0"
          roughness={0.75}
          metalness={0.0}
        />
      </mesh>

      {/* 5. Entrance Portal & Pivot Door Indicator ([0, 0, 0] Origin Marker) */}
      <group position={[0, 1.6, 0]}>
        {/* Frame Jambs */}
        <mesh position={[0, 0, 0]} castShadow>
          <boxGeometry args={[2.0, 3.24, 0.14]} />
          <meshStandardMaterial color="#1f1f21" roughness={0.4} metalness={0.8} />
        </mesh>
        {/* Door Leaf Indicator */}
        <mesh position={[0, 0, 0.02]} castShadow>
          <boxGeometry args={[1.8, 3.2, 0.1]} />
          <meshStandardMaterial color="#6b4423" roughness={0.45} metalness={0.0} />
        </mesh>
      </group>

      {/* 6. World Origin Reference Marker ([0, 0, 0]) */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.02, 16]} />
        <meshBasicMaterial color="#00f0ff" wireframe />
      </mesh>
    </group>
  );
}
