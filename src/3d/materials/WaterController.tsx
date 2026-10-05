'use client';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { getOrCreatePBRMaterial } from './applyArchitecturalMaterials';

/**
 * WaterController component for continuous subtle dual-layer capillary wave animation
 * on the infinity pool surface without CPU geometry deformers.
 * Updates GPU shader uniforms and UV scroll offsets.
 */
export function WaterController() {
  useFrame((_, delta) => {
    const mat = getOrCreatePBRMaterial('MAT_Water') as THREE.MeshPhysicalMaterial;
    if (!mat) return;

    // Advance dual-layer water shader time uniform if active
    if (mat.userData?.waterUniforms?.uWaterTime) {
      mat.userData.waterUniforms.uWaterTime.value += delta;
    }

    // Advance primary normal map UV offsets smoothly for base sampler
    if (mat.normalMap) {
      mat.normalMap.offset.x = (mat.normalMap.offset.x + delta * 0.015) % 1.0;
      mat.normalMap.offset.y = (mat.normalMap.offset.y + delta * 0.008) % 1.0;
    }
  });

  return null;
}
