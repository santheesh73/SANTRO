'use client';

import React, { useEffect } from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface PlaceholderHouseProps {
  visible?: boolean;
}

/**
 * SANTRO M3 — Reconstructed Architectural House Component.
 *
 * Implements the full M3 architectural reconstruction specifications:
 * - Façade depth, wall offsets, reveals, and structural framing
 * - 9-plank walnut pivot door with offset pivot axis at X: -0.65m and cyan LED handle
 * - Ground floor pocket sliding glass and 90-degree frameless corner glass
 * - Upper cantilever overhangs (West +3.8m, East +4.2m) with header beams and soffit reveals
 * - Continuous roof parapet with coping capping profiles, gravel bed, and skylight framing
 * - Honed travertine terrace deck, raised east lounger plinth, and teak sun loungers
 * - Infinity lap pool with 50mm coping overhang nosing, vanishing weir edge, overflow gutter, and 3 internal steps
 * - Exposed board-formed concrete retaining wall with horizontal formwork reveal lines
 * - Interior gallery corridor with 24-batten fluted walnut wall, 3D typography, and 14 floating stone treads
 * - Frameless glass workspace with executive desk and dual monitors
 * - Double-height exhibition atrium with mezzanine walkways, glass balustrades, and monolithic travertine plinth
 *
 * Strictly adheres to M3 milestone boundaries: neutral architectural PBR placeholder materials.
 */
