'use client';

import { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { CAMERA_CONFIG } from './CameraConfig';
import { smoothstep } from './CameraInterpolation';

/**
 * Controller synchronizing the entrance pivot door mechanics with camera proximity.
 *
 * Implements CAMERA_SPEC.md §6:
 * - Dynamic Door Interaction Trigger:
 *   As the camera approaches the threshold (Z in [+4.5m, +2.2m]), the 9-plank walnut
 *   pivot door leaf swings inward around its offset hinge (X: -0.65m), rotating from 0 to -85 deg.
 * - If the visitor reverses scroll back toward the pool, the door reverses and closes flush into its frame.
 * - Spatial corridor gating prevents accidental opening during off-axis orbit inspection.
 * - Throttled store synchronization prevents high-frequency React re-render cascades.
 */
export function DoorInteractionController() {
  const { scene, camera } = useThree();
  const doorPivotMeshRef = useRef<THREE.Object3D | null>(null);
  const prevAngleRef = useRef<number>(0.0);
  const setDoorAngle = useHouseStore((state) => state.setDoorAngle);
  const cameraMode = useHouseStore((state) => state.cameraMode);

  useFrame(() => {
    // 1. Locate door pivot group if not yet cached
    if (!doorPivotMeshRef.current) {
      const found = scene.getObjectByName('GEO_Door_Pivot_Leaf');
      if (found) {
        doorPivotMeshRef.current = found;
      } else {
        return;
      }
    }

    const doorMesh = doorPivotMeshRef.current;
    if (!doorMesh) return;

    // 2. Spatial Corridor Check (prevents opening when orbiting far away in inspect mode)
    const camX = camera.position.x;
    const camY = camera.position.y;
    const camZ = camera.position.z;
    const inCorridor = cameraMode === 'cinematic' || (Math.abs(camX) < 2.5 && camY <= 3.5);

    const { startZ, endZ, maxAngleRad } = CAMERA_CONFIG.doorTrigger;

    let targetAngle = 0.0;
    if (inCorridor) {
      if (camZ <= endZ) {
        targetAngle = maxAngleRad; // Fully open (-85 deg)
      } else if (camZ >= startZ) {
        targetAngle = 0.0; // Fully closed
      } else {
        // Smooth cubic Hermite progression
        const t = (startZ - camZ) / (startZ - endZ);
        const easedT = smoothstep(0.0, 1.0, t);
        targetAngle = easedT * maxAngleRad;
      }
    }

    // 3. Apply rotation to 3D object in WebGL rendering loop
    doorMesh.rotation.y = targetAngle;

    // 4. Throttled store synchronization (only on coarse 5% steps or endpoint states)
    const angleDelta = Math.abs(targetAngle - prevAngleRef.current);
    const isAtBoundary = targetAngle === 0.0 || targetAngle === maxAngleRad;
    if (angleDelta >= 0.08 || (isAtBoundary && prevAngleRef.current !== targetAngle)) {
      prevAngleRef.current = targetAngle;
      setDoorAngle(targetAngle);
    }
  });

  return null;
}
