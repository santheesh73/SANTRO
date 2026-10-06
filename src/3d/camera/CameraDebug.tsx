'use client';

import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import {
  exteriorPositionSpline,
  exteriorTargetSpline,
  EXTERIOR_WAYPOINTS,
} from './exteriorCameraPath';
import {
  interiorPositionSpline,
  interiorTargetSpline,
  INTERIOR_WAYPOINTS,
} from './interiorCameraPath';

/**
 * Development-only 3D debug visualizer for the unified camera system (Exterior & Interior).
 * Renders:
 * - 3D cyan Catmull-Rom trajectory for Exterior camera path
 * - 3D amber/gold Catmull-Rom trajectory for Interior camera path
 * - Dotted target trajectory lines
 * - Waypoint control spheres & look-target pins
 *
 * Automatically tree-shaken / disabled unless showCameraSplineDebug is enabled.
 */
export function CameraDebug() {
  const showDebug = useHouseStore((state) => state.showCameraSplineDebug);

  // Generate smooth 3D line curves for exterior and interior
  const lines = useMemo(() => {
    // 1. Exterior lines
    const extPathPts = exteriorPositionSpline.getPoints(100);
    const extTgtPts = exteriorTargetSpline.getPoints(100);

    const extPGeo = new THREE.BufferGeometry().setFromPoints(extPathPts);
    const extTGeo = new THREE.BufferGeometry().setFromPoints(extTgtPts);

    const extPMat = new THREE.LineBasicMaterial({ color: 0x00f0ff, linewidth: 2 });
    const extTMat = new THREE.LineBasicMaterial({
      color: 0x00a8b5,
      linewidth: 1,
      transparent: true,
      opacity: 0.5,
    });

    const extPLine = new THREE.Line(extPGeo, extPMat);
    const extTLine = new THREE.Line(extTGeo, extTMat);

    // 2. Interior lines
    const intPathPts = interiorPositionSpline.getPoints(100);
    const intTgtPts = interiorTargetSpline.getPoints(100);

    const intPGeo = new THREE.BufferGeometry().setFromPoints(intPathPts);
    const intTGeo = new THREE.BufferGeometry().setFromPoints(intTgtPts);

    const intPMat = new THREE.LineBasicMaterial({ color: 0xffb703, linewidth: 2 });
    const intTMat = new THREE.LineBasicMaterial({
      color: 0xfb8500,
      linewidth: 1,
      transparent: true,
      opacity: 0.5,
    });

    const intPLine = new THREE.Line(intPGeo, intPMat);
    const intTLine = new THREE.Line(intTGeo, intTMat);

    return {
      extPLine,
      extTLine,
      intPLine,
      intTLine,
    };
  }, []);

  // Dispose WebGL GPU resources on unmount
  useEffect(() => {
    return () => {
      lines.extPLine.geometry.dispose();
      (lines.extPLine.material as THREE.Material).dispose();
      lines.extTLine.geometry.dispose();
      (lines.extTLine.material as THREE.Material).dispose();
      lines.intPLine.geometry.dispose();
      (lines.intPLine.material as THREE.Material).dispose();
      lines.intTLine.geometry.dispose();
      (lines.intTLine.material as THREE.Material).dispose();
    };
  }, [lines]);

  if (!showDebug) return null;

  return (
    <group name="DEBUG_Camera_System">
      {/* 1. Exterior Camera Trajectory Spline (Cyan) */}
      <primitive object={lines.extPLine} />
      <primitive object={lines.extTLine} />

      {/* 2. Interior Camera Trajectory Spline (Amber/Gold) */}
      <primitive object={lines.intPLine} />
      <primitive object={lines.intTLine} />

      {/* 3. Exterior Waypoint Markers (Cyan) */}
      {EXTERIOR_WAYPOINTS.map((wp) => (
        <group key={wp.id}>
          <mesh position={wp.position}>
            <sphereGeometry args={[0.22, 16, 16]} />
            <meshBasicMaterial color={0x00f0ff} wireframe />
          </mesh>
          <mesh position={wp.target}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color={0x00f0ff} />
          </mesh>
        </group>
      ))}

      {/* 4. Interior Waypoint Markers (Amber / Gold) */}
      {INTERIOR_WAYPOINTS.map((wp) => (
        <group key={wp.id}>
          <mesh position={wp.position}>
            <sphereGeometry args={[0.20, 16, 16]} />
            <meshBasicMaterial color={0xffb703} wireframe />
          </mesh>
          <mesh position={wp.target}>
            <sphereGeometry args={[0.12, 12, 12]} />
            <meshBasicMaterial color={0xfb8500} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
