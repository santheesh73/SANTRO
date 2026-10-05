'use client';

import React from 'react';
import { InteriorLightingConfig } from './types';
import { LIGHT_FIXTURE_POSITIONS } from './LightingConfig';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface InteriorLightsProps {
  config: InteriorLightingConfig;
}

/**
 * SANTRO M5 — Practical Architectural Interior Lighting
 *
 * Implements subtle, believable interior illumination calibrated across key spaces:
 * - Gallery Corridor: Recessed downlights casting soft warm pools onto honed stone
 * - Glass Workspace: Clean neutral linear ceiling illumination and desk task glow
 * - Double-Height Atrium: Monolithic plinth toe-kick light and indirect ceiling coves
 * - Floating Staircase: Linear illumination grazing the 14 travertine treads
 * - Rear Vista: Gentle wash framing the double-height mountain panorama
 */
export function InteriorLights({ config }: InteriorLightsProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const isLowTier = qualityTier === 'low';

  return (
    <group name="InteriorLights">
      {/* 1. Gallery Corridor Downlights */}
      {!isLowTier && (
        <pointLight
          name="Corridor_Downlight_1"
          position={LIGHT_FIXTURE_POSITIONS.corridorDownlight1}
          intensity={config.corridorDownlightIntensity}
          color={config.corridorDownlightColor}
          distance={5.5}
          decay={2.0}
        />
      )}
      <pointLight
        name="Corridor_Downlight_2"
        position={LIGHT_FIXTURE_POSITIONS.corridorDownlight2}
        intensity={config.corridorDownlightIntensity}
        color={config.corridorDownlightColor}
        distance={6.0}
        decay={2.0}
      />
      {!isLowTier && (
        <pointLight
          name="Corridor_Downlight_3"
          position={LIGHT_FIXTURE_POSITIONS.corridorDownlight3}
          intensity={config.corridorDownlightIntensity}
          color={config.corridorDownlightColor}
          distance={5.5}
          decay={2.0}
        />
      )}

      {/* 2. Glass Engineering Workspace */}
      <pointLight
        name="Workspace_Ceiling_Linear"
        position={LIGHT_FIXTURE_POSITIONS.workspaceCeiling}
        intensity={config.workspaceLinearIntensity}
        color={config.workspaceLinearColor}
        distance={7.0}
        decay={2.0}
      />
      {!isLowTier && (
        <pointLight
          name="Workspace_Desk_Accent"
          position={LIGHT_FIXTURE_POSITIONS.workspaceDeskAccent}
          intensity={config.workspaceLinearIntensity * 0.6}
          color={config.workspaceLinearColor}
          distance={3.5}
          decay={2.0}
        />
      )}

      {/* 3. Double-Height Exhibition Atrium Ceiling Cove */}
      <pointLight
        name="Atrium_Ceiling_Cove"
        position={LIGHT_FIXTURE_POSITIONS.atriumCeilingCove}
        intensity={config.atriumCoveIntensity}
        color={config.atriumCoveColor}
        distance={14.0}
        decay={2.0}
      />

      {/* 4. Monolithic Travertine Exhibition Plinth Toe-Kick Glow */}
      <pointLight
        name="Atrium_Plinth_ToeKick"
        position={LIGHT_FIXTURE_POSITIONS.atriumPlinthToeKick}
        intensity={config.plinthToeKickIntensity}
        color={config.plinthToeKickColor}
        distance={5.0}
        decay={2.0}
      />

      {/* 5. Floating Staircase Step Grazing Light */}
      {!isLowTier && (
        <pointLight
          name="Floating_Stair_Accent"
          position={LIGHT_FIXTURE_POSITIONS.floatingStairAccent}
          intensity={config.stairAccentIntensity}
          color={config.stairAccentColor}
          distance={4.5}
          decay={2.0}
        />
      )}

      {/* 6. Rear Double-Height Glass Vista Framing Wash */}
      {!isLowTier && (
        <pointLight
          name="Atrium_Rear_Vista_Wash"
          position={LIGHT_FIXTURE_POSITIONS.atriumRearVistaWall}
          intensity={config.rearVistaIntensity}
          color={config.rearVistaColor}
          distance={9.0}
          decay={2.0}
        />
      )}
    </group>
  );
}
