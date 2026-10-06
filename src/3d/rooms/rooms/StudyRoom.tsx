'use client';

import React from 'react';
import { philosophyData } from '@/content/philosophy';
import { PhilosophyStele } from '../exhibits/PhilosophyStele';

/**
 * StudyRoom — Engineering Philosophy & Build Process
 *
 * Located in the West wing of the exhibition atrium (X: -2.5m to -5.5m, Z: -13.0m to -20.0m).
 * A quiet, contemplative architectural environment dedicated to focus,
 * featuring four principle steles: BUILD, THINK, EXPLORE, REFINE.
 */
export function StudyRoom() {
  const pBuild = philosophyData.find((p) => p.keyword === 'BUILD');
  const pThink = philosophyData.find((p) => p.keyword === 'THINK');
  const pExplore = philosophyData.find((p) => p.keyword === 'EXPLORE');
  const pRefine = philosophyData.find((p) => p.keyword === 'REFINE');

  return (
    <group name="Room_Study">
      {/* 1. BUILD Principle Stele (Z: -16.2m) */}
      {pBuild && (
        <PhilosophyStele
          pillar={pBuild}
          position={[-3.6, 0.0, -16.2]}
          rotation={[0, 0.30, 0]}
        />
      )}

      {/* 2. THINK Principle Stele (Z: -17.2m) */}
      {pThink && (
        <PhilosophyStele
          pillar={pThink}
          position={[-4.5, 0.0, -17.2]}
          rotation={[0, 0.35, 0]}
        />
      )}

      {/* 3. EXPLORE Principle Stele (Z: -18.4m) */}
      {pExplore && (
        <PhilosophyStele
          pillar={pExplore}
          position={[-3.6, 0.0, -18.4]}
          rotation={[0, 0.25, 0]}
        />
      )}

      {/* 4. REFINE Principle Stele (Z: -19.4m) */}
      {pRefine && (
        <PhilosophyStele
          pillar={pRefine}
          position={[-4.5, 0.0, -19.4]}
          rotation={[0, 0.25, 0]}
        />
      )}

      {/* Low Architectural Drawing Console */}
      <group position={[-5.0, 0.0, -18.0]}>
        <mesh position={[0, 0.38, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.2, 0.76, 2.4]} />
          <meshStandardMaterial color="#5A3825" roughness={0.45} metalness={0.0} />
        </mesh>
      </group>
    </group>
  );
}
