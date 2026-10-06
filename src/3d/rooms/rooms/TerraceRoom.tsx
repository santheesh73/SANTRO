'use client';

import React from 'react';

/**
 * TerraceRoom — Rear Observation Terrace & Contemplative Horizon
 *
 * Sits beyond the double-height rear glass curtain wall (Z: -21.5m to -30.0m).
 * A pure architectural breathing space allowing the house, sky, and mountains
 * to form the contemplative final impression.
 */
export function TerraceRoom() {
  return (
    <group name="Room_Terrace">
      {/* Subtle architectural observation datum marker embedded in terrace floor */}
      <mesh position={[0.0, 0.015, -24.5]} receiveShadow>
        <boxGeometry args={[4.8, 0.01, 0.08]} />
        <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.9} />
      </mesh>
    </group>
  );
}
