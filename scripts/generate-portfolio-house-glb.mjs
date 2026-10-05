import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Node.js FileReader polyfill for Three.js GLTFExporter
class FileReaderPolyfill {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
}
globalThis.FileReader = FileReaderPolyfill;

async function generatePortfolioHouseGLB() {
  console.log('='.repeat(70));
  console.log(' SANTRO M2 — THE PORTFOLIO HOUSE ARCHITECTURAL BLOCKOUT GENERATOR');
  console.log('='.repeat(70));

  const THREE = await import('three');
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

  const rootScene = new THREE.Scene();
  rootScene.name = 'THE_PORTFOLIO_HOUSE_SCENE';

  // Master Root Node
  const houseRoot = new THREE.Group();
  houseRoot.name = 'HOUSE_Master_Root';
  rootScene.add(houseRoot);

  // =========================================================================
  // 1. PBR MATERIALS DEFINITION (Ref: REFERENCE_ANALYSIS.md / Section 6)
  // =========================================================================
  const matFacadeStucco = new THREE.MeshStandardMaterial({
    name: 'MAT_Facade_Stucco',
    color: 0xECEBE4,
    roughness: 0.82,
    metalness: 0.0,
  });

  const matTravertineFloor = new THREE.MeshStandardMaterial({
    name: 'MAT_Travertine_Floor',
    color: 0xDDD6C8,
    roughness: 0.35,
    metalness: 0.05,
  });

  const matWalnutWood = new THREE.MeshStandardMaterial({
    name: 'MAT_Walnut_Wood',
    color: 0x5A3825,
    roughness: 0.42,
    metalness: 0.0,
  });

  const matWalnutDoor = new THREE.MeshStandardMaterial({
    name: 'MAT_Walnut_Door',
    color: 0x6B4423,
    roughness: 0.40,
    metalness: 0.0,
  });

  const matGlassFrameless = new THREE.MeshStandardMaterial({
    name: 'MAT_Glass_Frameless',
    color: 0xE8F4F8,
    roughness: 0.05,
    metalness: 0.1,
    transparent: true,
    opacity: 0.35,
  });

  const matMetalCharcoal = new THREE.MeshStandardMaterial({
    name: 'MAT_Metal_Charcoal',
    color: 0x1F1F21,
    roughness: 0.28,
    metalness: 0.85,
  });

  const matSteelBrushed = new THREE.MeshStandardMaterial({
    name: 'MAT_Steel_Brushed',
    color: 0xC0C0C4,
    roughness: 0.25,
    metalness: 0.95,
  });

  const matPoolWater = new THREE.MeshStandardMaterial({
    name: 'MAT_Pool_Water',
    color: 0x38A3A5,
    roughness: 0.08,
    metalness: 0.1,
    transparent: true,
    opacity: 0.75,
  });

  const matConcreteFoundation = new THREE.MeshStandardMaterial({
    name: 'MAT_Concrete_Foundation',
    color: 0x8B8A85,
    roughness: 0.85,
    metalness: 0.05,
  });

  const matLandscapeArid = new THREE.MeshStandardMaterial({
    name: 'MAT_Landscape_Arid',
    color: 0x8A795D,
    roughness: 0.90,
    metalness: 0.0,
  });

  const matVegetationGreen = new THREE.MeshStandardMaterial({
    name: 'MAT_Vegetation_Green',
    color: 0x4D533C,
    roughness: 0.85,
    metalness: 0.0,
  });

  const matLEDCyan = new THREE.MeshStandardMaterial({
    name: 'MAT_LED_Cyan',
    color: 0x00F0FF,
    emissive: 0x00F0FF,
    emissiveIntensity: 2.5,
    roughness: 0.1,
    metalness: 0.0,
  });

  const matRoofGravel = new THREE.MeshStandardMaterial({
    name: 'MAT_Roof_Gravel',
    color: 0x9B9A95,
    roughness: 0.90,
    metalness: 0.0,
  });

  // Helper function to create a box mesh
  function createBox(name, size, pos, material) {
    const geom = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const mesh = new THREE.Mesh(geom, material);
    mesh.name = name;
    mesh.position.set(pos[0], pos[1], pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  // =========================================================================
  // COLLECTION 1: 01_ARCHITECTURE
  // Primary structural shells, slabs, cantilever volumes, roof, and perimeter
  // =========================================================================
  const colArchitecture = new THREE.Group();
  colArchitecture.name = '01_ARCHITECTURE';
  houseRoot.add(colArchitecture);

  // 1.1 Foundation Substructure & Plinth
  // Main foundation block under house and terrace
  colArchitecture.add(
    createBox('HOUSE_Plinth_Foundation', [36.0, 1.8, 38.0], [0, -0.9, -6.0], matConcreteFoundation)
  );

  // Stepped lower foundation retaining plinth extending southwest
  colArchitecture.add(
    createBox('HOUSE_Plinth_Retaining_Step', [28.0, 2.6, 22.0], [-4.0, -2.2, 8.0], matConcreteFoundation)
  );

  // 1.2 Structural Floor Slabs
  // Ground floor structural slab (Y = -0.2m, thickness 0.4m)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Ground', [32.0, 0.4, 24.0], [0, -0.2, -12.0], matConcreteFoundation)
  );

  // Upper floor slabs (Y = 3.6m, thickness 0.4m, with central double-height atrium opening)
  // Left upper slab (over living wing & forward cantilever to Z = +3.8)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_West', [12.5, 0.4, 15.8], [-9.75, 3.6, -4.1], matFacadeStucco)
  );

  // Right upper slab (over dining wing & forward cantilever to Z = +4.2)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_East', [12.5, 0.4, 16.2], [+9.75, 3.6, -3.9], matFacadeStucco)
  );

  // Central connecting bridge upper slab (recessed to Z = +1.4)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_Bridge', [7.0, 0.4, 7.4], [0, 3.6, -2.3], matFacadeStucco)
  );

  // Rear terrace slab (North side)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Rear_Terrace', [24.0, 0.4, 8.0], [0, -0.2, -28.0], matConcreteFoundation)
  );

  // 1.3 Ground Floor Architectural Masses
  // West Living Wing perimeter walls
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_WestWall', [0.4, 3.4, 12.0], [-16.0, 1.7, -6.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_BackWall', [13.0, 3.4, 0.4], [-9.5, 1.7, -12.0], matFacadeStucco)
  );

  // Entrance Foyer Portal Framing Columns (flanking the pivot door & sidelites)
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Column_West', [0.6, 3.4, 0.6], [-1.8, 1.7, 0.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Column_East', [0.6, 3.4, 0.6], [+1.8, 1.7, 0.0], matFacadeStucco)
  );
  // Foyer entrance soffit lintel
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Soffit', [4.2, 0.4, 1.2], [0, 3.2, 0.0], matFacadeStucco)
  );

  // East Dining Wing perimeter walls
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_EastWall', [0.4, 3.4, 12.0], [+16.0, 1.7, -6.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_BackWall', [13.0, 3.4, 0.4], [+9.5, 1.7, -12.0], matFacadeStucco)
  );

  // 1.4 Upper Floor Cantilever Boxes (The defining signature massing)
  // West Cantilever Box: Projects 3.8m forward beyond ground wall (to Z = +3.8m)
  // Left side wall
  colArchitecture.add(
    createBox('HOUSE_Upper_West_SideWall', [0.4, 3.6, 15.8], [-16.0, 5.6, -4.1], matFacadeStucco)
  );
  // Right inner wall
  colArchitecture.add(
    createBox('HOUSE_Upper_West_InnerWall', [0.4, 3.6, 15.8], [-3.5, 5.6, -4.1], matFacadeStucco)
  );
  // Front upper cantilever header beam
  colArchitecture.add(
    createBox('HOUSE_Upper_West_HeaderBeam', [12.5, 0.6, 0.8], [-9.75, 7.1, +3.4], matFacadeStucco)
  );
  // Bottom cantilever projection soffit mass
  colArchitecture.add(
    createBox('HOUSE_Upper_West_BottomSoffit', [12.5, 0.4, 3.8], [-9.75, 3.6, +1.9], matFacadeStucco)
  );
  // Inset bedroom/studio rear wall
  colArchitecture.add(
    createBox('HOUSE_Upper_West_InsetWall', [12.1, 3.4, 0.3], [-9.75, 5.5, +0.9], matFacadeStucco)
  );

  // East Cantilever Box: Projects 4.2m forward beyond dining wall (to Z = +4.2m)
  // Left inner wall
  colArchitecture.add(
    createBox('HOUSE_Upper_East_InnerWall', [0.4, 3.6, 16.2], [+3.5, 5.6, -3.9], matFacadeStucco)
  );
  // Right outer wall
  colArchitecture.add(
    createBox('HOUSE_Upper_East_OuterWall', [0.4, 3.6, 16.2], [+16.0, 5.6, -3.9], matFacadeStucco)
  );
  // Solid front left panel (prominent white cubic face visible in frame 000 & 070)
  colArchitecture.add(
    createBox('HOUSE_Upper_East_FrontSolidFace', [6.0, 3.6, 0.5], [+6.5, 5.6, +3.95], matFacadeStucco)
  );
  // Header beam over the right recessed terrace
  colArchitecture.add(
    createBox('HOUSE_Upper_East_HeaderBeam', [6.5, 0.6, 0.5], [+12.75, 7.1, +3.95], matFacadeStucco)
  );
  // Bottom cantilever projection soffit mass
  colArchitecture.add(
    createBox('HOUSE_Upper_East_BottomSoffit', [12.5, 0.4, 4.2], [+9.75, 3.6, +2.1], matFacadeStucco)
  );

  // Central Recessed Upper Bridge Volume (recessed 2.4m back from front cantilevers)
  colArchitecture.add(
    createBox('HOUSE_Upper_Bridge_Header', [6.6, 0.5, 0.4], [0, 7.15, +1.4], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_Bridge_BackWall', [6.6, 3.4, 0.3], [0, 5.5, -6.0], matFacadeStucco)
  );

  // 1.5 Roof Structure & Bulkheads
  // Main Roof Slab (Y = 7.4m, thickness 0.4m)
  colArchitecture.add(
    createBox('HOUSE_Roof_Main_Slab', [32.4, 0.4, 26.4], [0, 7.4, -9.2], matFacadeStucco)
  );
  // Perimeter Roof Parapet (0.45m height above roof slab, Y = 7.825m)
  colArchitecture.add(
    createBox('HOUSE_Roof_Parapet_Front', [32.4, 0.45, 0.3], [0, 7.825, +4.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Parapet_Rear', [32.4, 0.45, 0.3], [0, 7.825, -22.4], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Parapet_West', [0.3, 0.45, 26.4], [-16.05, 7.825, -9.2], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Parapet_East', [0.3, 0.45, 26.4], [+16.05, 7.825, -9.2], matFacadeStucco)
  );
  // Gravel Ballast Deck Surface
  colArchitecture.add(
    createBox('HOUSE_Roof_Gravel_Bed', [31.8, 0.05, 25.8], [0, 7.625, -9.2], matRoofGravel)
  );

  // Central Roof Skylight Curb & Glass Array (over atrium)
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Curb', [6.4, 0.35, 2.2], [0, 7.775, -18.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Glazing', [6.0, 0.05, 1.8], [0, 7.95, -18.0], matGlassFrameless)
  );

  // Rear-East Stair Penthouse / Bulkhead (as visible in frame 000)
  colArchitecture.add(
    createBox('HOUSE_Roof_Penthouse_Bulkhead', [4.5, 1.8, 5.0], [+11.5, 8.5, -18.0], matFacadeStucco)
  );

  // Rear double-height perimeter shell enclosing the atrium sides
  colArchitecture.add(
    createBox('HOUSE_Atrium_OuterWall_West', [0.4, 7.4, 12.0], [-16.0, 3.7, -18.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Atrium_OuterWall_East', [0.4, 7.4, 12.0], [+16.0, 3.7, -18.0], matFacadeStucco)
  );
  // Rear portal header beam across double-height vista
  colArchitecture.add(
    createBox('HOUSE_Atrium_Rear_HeaderBeam', [12.0, 0.6, 0.5], [0, 7.1, -24.0], matFacadeStucco)
  );

  // East Boundary Property Wall (connecting to hillside, frames 000 & 239)
  colArchitecture.add(
    createBox('HOUSE_East_Boundary_Wall', [8.0, 2.4, 0.3], [+20.0, 1.2, -18.0], matFacadeStucco)
  );

  // =========================================================================
  // COLLECTION 2: 02_INTERIOR_JOINERY
  // Foyer, circulation corridor, walnut batten wall, floating stairs,
  // glass workspace desk, double-height atrium core, plinths, mezzanines
  // =========================================================================
  const colInterior = new THREE.Group();
  colInterior.name = '02_INTERIOR_JOINERY';
  houseRoot.add(colInterior);

  // 2.1 Flooring Planes
  // Foyer limestone floor (Z: 0.0 to -6.0)
  colInterior.add(
    createBox('INT_Foyer_Vestibule_Floor', [4.0, 0.02, 6.0], [0, 0.01, -3.0], matTravertineFloor)
  );
  // Central gallery corridor limestone floor (Z: -6.0 to -14.0)
  colInterior.add(
    createBox('INT_Corridor_Floor', [3.2, 0.02, 8.0], [0, 0.01, -10.0], matTravertineFloor)
  );
  // Double-height atrium limestone floor (Z: -14.0 to -24.0)
  colInterior.add(
    createBox('INT_DoubleHeight_Atrium_Floor', [12.0, 0.02, 10.0], [0, 0.01, -19.0], matTravertineFloor)
  );

  // 2.2 Feature Fluted Walnut Wall (Right side of foyer & corridor, frames 108–133)
  colInterior.add(
    createBox('INT_Feature_Walnut_Wall', [0.15, 3.4, 12.0], [+1.6, 1.7, -8.0], matWalnutWood)
  );
  // Architectural signage bar blockout ("THE PORTFOLIO HOUSE")
  colInterior.add(
    createBox('INT_Feature_Walnut_Typography_Plinth', [0.03, 0.8, 3.2], [+1.5, 1.8, -3.5], matTravertineFloor)
  );
  // Recessed ceiling linear lighting reveal channel
  colInterior.add(
    createBox('INT_Corridor_Ceiling_Reveal', [0.12, 0.05, 12.0], [+0.8, 3.38, -8.0], matMetalCharcoal)
  );

  // 2.3 Floating Minimalist Staircase (Right side past wood wall, frames 108 & 133)
  // 14 floating honed stone tread slabs
  const stairStepsGroup = new THREE.Group();
  stairStepsGroup.name = 'INT_Floating_Staircase_Group';
  for (let i = 0; i < 14; i++) {
    const stepZ = -8.0 - i * 0.35;
    const stepY = 0.22 + i * 0.22;
    const step = createBox(
      `INT_Floating_Step_${String(i + 1).padStart(2, '0')}`,
      [1.2, 0.10, 0.32],
      [+2.3, stepY, stepZ],
      matTravertineFloor
    );
    stairStepsGroup.add(step);
  }
  colInterior.add(stairStepsGroup);

  // 2.4 Glass Engineering Workspace (Left side of corridor, frames 132–167)
  // Frameless glass enclosure
  colInterior.add(
    createBox('INT_Workspace_Glass_CorridorWall', [0.03, 3.4, 7.8], [-1.6, 1.7, -10.0], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Workspace_Glass_FrontWall', [6.0, 3.4, 0.03], [-4.6, 1.7, -6.1], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Workspace_Glass_RearWall', [6.0, 3.4, 0.03], [-4.6, 1.7, -13.9], matGlassFrameless)
  );
  // Executive walnut desk
  colInterior.add(
    createBox('INT_Workspace_Executive_Desk', [2.4, 0.75, 1.0], [-4.5, 0.375, -9.5], matWalnutWood)
  );
  // Return credenza
  colInterior.add(
    createBox('INT_Workspace_Credenza', [0.8, 0.65, 1.8], [-5.4, 0.325, -10.5], matWalnutWood)
  );
  // Dual workstation monitor blockouts
  colInterior.add(
    createBox('INT_Workspace_Monitor_01', [0.65, 0.45, 0.08], [-4.2, 0.95, -9.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Monitor_02', [0.65, 0.45, 0.08], [-4.9, 0.95, -9.6], matMetalCharcoal)
  );

  // 2.5 Double-Height Exhibition Atrium Core (Frames 168–214)
  // Left mezzanine gallery walkway
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Walkway_West', [2.8, 0.3, 10.0], [-4.6, 3.6, -19.0], matFacadeStucco)
  );
  // Left mezzanine glass balustrade
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Balustrade_West', [0.03, 1.1, 10.0], [-3.2, 4.3, -19.0], matGlassFrameless)
  );

  // Right mezzanine gallery walkway
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Walkway_East', [2.8, 0.3, 10.0], [+4.6, 3.6, -19.0], matFacadeStucco)
  );
  // Right mezzanine glass balustrade
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Balustrade_East', [0.03, 1.1, 10.0], [+3.2, 4.3, -19.0], matGlassFrameless)
  );

  // Central Monolithic Travertine Exhibition Plinth (Master plinth with warm recessed toe-kick)
  colInterior.add(
    createBox('INT_Atrium_Central_Plinth', [2.4, 0.65, 1.4], [0, 0.325, -18.5], matTravertineFloor)
  );
  colInterior.add(
    createBox('INT_Atrium_Central_Plinth_Base', [2.2, 0.08, 1.2], [0, 0.04, -18.5], matTravertineFloor)
  );

  // Secondary Exhibition Plinths
  colInterior.add(
    createBox('INT_Atrium_Secondary_Plinth_West', [1.2, 0.75, 0.8], [-3.2, 0.375, -20.5], matTravertineFloor)
  );
  colInterior.add(
    createBox('INT_Atrium_Secondary_Plinth_East', [1.2, 0.75, 0.8], [+3.2, 0.375, -20.5], matTravertineFloor)
  );

  // Linear Cove Indirect Lighting Troughs along Atrium Ceilings
  colInterior.add(
    createBox('INT_Atrium_Linear_Cove_West', [0.3, 0.2, 10.0], [-5.85, 6.7, -19.0], matFacadeStucco)
  );
  colInterior.add(
    createBox('INT_Atrium_Linear_Cove_East', [0.3, 0.2, 10.0], [+5.85, 6.7, -19.0], matFacadeStucco)
  );

  // =========================================================================
  // COLLECTION 3: 03_EXTERIOR_ELEMENTS
  // Entrance pivot door (9 horizontal planks, vertical LED handle), sidelites,
  // floor-to-ceiling glass systems, infinity lap pool, terrace deck, loungers, balustrades
  // =========================================================================
  const colExterior = new THREE.Group();
  colExterior.name = '03_EXTERIOR_ELEMENTS';
  houseRoot.add(colExterior);

  // 3.1 Front Entrance Pivot Door System (Frames 070 & 108)
  // Pivot door group with origin at offset pivot hinge: [-0.65, 0, 0] relative to door center
  const doorGroup = new THREE.Group();
  doorGroup.name = 'EXT_Entrance_Pivot_Door_Group';
  doorGroup.position.set(0.0, 0.0, 0.0);

  // Sub-group anchored at the exact hinge pivot axis [-0.65m from door center]
  const doorPivotAnchor = new THREE.Group();
  doorPivotAnchor.name = 'GEO_Door_Pivot_Leaf';
  doorPivotAnchor.position.set(-0.65, 0.0, 0.0);
  doorGroup.add(doorPivotAnchor);

  // 9 horizontal walnut planks with shadow gaps
  const plankCount = 9;
  const totalDoorHeight = 3.20;
  const plankThickness = 0.10;
  const doorWidth = 1.80;
  const gap = 0.015;
  const plankHeight = (totalDoorHeight - (plankCount - 1) * gap) / plankCount;

  for (let i = 0; i < plankCount; i++) {
    const plankY = 0.05 + plankHeight / 2 + i * (plankHeight + gap);
    // Relative to pivot anchor [-0.65, 0, 0], door center is at +0.65m in X
    const plank = createBox(
      `GEO_Door_Plank_${String(i + 1).padStart(2, '0')}`,
      [doorWidth, plankHeight, plankThickness],
      [+0.65, plankY, 0.0],
      matWalnutDoor
    );
    doorPivotAnchor.add(plank);
  }

  // Vertical steel pull handle on left edge of door leaf with illuminated cyan LED channel
  doorPivotAnchor.add(
    createBox('GEO_Door_Pull_Handle', [0.06, 2.10, 0.08], [-0.10, 1.55, 0.07], matSteelBrushed)
  );
  doorPivotAnchor.add(
    createBox('GEO_Door_Handle_LED_Channel', [0.02, 2.06, 0.02], [-0.10, 1.55, 0.11], matLEDCyan)
  );

  colExterior.add(doorGroup);

  // Entrance Sidelite Glazing flanking the pivot door
  colExterior.add(
    createBox('EXT_Entrance_Sidelite_West', [0.60, 3.20, 0.04], [-1.20, 1.60, 0.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Entrance_Sidelite_East', [0.60, 3.20, 0.04], [+1.20, 1.60, 0.0], matGlassFrameless)
  );
  // Sidelite dark bronze metal frames
  colExterior.add(
    createBox('EXT_Entrance_Frame_West', [0.05, 3.20, 0.06], [-1.50, 1.60, 0.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Entrance_Frame_East', [0.05, 3.20, 0.06], [+1.50, 1.60, 0.0], matMetalCharcoal)
  );

  // 3.2 Ground Floor Glazing Systems
  // West living lounge sliding pocket glass wall
  colExterior.add(
    createBox('EXT_Glazing_Living_Sliding_Glass', [12.4, 3.40, 0.04], [-9.5, 1.70, -0.6], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Sliding_Mullions', [12.4, 0.08, 0.10], [-9.5, 1.70, -0.6], matMetalCharcoal)
  );

  // East dining 90-degree corner frameless curtain glass
  colExterior.add(
    createBox('EXT_Glazing_Dining_Corner_Front', [11.2, 3.40, 0.04], [+9.2, 1.70, 0.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Dining_Corner_Side', [0.04, 3.40, 6.0], [+14.8, 1.70, -3.0], matGlassFrameless)
  );

  // 3.3 Upper Floor Glazing Systems
  // West upper cantilever inset glass wall & balustrade
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balcony_Wall', [11.8, 3.20, 0.04], [-9.75, 5.50, +1.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balustrade', [11.8, 1.10, 0.03], [-9.75, 4.35, +3.7], matGlassFrameless)
  );

  // Central upper bridge floor-to-ceiling glass & balustrade
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Window', [6.6, 3.20, 0.04], [0, 5.50, +1.5], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Balustrade', [6.6, 1.10, 0.03], [0, 4.35, +1.9], matGlassFrameless)
  );

  // East upper cantilever recessed terrace glass & horizontal wood accent wall
  colExterior.add(
    createBox('EXT_Glazing_Upper_East_Terrace_Glass', [6.0, 3.20, 0.04], [+12.75, 5.50, +1.4], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Upper_East_Wood_AccentWall', [0.08, 3.20, 2.8], [+15.8, 5.50, +2.8], matWalnutWood)
  );

  // 3.4 Rear Double-Height Glass Curtain Wall (North mountain vista)
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Curtain', [12.0, 6.80, 0.05], [0, 3.40, -24.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Grid_Mullions', [12.0, 0.12, 0.12], [0, 3.40, -24.0], matMetalCharcoal)
  );

  // 3.5 Terrace Deck & Infinity Lap Pool (Frames 000 & 070)
  // Main pool terrace paving deck (travertine tiles)
  colExterior.add(
    createBox('EXT_Terrace_Pool_Deck', [34.0, 0.20, 17.0], [0, -0.01, +8.5], matTravertineFloor)
  );

  // East raised sun lounger plinth (framing walkway on the east side)
  colExterior.add(
    createBox('EXT_Terrace_East_Plinth', [8.0, 0.40, 8.0], [+6.5, +0.20, +10.0], matTravertineFloor)
  );

  // West lounge deck (terrace area behind pool)
  colExterior.add(
    createBox('EXT_Terrace_West_Lounge_Deck', [8.0, 0.20, 6.0], [-12.0, -0.01, +6.0], matTravertineFloor)
  );

  // Infinity Lap Pool (14.0m length x 4.2m width x 1.5m depth)
  // Shifted to West terrace (X center: -8.8m, spanning X: -15.8m to -1.8m, aligned above retaining wall)
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Floor', [14.0, 0.20, 4.2], [-8.8, -1.50, +9.6], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_Back', [14.0, 1.50, 0.2], [-8.8, -0.75, +7.5], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_West', [0.2, 1.50, 4.2], [-15.8, -0.75, +9.6], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_East', [0.2, 1.50, 4.2], [-1.8, -0.75, +9.6], matTravertineFloor)
  );
  // Infinity vanishing overflow edge on front face (Z = +11.7m)
  colExterior.add(
    createBox('EXT_Infinity_Pool_Vanishing_Edge', [14.0, 0.15, 0.3], [-8.8, -0.10, +11.7], matTravertineFloor)
  );
  // Crystalline pool water plane
  colExterior.add(
    createBox('EXT_Infinity_Pool_Water_Plane', [13.8, 0.02, 4.0], [-8.8, -0.08, +9.6], matPoolWater)
  );

  // Frameless glass balustrades around terrace perimeters (preserving clear infinity pool vanishing edge)
  colExterior.add(
    createBox('EXT_Balustrade_Glass_East_Plinth_Front', [8.0, 1.10, 0.03], [+6.5, 0.75, +14.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_East_Plinth_Side', [0.03, 1.10, 8.0], [+10.5, 0.75, +10.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_West_Terrace_Side', [0.03, 1.10, 12.0], [-17.0, 0.55, +8.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_West_Terrace_Front', [4.0, 1.10, 0.03], [-15.0, 0.55, +14.0], matGlassFrameless)
  );

  // Minimalist Teak Sun Loungers (2 pairs)
  // West pair (positioned on west terrace behind pool, matching frame 000)
  colExterior.add(
    createBox('EXT_Sun_Lounger_West_01', [0.85, 0.35, 2.0], [-10.5, 0.175, +5.5], matWalnutWood)
  );
  colExterior.add(
    createBox('EXT_Sun_Lounger_West_02', [0.85, 0.35, 2.0], [-12.5, 0.175, +5.5], matWalnutWood)
  );
  // East pair on raised plinth (matching frame 000)
  colExterior.add(
    createBox('EXT_Sun_Lounger_East_01', [0.85, 0.35, 2.0], [+5.0, 0.475, +10.0], matWalnutWood)
  );
  colExterior.add(
    createBox('EXT_Sun_Lounger_East_02', [0.85, 0.35, 2.0], [+6.8, 0.475, +10.0], matWalnutWood)
  );

  // Exterior Entrance Steps from Pool Terrace to Foyer Threshold
  colExterior.add(
    createBox('EXT_Stairs_Entrance_Step_01', [4.5, 0.10, 1.2], [0, 0.05, +1.8], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Stairs_Entrance_Step_02', [4.5, 0.10, 1.2], [0, 0.10, +0.7], matTravertineFloor)
  );

  // =========================================================================
  // COLLECTION 4: 04_ENVIRONMENT
  // Arid hillside terrain slope, concrete retaining wall, agave clusters,
  // chaparral scrub masses, and rear mountain horizon
  // =========================================================================
  const colEnvironment = new THREE.Group();
  colEnvironment.name = '04_ENVIRONMENT';
  houseRoot.add(colEnvironment);

  // 4.1 Hillside Topography (Sloping terrain grounding the architecture)
  // Stepped terrain planes recreating the rugged mountain slope
  colEnvironment.add(
    createBox('ENV_Terrain_Slope_Upper_North', [80.0, 3.0, 30.0], [0, -1.0, -35.0], matLandscapeArid)
  );
  colEnvironment.add(
    createBox('ENV_Terrain_Slope_Mid_East', [30.0, 4.0, 50.0], [+28.0, -3.0, -5.0], matLandscapeArid)
  );
  colEnvironment.add(
    createBox('ENV_Terrain_Slope_Mid_West', [30.0, 6.0, 50.0], [-28.0, -4.5, -5.0], matLandscapeArid)
  );
  colEnvironment.add(
    createBox('ENV_Terrain_Slope_Fore_South', [80.0, 5.0, 30.0], [0, -4.5, +28.0], matLandscapeArid)
  );

  // 4.2 Exposed Concrete Retaining Wall (Beneath southwest pool terrace, frames 000 & 239)
  colEnvironment.add(
    createBox('ENV_Retaining_Wall_Concrete', [18.0, 3.2, 0.8], [-9.0, -2.5, +14.5], matConcreteFoundation)
  );

  // 4.3 Agave & Succulent Scrub Clusters (Terrace perimeter)
  const agaveGroup = new THREE.Group();
  agaveGroup.name = 'ENV_Landscape_Agave_Clusters';
  const agavePositions = [
    [-15.5, -0.6, +14.0],
    [-13.0, -0.8, +15.5],
    [-8.0, -1.2, +16.0],
    [-3.0, -1.5, +16.5],
    [+15.5, -0.5, +14.5],
    [+17.0, -0.8, +12.0],
    [-17.0, 0.0, +7.0],
    [+17.0, 0.2, +8.0],
  ];
  agavePositions.forEach((pos, idx) => {
    const agave = createBox(
      `ENV_Agave_Cluster_${String(idx + 1).padStart(2, '0')}`,
      [1.2, 0.7, 1.2],
      pos,
      matVegetationGreen
    );
    agaveGroup.add(agave);
  });
  colEnvironment.add(agaveGroup);

  // 4.4 Low Chaparral Scrub Masses (Along the hillside slopes)
  const chaparralGroup = new THREE.Group();
  chaparralGroup.name = 'ENV_Landscape_Chaparral_Bushes';
  const chaparralPositions = [
    [-22.0, -3.0, +18.0],
    [-25.0, -3.8, +8.0],
    [-20.0, -2.2, -8.0],
    [+22.0, -2.0, +16.0],
    [+26.0, -2.5, +5.0],
    [+22.0, -1.5, -10.0],
    [-10.0, -4.0, +25.0],
    [+12.0, -3.8, +25.0],
  ];
  chaparralPositions.forEach((pos, idx) => {
    const bush = createBox(
      `ENV_Chaparral_Bush_${String(idx + 1).padStart(2, '0')}`,
      [2.4, 1.2, 2.4],
      pos,
      matVegetationGreen
    );
    chaparralGroup.add(bush);
  });
  colEnvironment.add(chaparralGroup);

  // 4.5 Distant Rear Mountain Horizon Silhouette (North vista)
  colEnvironment.add(
    createBox('ENV_Rear_Mountain_Horizon', [120.0, 12.0, 8.0], [0, 4.0, -60.0], matLandscapeArid)
  );

  // =========================================================================
  // COLLECTION 5: 05_SYSTEM_ANCHORS
  // Master origin, door hinge pivot, reference camera waypoints (Extras preserved)
  // =========================================================================
  const colAnchors = new THREE.Group();
  colAnchors.name = '05_SYSTEM_ANCHORS';
  houseRoot.add(colAnchors);

  function createAnchorNode(name, pos, extras = {}) {
    // We create an Object3D with userData which serializes to glTF node extras
    const node = new THREE.Object3D();
    node.name = name;
    node.position.set(pos[0], pos[1], pos[2]);
    node.userData = extras;
    return node;
  }

  colAnchors.add(createAnchorNode('ANCHOR_House_Origin', [0, 0, 0], { type: 'ORIGIN', level: 'GROUND' }));
  colAnchors.add(
    createAnchorNode('ANCHOR_Door_Hinge_Pivot', [-0.65, 1.60, 0.0], {
      door_trigger: true,
      pivot_axis: 'Y',
      max_rotation_deg: -85.0,
    })
  );

  // Reference Camera Waypoints (matching CAMERA_SPEC.md exactly)
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot01_Exterior', [4.2, 12.5, 26.0], {
      shot: '01',
      target: [0.0, 3.8, 2.0],
      fov: 48,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot02_Approach', [-1.2, 1.65, 14.8], {
      shot: '02_APPROACH',
      target: [0.0, 1.60, 0.0],
      fov: 54,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot02_DoorThreshold', [0.0, 1.60, 2.2], {
      shot: '02_THRESHOLD',
      target: [0.0, 1.60, -6.0],
      fov: 56,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot02_Foyer', [0.2, 1.60, -1.8], {
      shot: '02_FOYER',
      target: [1.8, 1.60, -4.5],
      fov: 58,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot03_Workspace', [-0.4, 1.60, -7.5], {
      shot: '03_WORKSPACE',
      target: [-3.2, 1.40, -8.0],
      fov: 60,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot04_Atrium', [0.0, 1.60, -11.5], {
      shot: '04_ATRIUM',
      target: [0.0, 1.20, -14.0],
      fov: 54,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot04_RearVista', [0.0, 1.65, -20.5], {
      shot: '04_VISTA',
      target: [0.0, 2.0, -35.0],
      fov: 50,
    })
  );
  colAnchors.add(
    createAnchorNode('WAYPOINT_Shot04_SunsetFinale', [-24.0, 16.0, 36.0], {
      shot: '04_FINALE',
      target: [2.0, 3.5, -4.0],
      fov: 42,
    })
  );

  // =========================================================================
  // EXPORT TO BINARY GLTF (.GLB)
  // =========================================================================
  const outputDir = path.resolve(__dirname, '../public/3d/models');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, 'the_portfolio_house.glb');

  // Count total meshes, triangles, materials
  let totalMeshes = 0;
  let totalTriangles = 0;
  const materialsSet = new Set();

  houseRoot.traverse((child) => {
    if (child.isMesh) {
      totalMeshes++;
      if (child.geometry) {
        const index = child.geometry.index;
        if (index) {
          totalTriangles += index.count / 3;
        } else if (child.geometry.attributes.position) {
          totalTriangles += child.geometry.attributes.position.count / 3;
        }
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => materialsSet.add(m.name));
        } else {
          materialsSet.add(child.material.name);
        }
      }
    }
  });

  console.log(`[Model Stats] Total Meshes: ${totalMeshes}`);
  console.log(`[Model Stats] Total Triangles: ${totalTriangles}`);
  console.log(`[Model Stats] Unique Materials: ${materialsSet.size} (${Array.from(materialsSet).join(', ')})`);

  const exporter = new GLTFExporter();
  exporter.parse(
    rootScene,
    (glbArrayBuffer) => {
      const buffer = Buffer.from(glbArrayBuffer);
      fs.writeFileSync(outputPath, buffer);
      console.log(`[Exporter] Successfully generated ${outputPath}`);
      console.log(`[Exporter] File Size: ${(buffer.length / 1024).toFixed(2)} KB (${buffer.length} bytes)`);
      console.log('='.repeat(70));
    },
    (error) => {
      console.error('[Exporter Error]', error);
      process.exit(1);
    },
    {
      binary: true,
      embedImages: true,
    }
  );
}

generatePortfolioHouseGLB().catch((err) => {
  console.error('[Fatal Error]', err);
  process.exit(1);
});
