'use client';

import React, { useMemo, useEffect } from 'react';
import { contactData } from '@/content/contact';
import { createDynamicCanvasTexture } from '../textures/createExhibitionTexture';

interface ContactPlinthProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function ContactPlinth({
  position = [0, 0.45, -18.5],
  rotation = [0, 0, 0],
}: ContactPlinthProps) {
  const panelTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#0F1014';
        ctx.fillRect(0, 0, width, height);

        // Header Accent Pip
        ctx.fillStyle = '#00F0FF';
        ctx.fillRect(40, 36, 8, 30);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 12px monospace';
        ctx.fillText('FINAL OBSERVATION // INITIATE DIALOGUE', 60, 55);

        // Core Statement
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 34px sans-serif';
        ctx.fillText(contactData.headline, 40, 115);

        // Subtitle / Closing statement
        ctx.fillStyle = '#C7C7CC';
        ctx.font = 'normal 15px sans-serif';
        ctx.fillText(
          'Open for software engineering opportunities, intelligent systems, and engineering collaborations.',
          40,
          152
        );

        // Divider
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(40, 175, width - 80, 1);

        // 3 Channels Cards
        const cardW = (width - 80 - 2 * 20) / 3;
        contactData.channels.forEach((ch, idx) => {
          const cx = 40 + idx * (cardW + 20);
          const cy = 205;

          ctx.fillStyle = '#181A22';
          ctx.fillRect(cx, cy, cardW, 90);
          ctx.strokeStyle = ch.isPrimary
            ? 'rgba(0, 240, 255, 0.4)'
            : 'rgba(255, 255, 255, 0.1)';
          ctx.strokeRect(cx, cy, cardW, 90);

          // Indicator pip
          ctx.fillStyle = ch.isPrimary ? '#00F0FF' : '#8E8E93';
          ctx.fillRect(cx + 16, cy + 18, 4, 14);

          ctx.fillStyle = ch.isPrimary ? '#00F0FF' : '#8E8E93';
          ctx.font = 'bold 11px monospace';
          ctx.fillText(ch.label, cx + 26, cy + 30);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 14px monospace';
          ctx.fillText(ch.value, cx + 16, cy + 62);
        });

        // Location & Copyright footer
        ctx.fillStyle = '#636366';
        ctx.font = '11px monospace';
        ctx.fillText(
          `LOCATION: ${contactData.location.toUpperCase()} • SANTRO ARCHITECTURAL 3D PORTFOLIO`,
          40,
          height - 24
        );
      },
      {
        width: 1024,
        height: 380,
        backgroundColor: '#0F1014',
        borderColor: 'rgba(255, 255, 255, 0.18)',
        borderWidth: 2,
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      panelTexture?.dispose();
    };
  }, [panelTexture]);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Low Architectural Display Tablet angled toward eye-level */}
      <group position={[0, 0.35, 0]} rotation={[-0.15, 0, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.2, 0.70, 0.06]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.88} />
        </mesh>

        {/* 2. Display Canvas */}
        {panelTexture && (
          <mesh position={[0, 0, 0.032]}>
            <planeGeometry args={[2.16, 0.66]} />
            <meshBasicMaterial map={panelTexture} toneMapped={false} />
          </mesh>
        )}

        {/* 3. Cyan Header Accent Reveal */}
        <mesh position={[0, 0.345, 0.033]}>
          <boxGeometry args={[2.14, 0.008, 0.004]} />
          <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2.2} />
        </mesh>
      </group>

      {/* 4. Subtle Base Datum Line resting on plinth surface */}
      <mesh position={[0, 0.005, 0.05]} receiveShadow>
        <boxGeometry args={[2.2, 0.01, 0.02]} />
        <meshStandardMaterial color="#1F1F21" roughness={0.25} metalness={0.9} />
      </mesh>
    </group>
  );
}
