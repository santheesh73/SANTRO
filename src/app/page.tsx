'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ViewportHUD } from '@/components/ui/ViewportHUD';
import { ProjectDetailCompanion } from '@/components/ui/ProjectDetailCompanion';

// Dynamic import with ssr: false for Three.js Canvas island
const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false }
);

/**
 * Root Portfolio Page — M10 Portfolio Content Integration & Readability.
 * Mounts the 3D Canvas Island, restrained HUD overlay, and readable project companion layer.
 */
export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0d0d0f]">
      {/* 2D Architectural Overlay HUD */}
      <ViewportHUD />

      {/* M10 Project Detail Companion (Accessible, high-readability layer) */}
      <ProjectDetailCompanion />

      {/* 3D WebGL Canvas Island */}
      <CanvasContainer />
    </main>
  );
}