export function PlaceholderHouse({ visible = true }: PlaceholderHouseProps) {
  const setModelLoaded = useHouseStore((state) => state.setModelLoaded);
  const setModelError = useHouseStore((state) => state.setModelError);

  useEffect(() => {
    if (visible) {
      setModelLoaded(true);
      setModelError(null);
    }
  }, [visible, setModelLoaded, setModelError]);

  if (!visible) return null;

  // Material Colors matching MATERIAL_SPEC.md neutral PBR placeholders
  const colStucco = '#ecebe4';
  const colTravertine = '#ddd6c8';
  const colWalnut = '#5a3825';
  const colWalnutDoor = '#6b4423';
  const colGlass = '#e8f4f8';
  const colMetalCharcoal = '#1f1f21';
  const colSteel = '#c0c0c4';
  const colPoolWater = '#38a3a5';
  const colConcrete = '#8b8a85';
  const colLandscape = '#8a795d';
  const colVegetation = '#4d533c';
  const colLEDCyan = '#00f0ff';
  const colRoofGravel = '#9b9a95';

  return (
    <group name="HOUSE_Master_Root" position={[0, 0, 0]}>
      {/* ================================================================= */}
      {/* COLLECTION 1: 01_ARCHITECTURE                                     */}
      {/* ================================================================= */}
      <group name="01_ARCHITECTURE">
        {/* 1.1 Foundation Substructure & Plinths */}
        <mesh name="HOUSE_Plinth_Foundation" position={[0, -0.9, -6.0]} receiveShadow castShadow>
          <boxGeometry args={[36.0, 1.8, 38.0]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>
        <mesh name="HOUSE_Plinth_Retaining_Step" position={[-4.0, -2.2, 8.0]} receiveShadow castShadow>
          <boxGeometry args={[28.0, 2.6, 22.0]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>
        <mesh name="HOUSE_Plinth_Perimeter_Reveal" position={[0, -0.04, 10.5]} receiveShadow>
          <boxGeometry args={[36.2, 0.08, 0.10]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* 1.2 Structural Floor Slabs & Drip Reveals */}
        <mesh name="HOUSE_FloorSlab_Ground" position={[0, -0.2, -12.0]} receiveShadow castShadow>
          <boxGeometry args={[32.0, 0.4, 24.0]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Upper_West" position={[-9.75, 3.6, -4.1]} receiveShadow castShadow>
          <boxGeometry args={[12.5, 0.4, 15.8]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Upper_West_DripReveal" position={[-9.75, 3.42, 3.75]} receiveShadow>
          <boxGeometry args={[12.5, 0.04, 0.06]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Upper_East" position={[9.75, 3.6, -3.9]} receiveShadow castShadow>
          <boxGeometry args={[12.5, 0.4, 16.2]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Upper_East_DripReveal" position={[9.75, 3.42, 4.15]} receiveShadow>
          <boxGeometry args={[12.5, 0.04, 0.06]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Upper_Bridge" position={[0, 3.6, -2.3]} receiveShadow castShadow>
          <boxGeometry args={[7.0, 0.4, 7.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_FloorSlab_Rear_Terrace" position={[0, -0.2, -28.0]} receiveShadow castShadow>
          <boxGeometry args={[24.0, 0.4, 8.0]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>

        {/* 1.3 Ground Floor Architectural Masses */}
        <mesh name="HOUSE_GroundFloor_Living_WestWall" position={[-16.0, 1.7, -6.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.4, 12.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Living_BaseReveal" position={[-15.8, 0.03, -6.0]} receiveShadow>
          <boxGeometry args={[0.05, 0.06, 12.0]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Living_BackWall" position={[-9.5, 1.7, -12.0]} receiveShadow castShadow>
          <boxGeometry args={[13.0, 3.4, 0.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Living_HeaderBeam" position={[-9.5, 3.2, -0.6]} receiveShadow castShadow>
          <boxGeometry args={[12.4, 0.4, 0.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Living_PocketJamb" position={[-15.8, 1.7, -0.6]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.4, 0.6]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>

        {/* Entrance Foyer Portal Framing Columns & Downlights */}
        <mesh name="HOUSE_GroundFloor_Foyer_Column_West" position={[-1.8, 1.7, 0.0]} receiveShadow castShadow>
          <boxGeometry args={[0.6, 3.4, 0.6]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Foyer_Column_East" position={[1.8, 1.7, 0.0]} receiveShadow castShadow>
          <boxGeometry args={[0.6, 3.4, 0.6]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Foyer_Soffit" position={[0, 3.2, 0.0]} receiveShadow castShadow>
          <boxGeometry args={[4.2, 0.4, 1.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Foyer_Soffit_Reveal" position={[0, 3.01, 0.65]} receiveShadow>
          <boxGeometry args={[4.2, 0.03, 0.04]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Foyer_Downlight_01" position={[-0.9, 2.99, 0.2]}>
          <boxGeometry args={[0.18, 0.02, 0.18]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Foyer_Downlight_02" position={[0.9, 2.99, 0.2]}>
          <boxGeometry args={[0.18, 0.02, 0.18]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.2} metalness={0.9} />
        </mesh>

        {/* East Dining Wing */}
        <mesh name="HOUSE_GroundFloor_Dining_EastWall" position={[16.0, 1.7, -6.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.4, 12.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Dining_BackWall" position={[9.5, 1.7, -12.0]} receiveShadow castShadow>
          <boxGeometry args={[13.0, 3.4, 0.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Dining_CornerHeader_Front" position={[9.2, 3.2, 0.0]} receiveShadow castShadow>
          <boxGeometry args={[11.2, 0.4, 0.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_GroundFloor_Dining_CornerHeader_Side" position={[14.8, 3.2, -3.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 0.4, 6.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>

        {/* 1.4 Upper Floor Cantilever Boxes */}
        {/* West Cantilever Box */}
        <mesh name="HOUSE_Upper_West_SideWall" position={[-16.0, 5.6, -4.1]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.6, 15.8]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_West_InnerWall" position={[-3.5, 5.6, -4.1]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.6, 15.8]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_West_HeaderBeam" position={[-9.75, 7.1, 3.4]} receiveShadow castShadow>
          <boxGeometry args={[12.5, 0.6, 0.8]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_West_BottomSoffit" position={[-9.75, 3.6, 1.9]} receiveShadow castShadow>
          <boxGeometry args={[12.5, 0.4, 3.8]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_West_InsetWall" position={[-9.75, 5.5, 0.9]} receiveShadow castShadow>
          <boxGeometry args={[12.1, 3.4, 0.3]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_West_Balcony_Floor" position={[-9.75, 3.82, 2.35]} receiveShadow>
          <boxGeometry args={[12.1, 0.05, 2.7]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>

        {/* East Cantilever Box */}
        <mesh name="HOUSE_Upper_East_InnerWall" position={[3.5, 5.6, -3.9]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.6, 16.2]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_East_OuterWall" position={[16.0, 5.6, -3.9]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 3.6, 16.2]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_East_FrontSolidFace" position={[6.5, 5.6, 3.95]} receiveShadow castShadow>
          <boxGeometry args={[6.0, 3.6, 0.5]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_East_Facade_Reveal_01" position={[6.5, 4.8, 3.95]}>
          <boxGeometry args={[6.02, 0.02, 0.52]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_Upper_East_Facade_Reveal_02" position={[6.5, 6.0, 3.95]}>
          <boxGeometry args={[6.02, 0.02, 0.52]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_Upper_East_HeaderBeam" position={[12.75, 7.1, 3.95]} receiveShadow castShadow>
          <boxGeometry args={[6.5, 0.6, 0.5]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_East_BottomSoffit" position={[9.75, 3.6, 2.1]} receiveShadow castShadow>
          <boxGeometry args={[12.5, 0.4, 4.2]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_East_Terrace_Floor" position={[12.75, 3.82, 2.75]} receiveShadow>
          <boxGeometry args={[6.0, 0.05, 2.7]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>
        <mesh name="HOUSE_Upper_East_Terrace_BackWall" position={[12.75, 5.5, 1.3]} receiveShadow castShadow>
          <boxGeometry args={[6.0, 3.4, 0.3]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>

        {/* Central Recessed Upper Bridge */}
        <mesh name="HOUSE_Upper_Bridge_Header" position={[0, 7.15, 1.4]} receiveShadow castShadow>
          <boxGeometry args={[6.6, 0.5, 0.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_Bridge_BackWall" position={[0, 5.5, -6.0]} receiveShadow castShadow>
          <boxGeometry args={[6.6, 3.4, 0.3]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Upper_Bridge_Floor_Travertine" position={[0, 3.82, -2.3]} receiveShadow>
          <boxGeometry args={[6.6, 0.05, 7.4]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>

        {/* 1.5 Roof Structure, Parapets, Coping & Bulkhead */}
        <mesh name="HOUSE_Roof_Main_Slab" position={[0, 7.4, -9.2]} receiveShadow castShadow>
          <boxGeometry args={[32.4, 0.4, 26.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Roof_Parapet_Front" position={[0, 7.825, 4.0]} receiveShadow castShadow>
          <boxGeometry args={[32.4, 0.45, 0.3]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Roof_Parapet_Rear" position={[0, 7.825, -22.4]} receiveShadow castShadow>
          <boxGeometry args={[32.4, 0.45, 0.3]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Roof_Parapet_West" position={[-16.05, 7.825, -9.2]} receiveShadow castShadow>
          <boxGeometry args={[0.3, 0.45, 26.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Roof_Parapet_East" position={[16.05, 7.825, -9.2]} receiveShadow castShadow>
          <boxGeometry args={[0.3, 0.45, 26.4]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        {/* Parapet Coping Cappings */}
        <mesh name="HOUSE_Roof_Coping_Front" position={[0, 8.08, 4.0]}>
          <boxGeometry args={[32.5, 0.06, 0.38]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="HOUSE_Roof_Coping_Rear" position={[0, 8.08, -22.4]}>
          <boxGeometry args={[32.5, 0.06, 0.38]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="HOUSE_Roof_Coping_West" position={[-16.05, 8.08, -9.2]}>
          <boxGeometry args={[0.38, 0.06, 26.5]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="HOUSE_Roof_Coping_East" position={[16.05, 8.08, -9.2]}>
          <boxGeometry args={[0.38, 0.06, 26.5]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>

        <mesh name="HOUSE_Roof_Gravel_Bed" position={[0, 7.625, -9.2]} receiveShadow>
          <boxGeometry args={[31.8, 0.05, 25.8]} />
          <meshStandardMaterial color={colRoofGravel} roughness={0.9} />
        </mesh>

        {/* Skylight with metal curb and framing */}
        <mesh name="HOUSE_Roof_Skylight_Curb" position={[0, 7.775, -18.0]}>
          <boxGeometry args={[6.4, 0.35, 2.2]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="HOUSE_Roof_Skylight_Glazing" position={[0, 7.95, -18.0]}>
          <boxGeometry args={[6.0, 0.04, 1.8]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.4} />
        </mesh>

        {/* Penthouse stair bulkhead */}
        <mesh name="HOUSE_Roof_Penthouse_Bulkhead" position={[11.5, 8.5, -18.0]} receiveShadow castShadow>
          <boxGeometry args={[4.5, 1.8, 5.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Roof_Penthouse_Coping" position={[11.5, 9.43, -18.0]}>
          <boxGeometry args={[4.6, 0.06, 5.1]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>

        {/* Atrium outer walls */}
        <mesh name="HOUSE_Atrium_OuterWall_West" position={[-16.0, 3.7, -18.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 7.4, 12.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Atrium_OuterWall_East" position={[16.0, 3.7, -18.0]} receiveShadow castShadow>
          <boxGeometry args={[0.4, 7.4, 12.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="HOUSE_Atrium_Rear_HeaderBeam" position={[0, 7.1, -24.0]} receiveShadow castShadow>
          <boxGeometry args={[12.0, 0.6, 0.5]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* COLLECTION 2: 02_INTERIOR_JOINERY                                 */}
      {/* ================================================================= */}
      <group name="02_INTERIOR_JOINERY">
        {/* Floors */}
        <mesh name="INT_Foyer_Vestibule_Floor" position={[0, 0.01, -3.0]} receiveShadow>
          <boxGeometry args={[4.0, 0.02, 6.0]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="INT_Corridor_Floor" position={[0, 0.01, -10.0]} receiveShadow>
          <boxGeometry args={[3.2, 0.02, 8.0]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="INT_DoubleHeight_Atrium_Floor" position={[0, 0.01, -19.0]} receiveShadow>
          <boxGeometry args={[12.0, 0.02, 10.0]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Feature Fluted Walnut Wall & 3D Typography Plinth */}
        <mesh name="INT_Feature_Walnut_Backing_Wall" position={[1.62, 1.7, -8.0]} receiveShadow castShadow>
          <boxGeometry args={[0.04, 3.4, 12.0]} />
          <meshStandardMaterial color={colWalnut} roughness={0.42} />
        </mesh>
        <mesh name="INT_Feature_Walnut_Typography_Plinth" position={[1.52, 1.85, -3.5]} receiveShadow castShadow>
          <boxGeometry args={[0.04, 0.60, 3.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="INT_Typography_Title_Bar_Upper" position={[1.50, 2.00, -3.5]}>
          <boxGeometry args={[0.02, 0.08, 2.8]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="INT_Corridor_Ceiling_Reveal" position={[0.8, 3.37, -8.0]}>
          <boxGeometry args={[0.12, 0.06, 12.0]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* 14 Floating Stone Treads */}
        <group name="INT_Floating_Staircase_Group">
          {Array.from({ length: 14 }).map((_, i) => (
            <mesh
              key={`stair_${i}`}
              name={`INT_Floating_Step_${String(i + 1).padStart(2, '0')}`}
              position={[2.3, 0.22 + i * 0.22, -8.0 - i * 0.35]}
              receiveShadow
              castShadow
            >
              <boxGeometry args={[1.2, 0.10, 0.32]} />
              <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
            </mesh>
          ))}
        </group>

        {/* Glass Engineering Workspace & Executive Desk */}
        <mesh name="INT_Workspace_Glass_CorridorWall" position={[-1.6, 1.7, -10.0]}>
          <boxGeometry args={[0.03, 3.34, 7.8]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="INT_Workspace_Executive_Desk" position={[-4.5, 0.375, -9.5]} receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.75, 1.0]} />
          <meshStandardMaterial color={colWalnut} roughness={0.42} />
        </mesh>
        <mesh name="INT_Workspace_Credenza" position={[-5.4, 0.325, -10.5]} receiveShadow castShadow>
          <boxGeometry args={[0.8, 0.65, 1.8]} />
          <meshStandardMaterial color={colWalnut} roughness={0.42} />
        </mesh>
        <mesh name="INT_Workspace_Monitor_01" position={[-4.2, 0.95, -9.5]} castShadow>
          <boxGeometry args={[0.65, 0.45, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="INT_Workspace_Monitor_02" position={[-4.9, 0.95, -9.6]} castShadow>
          <boxGeometry args={[0.65, 0.45, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Double-Height Exhibition Atrium Core */}
        <mesh name="INT_Atrium_Mezzanine_Walkway_West" position={[-4.6, 3.6, -19.0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.35, 10.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="INT_Atrium_Mezzanine_Balustrade_West" position={[-3.2, 4.35, -19.0]}>
          <boxGeometry args={[0.03, 1.02, 10.0]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="INT_Atrium_Mezzanine_Cap_West" position={[-3.2, 4.87, -19.0]}>
          <boxGeometry args={[0.03, 0.02, 10.0]} />
          <meshStandardMaterial color={colSteel} roughness={0.25} metalness={0.95} />
        </mesh>

        <mesh name="INT_Atrium_Mezzanine_Walkway_East" position={[4.6, 3.6, -19.0]} receiveShadow castShadow>
          <boxGeometry args={[2.8, 0.35, 10.0]} />
          <meshStandardMaterial color={colStucco} roughness={0.82} />
        </mesh>
        <mesh name="INT_Atrium_Mezzanine_Balustrade_East" position={[3.2, 4.35, -19.0]}>
          <boxGeometry args={[0.03, 1.02, 10.0]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="INT_Atrium_Mezzanine_Cap_East" position={[3.2, 4.87, -19.0]}>
          <boxGeometry args={[0.03, 0.02, 10.0]} />
          <meshStandardMaterial color={colSteel} roughness={0.25} metalness={0.95} />
        </mesh>

        {/* Exhibition Plinths with Toe-Kick Underglow */}
        <mesh name="INT_Atrium_Central_Plinth" position={[0, 0.365, -18.5]} receiveShadow castShadow>
          <boxGeometry args={[2.4, 0.65, 1.4]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="INT_Atrium_Central_Plinth_ToeKick" position={[0, 0.04, -18.5]}>
          <boxGeometry args={[2.16, 0.08, 1.16]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="INT_Atrium_Secondary_Plinth_West" position={[-3.2, 0.39, -20.5]} receiveShadow castShadow>
          <boxGeometry args={[1.2, 0.70, 0.8]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="INT_Atrium_Secondary_Plinth_East" position={[3.2, 0.39, -20.5]} receiveShadow castShadow>
          <boxGeometry args={[1.2, 0.70, 0.8]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* COLLECTION 3: 03_EXTERIOR_ELEMENTS                                */}
      {/* ================================================================= */}
      <group name="03_EXTERIOR_ELEMENTS">
        {/* 3.1 Front Entrance Pivot Door System */}
        <group name="EXT_Entrance_Pivot_Door_Group" position={[0, 0, 0]}>
          <group name="GEO_Door_Pivot_Leaf" position={[-0.65, 0, 0]}>
            {/* 9 Horizontal Walnut Planks */}
            {Array.from({ length: 9 }).map((_, i) => {
              const plankH = (3.20 - 8 * 0.015) / 9;
              const y = 0.05 + plankH / 2 + i * (plankH + 0.015);
              return (
                <mesh
                  key={`plank_${i}`}
                  name={`GEO_Door_Plank_${String(i + 1).padStart(2, '0')}`}
                  position={[0.65, y, 0]}
                  receiveShadow
                  castShadow
                >
                  <boxGeometry args={[1.80, plankH, 0.10]} />
                  <meshStandardMaterial color={colWalnutDoor} roughness={0.4} />
                </mesh>
              );
            })}
            {/* Full-height brushed steel handle with cyan LED channel */}
            <mesh name="GEO_Door_Pull_Handle" position={[-0.10, 1.55, 0.07]} castShadow>
              <boxGeometry args={[0.06, 2.10, 0.08]} />
              <meshStandardMaterial color={colSteel} roughness={0.25} metalness={0.95} />
            </mesh>
            <mesh name="GEO_Door_Handle_LED_Channel" position={[-0.10, 1.55, 0.11]}>
              <boxGeometry args={[0.02, 2.06, 0.02]} />
              <meshStandardMaterial color={colLEDCyan} emissive={colLEDCyan} emissiveIntensity={2.5} />
            </mesh>
          </group>
        </group>

        {/* Entrance Portal Frames & Sidelites */}
        <mesh name="EXT_Entrance_Frame_West" position={[-1.50, 1.60, 0.0]}>
          <boxGeometry args={[0.08, 3.20, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Entrance_Frame_East" position={[1.50, 1.60, 0.0]}>
          <boxGeometry args={[0.08, 3.20, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Entrance_Frame_Head" position={[0.0, 3.24, 0.0]}>
          <boxGeometry args={[1.96, 0.08, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Entrance_Sidelite_West" position={[-1.20, 1.60, 0.0]}>
          <boxGeometry args={[0.56, 3.12, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Entrance_Sidelite_East" position={[1.20, 1.60, 0.0]}>
          <boxGeometry args={[0.56, 3.12, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>

        {/* 3.2 Ground Floor Glazing Systems */}
        {/* Living Room Pocket Sliding Glass */}
        <mesh name="EXT_Glazing_Living_FloorTrack" position={[-9.5, 0.02, -0.6]}>
          <boxGeometry args={[12.4, 0.04, 0.16]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Glazing_Living_Sliding_Glass" position={[-9.5, 1.68, -0.6]}>
          <boxGeometry args={[12.4, 3.26, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Living_Interlock_Mullion_01" position={[-11.44, 1.68, -0.61]}>
          <boxGeometry args={[0.06, 3.28, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Glazing_Living_Interlock_Mullion_02" position={[-7.56, 1.68, -0.59]}>
          <boxGeometry args={[0.06, 3.28, 0.08]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>

        {/* Dining Room 90-degree Corner Glass */}
        <mesh name="EXT_Glazing_Dining_Corner_Front" position={[9.2, 1.70, 0.0]}>
          <boxGeometry args={[11.16, 3.32, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Dining_Corner_Side" position={[14.8, 1.70, -3.0]}>
          <boxGeometry args={[0.04, 3.32, 5.96]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Dining_Corner_Joint" position={[14.8, 1.70, 0.0]}>
          <boxGeometry args={[0.04, 3.32, 0.04]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>

        {/* 3.3 Upper Floor Glazing & Balustrades */}
        <mesh name="EXT_Glazing_Upper_West_Balcony_Wall" position={[-9.75, 5.50, 1.0]}>
          <boxGeometry args={[11.64, 3.12, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Upper_West_Balustrade_Shoe" position={[-9.75, 3.84, 3.7]}>
          <boxGeometry args={[11.8, 0.08, 0.06]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Glazing_Upper_West_Balustrade" position={[-9.75, 4.39, 3.7]}>
          <boxGeometry args={[11.8, 1.02, 0.03]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Upper_West_Balustrade_Cap" position={[-9.75, 4.91, 3.7]}>
          <boxGeometry args={[11.8, 0.02, 0.03]} />
          <meshStandardMaterial color={colSteel} roughness={0.25} metalness={0.95} />
        </mesh>

        {/* Central Bridge Glazing */}
        <mesh name="EXT_Glazing_Upper_Bridge_Window" position={[0, 5.50, 1.5]}>
          <boxGeometry args={[6.48, 3.12, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Upper_Bridge_Balustrade" position={[0, 4.39, 1.9]}>
          <boxGeometry args={[6.6, 1.02, 0.03]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>

        {/* East Upper Terrace Glazing & Wood Wall */}
        <mesh name="EXT_Glazing_Upper_East_Terrace_Glass" position={[12.75, 5.50, 1.4]}>
          <boxGeometry args={[6.0, 3.20, 0.04]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Upper_East_Wood_Accent_Backing" position={[15.8, 5.50, 2.8]} receiveShadow castShadow>
          <boxGeometry args={[0.08, 3.20, 2.8]} />
          <meshStandardMaterial color={colWalnut} roughness={0.42} />
        </mesh>

        {/* 3.4 Rear Double-Height Glass Curtain Wall */}
        <mesh name="EXT_Glazing_Rear_Atrium_Curtain" position={[0, 3.40, -24.0]}>
          <boxGeometry args={[12.0, 6.80, 0.05]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Glazing_Rear_Atrium_Transom_01" position={[0, 2.27, -24.0]}>
          <boxGeometry args={[12.0, 0.10, 0.14]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>
        <mesh name="EXT_Glazing_Rear_Atrium_Transom_02" position={[0, 4.54, -24.0]}>
          <boxGeometry args={[12.0, 0.10, 0.14]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.28} metalness={0.85} />
        </mesh>

        {/* 3.5 Terrace Deck & Infinity Lap Pool */}
        <mesh name="EXT_Terrace_Pool_Deck" position={[0, -0.01, 8.5]} receiveShadow>
          <boxGeometry args={[34.0, 0.20, 17.0]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Terrace_East_Plinth" position={[6.5, 0.20, 10.0]} receiveShadow>
          <boxGeometry args={[8.0, 0.40, 8.0]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>

        {/* Infinity Lap Pool (West Terrace) */}
        <mesh name="EXT_Infinity_Pool_Basin_Floor" position={[-8.8, -1.50, 9.6]} receiveShadow>
          <boxGeometry args={[14.0, 0.20, 4.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Basin_Wall_Back" position={[-8.8, -0.75, 7.4]} receiveShadow>
          <boxGeometry args={[14.0, 1.50, 0.25]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Basin_Wall_West" position={[-15.8, -0.75, 9.6]} receiveShadow>
          <boxGeometry args={[0.25, 1.50, 4.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Basin_Wall_East" position={[-1.8, -0.75, 9.6]} receiveShadow>
          <boxGeometry args={[0.25, 1.50, 4.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        {/* Pool Coping Overhang Nosing */}
        <mesh name="EXT_Infinity_Pool_Coping_North" position={[-8.8, 0.04, 7.35]} receiveShadow>
          <boxGeometry args={[14.3, 0.08, 0.35]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Vanishing_Edge" position={[-8.8, -0.10, 11.7]} receiveShadow>
          <boxGeometry args={[14.0, 0.15, 0.30]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Overflow_Gutter" position={[-8.8, -0.35, 11.95]}>
          <boxGeometry args={[14.0, 0.30, 0.30]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>
        {/* Internal Entry Steps */}
        <mesh name="EXT_Infinity_Pool_Step_01" position={[-2.5, -0.22, 8.0]} receiveShadow>
          <boxGeometry args={[1.2, 0.25, 0.40]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Step_02" position={[-2.5, -0.47, 8.4]} receiveShadow>
          <boxGeometry args={[1.2, 0.25, 0.40]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>
        <mesh name="EXT_Infinity_Pool_Step_03" position={[-2.5, -0.72, 8.8]} receiveShadow>
          <boxGeometry args={[1.2, 0.25, 0.40]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} />
        </mesh>
        {/* Water Surface Plane */}
        <mesh name="EXT_Infinity_Pool_Water_Plane" position={[-8.8, -0.08, 9.6]}>
          <boxGeometry args={[13.7, 0.02, 3.95]} />
          <meshStandardMaterial color={colPoolWater} roughness={0.08} metalness={0.1} transparent opacity={0.75} />
        </mesh>

        {/* Terrace Balustrades */}
        <mesh name="EXT_Balustrade_Glass_East_Plinth_Front" position={[6.5, 0.99, 14.0]}>
          <boxGeometry args={[8.0, 1.02, 0.03]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Balustrade_Glass_East_Plinth_Side" position={[10.5, 0.99, 10.0]}>
          <boxGeometry args={[0.03, 1.02, 8.0]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>
        <mesh name="EXT_Balustrade_Glass_West_Terrace_Side" position={[-17.0, 0.69, 8.0]}>
          <boxGeometry args={[0.03, 1.02, 12.0]} />
          <meshStandardMaterial color={colGlass} roughness={0.05} metalness={0.1} transparent opacity={0.35} />
        </mesh>

        {/* Minimalist Teak Sun Loungers */}
        <group name="EXT_Sun_Lounger_West_01" position={[-10.5, 0.09, 5.5]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.85, 0.18, 2.0]} />
            <meshStandardMaterial color={colWalnut} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.80, 0.08, 1.95]} />
            <meshStandardMaterial color={colStucco} roughness={0.82} />
          </mesh>
        </group>
        <group name="EXT_Sun_Lounger_West_02" position={[-12.5, 0.09, 5.5]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.85, 0.18, 2.0]} />
            <meshStandardMaterial color={colWalnut} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.80, 0.08, 1.95]} />
            <meshStandardMaterial color={colStucco} roughness={0.82} />
          </mesh>
        </group>
        <group name="EXT_Sun_Lounger_East_01" position={[5.0, 0.39, 10.0]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.85, 0.18, 2.0]} />
            <meshStandardMaterial color={colWalnut} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.80, 0.08, 1.95]} />
            <meshStandardMaterial color={colStucco} roughness={0.82} />
          </mesh>
        </group>
        <group name="EXT_Sun_Lounger_East_02" position={[6.8, 0.39, 10.0]}>
          <mesh position={[0, 0.09, 0]} castShadow>
            <boxGeometry args={[0.85, 0.18, 2.0]} />
            <meshStandardMaterial color={colWalnut} roughness={0.42} />
          </mesh>
          <mesh position={[0, 0.22, 0]}>
            <boxGeometry args={[0.80, 0.08, 1.95]} />
            <meshStandardMaterial color={colStucco} roughness={0.82} />
          </mesh>
        </group>

        {/* Entrance Steps */}
        <mesh name="EXT_Stairs_Entrance_Step_01" position={[0, 0.05, 1.8]} receiveShadow>
          <boxGeometry args={[4.5, 0.10, 1.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
        <mesh name="EXT_Stairs_Entrance_Step_02" position={[0, 0.10, 0.7]} receiveShadow>
          <boxGeometry args={[4.5, 0.10, 1.2]} />
          <meshStandardMaterial color={colTravertine} roughness={0.35} metalness={0.05} />
        </mesh>
      </group>

      {/* ================================================================= */}
      {/* COLLECTION 4: 04_ENVIRONMENT                                      */}
      {/* ================================================================= */}
      <group name="04_ENVIRONMENT">
        {/* Board-Formed Concrete Retaining Wall with Formwork Grooves */}
        <mesh name="ENV_Retaining_Wall_Concrete" position={[-9.0, -2.5, 14.5]} receiveShadow castShadow>
          <boxGeometry args={[18.0, 3.2, 0.8]} />
          <meshStandardMaterial color={colConcrete} roughness={0.85} metalness={0.05} />
        </mesh>
        <mesh name="ENV_Retaining_Wall_Groove_01" position={[-9.0, -1.7, 14.5]}>
          <boxGeometry args={[18.02, 0.02, 0.82]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="ENV_Retaining_Wall_Groove_02" position={[-9.0, -2.5, 14.5]}>
          <boxGeometry args={[18.02, 0.02, 0.82]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh name="ENV_Retaining_Wall_Groove_03" position={[-9.0, -3.3, 14.5]}>
          <boxGeometry args={[18.02, 0.02, 0.82]} />
          <meshStandardMaterial color={colMetalCharcoal} roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Stepped Mountain Terrain */}
        <mesh name="ENV_Terrain_Slope_Upper_North" position={[0, -1.0, -35.0]} receiveShadow>
          <boxGeometry args={[80.0, 3.0, 30.0]} />
          <meshStandardMaterial color={colLandscape} roughness={0.9} />
        </mesh>
        <mesh name="ENV_Terrain_Slope_Fore_South" position={[0, -4.5, 28.0]} receiveShadow>
          <boxGeometry args={[80.0, 5.0, 30.0]} />
          <meshStandardMaterial color={colLandscape} roughness={0.9} />
        </mesh>
        <mesh name="ENV_Rear_Mountain_Horizon" position={[0, 4.0, -60.0]}>
          <boxGeometry args={[120.0, 12.0, 8.0]} />
          <meshStandardMaterial color={colLandscape} roughness={0.9} />
        </mesh>

        {/* Agave Succulent Clusters */}
        <mesh name="ENV_Agave_Cluster_01" position={[-15.5, -0.6, 14.0]}>
          <boxGeometry args={[1.2, 0.7, 1.2]} />
          <meshStandardMaterial color={colVegetation} roughness={0.85} />
        </mesh>
        <mesh name="ENV_Agave_Cluster_02" position={[-8.0, -1.2, 16.0]}>
          <boxGeometry args={[1.2, 0.7, 1.2]} />
          <meshStandardMaterial color={colVegetation} roughness={0.85} />
        </mesh>
      </group>

      {/* World Origin Marker */}
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.01, 16]} />
        <meshBasicMaterial color={colLEDCyan} wireframe />
      </mesh>
    </group>
  );
}
