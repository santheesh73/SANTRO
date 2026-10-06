'use client';

import React from 'react';
import { SkillWorkstation } from '../exhibits/SkillWorkstation';

/**
 * EngineeringLabRoom — Technical Stack & Engineering Workspace
 *
 * Sits within the glass architectural enclosure on the West side of the corridor
 * from X: -1.6m to -7.8m and Z: -6.5m to -13.5m.
 * Framed laterally during Waypoint 6 (Shot 03 Lab Reveal, looking target [-3.2, 1.4, -8.5]).
 */
export function EngineeringLabRoom() {
  return (
    <group name="Room_EngineeringLab">
      {/* 1. Workstation Displays & Skills Technical Rack */}
      <SkillWorkstation />

      {/* 2. Glass Partition Architectural Room Marker */}
      <group position={[-1.62, 1.6, -7.5]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[0.02, 0.4, 0.6]} />
          <meshStandardMaterial color="#1F1F21" roughness={0.25} metalness={0.9} />
        </mesh>
      </group>
    </group>
  );
}
