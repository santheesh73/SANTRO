'use client';

import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import {
  exteriorPositionSpline,
  exteriorTargetSpline,
  EXTERIOR_WAYPOINTS,
} from './exteriorCameraPath';

/**
 * Development-only 3D debug visualizer for the exterior camera system.
 * Renders:
 * - 3D cyan Catmull-Rom camera trajectory path
 * - Amber look-target trajectory path
 * - Waypoint control point markers
 *
 * Automatically tree-shaken / disabled unless showCameraSplineDebug is enabled in development.
 */
export function CameraDebug() {
  const showDebug = useHouseStore((state) => state.showCameraSplineDebug);

  // Generate smooth line curves once
  const { pathLine, targetLine } = useMemo(() => {
    const pathPoints = exteriorPositionSpline.getPoints(100);
    const targetPoints = exteriorTargetSpline.getPoints(100);

    const pGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
    const tGeo = new THREE.BufferGeometry().setFromPoints(targetPoints);

    const pMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const tMat = new THREE.LineBasicMaterial({
      color: 0xffaa00,
      linewidth: 1,
      transparent: true,
      opacity: 0.6,
    });

    const pLine = new THREE.Line(pGeo, pMat);
    const tLine = new THREE.Line(tGeo, tMat);

    return { pathLine: pLine, targetLine: tLine };
  }, []);

  // Dispose WebGL resources on unmount
  useEffect(() => {
    return () => {
      pathLine.geometry.dispose();
      (pathLine.material as THREE.Material).dispose();
      targetLine.geometry.dispose();
      (targetLine.material as THREE.Material).dispose();
    };
  }, [pathLine, targetLine]);

  if (!showDebug) return null;

  return (
    <group name="DEBUG_Camera_System">
      {/* 1. Camera Flight Trajectory Spline (Cyan) */}
      <primitive object={pathLine} />

      {/* 2. Look Target Trajectory Spline (Amber) */}
      <primitive object={targetLine} />

      {/* 3. Waypoint Markers & Look Target Pins */}
      {EXTERIOR_WAYPOINTS.map((wp) => (
        <group key={wp.id}>
          {/* Waypoint Camera Position Marker */}
          <mesh position={wp.position}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color={0x00f0ff} wireframe />
          </mesh>

          {/* Corresponding Look Target Pin */}
          <mesh position={wp.target}>
            <sphereGeometry args={[0.15, 12, 12]} />
            <meshBasicMaterial color={0xffaa00} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
