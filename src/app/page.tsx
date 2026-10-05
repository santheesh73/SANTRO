'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ViewportHUD } from '@/components/ui/ViewportHUD';

// Dynamic import with ssr: false for Three.js Canvas island
const CanvasContainer = dynamic(
  () => import('@/components/3d/CanvasContainer').then((mod) => mod.CanvasContainer),
  { ssr: false }
);

/**
 * Root Portfolio Page — M1 Architectural Validation Scene.
 * Mounts the 3D Canvas Island and restrained HUD overlay.
 */
export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#0d0d0f]">
      {/* 2D Architectural Overlay HUD */}
      <ViewportHUD />

      {/* 3D WebGL Canvas Island */}
      <CanvasContainer />
    </main>
  );
}
