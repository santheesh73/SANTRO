'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { REFERENCE_CAMERAS } from './referenceCameras';

interface CameraControllerProps {
  enableControls?: boolean;
}

/**
 * Controller providing smooth, damped orbit inspection and animated reference camera transitions.
 * Directly supports the M2 camera validation workflow against all 7 reference keyframe shots.
 */
export function CameraController({ enableControls = true }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera } = useThree();
  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const cameraTransitionNonce = useHouseStore((state) => state.cameraTransitionNonce);
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);

  const targetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(4.2, 12.5, 26.0));
  const targetLookAtRef = useRef<THREE.Vector3>(new THREE.Vector3(0.0, 3.8, 2.0));
  const targetFovRef = useRef<number>(48);
  const isTransitioningRef = useRef<boolean>(true);

  // When active reference camera selection changes, preview toggles, or transition is triggered, set new targets
  useEffect(() => {
    if (showMaterialPreview) {
      targetPosRef.current.set(0.0, 9.5, 18.0);
      targetLookAtRef.current.set(0.0, 1.0, 2.25);
      targetFovRef.current = 46;
      isTransitioningRef.current = true;
    } else if (activeRefCamera && REFERENCE_CAMERAS[activeRefCamera]) {
      const cfg = REFERENCE_CAMERAS[activeRefCamera];
      targetPosRef.current.set(cfg.position[0], cfg.position[1], cfg.position[2]);
      targetLookAtRef.current.set(cfg.target[0], cfg.target[1], cfg.target[2]);
      targetFovRef.current = cfg.fov;
      isTransitioningRef.current = true;
    }
  }, [showMaterialPreview, activeRefCamera, cameraTransitionNonce]);

  useFrame((_, delta) => {
    if (!isTransitioningRef.current) return;

    // Smooth exponential damping towards target
    const dampFactor = 1.0 - Math.exp(-6.5 * Math.min(delta, 0.1));
    camera.position.lerp(targetPosRef.current, dampFactor);

    // Dampen OrbitControls target towards target, or direct lookAt
    if (controlsRef.current) {
      controlsRef.current.target.lerp(targetLookAtRef.current, dampFactor);
      controlsRef.current.update();
    } else {
      camera.lookAt(targetLookAtRef.current);
    }

    // Dampen FOV if perspective camera
    if ('fov' in camera) {
      const persCam = camera as THREE.PerspectiveCamera;
      const fovDiff = targetFovRef.current - persCam.fov;
      if (Math.abs(fovDiff) > 0.05) {
        persCam.fov += fovDiff * dampFactor;
        persCam.updateProjectionMatrix();
      }
    }

    // Check if transition has arrived
    const distPos = camera.position.distanceTo(targetPosRef.current);
    const distTarget = controlsRef.current
      ? controlsRef.current.target.distanceTo(targetLookAtRef.current)
      : 0;

    if (distPos < 0.05 && distTarget < 0.05) {
      isTransitioningRef.current = false;
      camera.position.copy(targetPosRef.current);
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAtRef.current);
        controlsRef.current.update();
      } else {
        camera.lookAt(targetLookAtRef.current);
      }
      if ('fov' in camera) {
        (camera as THREE.PerspectiveCamera).fov = targetFovRef.current;
        (camera as THREE.PerspectiveCamera).updateProjectionMatrix();
      }
    }
  });

  if (!enableControls) return null;

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.05}
      target={[0.0, 3.8, 2.0]}
      minDistance={1.0}
      maxDistance={90.0}
      maxPolarAngle={Math.PI / 2 - 0.01} // Prevent dipping below ground level
      minPolarAngle={0.05}
      onStart={() => {
        // Manual user interaction interrupts automated flight and clears active camera tag
        isTransitioningRef.current = false;
        useHouseStore.getState().setActiveRefCamera(null);
      }}
    />
  );
}
