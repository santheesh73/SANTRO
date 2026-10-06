'use client';

import React from 'react';
import { archiveData } from '@/content/archive';
import { ArchiveExhibit } from '../exhibits/ArchiveExhibit';

/**
 * ArchiveRoom — Proof, Hackathons & Production Milestones
 *
 * Located in the East wing of the exhibition atrium (X: +2.5m to +5.5m, Z: -13.0m to -20.0m).
 * Uses muted documentary materials, honed travertine plinths, and dark bronze steles.
 */
export function ArchiveRoom() {
  const sih = archiveData.find((a) => a.id === 'proof-sih');
  const aiSummit = archiveData.find((a) => a.id === 'proof-ai-summit');
  const openSource = archiveData.find((a) => a.id === 'proof-opensource');
  const hpc = archiveData.find((a) => a.id === 'proof-hpc');

  return (
    <group name="Room_Archive">
      {/* 1. SIH Agriculture Satellite Milestone Tablet (Z: -16.2m) */}
      {sih && (
        <ArchiveExhibit
          item={sih}
          position={[3.6, 0.0, -16.2]}
          rotation={[0, -0.30, 0]}
        />
      )}

      {/* 2. National AI Hackathon Finalist Tablet (Z: -17.2m) */}
      {aiSummit && (
        <ArchiveExhibit
          item={aiSummit}
          position={[4.5, 0.0, -17.2]}
          rotation={[0, -0.35, 0]}
        />
      )}

      {/* 3. Open Source Vector Contributor Tablet (Z: -18.4m) */}
      {openSource && (
        <ArchiveExhibit
          item={openSource}
          position={[3.6, 0.0, -18.4]}
          rotation={[0, -0.25, 0]}
        />
      )}

      {/* 4. HPC Excellence Award Tablet (Z: -19.4m) */}
      {hpc && (
        <ArchiveExhibit
          item={hpc}
          position={[4.5, 0.0, -19.4]}
          rotation={[0, -0.25, 0]}
        />
      )}
    </group>
  );
}
