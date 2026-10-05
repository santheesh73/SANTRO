'use client';

import React, { useRef } from 'react';
import { PerspectiveCamera as DreiPerspectiveCamera } from '@react-three/drei';
import type { PerspectiveCamera as ThreePerspectiveCamera } from 'three';

interface PerspectiveCameraProps {
  fov?: number;
  near?: number;
  far?: number;
  position?: [number, number, number];
  makeDefault?: boolean;
}

/**
 * Calibrated architectural perspective camera.
 * Default FOV is 48° (approx. 40mm equivalent lens in architectural cinematography).
 * Initial position calibrated to Shot 01 exterior drone crane view [4.2m, 12.5m, 26.0m].
 */
export function PerspectiveCamera({
  fov = 48,
  near = 0.1,
  far = 250.0,
  position = [4.2, 12.5, 26.0],
  makeDefault = true,
}: PerspectiveCameraProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  return (
    <DreiPerspectiveCamera
      ref={cameraRef}
      makeDefault={makeDefault}
      fov={fov}
      near={near}
      far={far}
      position={position}
    />
  );
}
