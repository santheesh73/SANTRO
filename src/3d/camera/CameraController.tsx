'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { SpatialZone } from '@/types';
import { REFERENCE_CAMERAS } from './referenceCameras';
import { CAMERA_CONFIG } from './CameraConfig';
import { CameraRig } from './CameraRig';
import {
  evaluateUnifiedPosition,
  evaluateUnifiedTarget,
  evaluateUnifiedFov,
  getUnifiedStateAtProgress,
  evaluateInteriorTransitionFactor,
} from './CameraPath';
import { getDampingFactor } from './CameraInterpolation';
import { useCameraInput } from './useCameraInput';
import { CameraJourneyState } from './types';

/**
 * Maps unified camera journey states to architectural spatial zones
 */
export function getZoneForJourneyState(state: CameraJourneyState): SpatialZone {
  switch (state) {
    case 'EXTERIOR_ESTABLISHING':
    case 'EXTERIOR_APPROACH':
      return 'EXTERIOR';
    case 'FACADE_REVEAL':
      return 'TERRACE';
    case 'ENTRANCE_APPROACH':
    case 'DOOR_TRANSITION':
    case 'DOOR_THRESHOLD':
      return 'ENTRANCE';
    case 'FOYER_ENTRY':
    case 'FOYER_HOLD':
      return 'FOYER';
    case 'CORRIDOR_ENTRY':
    case 'CORRIDOR_TRAVEL':
    case 'GALLERY_ENTRY':
      return 'GALLERY';
    case 'GALLERY_REVEAL':
      return 'LAB';
    case 'INTERIOR_ROOM_APPROACH':
      return 'STUDIO';
    default:
      return 'EXTERIOR';
  }
}

interface CameraControllerProps {
  enableControls?: boolean;
}

// Reusable scratch vectors — Zero garbage collection allocations per frame
const _desiredPos = new THREE.Vector3();
const _desiredTarget = new THREE.Vector3();

/**
 * SANTRO M6 — Master Exterior Cinematic Camera Controller
 *
 * Implements the continuous exterior camera journey inspired by the reference video:
 * - Establishing Drone Shot (t = 0.0s) -> Descent -> Pool Terrace -> Entrance Portal -> Door Threshold (t = 4.5s)
 * - Virtual scroll-to-progress progression with momentum damping
 * - Dedicated CameraRig managing independent position, look-target, and lens FOV interpolation
 * - Strict architectural level-horizon stabilization (zero roll)
 * - Responsive framing adaptation for Desktop, Tablet, and Mobile
 * - Seamless handoff to OrbitControls in inspect mode
 * - Throttled store synchronization preventing per-frame React re-render spikes
 */
