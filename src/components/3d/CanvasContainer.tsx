'use client';

import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { QUALITY_CONFIGS } from '@/3d/utils/quality';
import { checkWebGLSupport, WebGLSupportStatus } from '@/3d/utils/webgl';
import { getDefaultHouseModelUrl } from '@/3d/assets/config';
import { ArchitecturalScene } from '@/3d/scene/ArchitecturalScene';
import { ErrorBoundary3D } from './ErrorBoundary3D';
import { WebGLFallback } from './WebGLFallback';
import { LoadingOverlay } from './LoadingOverlay';

interface CanvasContainerProps {
  modelUrl?: string | null;
  enableControls?: boolean;
}

/**
 * Main WebGL Canvas Container.
 * Manages WebGL capabilities, responsive device pixel ratio (DPR), ACES tone mapping,
 * PCF soft shadows, and graceful fallback handling.
 */
export function CanvasContainer({
  modelUrl = getDefaultHouseModelUrl(),
  enableControls = true,
}: CanvasContainerProps) {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const quality = QUALITY_CONFIGS[qualityTier];
  const [webglStatus, setWebglStatus] = useState<WebGLSupportStatus | null>(null);

  useEffect(() => {
    const status = checkWebGLSupport();
    setWebglStatus(status);
  }, []);

  // WebGL hardware check fallback
  if (webglStatus && !webglStatus.supported) {
    return (
      <WebGLFallback
        title="Hardware Acceleration Required"
        description={webglStatus.errorMessage || 'WebGL is not available in your environment.'}
      />
    );
  }

  return (
    <div className="relative w-full h-full min-h-screen bg-[#0d0d0f] overflow-hidden select-none">
      {/* Loading Overlay */}
      <LoadingOverlay />

      {/* 3D Canvas Island wrapped in ErrorBoundary */}
      <ErrorBoundary3D>
        <Canvas
          dpr={quality.dpr}
          shadows={{
            type: THREE.PCFSoftShadowMap,
          }}
          gl={{
            powerPreference: 'high-performance',
            antialias: quality.antialias,
            alpha: false,
            depth: true,
            stencil: false,
          }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.ACESFilmicToneMapping;
            gl.toneMappingExposure = 1.15;
            gl.outputColorSpace = THREE.SRGBColorSpace;
          }}
          style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
        >
          <ArchitecturalScene
            modelUrl={modelUrl}
            enableControls={enableControls}
          />
        </Canvas>
      </ErrorBoundary3D>
    </div>
  );
}
