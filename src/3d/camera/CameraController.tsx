'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { REFERENCE_CAMERAS } from './referenceCameras';
import { CAMERA_CONFIG } from './CameraConfig';
import {
  evaluateCameraPosition,
  evaluateCameraTarget,
  evaluateCameraFov,
  getStateAtProgress,
} from './exteriorCameraPath';
import {
  getDampingFactor,
  applyLevelHorizonLookAt,
  clampPositionToBounds,
} from './CameraInterpolation';
import { useCameraInput } from './useCameraInput';
import { ExteriorCameraState } from './types';

interface CameraControllerProps {
  enableControls?: boolean;
}

// Reusable calculation vectors — Zero garbage collection allocations per frame
const _desiredPos = new THREE.Vector3();
const _desiredTarget = new THREE.Vector3();
const _smoothedTarget = new THREE.Vector3(0.0, 3.8, 2.0);
const _microOffset = new THREE.Vector3();

/**
 * SANTRO M6 — Master Exterior Cinematic Camera Controller
 *
 * Implements the continuous exterior camera journey inspired by the reference video:
 * - Establishing Drone Shot (t = 0.0s) -> Descent -> Pool Terrace -> Entrance Portal -> Door Threshold (t = 4.5s)
 * - Virtual scroll-to-progress progression with momentum damping
 * - Independent position, look-target, and lens FOV interpolation
 * - Strict architectural level-horizon stabilization (zero roll)
 * - Responsive framing adaptation for Desktop, Tablet, and Mobile
 * - Seamless handoff to OrbitControls in inspect mode
 */
