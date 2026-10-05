'use client';

import React from 'react';
import { OrbitControls } from '@react-three/drei';

interface CameraControllerProps {
  enableControls?: boolean;
}

/**
 * Controller providing smooth, damped orbit inspection for M1 validation.
 * Constrained with architectural limits (cannot dip far below ground, bounded distances).
 */
export function CameraController({ enableControls = true }: CameraControllerProps) {
  if (!enableControls) return null;

  return (
    <OrbitControls
      makeDefault
      enableDamping
      dampingFactor={0.05}
      target={[0, 2.0, 0]}
      minDistance={6.0}
      maxDistance={60.0}
      maxPolarAngle={Math.PI / 2 - 0.02} // Prevent camera going below ground level
      minPolarAngle={0.1}
    />
  );
}
