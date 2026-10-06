'use client';

import React, { useMemo, useEffect } from 'react';
import { profileData } from '@/content/profile';
import { createDynamicCanvasTexture } from '../textures/createExhibitionTexture';

/**
 * FoyerRoom — About & Personal Identity
 *
 * Sits at Z: 0.0 to -3.8m.
 * Frames the 24-batten fluted walnut wall on the East side (X: +1.6m)
 * and the floating staircase.
 * Features architectural wall typography and monolithic profile plinth.
 */
export function FoyerRoom() {
  // Crisp wall plaque texture for profile statement
  const profilePlaqueTexture = useMemo(() => {
    return createDynamicCanvasTexture(
      (ctx, width, height) => {
        ctx.fillStyle = '#141416';
        ctx.fillRect(0, 0, width, height);

        // Subtle accent bar
        ctx.fillStyle = '#DDD6C8';
        ctx.fillRect(36, 32, 6, 24);

        // Subheader
        ctx.fillStyle = '#8E8E93';
        ctx.font = '600 12px monospace';
        ctx.fillText('ARCHITECTURAL PORTFOLIO // IDENTITY', 52, 48);

        // Name
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 36px sans-serif';
        ctx.fillText(profileData.name, 36, 102);

        // Subheadline
        ctx.fillStyle = '#DDD6C8';
        ctx.font = '500 16px sans-serif';
        ctx.fillText(profileData.foyerSubheadline, 36, 134);

        // Divider
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.strokeRect(36, 155, width - 72, 1);

        // Statement
        ctx.fillStyle = '#C7C7CC';
        ctx.font = 'normal 15px sans-serif';
        const statement = profileData.foyerStatement;
        ctx.fillText(statement, 36, 190);

        // Disciplines 3-Column
        const disciplines = profileData.disciplines;
        disciplines.forEach((d, i) => {
          const colX = 36 + i * 240;
          ctx.fillStyle = '#1E2026';
          ctx.fillRect(colX, 230, 220, 44);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
          ctx.strokeRect(colX, 230, 220, 44);

          ctx.fillStyle = '#00F0FF';
          ctx.fillRect(colX + 12, 244, 4, 16);

          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 12px monospace';
          ctx.fillText(d.toUpperCase(), colX + 24, 257);
        });
      },
      {
        width: 800,
        height: 320,
        backgroundColor: '#141416',
        borderColor: 'rgba(255, 255, 255, 0.15)',
        borderWidth: 2,
      }
    );
  }, []);

  useEffect(() => {
    return () => {
      profilePlaqueTexture?.dispose();
    };
  }, [profilePlaqueTexture]);

  return (
    <group name="Room_Foyer">
      {/* 1. Wall-Mounted Profile Display Plaque on Walnut Fluted Wall (X: +1.46, Z: -3.5, facing West) */}
      <group position={[1.46, 1.85, -3.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[2.4, 0.95, 0.04]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.88} />
        </mesh>

        {profilePlaqueTexture && (
          <mesh position={[0, 0, 0.021]}>
            <planeGeometry args={[2.36, 0.91]} />
            <meshBasicMaterial map={profilePlaqueTexture} toneMapped={false} />
          </mesh>
        )}

        {/* Subtle Warm Brass Accent Reveal Frame */}
        <mesh position={[0, 0.47, 0.022]}>
          <boxGeometry args={[2.34, 0.008, 0.004]} />
          <meshStandardMaterial color="#DDD6C8" roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* 2. Low Stone Identity Totem / Console Plinth near entry */}
      <group position={[0.9, 0.0, -1.2]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.5, 0.7, 0.5]} />
          <meshStandardMaterial color="#DDD6C8" roughness={0.38} metalness={0.02} />
        </mesh>
        <mesh position={[0, 0.04, 0]} receiveShadow>
          <boxGeometry args={[0.42, 0.08, 0.42]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.3} metalness={0.85} />
        </mesh>
      </group>
    </group>
  );
}
