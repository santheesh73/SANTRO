'use client';

import React, { Component, useEffect, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { applyArchitecturalMaterials } from '@/3d/materials/applyArchitecturalMaterials';

export interface ModelLoaderProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number] | number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  onLoaded?: (scene: THREE.Group) => void;
  onError?: (error: Error) => void;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * In-Canvas ErrorBoundary to catch model loading/parsing failures
 * without tearing down the entire 3D Canvas context.
 */
class ModelErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error) {
    if (this.props.onError) {
      this.props.onError(error);
    }
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

/**
 * Inner component that attempts to load GLTF/GLB using useGLTF.
 * Clones the scene graph safely while respecting Drei's shared asset cache,
 * and dynamically applies M4 PBR materials and validation display modes.
 */
function GLTFModelInstance({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  onLoaded,
}: ModelLoaderProps) {
  const gltf = useGLTF(url);
  const setModelLoaded = useHouseStore((state) => state.setModelLoaded);
  const setModelError = useHouseStore((state) => state.setModelError);
  const materialMode = useHouseStore((state) => state.materialMode);

  // Clone scene graph to allow independent instance transforms and shadow flags
  const clonedScene = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = castShadow;
        mesh.receiveShadow = receiveShadow;
      }
    });
    return clone;
  }, [gltf.scene, castShadow, receiveShadow]);

  // Apply PBR materials and react to materialMode changes (pbr, clay, normals, etc.)
  useEffect(() => {
    applyArchitecturalMaterials(clonedScene, materialMode);
  }, [clonedScene, materialMode]);

  useEffect(() => {
    setModelLoaded(true);
    setModelError(null);
    if (onLoaded) {
      onLoaded(clonedScene);
    }

    return () => {
      if (clonedScene.parent) {
        clonedScene.parent.remove(clonedScene);
      }
    };
  }, [clonedScene, onLoaded, setModelLoaded, setModelError]);

  const scaleVec: [number, number, number] =
    typeof scale === 'number' ? [scale, scale, scale] : scale;

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scaleVec}
    />
  );
}

/**
 * Production ModelLoader supporting GLTF/GLB models.
 * Features in-canvas error isolation, Suspense integration, graceful fallbacks,
 * and reliable React 19 / Strict Mode lifecycle management.
 */
export function ModelLoader({
  url,
  fallback = null,
  onError,
  ...rest
}: ModelLoaderProps) {
  const setModelError = useHouseStore((state) => state.setModelError);

  const handleError = (error: Error) => {
    console.warn(`[ModelLoader] Failed to load external model from "${url}":`, error.message);
    setModelError(error.message);
    if (onError) {
      onError(error);
    }
  };

  return (
    <ModelErrorBoundary fallback={fallback} onError={handleError}>
      <Suspense fallback={fallback}>
        <GLTFModelInstance url={url} onError={onError} {...rest} />
      </Suspense>
    </ModelErrorBoundary>
  );
}