export function CameraController({ enableControls = true }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, size } = useThree();

  // Attach normalized multi-device input handler
  useCameraInput({ enabled: true });

  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const cameraMode = useHouseStore((state) => state.cameraMode);
  const cameraTransitionNonce = useHouseStore((state) => state.cameraTransitionNonce);
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);
  const setExteriorCameraState = useHouseStore((state) => state.setExteriorCameraState);
  const setCinematicProgress = useHouseStore((state) => state.setCinematicProgress);

  // Transition targets for reference/inspect modes
  const refTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(4.2, 12.5, 26.0));
  const refTargetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0.0, 3.8, 2.0));
  const refTargetFov = useRef<number>(48);
  const isRefTransitioning = useRef<boolean>(false);

  // Internal smoothed progress value
  const currentProgressRef = useRef<number>(0.0);
  const prevStateRef = useRef<ExteriorCameraState>('EXTERIOR_ESTABLISHING');
  const clockRef = useRef<number>(0.0);

  // Listen to reference camera selections or preview toggles
  useEffect(() => {
    if (showMaterialPreview) {
      refTargetPos.current.set(0.0, 9.5, 18.0);
      refTargetLookAt.current.set(0.0, 1.0, 2.25);
      refTargetFov.current = 46;
      isRefTransitioning.current = true;
    } else if (activeRefCamera && REFERENCE_CAMERAS[activeRefCamera]) {
      const cfg = REFERENCE_CAMERAS[activeRefCamera];
      refTargetPos.current.set(cfg.position[0], cfg.position[1], cfg.position[2]);
      refTargetLookAt.current.set(cfg.target[0], cfg.target[1], cfg.target[2]);
      refTargetFov.current = cfg.fov;
      isRefTransitioning.current = true;
    }
  }, [showMaterialPreview, activeRefCamera, cameraTransitionNonce]);

  useFrame((_, delta) => {
    clockRef.current += delta;
    const persCam = camera as THREE.PerspectiveCamera;

    // =========================================================================
    // MODE 1: REFERENCE CAMERA TRANSITION (Inspect / Validation Overlay)
    // =========================================================================
    if (isRefTransitioning.current) {
      const dampFactor = getDampingFactor(CAMERA_CONFIG.damping.transitionFast, delta);
      camera.position.lerp(refTargetPos.current, dampFactor);

      if (controlsRef.current) {
        controlsRef.current.target.lerp(refTargetLookAt.current, dampFactor);
        controlsRef.current.update();
      } else {
        applyLevelHorizonLookAt(camera, refTargetLookAt.current, dampFactor);
      }

      if ('fov' in camera) {
        const fovDiff = refTargetFov.current - persCam.fov;
        if (Math.abs(fovDiff) > 0.05) {
          persCam.fov += fovDiff * dampFactor;
          persCam.updateProjectionMatrix();
        }
      }

      const distPos = camera.position.distanceTo(refTargetPos.current);
      const distTarget = controlsRef.current
        ? controlsRef.current.target.distanceTo(refTargetLookAt.current)
        : camera.position.distanceTo(refTargetLookAt.current);

      if (distPos < 0.05 && distTarget < 0.05) {
        isRefTransitioning.current = false;
        camera.position.copy(refTargetPos.current);
        if (controlsRef.current) {
          controlsRef.current.target.copy(refTargetLookAt.current);
          controlsRef.current.update();
        }
      }
      return;
    }

    // =========================================================================
    // MODE 2: CINEMATIC SPLINE PROGRESSION (Default Architectural Journey)
    // =========================================================================
    if (cameraMode === 'cinematic') {
      const targetProgress = useHouseStore.getState().targetProgress;

      // Exponential damping toward target progress
      const progressDamp = getDampingFactor(CAMERA_CONFIG.damping.scrollInertia, delta);
      currentProgressRef.current = THREE.MathUtils.lerp(
        currentProgressRef.current,
        targetProgress,
        progressDamp
      );

      const p = currentProgressRef.current;
      setCinematicProgress(p);

      // 1. Evaluate Spline Path Position & Target
      evaluateCameraPosition(p, _desiredPos);
      evaluateCameraTarget(p, _desiredTarget);
      let targetFov = evaluateCameraFov(p);

      // 2. Responsive Adaptation (Tablet & Mobile framing)
      const isMobile = size.width < CAMERA_CONFIG.responsive.mobileBreakpoint;
      const isTablet =
        size.width >= CAMERA_CONFIG.responsive.mobileBreakpoint &&
        size.width < CAMERA_CONFIG.responsive.tabletBreakpoint;

      if (isMobile) {
        targetFov += CAMERA_CONFIG.responsive.mobileFovOffset;
        _desiredPos.z *= CAMERA_CONFIG.responsive.mobileDistanceScalar;
      } else if (isTablet) {
        targetFov += CAMERA_CONFIG.responsive.tabletFovOffset;
      }

      // 3. Subtle Natural Micro-Movement (Stabilization breathing)
      if (CAMERA_CONFIG.microMovement.enabled) {
        const time = clockRef.current * CAMERA_CONFIG.microMovement.frequency * Math.PI * 2;
        const amp = CAMERA_CONFIG.microMovement.positionAmplitude;
        _microOffset.set(
          Math.sin(time) * amp,
          Math.cos(time * 0.7) * amp * 0.5,
          Math.sin(time * 0.5) * amp
        );
        _desiredPos.add(_microOffset);
      }

      // 4. Collision Safety Boundaries Check
      const b = CAMERA_CONFIG.boundaries;
      clampPositionToBounds(_desiredPos, b.minX, b.maxX, b.minY, b.maxY, b.minZ, b.maxZ);

      // 5. Independent Position Damping
      const posDamp = getDampingFactor(CAMERA_CONFIG.damping.position, delta);
      camera.position.lerp(_desiredPos, posDamp);

      // 6. Independent Target Damping & Strict Level-Horizon LookAt
      const targetDamp = getDampingFactor(CAMERA_CONFIG.damping.target, delta);
      _smoothedTarget.lerp(_desiredTarget, targetDamp);
      applyLevelHorizonLookAt(camera, _smoothedTarget);

      // 7. Lens FOV Damping
      if ('fov' in camera) {
        const fovDamp = getDampingFactor(CAMERA_CONFIG.damping.fov, delta);
        const fovDiff = targetFov - persCam.fov;
        if (Math.abs(fovDiff) > 0.02) {
          persCam.fov += fovDiff * fovDamp;
          persCam.updateProjectionMatrix();
        }
      }

      // 8. Update OrbitControls anchor so inspection begins at current view
      if (controlsRef.current) {
        controlsRef.current.target.copy(_smoothedTarget);
        controlsRef.current.update();
      }

      // 9. Update Cinematic State in Store
      const currentState = getStateAtProgress(p);
      if (currentState !== prevStateRef.current) {
        prevStateRef.current = currentState;
        setExteriorCameraState(currentState);
      }
    }
  });

  const isInspectMode = cameraMode === 'inspect';

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={enableControls && isInspectMode}
      enableDamping
      dampingFactor={0.06}
      minDistance={1.0}
      maxDistance={90.0}
      maxPolarAngle={Math.PI / 2 - 0.01} // Prevent dipping below ground level
      minPolarAngle={0.05}
      onStart={() => {
        isRefTransitioning.current = false;
        useHouseStore.getState().setActiveRefCamera(null);
      }}
    />
  );
}
