'use client';

import React, { Suspense } from 'react';
import { PerspectiveCamera } from '@/3d/camera/PerspectiveCamera';
import { CameraController } from '@/3d/camera/CameraController';
import { SceneLighting } from '@/3d/lighting/SceneLighting';
import { Atmosphere } from '@/3d/environment/Atmosphere';
import { PlaceholderHouse } from '@/3d/scene/PlaceholderHouse';
import { ModelLoader } from '@/3d/loaders/ModelLoader';

interface ArchitecturalSceneProps {
  modelUrl?: string | null;
  enableControls?: boolean;
}

/**
 * Architectural 3D Scene Root.
 * Orchestrates camera, lighting, atmosphere, and architectural geometry.
 * Gracefully renders either an external GLB model via ModelLoader or the procedural PlaceholderHouse.
 */
export function ArchitecturalScene({
  modelUrl = null,
  enableControls = true,
}: ArchitecturalSceneProps) {
  return (
    <>
      {/* 1. Architectural Perspective Camera */}
      <PerspectiveCamera />

      {/* 2. Damped Inspection Camera Controls */}
      <CameraController enableControls={enableControls} />

      {/* 3. Atmospheric Sky & Ground Horizon */}
      <Atmosphere />

      {/* 4. Directional Sun & Ambient Lighting */}
      <SceneLighting />

      {/* 5. Architectural Geometry: External GLB Model or Metric Placeholder */}
      <Suspense fallback={<PlaceholderHouse />}>
        {modelUrl ? (
          <ModelLoader
            url={modelUrl}
            fallback={<PlaceholderHouse />}
          />
        ) : (
          <PlaceholderHouse />
        )}
      </Suspense>
    </>
  );
}
