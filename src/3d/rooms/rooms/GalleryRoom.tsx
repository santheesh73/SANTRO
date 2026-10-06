'use client';

import React, { useMemo, useEffect } from 'react';
import { createDynamicCanvasTexture } from '../textures/createExhibitionTexture';

/**
 * GalleryRoom — Selected Work Introduction & Curatorial Transition
 *
 * Sits along the central circulation corridor from Z: -3.8m to -8.0m.
 * Establishes the curatorial bridge from personal identity in the Foyer
 * into the comprehensive Project Studio and Engineering Lab.
 */
export function GalleryRoom() {
  const curatorialTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#121417';
        ctx.fillRect(0, 0, width, height);

        // Header Accent
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(36, 32, 6, 22);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 12px monospace';
        ctx.fillText('CURATORIAL OVERVIEW // ARCHITECTURAL EXHIBITION', 50, 48);

        // Section Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 30px sans-serif';
        ctx.fillText('SELECTED WORK: 2023 — 2025', 36, 96);

        // Subtitle
        ctx.fillStyle = '#C7C7CC';
        ctx.font = '14px sans-serif';
        ctx.fillText(
          'An architectural sequence of seven verified production systems across on-device AI, spatial audio, and computer vision.',
          36,
          128
        );

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(36, 146, width - 72, 1);

        // 7 Projects Preview Lineup
        const previews = [
          { name: 'ORION', tag: 'ON-DEVICE AI', tier: 'PRIMARY' },
          { name: 'HEARTTUNE', tag: 'AUDIO ML PWA', tier: 'SELECTED' },
          { name: 'NISF', tag: 'VECTOR CRITIQUE', tier: 'SELECTED' },
          { name: 'AHAL AI', tag: 'CODE INTELLIGENCE', tier: 'SELECTED' },
          { name: 'PRYSM', tag: 'GPU SHADERS', tier: 'SUPPORTING' },
          { name: 'BHOOMI', tag: 'SIH AGRI ML', tier: 'SUPPORTING' },
          { name: 'MINCHAL', tag: 'ENERGY OCR', tier: 'SUPPORTING' },
        ];

        const cardW = (width - 72 - 6 * 12) / 7;
        previews.forEach((p, idx) => {
          const cx = 36 + idx * (cardW + 12);
          const cy = 168;

          ctx.fillStyle = '#1A1D24';
          ctx.fillRect(cx, cy, cardW, 110);
          ctx.strokeStyle = p.tier === 'PRIMARY'
            ? 'rgba(0, 240, 255, 0.5)'
            : 'rgba(255, 255, 255, 0.08)';
          ctx.strokeRect(cx, cy, cardW, 110);

          // Tier indicator
          ctx.fillStyle = p.tier === 'PRIMARY' ? '#00F0FF' : '#8E8E93';
          ctx.font = 'bold 10px monospace';
          ctx.fillText(p.tier, cx + 8, cy + 22);

          // Project name
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(p.name, cx + 8, cy + 52);

          // Tag
          ctx.fillStyle = '#A1A1A6';
          ctx.font = '10px monospace';
          ctx.fillText(p.tag, cx + 8, cy + 86);
        });
      },
      {
        width: 1024,
        height: 320,
        backgroundColor: '#121417',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 2,
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      curatorialTexture?.dispose();
    };
  }, [curatorialTexture]);

  return (
    <group name="Room_Gallery">
      {/* Wall-Mounted Gallery Introduction Plaque on East Corridor Wall (X: +1.52, Z: -5.8) */}
      <group position={[1.52, 1.85, -5.8]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.2, 1.0, 0.04]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.88} />
        </mesh>

        {curatorialTexture && (
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[3.16, 0.96]} />
            <meshBasicMaterial map={curatorialTexture} toneMapped={false} />
          </mesh>
        )}

        {/* Linear LED Guide at top */}
        <mesh position={[0, 0.49, 0.022]}>
          <boxGeometry args={[3.14, 0.008, 0.004]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
        </mesh>
      </group>
    </group>
  );
}
