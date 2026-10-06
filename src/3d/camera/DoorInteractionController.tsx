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
 */
export function DoorInteractionController() {
  const { scene, camera } = useThree();
  const doorPivotMeshRef = useRef<THREE.Object3D | null>(null);
  const prevAngleRef = useRef<number>(0.0);
  const setDoorAngle = useHouseStore((state) => state.setDoorAngle);

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

    // 2. Compute door opening ratio based on camera Z proximity
    const camZ = camera.position.z;
    const { startZ, endZ, maxAngleRad } = CAMERA_CONFIG.doorTrigger;

    let targetAngle = 0.0;
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

    // 3. Apply rotation to 3D object
    doorMesh.rotation.y = targetAngle;

    // 4. Update store if angle has changed significantly (> 0.01 rad)
    if (Math.abs(targetAngle - prevAngleRef.current) > 0.01) {
      prevAngleRef.current = targetAngle;
      setDoorAngle(targetAngle);
    }
  });

  return null;
}
