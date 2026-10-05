'use client';

import React, { Suspense } from 'react';
import { PerspectiveCamera } from '@/3d/camera/PerspectiveCamera';
import { CameraController } from '@/3d/camera/CameraController';
import { SceneLighting } from '@/3d/lighting/SceneLighting';
import { Atmosphere } from '@/3d/environment/Atmosphere';
import { PlaceholderHouse } from '@/3d/scene/PlaceholderHouse';
import { ModelLoader } from '@/3d/loaders/ModelLoader';
import { getDefaultHouseModelUrl } from '@/3d/assets/config';

interface ArchitecturalSceneProps {
  modelUrl?: string | null;
  enableControls?: boolean;
}

/**
 * Architectural 3D Scene Root.
 * Orchestrates camera, lighting, atmosphere, and architectural geometry.
 * Loads the master architectural model 'the_portfolio_house' via ModelLoader,
 * with graceful fallback to the procedural PlaceholderHouse.
 */
export function ArchitecturalScene({
  modelUrl = getDefaultHouseModelUrl(),
  enableControls = true,
}: ArchitecturalSceneProps) {
  const resolvedUrl = modelUrl ?? getDefaultHouseModelUrl();

  return (
    <>
      {/* 1. Architectural Perspective Camera */}
      <PerspectiveCamera />

      {/* 2. Damped Inspection Camera Controls with Reference View Transitions */}
      <CameraController enableControls={enableControls} />

      {/* 3. Atmospheric Sky & Ground Horizon */}
      <Atmosphere />

      {/* 4. Directional Sun & Ambient Lighting */}
      <SceneLighting />

      {/* 5. Architectural Geometry: Master Reconstructed House Model or Fallback */}
      <Suspense fallback={<PlaceholderHouse />}>
        {resolvedUrl ? (
          <ModelLoader
            url={resolvedUrl}
            fallback={<PlaceholderHouse />}
          />
        ) : (
          <PlaceholderHouse />
        )}
      </Suspense>
    </>
  );
}
