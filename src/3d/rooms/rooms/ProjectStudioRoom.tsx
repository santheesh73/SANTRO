'use client';

import React from 'react';
import { projectsData } from '@/content/projects';
import { ProjectExhibit } from '../exhibits/ProjectExhibit';

/**
 * ProjectStudioRoom — Primary Portfolio Exhibition Space
 *
 * Sits in the expansive double-height atrium from Z: -10.2m to -18.5m.
 * Spatially orchestrates the 7 verified projects with clear architectural hierarchy:
 * - Primary / Featured: ORION (Central monolith at Z: -16.8m)
 * - Selected / Standard: HEARTTUNE, NISF, AHAL AI (Lateral plinths)
 * - Supporting / Compact: PRYSM, BHOOMI, MINCHAL (Flanking wing exhibits)
 */
export function ProjectStudioRoom() {
  const orion = projectsData.find((p) => p.id === 'orion')!;
  const hearttune = projectsData.find((p) => p.id === 'hearttune')!;
  const nisf = projectsData.find((p) => p.id === 'nisf')!;
  const ahalAi = projectsData.find((p) => p.id === 'ahal-ai')!;
  const prysm = projectsData.find((p) => p.id === 'prysm')!;
  const bhoomi = projectsData.find((p) => p.id === 'bhoomi')!;
  const minchal = projectsData.find((p) => p.id === 'minchal')!;

  return (
    <group name="Room_ProjectStudio">
      {/* 1. PRIMARY FEATURED EXHIBIT: ORION (West Prominent Bay, Z: -12.2m) */}
      {orion && (
        <ProjectExhibit
          project={orion}
          position={[-2.6, 0.0, -12.2]}
          rotation={[0, 0.32, 0]}
          variant="featured"
        />
      )}

      {/* 2. SELECTED EXHIBIT: HEARTTUNE (West Mid Plinth, Z: -14.2m) */}
      {hearttune && (
        <ProjectExhibit
          project={hearttune}
          position={[-2.6, 0.0, -14.2]}
          rotation={[0, 0.25, 0]}
          variant="standard"
        />
      )}

      {/* 3. SELECTED EXHIBIT: NISF (East Front Plinth, Z: -12.2m) */}
      {nisf && (
        <ProjectExhibit
          project={nisf}
          position={[2.6, 0.0, -12.2]}
          rotation={[0, -0.32, 0]}
          variant="standard"
        />
      )}

      {/* 4. SELECTED EXHIBIT: AHAL AI (East Mid Plinth, Z: -14.2m) */}
      {ahalAi && (
        <ProjectExhibit
          project={ahalAi}
          position={[2.6, 0.0, -14.2]}
          rotation={[0, -0.25, 0]}
          variant="standard"
        />
      )}

      {/* 5. SUPPORTING EXHIBIT: PRYSM (West Outer Wing, Z: -12.8m) */}
      {prysm && (
        <ProjectExhibit
          project={prysm}
          position={[-4.5, 0.0, -12.8]}
          rotation={[0, 0.38, 0]}
          variant="compact"
        />
      )}

      {/* 6. SUPPORTING EXHIBIT: BHOOMI (West Outer Mid Wing, Z: -14.6m) */}
      {bhoomi && (
        <ProjectExhibit
          project={bhoomi}
          position={[-4.5, 0.0, -14.6]}
          rotation={[0, 0.38, 0]}
          variant="compact"
        />
      )}

      {/* 7. SUPPORTING EXHIBIT: MINCHAL (East Outer Wing, Z: -13.2m) */}
      {minchal && (
        <ProjectExhibit
          project={minchal}
          position={[4.5, 0.0, -13.2]}
          rotation={[0, -0.38, 0]}
          variant="compact"
        />
      )}
    </group>
  );
}
