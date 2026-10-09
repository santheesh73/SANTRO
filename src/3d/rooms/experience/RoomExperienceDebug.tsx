'use client';

import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { roomExperienceController } from './RoomExperienceController';
import { ROOM_EXPERIENCE_CONFIGS } from './roomExperienceConfigs';

/**
 * SANTRO M9 — Development-Only 3D Room Experience Debug Visualizer
 *
 * Visualizes:
 * - 3D authored inspection trajectory spline in violet/cyan
 * - Beat camera position anchor spheres
 * - Beat look-target pins with sightline vector rays
 * - Active room boundaries and safe clearance envelopes
 *
 * Automatically tree-shaken and inactive in production unless debug toggles are enabled.
 */
export function RoomExperienceDebug() {
  const showCameraDebug = useHouseStore((state) => state.showCameraSplineDebug);
  const showRoomDebug = useHouseStore((state) => state.showRoomExperienceDebug);
  const currentRoomId = useHouseStore((state) => state.currentRoomId);

  const shouldRender = showCameraDebug || showRoomDebug;

  // Generate 3D trajectory lines and sightline vectors for all enabled rooms
  const debugData = useMemo(() => {
    const trajectories: { roomId: string; line: THREE.Line; sightlines: THREE.LineSegments }[] = [];

    for (const [roomId, config] of Object.entries(ROOM_EXPERIENCE_CONFIGS)) {
      if (!config.enabled) continue;
      const timeline = roomExperienceController.getTimeline(config.roomId);
      if (!timeline) continue;

      const { positions, targets } = timeline.getSamplePoints(50);
      const posGeo = new THREE.BufferGeometry().setFromPoints(positions);
      const mat = new THREE.LineBasicMaterial({
        color: config.intensity === 'HIGH' ? 0x8b5cf6 : 0x00f0ff,
        linewidth: 2,
      });
      const line = new THREE.Line(posGeo, mat);

      // Sightline rays from key positions to targets
      const rayPoints: THREE.Vector3[] = [];
      for (let i = 0; i < positions.length; i += 5) {
        rayPoints.push(positions[i], targets[i]);
      }
      const rayGeo = new THREE.BufferGeometry().setFromPoints(rayPoints);
      const rayMat = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.18,
      });
      const sightlines = new THREE.LineSegments(rayGeo, rayMat);

      trajectories.push({ roomId, line, sightlines });
    }

    return trajectories;
  }, []);

  // GPU cleanup on unmount
  useEffect(() => {
    return () => {
      debugData.forEach(({ line, sightlines }) => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
        sightlines.geometry.dispose();
        (sightlines.material as THREE.Material).dispose();
      });
    };
  }, [debugData]);

  if (!shouldRender) return null;

  return (
    <group name="DEBUG_Room_Experience_Master">
      {debugData.map(({ roomId, line, sightlines }) => {
        const isCurrent = roomId === currentRoomId;
        return (
          <group key={roomId} visible={isCurrent || showCameraDebug}>
            <primitive object={line} />
            <primitive object={sightlines} />
          </group>
        );
      })}

      {/* Render Anchors for current room */}
      {(() => {
        const activeConfig = ROOM_EXPERIENCE_CONFIGS[currentRoomId];
        if (!activeConfig || !activeConfig.enabled) return null;

        return (
          <group name={`DEBUG_Anchors_${currentRoomId}`}>
            {/* Arrival anchor */}
            <mesh position={activeConfig.arrival.position}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color="#10B981" wireframe />
            </mesh>

            {/* Settle anchor */}
            <mesh position={activeConfig.settle.position}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color="#3B82F6" wireframe />
            </mesh>

            {/* Beats anchors */}
            {activeConfig.beats.map((beat) => (
              <group key={beat.id}>
                {/* Camera position sphere */}
                <mesh position={beat.position}>
                  <sphereGeometry args={[0.18, 14, 14]} />
                  <meshBasicMaterial
                    color={beat.importance === 'primary' ? '#8B5CF6' : '#00F0FF'}
                    wireframe
                  />
                </mesh>
                {/* Look target marker */}
                <mesh position={beat.target}>
                  <sphereGeometry args={[0.10, 10, 10]} />
                  <meshBasicMaterial
                    color={beat.importance === 'primary' ? '#EC4899' : '#F59E0B'}
                  />
                </mesh>
              </group>
            ))}

            {/* Exit anchor */}
            <mesh position={activeConfig.exit.position}>
              <sphereGeometry args={[0.15, 12, 12]} />
              <meshBasicMaterial color="#EF4444" wireframe />
            </mesh>
          </group>
        );
      })()}
    </group>
  );
}
