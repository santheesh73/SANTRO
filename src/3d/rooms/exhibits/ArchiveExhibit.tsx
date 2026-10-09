'use client';

import React, { useMemo, useEffect } from 'react';
import { ArchiveRecord } from '@/content/types';
import { ArchitecturalPlinth } from './ArchitecturalPlinth';
import { createDynamicCanvasTexture, drawWrappedText } from '../textures/createExhibitionTexture';

interface ArchiveExhibitProps {
  item: ArchiveRecord;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export function ArchiveExhibit({
  item,
  position,
  rotation = [0, 0, 0],
}: ArchiveExhibitProps) {
  const plaqueTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#121418';
        ctx.fillRect(0, 0, width, height);

        // Header Pip / Gold Accent for Milestones
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(36, 30, 8, 24);

        ctx.fillStyle = '#8E8E93';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`${item.year} // ${item.organization.toUpperCase()}`, 54, 46);

        // Award / Recognition Badge
        if (item.award) {
          ctx.fillStyle = '#F59E0B';
          ctx.font = 'bold 13px sans-serif';
          ctx.fillText(item.award.toUpperCase(), 36, 88);
        }

        // Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 22px sans-serif';
        const titleY = item.award ? 122 : 98;
        const endTitleY = drawWrappedText(ctx, item.title, 36, titleY, width - 72, 28, 2);

        // Divider Hairline
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(36, endTitleY + 16, width - 72, 1);

        // Description
        ctx.fillStyle = '#C7C7CC';
        ctx.font = 'normal 14px sans-serif';
        const endDescY = drawWrappedText(
          ctx,
          item.description,
          36,
          endTitleY + 44,
          width - 72,
          22,
          3
        );

        // Proof Metric Box (if present)
        if (item.metric) {
          const metricY = Math.max(endDescY + 24, height - 76);
          ctx.fillStyle = '#1C2028';
          ctx.fillRect(36, metricY, width - 72, 44);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
          ctx.strokeRect(36, metricY, width - 72, 44);

          ctx.fillStyle = '#8E8E93';
          ctx.font = '10px monospace';
          ctx.fillText('VERIFIED RECORD //', 50, metricY + 18);

          ctx.fillStyle = '#F59E0B';
          ctx.font = 'bold 14px monospace';
          ctx.fillText(item.metric, 50, metricY + 36);
        }
      },
      {
        width: 768,
        height: 480,
        backgroundColor: '#121418',
        borderColor: 'rgba(245, 158, 11, 0.25)',
        borderWidth: 2,
      }
    );
  }, [item]);

  useEffect(() => {
    return () => {
      plaqueTexture?.dispose();
    };
  }, [plaqueTexture]);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Low Travertine Base Plinth */}
      <ArchitecturalPlinth
        size={[1.1, 0.50, 0.55]}
        materialColor="#DDD6C8"
        showAccentGlow={false}
      >
        {/* 2. Angled Documentary Tablet / Stele */}
        <group position={[0, 0.35, 0]} rotation={[-0.2, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.95, 0.65, 0.04]} />
            <meshStandardMaterial color="#1F1F21" roughness={0.32} metalness={0.85} />
          </mesh>

          {plaqueTexture && (
            <mesh position={[0, 0, 0.021]}>
              <planeGeometry args={[0.92, 0.62]} />
              <meshBasicMaterial map={plaqueTexture} toneMapped={false} />
            </mesh>
          )}

          {/* Warm Amber Indicator Border */}
          <mesh position={[0, 0.315, 0.022]}>
            <boxGeometry args={[0.90, 0.006, 0.004]} />
            <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.5} />
          </mesh>
        </group>
      </ArchitecturalPlinth>
    </group>
  );
}
