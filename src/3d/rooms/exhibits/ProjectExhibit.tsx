'use client';

import React, { useMemo, useEffect } from 'react';
import { PortfolioProject } from '@/content/types';
import { ArchitecturalPlinth } from './ArchitecturalPlinth';
import { createDynamicCanvasTexture, drawWrappedText } from '../textures/createExhibitionTexture';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface ProjectExhibitProps {
  project: PortfolioProject;
  position: [number, number, number];
  rotation?: [number, number, number];
  variant?: 'featured' | 'standard' | 'compact';
}

export function ProjectExhibit({
  project,
  position,
  rotation = [0, 0, 0],
  variant = project.variant || 'standard',
}: ProjectExhibitProps) {
  const openProjectModal = useHouseStore((state) => state.openProjectModal);

  // Dimensions based on hierarchy variant
  const dims = useMemo(() => {
    switch (variant) {
      case 'featured':
        return {
          plinthSize: [2.4, 0.55, 1.0] as [number, number, number],
          panelWidth: 2.1,
          panelHeight: 1.45,
          panelThickness: 0.06,
          texWidth: 1024,
          texHeight: 700,
        };
      case 'compact':
        return {
          plinthSize: [1.3, 0.50, 0.7] as [number, number, number],
          panelWidth: 1.15,
          panelHeight: 0.95,
          panelThickness: 0.04,
          texWidth: 768,
          texHeight: 600,
        };
      case 'standard':
      default:
        return {
          plinthSize: [1.7, 0.55, 0.8] as [number, number, number],
          panelWidth: 1.55,
          panelHeight: 1.15,
          panelThickness: 0.05,
          texWidth: 896,
          texHeight: 640,
        };
    }
  }, [variant]);

  // Generate crisp procedural CanvasTexture for the display panel
  const displayTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        const isFeatured = variant === 'featured';

        // 1. Header Banner & Hierarchy Tag
        ctx.fillStyle = project.accentColor;
        ctx.fillRect(40, 36, isFeatured ? 10 : 8, isFeatured ? 36 : 28);

        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 13px monospace';
        ctx.fillText(
          `${project.year} • ${project.category.toUpperCase()} • ${project.role.toUpperCase()}`,
          60,
          56
        );

        // 2. Project Title
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${isFeatured ? '40px' : '32px'} sans-serif`;
        ctx.fillText(project.name, 60, isFeatured ? 104 : 96);

        // 3. Subtitle
        ctx.fillStyle = project.accentColor;
        ctx.font = `500 ${isFeatured ? '18px' : '16px'} sans-serif`;
        ctx.fillText(project.subtitle, 60, isFeatured ? 134 : 124);

        // Divider
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, isFeatured ? 155 : 142);
        ctx.lineTo(width - 40, isFeatured ? 155 : 142);
        ctx.stroke();

        // 4. Short Description
        ctx.fillStyle = '#C7C7CC';
        ctx.font = `normal ${isFeatured ? '16px' : '14px'} sans-serif`;
        const descY = isFeatured ? 185 : 170;
        const lineH = isFeatured ? 26 : 22;
        const endDescY = drawWrappedText(
          ctx,
          project.shortDescription,
          40,
          descY,
          width - 80,
          lineH,
          3
        );

        // 5. Metrics Cards (Horizontal row)
        const metricsY = Math.max(endDescY + 30, isFeatured ? 280 : 250);
        const cardWidth = (width - 80 - (project.metrics.length - 1) * 16) / project.metrics.length;
        const cardHeight = isFeatured ? 84 : 72;

        project.metrics.forEach((m, idx) => {
          const cardX = 40 + idx * (cardWidth + 16);
          // Card Box
          ctx.fillStyle = '#181A20';
          ctx.fillRect(cardX, metricsY, cardWidth, cardHeight);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
          ctx.strokeRect(cardX, metricsY, cardWidth, cardHeight);

          // Metric Value
          ctx.fillStyle = '#FFFFFF';
          ctx.font = `bold ${isFeatured ? '22px' : '18px'} monospace`;
          ctx.fillText(m.value, cardX + 16, metricsY + (isFeatured ? 36 : 30));

          // Metric Label
          ctx.fillStyle = '#8E8E93';
          ctx.font = '500 12px sans-serif';
          ctx.fillText(m.label.toUpperCase(), cardX + 16, metricsY + (isFeatured ? 62 : 54));
        });

        // 6. Technology Chips (Bottom Area)
        const techY = metricsY + cardHeight + 34;
        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 12px monospace';
        ctx.fillText('STACK //', 40, techY);

        let chipX = 110;
        ctx.font = '500 12px monospace';
        project.technologies.forEach((tech) => {
          const badgeText = tech;
          const textWidth = ctx.measureText(badgeText).width;
          const badgeWidth = textWidth + 18;

          if (chipX + badgeWidth > width - 40) return; // wrap guard

          ctx.fillStyle = '#22252D';
          ctx.fillRect(chipX, techY - 14, badgeWidth, 20);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
          ctx.strokeRect(chipX, techY - 14, badgeWidth, 20);

          ctx.fillStyle = '#E5E5EA';
          ctx.fillText(badgeText, chipX + 9, techY);

          chipX += badgeWidth + 8;
        });

        // Subtle interactive hint at bottom right
        ctx.fillStyle = '#636366';
        ctx.font = '11px monospace';
        ctx.fillText('CLICK TO INSPECT ARTIFACT', width - 210, height - 20);
      },
      {
        width: dims.texWidth,
        height: dims.texHeight,
        backgroundColor: '#0F1014',
        borderColor: 'rgba(255, 255, 255, 0.16)',
        borderWidth: 2,
      }
    );
  }, [project, variant, dims]);

  // Texture cleanup
  useEffect(() => {
    return () => {
      displayTexture?.dispose();
    };
  }, [displayTexture]);

  return (
    <group position={position} rotation={rotation}>
      {/* 1. Base Monolithic Plinth */}
      <ArchitecturalPlinth
        size={dims.plinthSize}
        materialColor="#DDD6C8"
        showAccentGlow={variant === 'featured'}
        accentColor={project.accentColor}
      >
        {/* 2. Vertical Exhibition Display Stele */}
        <group position={[0, dims.panelHeight / 2 + 0.04, 0]}>
          {/* Display Body / Housing */}
          <mesh
            castShadow
            receiveShadow
            onClick={(e) => {
              e.stopPropagation();
              openProjectModal(project.id);
            }}
          >
            <boxGeometry args={[dims.panelWidth, dims.panelHeight, dims.panelThickness]} />
            <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.88} />
          </mesh>

          {/* Front High-Res Canvas Screen */}
          {displayTexture && (
            <mesh position={[0, 0, dims.panelThickness / 2 + 0.002]}>
              <planeGeometry args={[dims.panelWidth * 0.98, dims.panelHeight * 0.98]} />
              <meshBasicMaterial map={displayTexture} toneMapped={false} />
            </mesh>
          )}

          {/* Top Hairline LED Accent Strip */}
          <mesh position={[0, dims.panelHeight / 2 - 0.005, dims.panelThickness / 2 + 0.001]}>
            <boxGeometry args={[dims.panelWidth * 0.95, 0.01, 0.005]} />
            <meshStandardMaterial
              color={project.accentColor}
              emissive={project.accentColor}
              emissiveIntensity={2.0}
              roughness={0.1}
            />
          </mesh>
        </group>
      </ArchitecturalPlinth>
    </group>
  );
}
