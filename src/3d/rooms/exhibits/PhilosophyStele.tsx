'use client';

import React, { useMemo, useEffect } from 'react';
import { PhilosophyPillar } from '@/content/types';
import { createDynamicCanvasTexture, drawWrappedText } from '../textures/createExhibitionTexture';

interface PhilosophySteleProps {
  pillar: PhilosophyPillar;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function PhilosophyStele({
  pillar,
  position,
  rotation = [0, 0, 0],
}: PhilosophySteleProps) {
  const steleTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#141416';
        ctx.fillRect(0, 0, width, height);

        // Keyword Accent Pip
        ctx.fillStyle = '#E5E5EA';
        ctx.fillRect(36, 32, 6, 28);

        // Keyword Header
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px monospace';
        ctx.fillText(pillar.keyword, 52, 58);

        // Divider Hairline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.strokeRect(36, 80, width - 72, 1);

        // Principle Core Statement
        ctx.fillStyle = '#F5F5F7';
        ctx.font = 'bold 20px sans-serif';
        const endPrincipleY = drawWrappedText(
          ctx,
          pillar.principle,
          36,
          118,
          width - 72,
          28,
          2
        );

        // Rationale / Explanation
        ctx.fillStyle = '#A1A1A6';
        ctx.font = 'normal 15px sans-serif';
        drawWrappedText(
          ctx,
          pillar.rationale,
          36,
          endPrincipleY + 36,
          width - 72,
          24,
          4
        );
      },
      {
        width: 640,
        height: 480,
        backgroundColor: '#141416',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 2,
      }
    );
  }, [pillar]);

  useEffect(() => {
    return () => {
      steleTexture?.dispose();
    };
  }, [steleTexture]);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Monolithic Travertine Pillar Stele */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.75, 1.5, 0.12]} />
        <meshStandardMaterial color="#DDD6C8" roughness={0.4} metalness={0.02} />
      </mesh>

      {/* 2. Recessed Hairline Dark Display Face */}
      <mesh position={[0, 0.75, 0.055]} castShadow receiveShadow>
        <boxGeometry args={[0.68, 1.38, 0.02]} />
        <meshStandardMaterial color="#1F1F21" roughness={0.25} metalness={0.88} />
      </mesh>

      {/* 3. High-Res Canvas Texture */}
      {steleTexture && (
        <mesh position={[0, 0.75, 0.067]}>
          <planeGeometry args={[0.66, 1.35]} />
          <meshBasicMaterial map={steleTexture} toneMapped={false} />
        </mesh>
      )}

      {/* 4. Toe-kick recessed shadow plinth */}
      <mesh position={[0, 0.03, 0]} receiveShadow>
        <boxGeometry args={[0.68, 0.06, 0.08]} />
        <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.85} />
      </mesh>
    </group>
  );
}