export function CameraController({ enableControls = true }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, size } = useThree();

  // Controlled camera rig instance
  const cameraRigRef = useRef<CameraRig>(
    new CameraRig([4.2, 12.5, 26.0], [0.0, 3.8, 2.0], CAMERA_CONFIG.defaultFov)
  );

  // Attach normalized multi-device input handler
  useCameraInput({ enabled: true });

  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const cameraMode = useHouseStore((state) => state.cameraMode);
  const cameraTransitionNonce = useHouseStore((state) => state.cameraTransitionNonce);
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);
  const setExteriorCameraState = useHouseStore((state) => state.setExteriorCameraState);
  const setInteriorFactor = useHouseStore((state) => state.setInteriorFactor);
  const setCinematicProgress = useHouseStore((state) => state.setCinematicProgress);

  // Transition targets for reference/inspect modes
  const refTargetPos = useRef<THREE.Vector3>(new THREE.Vector3(4.2, 12.5, 26.0));
  const refTargetLookAt = useRef<THREE.Vector3>(new THREE.Vector3(0.0, 3.8, 2.0));
  const refTargetFov = useRef<number>(48);
  const isRefTransitioning = useRef<boolean>(false);

  // Internal smoothed progress value and throttle references
  const currentProgressRef = useRef<number>(0.0);
  const lastStoreProgressRef = useRef<number>(0.0);
  const lastInteriorFactorRef = useRef<number>(0.0);
  const wasSettledRef = useRef<boolean>(false);
  const prevStateRef = useRef<CameraJourneyState>('EXTERIOR_ESTABLISHING');
  const clockRef = useRef<number>(0.0);
  const prevCameraModeRef = useRef<string>(cameraMode);

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
    const rig = cameraRigRef.current;

    // Smooth handoff when exiting Orbit Inspect back into Cinematic Spline follower
    if (prevCameraModeRef.current !== 'cinematic' && cameraMode === 'cinematic') {
      rig.position.copy(camera.position);
      rig.quaternion.copy(camera.quaternion);
    }
    prevCameraModeRef.current = cameraMode;

    // =========================================================================
    // MODE 1: REFERENCE CAMERA TRANSITION (Inspect / Validation Overlay)
    // =========================================================================
    if (isRefTransitioning.current) {
      rig.update(
        delta,
        refTargetPos.current,
        refTargetLookAt.current,
        refTargetFov.current,
        {
          applyMicroMovement: false,
          posDampingRate: CAMERA_CONFIG.damping.transitionFast,
          targetDampingRate: CAMERA_CONFIG.damping.transitionFast,
          fovDampingRate: CAMERA_CONFIG.damping.transitionFast,
        }
      );
      rig.applyToCamera(camera);

      if (controlsRef.current) {
        controlsRef.current.target.copy(rig.target);
        controlsRef.current.update();
      }

      const distPos = camera.position.distanceTo(refTargetPos.current);
      const distTarget = rig.target.distanceTo(refTargetLookAt.current);

      if (distPos < 0.05 && distTarget < 0.05) {
        isRefTransitioning.current = false;
        rig.reset(refTargetPos.current, refTargetLookAt.current, refTargetFov.current);
        rig.applyToCamera(camera);
        if (controlsRef.current) {
          controlsRef.current.target.copy(refTargetLookAt.current);
          controlsRef.current.update();
        }
      }
      return;
    }

    // =========================================================================
    // MODE 2: CINEMATIC SPLINE PROGRESSION (Unified Architectural Journey)
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

      // 1. Evaluate Unified Spline Path Position & Look Target
      evaluateUnifiedPosition(p, _desiredPos);
      evaluateUnifiedTarget(p, _desiredTarget);
      let targetFov = evaluateUnifiedFov(p);

      // 2. Responsive Adaptation (Tablet & Mobile framing)
      const isMobile = size.width < CAMERA_CONFIG.responsive.mobileBreakpoint;
      const isTablet =
        size.width >= CAMERA_CONFIG.responsive.mobileBreakpoint &&
        size.width < CAMERA_CONFIG.responsive.tabletBreakpoint;

      if (isMobile) {
        targetFov += CAMERA_CONFIG.responsive.mobileFovOffset;
        if (_desiredPos.z > 0) {
          _desiredPos.z *= CAMERA_CONFIG.responsive.mobileDistanceScalar;
        }
      } else if (isTablet) {
        targetFov += CAMERA_CONFIG.responsive.tabletFovOffset;
      }

      // 3. Update CameraRig physics, micro-movement, boundaries, independent damping, and level-horizon quaternion
      rig.update(delta, _desiredPos, _desiredTarget, targetFov, {
        applyMicroMovement: CAMERA_CONFIG.microMovement.enabled,
        clockTime: clockRef.current,
      });

      // 4. Apply rig to Three.js camera
      rig.applyToCamera(camera);

      // 5. Update OrbitControls anchor so inspection begins at current view
      if (controlsRef.current) {
        controlsRef.current.target.copy(rig.target);
        controlsRef.current.update();
      }

      // 6. Throttled Store Synchronization (Eliminates 60Hz React re-render cascades)
      const progressDelta = Math.abs(p - lastStoreProgressRef.current);
      const isNearEndpoint = p <= 0.001 || p >= 0.999;
      const isSettled = Math.abs(p - targetProgress) < 0.001;

      if (progressDelta >= 0.005 || isNearEndpoint || (isSettled && !wasSettledRef.current)) {
        lastStoreProgressRef.current = p;
        wasSettledRef.current = isSettled;
        setCinematicProgress(p);
      }

      // 7. Update Cinematic State & Architectural Spatial Zone in Store
      const currentState = getUnifiedStateAtProgress(p);
      if (currentState !== prevStateRef.current) {
        prevStateRef.current = currentState;
        setExteriorCameraState(currentState);
        const mappedZone = getZoneForJourneyState(currentState);
        if (useHouseStore.getState().currentZone !== mappedZone) {
          useHouseStore.getState().navigateToZone(mappedZone);
        }
      }

      // 8. Update Interior Transition Factor for subtle iris / exposure adaptation
      const interiorFactor = evaluateInteriorTransitionFactor(p);
      const factorDelta = Math.abs(interiorFactor - lastInteriorFactorRef.current);
      if (factorDelta >= 0.02 || interiorFactor === 0.0 || interiorFactor === 1.0) {
        if (lastInteriorFactorRef.current !== interiorFactor) {
          lastInteriorFactorRef.current = interiorFactor;
          setInteriorFactor(interiorFactor);
        }
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
