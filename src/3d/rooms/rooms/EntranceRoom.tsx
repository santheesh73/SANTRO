'use client';

import React from 'react';

/**
 * EntranceRoom — Spatial Portal & Door Threshold
 *
 * Sits from Z: +4.0m to 0.0m leading up to the 9-plank walnut pivot door.
 * Features an integrated travertine threshold indicator band and entrance portal framing.
 */
export function EntranceRoom() {
  return (
    <group name="Room_Entrance">
      {/* Threshold Floor Inset Datum Line (Z: +0.2m) */}
      <mesh position={[0.0, 0.015, 0.2]} receiveShadow>
        <boxGeometry args={[1.96, 0.01, 0.04]} />
        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.2} />
      </mesh>
    </group>
  );
}
