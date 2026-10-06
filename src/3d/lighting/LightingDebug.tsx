'use client';

import React from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { LIGHT_FIXTURE_POSITIONS } from './LightingConfig';

/**
 * SANTRO M5 — Architectural Lighting Developer Debug System
 *
 * Provides visual inspection and developer aids for lighting validation:
 * - Visualizes spatial luminaire positions (entrance, interior, pool, soffit)
 * - Highlights active debug solo modes (SUN, ENV, INT, ALL)
 * - Zero performance overhead in production 'all' mode
 */
export function LightingDebug() {
  const lightingDebugSolo = useHouseStore((state) => state.lightingDebugSolo);

  // When viewing composite scene ('all'), keep view completely clean
  if (lightingDebugSolo === 'all') {
    return null;
  }

  return (
    <group name="LightingDebug_Aids">
      {/* Visual wireframe markers for fixtures when isolating interior/architectural lights */}
      {lightingDebugSolo === 'interior_only' && (
        <group name="Interior_Fixture_Markers">
          {Object.entries(LIGHT_FIXTURE_POSITIONS).map(([name, pos]) => (
            <mesh key={name} position={pos}>
              <sphereGeometry args={[0.08, 8, 8]} />
              <meshBasicMaterial
                color={name.includes('pool') ? '#00f0ff' : '#ffaa00'}
                wireframe
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}
