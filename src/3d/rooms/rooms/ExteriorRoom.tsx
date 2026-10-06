'use client';

import React, { useMemo, useEffect } from 'react';
import { createDynamicCanvasTexture } from '../textures/createExhibitionTexture';

/**
 * ExteriorRoom — Exterior Grounds & Architectural Identity Prelude
 *
 * Sits across the front terrace and infinity pool approach (Z: +8.0m to +28.0m).
 * Establishes the architectural premise: The architecture presents the portfolio.
 */
export function ExteriorRoom() {
  const identityTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#141416';
        ctx.fillRect(0, 0, width, height);

        // Cyan Accent pip
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(32, 28, 6, 22);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 12px monospace';
        ctx.fillText('SPATIAL 3D PORTFOLIO // 2025', 48, 44);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('SANTRO : ARCHITECTURAL HOUSE', 32, 92);

        ctx.fillStyle = '#DDD6C8';
        ctx.font = '14px sans-serif';
        ctx.fillText('Santheesh S • AI Software Engineer & Full-Stack Developer', 32, 122);

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(32, 140, width - 64, 1);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '11px monospace';
        ctx.fillText('SCROLL OR DRAG TO EXPLORE THE SPATIAL JOURNEY →', 32, 172);
      },
      {
        width: 640,
        height: 220,
        backgroundColor: '#141416',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 2,
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      identityTexture?.dispose();
    };
  }, [identityTexture]);

  return (
    <group name="Room_Exterior">
      {/* Identity Plinth on Terrace Deck near Pool Weir (X: +2.8m, Z: +16.0m) */}
      <group position={[2.8, 0.0, 16.0]} rotation={[0, -0.25, 0]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.4, 0.7, 0.4]} />
          <meshStandardMaterial color="#DDD6C8" roughness={0.38} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <boxGeometry args={[1.3, 0.08, 0.32]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.85} />
        </mesh>

        {identityTexture && (
          <mesh position={[0, 0.42, 0.202]}>
            <planeGeometry args={[1.32, 0.45]} />
            <meshBasicMaterial map={identityTexture} toneMapped={false} />
          </mesh>
        )}
      </group>
    </group>
  );
}
