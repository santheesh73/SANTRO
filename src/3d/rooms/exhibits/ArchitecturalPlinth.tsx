'use client';

import React from 'react';

interface ArchitecturalPlinthProps {
  position?: [number, number, number];
  size?: [number, number, number]; // width, height, depth
  materialColor?: string;
  roughness?: number;
  metalness?: number;
  toeKickHeight?: number;
  toeKickInset?: number;
  showAccentGlow?: boolean;
  accentColor?: string;
  children?: React.ReactNode;
}

/**
 * Reusable monolithic architectural plinth with toe-kick reveal.
 * Matches M3/M4 architectural joinery standards (travertine/concrete body with dark metal recessed base).
 */
export function ArchitecturalPlinth({
  position = [0, 0, 0],
  size = [1.6, 0.7, 0.8],
  materialColor = '#DDD6C8', // MAT_Stone / Travertine
  roughness = 0.35,
  metalness = 0.02,
  toeKickHeight = 0.08,
  toeKickInset = 0.06,
  showAccentGlow = false,
  accentColor = '#00F0FF',
  children,
}: ArchitecturalPlinthProps) {
  const [w, h, d] = size;
  const bodyHeight = h - toeKickHeight;
  const toeKickWidth = Math.max(0.1, w - toeKickInset * 2);
  const toeKickDepth = Math.max(0.1, d - toeKickInset * 2);

  return (
    <group position={position}>
      {/* 1. Recessed Baseboard / Toe-Kick */}
      <mesh position={[0, toeKickHeight / 2, 0]} receiveShadow>
        <boxGeometry args={[toeKickWidth, toeKickHeight, toeKickDepth]} />
        <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.88} />
      </mesh>

      {/* 2. Monolithic Stone Body */}
      <mesh
        position={[0, toeKickHeight + bodyHeight / 2, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[w, bodyHeight, d]} />
        <meshStandardMaterial
          color={materialColor}
          roughness={roughness}
          metalness={metalness}
        />
      </mesh>

      {/* 3. Optional Subtle Toe-Kick Ambient Accent Light Line */}
      {showAccentGlow && (
        <mesh position={[0, toeKickHeight, d / 2 - 0.01]}>
          <boxGeometry args={[toeKickWidth * 0.95, 0.015, 0.01]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={1.8}
            roughness={0.2}
          />
        </mesh>
      )}

      {/* 4. Child exhibition elements anchored atop the plinth */}
      <group position={[0, h, 0]}>{children}</group>
    </group>
  );
}
