'use client';

import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getOrCreatePBRMaterial } from './applyArchitecturalMaterials';

interface SwatchDef {
  id: string;
  label: string;
  materialName: string;
  position: [number, number, number];
}

const SWATCHES: SwatchDef[] = [
  // Row 1: Architectural Masonry & Concrete
  { id: 'wall_main', label: 'Facade Stucco', materialName: 'MAT_Wall_Main', position: [-6, 0.6, -3] },
  { id: 'wall_sec', label: 'Interior Plaster', materialName: 'MAT_Wall_Secondary', position: [-2, 0.6, -3] },
  { id: 'concrete', label: 'Board-Form Concrete', materialName: 'MAT_Concrete', position: [2, 0.6, -3] },
  { id: 'stone', label: 'Honed Travertine', materialName: 'MAT_Stone', position: [6, 0.6, -3] },

  // Row 2: Woods & Terrace
  { id: 'wood_door', label: 'Walnut Pivot Door', materialName: 'MAT_Wood_Entrance', position: [-6, 0.6, 0.5] },
  { id: 'wood_int', label: 'Fluted Walnut', materialName: 'MAT_Wood_Interior', position: [-2, 0.6, 0.5] },
  { id: 'wood_deck', label: 'Teak Deck Lounger', materialName: 'MAT_Wood_Deck', position: [2, 0.6, 0.5] },
  { id: 'terrace', label: 'Terrace Paving', materialName: 'MAT_Terrace', position: [6, 0.6, 0.5] },

  // Row 3: Glazing & Metals
  { id: 'glass_clear', label: 'Clear Glazing', materialName: 'MAT_Glass_Clear', position: [-6, 0.6, 4] },
  { id: 'glass_dark', label: 'Dark Skylight Glass', materialName: 'MAT_Glass_Dark', position: [-2, 0.6, 4] },
  { id: 'metal_dark', label: 'Charcoal Aluminum', materialName: 'MAT_Metal_Dark', position: [2, 0.6, 4] },
  { id: 'metal_brushed', label: 'Brushed Stainless', materialName: 'MAT_Metal_Brushed', position: [6, 0.6, 4] },

  // Row 4: Environment & Landscape
  { id: 'water', label: 'Infinity Pool Water', materialName: 'MAT_Water', position: [-6, 0.6, 7.5] },
  { id: 'ground', label: 'Arid Desert Earth', materialName: 'MAT_Ground', position: [-2, 0.6, 7.5] },
  { id: 'gravel', label: 'Roof Pebble Bed', materialName: 'MAT_Roof_Gravel', position: [2, 0.6, 7.5] },
  { id: 'vegetation', label: 'Agave / Foliage', materialName: 'MAT_Vegetation', position: [6, 0.6, 7.5] },
];

/**
 * MaterialPreviewScene provides a controlled studio validation environment
 * for inspecting all key materials under neutral daylight (Section 30).
 */
export function MaterialPreviewScene() {
  const pedestalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x1A1A1E,
        roughness: 0.8,
        metalness: 0.1,
      }),
    []
  );

  const floorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0x222226,
        roughness: 0.9,
        metalness: 0.0,
      }),
    []
  );

  return (
    <group name="MATERIAL_PREVIEW_STUDIO" position={[0, 0, 0]}>
      {/* Studio Floor Plinth */}
      <mesh position={[0, -0.05, 2.25]} receiveShadow>
        <boxGeometry args={[22, 0.1, 16]} />
        <primitive object={floorMaterial} attach="material" />
      </mesh>

      {/* 16 PBR Architectural Swatches Array */}
      {SWATCHES.map((swatch) => {
        const mat = getOrCreatePBRMaterial(swatch.materialName);
        return (
          <group key={swatch.id} position={swatch.position}>
            {/* Pedestal Stand */}
            <mesh position={[0, -0.3, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.5, 0.5, 0.6, 32]} />
              <primitive object={pedestalMaterial} attach="material" />
            </mesh>

            {/* Material Sample Sphere */}
            <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
              <sphereGeometry args={[0.42, 48, 48]} />
              <primitive object={mat} attach="material" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
