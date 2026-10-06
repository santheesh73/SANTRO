'use client';

import React, { Suspense } from 'react';
import { PerspectiveCamera } from '@/3d/camera/PerspectiveCamera';
import { CameraController } from '@/3d/camera/CameraController';
import { DoorInteractionController } from '@/3d/camera/DoorInteractionController';
import { CameraDebug } from '@/3d/camera/CameraDebug';
import { SceneLighting } from '@/3d/lighting/SceneLighting';
import { Atmosphere } from '@/3d/environment/Atmosphere';
import { PlaceholderHouse } from '@/3d/scene/PlaceholderHouse';
import { ModelLoader } from '@/3d/loaders/ModelLoader';
import { WaterController } from '@/3d/materials/WaterController';
import { MaterialPreviewScene } from '@/3d/materials/MaterialPreviewScene';
import { getDefaultHouseModelUrl } from '@/3d/assets/config';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { RoomSystem } from '@/3d/rooms/RoomSystem';

interface ArchitecturalSceneProps {
  modelUrl?: string | null;
  enableControls?: boolean;
}

/**
 * Architectural 3D Scene Root.
 * Orchestrates camera, lighting, atmosphere, materials, and architectural geometry.
 * Loads the master architectural model 'the_portfolio_house' via ModelLoader,
 * with graceful fallback to the procedural PlaceholderHouse.
 * Incorporates M4 WaterController and MaterialPreviewScene validation modes.
 */
export function ArchitecturalScene({
  modelUrl = getDefaultHouseModelUrl(),
  enableControls = true,
}: ArchitecturalSceneProps) {
  const resolvedUrl = modelUrl ?? getDefaultHouseModelUrl();
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);

  return (
    <>
      {/* 1. Architectural Perspective Camera */}
      <PerspectiveCamera />

      {/* 2. Damped Inspection Camera Controls with Reference View Transitions */}
      <CameraController enableControls={enableControls} />

      {/* 2b. Dynamic Entrance Pivot Door Synchronization */}
      <DoorInteractionController />

      {/* 2c. Camera Spline & Waypoints Debug Visualizer */}
      <CameraDebug />

      {/* 3. Atmospheric Sky & Ground Horizon */}
      <Atmosphere />

      {/* 4. Directional Sun & Ambient Neutral Lighting */}
      <SceneLighting />

      {/* 5. M4 Dynamic Water Surface Ripple Animation */}
      <WaterController />

      {/* 6. Architectural Geometry or Studio Material Preview Scene */}
      {showMaterialPreview ? (
        <MaterialPreviewScene />
      ) : (
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
      )}

      {/* 7. M8 Spatial Portfolio Room System & Content Exhibits */}
      {!showMaterialPreview && <RoomSystem />}
    </>
  );
}
