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
  console.log(' SANTRO M3 — THE PORTFOLIO HOUSE ARCHITECTURAL DETAIL & REFINEMENT');
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
  // 1. NEUTRAL PBR MATERIALS DEFINITION (Ref: MATERIAL_SPEC.md / Section 6)
  // Preserving strict M3 milestone boundaries: neutral PBR placeholders only.
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
  // Foundation plinths, slabs with reveal drip edges, cantilever shells,
  // parapets with coping caps, skylight with framing, penthouse bulkhead
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

  // Recessed negative reveal groove separating foundation plinth from ground slab
  colArchitecture.add(
    createBox('HOUSE_Plinth_Perimeter_Reveal', [36.2, 0.08, 0.10], [0, -0.04, +10.5], matMetalCharcoal)
  );

  // 1.2 Structural Floor Slabs & Cantilever Edge Profiles
  // Ground floor structural slab (Y = -0.2m, thickness 0.4m)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Ground', [32.0, 0.4, 24.0], [0, -0.2, -12.0], matConcreteFoundation)
  );

  // Upper floor slabs (Y = 3.6m, thickness 0.4m, with central double-height atrium opening)
  // Left upper slab (over living wing & forward cantilever to Z = +3.8m)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_West', [12.5, 0.4, 15.8], [-9.75, 3.6, -4.1], matFacadeStucco)
  );
  // West cantilever underside architectural drip reveal edge
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_West_DripReveal', [12.5, 0.04, 0.06], [-9.75, 3.42, +3.75], matMetalCharcoal)
  );

  // Right upper slab (over dining wing & forward cantilever to Z = +4.2m)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_East', [12.5, 0.4, 16.2], [+9.75, 3.6, -3.9], matFacadeStucco)
  );
  // East cantilever underside architectural drip reveal edge
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_East_DripReveal', [12.5, 0.04, 0.06], [+9.75, 3.42, +4.15], matMetalCharcoal)
  );

  // Central connecting bridge upper slab (recessed to Z = +1.4m)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Upper_Bridge', [7.0, 0.4, 7.4], [0, 3.6, -2.3], matFacadeStucco)
  );

  // Rear terrace slab (North side)
  colArchitecture.add(
    createBox('HOUSE_FloorSlab_Rear_Terrace', [24.0, 0.4, 8.0], [0, -0.2, -28.0], matConcreteFoundation)
  );

  // 1.3 Ground Floor Architectural Masses & Portals
  // West Living Wing perimeter walls
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_WestWall', [0.4, 3.4, 12.0], [-16.0, 1.7, -6.0], matFacadeStucco)
  );
  // Recessed base shadow reveal channel along living room exterior wall
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_BaseReveal', [0.05, 0.06, 12.0], [-15.8, 0.03, -6.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_BackWall', [13.0, 3.4, 0.4], [-9.5, 1.7, -12.0], matFacadeStucco)
  );
  // Overhead header beam framing pocket sliding glass head
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_HeaderBeam', [12.4, 0.4, 0.4], [-9.5, 3.2, -0.6], matFacadeStucco)
  );
  // Recessed pocket wall jamb into which sliding panels retract
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Living_PocketJamb', [0.4, 3.4, 0.6], [-15.8, 1.7, -0.6], matFacadeStucco)
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
    createBox('HOUSE_GroundFloor_Foyer_Soffit', [4.2, 0.4, 1.4], [0, 3.2, 0.0], matFacadeStucco)
  );
  // Canopy soffit architectural shadow reveal groove
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Soffit_Reveal', [4.2, 0.03, 0.04], [0, 3.01, +0.65], matMetalCharcoal)
  );
  // Recessed circular downlight housings in entrance canopy soffit (Frames 070 & 108)
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Downlight_01', [0.18, 0.02, 0.18], [-0.9, 2.99, +0.2], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Foyer_Downlight_02', [0.18, 0.02, 0.18], [+0.9, 2.99, +0.2], matMetalCharcoal)
  );

  // East Dining Wing perimeter walls
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_EastWall', [0.4, 3.4, 12.0], [+16.0, 1.7, -6.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_BackWall', [13.0, 3.4, 0.4], [+9.5, 1.7, -12.0], matFacadeStucco)
  );
  // Overhead corner lintel beams framing the 90-degree corner curtain glass
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_CornerHeader_Front', [11.2, 0.4, 0.4], [+9.2, 3.2, 0.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_GroundFloor_Dining_CornerHeader_Side', [0.4, 0.4, 6.0], [+14.8, 3.2, -3.0], matFacadeStucco)
  );

  // 1.4 Upper Floor Cantilever Boxes (Signature massing with architectural reveals)
  // West Cantilever Box: Projects 3.8m forward beyond ground wall (to Z = +3.8m)
  colArchitecture.add(
    createBox('HOUSE_Upper_West_SideWall', [0.4, 3.6, 15.8], [-16.0, 5.6, -4.1], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_West_InnerWall', [0.4, 3.6, 15.8], [-3.5, 5.6, -4.1], matFacadeStucco)
  );
  // Front upper cantilever header beam
  colArchitecture.add(
    createBox('HOUSE_Upper_West_HeaderBeam', [12.5, 0.6, 0.8], [-9.75, 7.1, +3.4], matFacadeStucco)
  );
  // Underside projection soffit mass
  colArchitecture.add(
    createBox('HOUSE_Upper_West_BottomSoffit', [12.5, 0.4, 3.8], [-9.75, 3.6, +1.9], matFacadeStucco)
  );
  // Underside perimeter shadow reveal groove
  colArchitecture.add(
    createBox('HOUSE_Upper_West_Soffit_Reveal', [12.1, 0.04, 0.04], [-9.75, 3.39, +0.1], matMetalCharcoal)
  );
  // Inset bedroom/studio rear wall with reveal
  colArchitecture.add(
    createBox('HOUSE_Upper_West_InsetWall', [12.1, 3.4, 0.3], [-9.75, 5.5, +0.9], matFacadeStucco)
  );
  // Inset balcony honed travertine floor slab
  colArchitecture.add(
    createBox('HOUSE_Upper_West_Balcony_Floor', [12.1, 0.05, 2.7], [-9.75, 3.82, +2.35], matTravertineFloor)
  );

  // East Cantilever Box: Projects 4.2m forward beyond dining wall (to Z = +4.2m)
  colArchitecture.add(
    createBox('HOUSE_Upper_East_InnerWall', [0.4, 3.6, 16.2], [+3.5, 5.6, -3.9], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_East_OuterWall', [0.4, 3.6, 16.2], [+16.0, 5.6, -3.9], matFacadeStucco)
  );
  // Solid front left panel (prominent white cubic face visible in frame 000 & 070)
  colArchitecture.add(
    createBox('HOUSE_Upper_East_FrontSolidFace', [6.0, 3.6, 0.5], [+6.5, 5.6, +3.95], matFacadeStucco)
  );
  // Architectural horizontal shadow reveals dividing the solid white face into modern panels
  colArchitecture.add(
    createBox('HOUSE_Upper_East_Facade_Reveal_01', [6.02, 0.02, 0.52], [+6.5, 4.8, +3.95], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_East_Facade_Reveal_02', [6.02, 0.02, 0.52], [+6.5, 6.0, +3.95], matMetalCharcoal)
  );
  // Header beam over the right recessed terrace
  colArchitecture.add(
    createBox('HOUSE_Upper_East_HeaderBeam', [6.5, 0.6, 0.5], [+12.75, 7.1, +3.95], matFacadeStucco)
  );
  // Underside projection soffit mass
  colArchitecture.add(
    createBox('HOUSE_Upper_East_BottomSoffit', [12.5, 0.4, 4.2], [+9.75, 3.6, +2.1], matFacadeStucco)
  );
  // Covered terrace travertine floor slab
  colArchitecture.add(
    createBox('HOUSE_Upper_East_Terrace_Floor', [6.0, 0.05, 2.7], [+12.75, 3.82, +2.75], matTravertineFloor)
  );
  // Covered terrace inset rear wall
  colArchitecture.add(
    createBox('HOUSE_Upper_East_Terrace_BackWall', [6.0, 3.4, 0.3], [+12.75, 5.5, +1.3], matFacadeStucco)
  );

  // Central Recessed Upper Bridge Volume (recessed 2.4m back from front cantilevers)
  colArchitecture.add(
    createBox('HOUSE_Upper_Bridge_Header', [6.6, 0.5, 0.4], [0, 7.15, +1.4], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_Bridge_BackWall', [6.6, 3.4, 0.3], [0, 5.5, -6.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Upper_Bridge_Floor_Travertine', [6.6, 0.05, 7.4], [0, 3.82, -2.3], matTravertineFloor)
  );

  // 1.5 Roof Structure, Parapets, Coping Profiles & Bulkheads
  // Main Roof Slab (Y = 7.4m, thickness 0.4m)
  colArchitecture.add(
    createBox('HOUSE_Roof_Main_Slab', [32.4, 0.4, 26.4], [0, 7.4, -9.2], matFacadeStucco)
  );

  // Perimeter Roof Parapets (0.45m height above roof slab, Y = 7.825m)
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

  // Continuous Parapet Coping Capping Profiles with crisp 30mm overhangs
  colArchitecture.add(
    createBox('HOUSE_Roof_Coping_Front', [32.5, 0.06, 0.38], [0, 8.08, +4.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Coping_Rear', [32.5, 0.06, 0.38], [0, 8.08, -22.4], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Coping_West', [0.38, 0.06, 26.5], [-16.05, 8.08, -9.2], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Coping_East', [0.38, 0.06, 26.5], [+16.05, 8.08, -9.2], matMetalCharcoal)
  );

  // Gravel Ballast Deck Surface
  colArchitecture.add(
    createBox('HOUSE_Roof_Gravel_Bed', [31.8, 0.05, 25.8], [0, 7.625, -9.2], matRoofGravel)
  );

  // Central Roof Skylight Curb & Glass Array with Divided Framing (over atrium)
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Curb', [6.4, 0.35, 2.2], [0, 7.775, -18.0], matMetalCharcoal)
  );
  // Skylight transverse framing mullions
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Mullion_01', [0.08, 0.06, 2.1], [-1.5, 7.96, -18.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Mullion_02', [0.08, 0.06, 2.1], [0.0, 7.96, -18.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Mullion_03', [0.08, 0.06, 2.1], [+1.5, 7.96, -18.0], matMetalCharcoal)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Skylight_Glazing', [6.0, 0.04, 1.8], [0, 7.95, -18.0], matGlassFrameless)
  );

  // Rear-East Stair Penthouse / Bulkhead (as visible in frame 000)
  colArchitecture.add(
    createBox('HOUSE_Roof_Penthouse_Bulkhead', [4.5, 1.8, 5.0], [+11.5, 8.5, -18.0], matFacadeStucco)
  );
  colArchitecture.add(
    createBox('HOUSE_Roof_Penthouse_Coping', [4.6, 0.06, 5.1], [+11.5, 9.43, -18.0], matMetalCharcoal)
  );
  // Rooftop maintenance access door reveal
  colArchitecture.add(
    createBox('HOUSE_Roof_Penthouse_ServiceDoor_Reveal', [0.04, 1.4, 0.9], [+9.23, 8.3, -18.0], matMetalCharcoal)
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
  colArchitecture.add(
    createBox('HOUSE_East_Boundary_Wall_Coping', [8.1, 0.05, 0.36], [+20.0, 2.425, -18.0], matMetalCharcoal)
  );

  // =========================================================================
  // COLLECTION 2: 02_INTERIOR_JOINERY
  // Foyer, circulation corridor, 24-batten fluted walnut wall, 3D typography plinth,
  // floating stairs with wall slot, glass workspace desk, double-height atrium
  // =========================================================================
  const colInterior = new THREE.Group();
  colInterior.name = '02_INTERIOR_JOINERY';
  houseRoot.add(colInterior);

  // 2.1 Flooring Planes & Subtle Expansion Reveals
  // Foyer limestone floor (Z: 0.0 to -6.0)
  colInterior.add(
    createBox('INT_Foyer_Vestibule_Floor', [4.0, 0.02, 6.0], [0, 0.01, -3.0], matTravertineFloor)
  );
  // Entrance threshold dark bronze expansion joint separating exterior terrace from foyer
  colInterior.add(
    createBox('INT_Foyer_Threshold_Joint', [4.0, 0.02, 0.03], [0, 0.015, -0.05], matMetalCharcoal)
  );
  // Central gallery corridor limestone floor (Z: -6.0 to -14.0)
  colInterior.add(
    createBox('INT_Corridor_Floor', [3.2, 0.02, 8.0], [0, 0.01, -10.0], matTravertineFloor)
  );
  // Corridor perimeter baseboard negative reveal channel
  colInterior.add(
    createBox('INT_Corridor_Baseboard_Reveal_West', [0.03, 0.04, 8.0], [-1.58, 0.02, -10.0], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Corridor_Baseboard_Reveal_East', [0.03, 0.04, 8.0], [+1.58, 0.02, -10.0], matMetalCharcoal)
  );
  // Double-height atrium limestone floor (Z: -14.0 to -24.0)
  colInterior.add(
    createBox('INT_DoubleHeight_Atrium_Floor', [12.0, 0.02, 10.0], [0, 0.01, -19.0], matTravertineFloor)
  );

  // 2.2 Feature Fluted Walnut Batten Wall (Right side of foyer & corridor, frames 108–133)
  // Backing timber panel
  colInterior.add(
    createBox('INT_Feature_Walnut_Backing_Wall', [0.04, 3.4, 12.0], [+1.62, 1.7, -8.0], matWalnutWood)
  );
  // Top and bottom shadow reveal channels
  colInterior.add(
    createBox('INT_Feature_Walnut_Top_Reveal', [0.06, 0.03, 12.0], [+1.61, 3.385, -8.0], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Feature_Walnut_Bottom_Reveal', [0.06, 0.03, 12.0], [+1.61, 0.015, -8.0], matMetalCharcoal)
  );

  // Reusable geometric fluted batten system (24 vertical walnut slats)
  const battenGroup = new THREE.Group();
  battenGroup.name = 'INT_Feature_Walnut_Battens_Array';
  const slatCount = 24;
  const slatLength = 11.6;
  const slatSpacing = slatLength / (slatCount - 1);
  for (let s = 0; s < slatCount; s++) {
    const slatZ = -2.2 - s * slatSpacing;
    const slat = createBox(
      `INT_Walnut_Slat_${String(s + 1).padStart(2, '0')}`,
      [0.05, 3.34, 0.05],
      [+1.57, 1.7, slatZ],
      matWalnutWood
    );
    battenGroup.add(slat);
  }
  colInterior.add(battenGroup);

  // Architectural signage plinth mounting "THE PORTFOLIO HOUSE" (Frame 120)
  colInterior.add(
    createBox('INT_Feature_Walnut_Typography_Plinth', [0.04, 0.60, 3.2], [+1.52, 1.85, -3.5], matTravertineFloor)
  );
  // Extruded geometric 3D typography letter bars
  colInterior.add(
    createBox('INT_Typography_Title_Bar_Upper', [0.02, 0.08, 2.8], [+1.50, 2.00, -3.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Typography_Subtitle_Bar_Lower', [0.015, 0.04, 2.4], [+1.50, 1.75, -3.5], matMetalCharcoal)
  );

  // Recessed ceiling linear lighting reveal channel along corridor
  colInterior.add(
    createBox('INT_Corridor_Ceiling_Reveal', [0.12, 0.06, 12.0], [+0.8, 3.37, -8.0], matMetalCharcoal)
  );
  // Integrated warm LED linear diffuse emitter strip in reveal
  colInterior.add(
    createBox('INT_Corridor_Ceiling_LED_Strip', [0.04, 0.01, 11.8], [+0.8, 3.39, -8.0], matTravertineFloor)
  );

  // 2.3 Floating Minimalist Staircase (Right side past wood wall, frames 108 & 133)
  // Structural wall embedment slot in east wall
  colInterior.add(
    createBox('INT_Floating_Stair_Wall_Slot', [0.04, 3.20, 5.2], [+1.68, 1.60, -10.3], matMetalCharcoal)
  );
  // 14 floating honed stone tread slabs with stainless steel mounting brackets
  const stairStepsGroup = new THREE.Group();
  stairStepsGroup.name = 'INT_Floating_Staircase_Group';
  for (let i = 0; i < 14; i++) {
    const stepZ = -8.0 - i * 0.35;
    const stepY = 0.22 + i * 0.22;
    // Honed stone tread
    const step = createBox(
      `INT_Floating_Step_${String(i + 1).padStart(2, '0')}`,
      [1.2, 0.10, 0.32],
      [+2.3, stepY, stepZ],
      matTravertineFloor
    );
    stairStepsGroup.add(step);
    // Structural stainless steel wall bracket anchor
    const anchorPin = createBox(
      `INT_Floating_Step_Pin_${String(i + 1).padStart(2, '0')}`,
      [0.08, 0.05, 0.08],
      [+1.72, stepY, stepZ],
      matSteelBrushed
    );
    stairStepsGroup.add(anchorPin);
  }
  colInterior.add(stairStepsGroup);

  // 2.4 Glass Engineering Workspace (Left side of corridor, frames 132–167)
  // Recessed floor and ceiling guide channels
  colInterior.add(
    createBox('INT_Workspace_Floor_Channel', [0.04, 0.03, 7.8], [-1.6, 0.015, -10.0], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Ceiling_Channel', [0.04, 0.03, 7.8], [-1.6, 3.385, -10.0], matMetalCharcoal)
  );
  // Frameless glass enclosure partitions
  colInterior.add(
    createBox('INT_Workspace_Glass_CorridorWall_North', [0.03, 3.34, 3.2], [-1.6, 1.7, -12.1], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Workspace_Glass_CorridorWall_South', [0.03, 3.34, 3.2], [-1.6, 1.7, -7.7], matGlassFrameless)
  );
  // Frameless glass workspace pivot door leaf (1.0m width)
  colInterior.add(
    createBox('INT_Workspace_Glass_Door_Leaf', [0.03, 3.30, 0.96], [-1.6, 1.7, -9.8], matGlassFrameless)
  );
  // Door tubular stainless steel handle
  colInterior.add(
    createBox('INT_Workspace_Glass_Door_Handle', [0.05, 0.60, 0.04], [-1.6, 1.2, -9.4], matSteelBrushed)
  );
  colInterior.add(
    createBox('INT_Workspace_Glass_FrontWall', [6.0, 3.34, 0.03], [-4.6, 1.7, -6.1], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Workspace_Glass_RearWall', [6.0, 3.34, 0.03], [-4.6, 1.7, -13.9], matGlassFrameless)
  );

  // Executive walnut desk with modesty panel and cable pass-through
  colInterior.add(
    createBox('INT_Workspace_Executive_Desk_Top', [2.4, 0.08, 1.0], [-4.5, 0.72, -9.5], matWalnutWood)
  );
  colInterior.add(
    createBox('INT_Workspace_Executive_Desk_Leg_West', [0.08, 0.68, 0.9], [-5.6, 0.34, -9.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Executive_Desk_Leg_East', [0.08, 0.68, 0.9], [-3.4, 0.34, -9.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Executive_Desk_Modesty', [2.1, 0.40, 0.04], [-4.5, 0.45, -9.9], matWalnutWood)
  );
  // Return credenza
  colInterior.add(
    createBox('INT_Workspace_Credenza', [0.8, 0.65, 1.8], [-5.4, 0.325, -10.5], matWalnutWood)
  );
  // Dual workstation monitor blockouts with slim stands
  colInterior.add(
    createBox('INT_Workspace_Monitor_01_Screen', [0.65, 0.42, 0.04], [-4.2, 1.05, -9.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Monitor_01_Stand', [0.12, 0.28, 0.12], [-4.2, 0.82, -9.5], matSteelBrushed)
  );
  colInterior.add(
    createBox('INT_Workspace_Monitor_02_Screen', [0.65, 0.42, 0.04], [-4.9, 1.05, -9.6], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Workspace_Monitor_02_Stand', [0.12, 0.28, 0.12], [-4.9, 0.82, -9.6], matSteelBrushed)
  );

  // 2.5 Double-Height Exhibition Atrium Core (Frames 168–214)
  // Left mezzanine gallery walkway
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Walkway_West', [2.8, 0.35, 10.0], [-4.6, 3.6, -19.0], matFacadeStucco)
  );
  // Left mezzanine structural fascia beam
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Fascia_West', [0.12, 0.35, 10.0], [-3.14, 3.6, -19.0], matMetalCharcoal)
  );
  // Left mezzanine glass balustrade with base shoe and top cap
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Shoe_West', [0.06, 0.08, 10.0], [-3.2, 3.82, -19.0], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Balustrade_West', [0.03, 1.02, 10.0], [-3.2, 4.35, -19.0], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Cap_West', [0.03, 0.02, 10.0], [-3.2, 4.87, -19.0], matSteelBrushed)
  );

  // Right mezzanine gallery walkway
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Walkway_East', [2.8, 0.35, 10.0], [+4.6, 3.6, -19.0], matFacadeStucco)
  );
  // Right mezzanine structural fascia beam
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Fascia_East', [0.12, 0.35, 10.0], [+3.14, 3.6, -19.0], matMetalCharcoal)
  );
  // Right mezzanine glass balustrade with base shoe and top cap
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Shoe_East', [0.06, 0.08, 10.0], [+3.2, 3.82, -19.0], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Balustrade_East', [0.03, 1.02, 10.0], [+3.2, 4.35, -19.0], matGlassFrameless)
  );
  colInterior.add(
    createBox('INT_Atrium_Mezzanine_Cap_East', [0.03, 0.02, 10.0], [+3.2, 4.87, -19.0], matSteelBrushed)
  );

  // Central Monolithic Travertine Exhibition Plinth (Master plinth with warm recessed toe-kick reveal)
  colInterior.add(
    createBox('INT_Atrium_Central_Plinth', [2.4, 0.65, 1.4], [0, 0.365, -18.5], matTravertineFloor)
  );
  colInterior.add(
    createBox('INT_Atrium_Central_Plinth_ToeKick', [2.16, 0.08, 1.16], [0, 0.04, -18.5], matMetalCharcoal)
  );

  // Secondary Exhibition Plinths
  colInterior.add(
    createBox('INT_Atrium_Secondary_Plinth_West', [1.2, 0.70, 0.8], [-3.2, 0.39, -20.5], matTravertineFloor)
  );
  colInterior.add(
    createBox('INT_Atrium_Secondary_ToeKick_West', [1.05, 0.08, 0.65], [-3.2, 0.04, -20.5], matMetalCharcoal)
  );
  colInterior.add(
    createBox('INT_Atrium_Secondary_Plinth_East', [1.2, 0.70, 0.8], [+3.2, 0.39, -20.5], matTravertineFloor)
  );
  colInterior.add(
    createBox('INT_Atrium_Secondary_ToeKick_East', [1.05, 0.08, 0.65], [+3.2, 0.04, -20.5], matMetalCharcoal)
  );

  // Linear Cove Indirect Lighting Troughs along Atrium Ceilings
  colInterior.add(
    createBox('INT_Atrium_Linear_Cove_West', [0.35, 0.20, 10.0], [-5.85, 6.7, -19.0], matFacadeStucco)
  );
  colInterior.add(
    createBox('INT_Atrium_Linear_Cove_East', [0.35, 0.20, 10.0], [+5.85, 6.7, -19.0], matFacadeStucco)
  );

  // =========================================================================
  // COLLECTION 3: 03_EXTERIOR_ELEMENTS
  // Entrance pivot door, perimeter frames, pocket sliding glass system,
  // 90-deg corner glazing, balcony balustrades with shoe profiles,
  // infinity pool with 50mm coping nosing, gutter, internal steps
  // =========================================================================
  const colExterior = new THREE.Group();
  colExterior.name = '03_EXTERIOR_ELEMENTS';
  houseRoot.add(colExterior);

  // 3.1 Front Entrance Pivot Door System (Frames 070 & 108)
  const doorGroup = new THREE.Group();
  doorGroup.name = 'EXT_Entrance_Pivot_Door_Group';
  doorGroup.position.set(0.0, 0.0, 0.0);

  // Sub-group anchored at the exact hinge pivot axis [-0.65m from door center]
  const doorPivotAnchor = new THREE.Group();
  doorPivotAnchor.name = 'GEO_Door_Pivot_Leaf';
  doorPivotAnchor.position.set(-0.65, 0.0, 0.0);
  doorGroup.add(doorPivotAnchor);

  // 9 horizontal walnut planks with 15mm shadow gaps
  const plankCount = 9;
  const totalDoorHeight = 3.20;
  const plankThickness = 0.10;
  const doorWidth = 1.80;
  const gap = 0.015;
  const plankHeight = (totalDoorHeight - (plankCount - 1) * gap) / plankCount;

  for (let i = 0; i < plankCount; i++) {
    const plankY = 0.05 + plankHeight / 2 + i * (plankHeight + gap);
    const plank = createBox(
      `GEO_Door_Plank_${String(i + 1).padStart(2, '0')}`,
      [doorWidth, plankHeight, plankThickness],
      [+0.65, plankY, 0.0],
      matWalnutDoor
    );
    doorPivotAnchor.add(plank);
  }

  // Top and bottom circular stainless steel pivot hinge hardware plates
  doorPivotAnchor.add(
    createBox('GEO_Door_Pivot_Hardware_Top', [0.14, 0.04, 0.14], [0.0, 3.22, 0.0], matSteelBrushed)
  );
  doorPivotAnchor.add(
    createBox('GEO_Door_Pivot_Hardware_Bottom', [0.14, 0.04, 0.14], [0.0, 0.02, 0.0], matSteelBrushed)
  );

  // Vertical steel pull handle on left edge of door leaf with illuminated cyan LED channel
  doorPivotAnchor.add(
    createBox('GEO_Door_Pull_Handle', [0.06, 2.10, 0.08], [-0.10, 1.55, 0.07], matSteelBrushed)
  );
  doorPivotAnchor.add(
    createBox('GEO_Door_Handle_LED_Channel', [0.02, 2.06, 0.02], [-0.10, 1.55, 0.11], matLEDCyan)
  );

  colExterior.add(doorGroup);

  // Entrance Portal Perimeter Frames & Sidelites
  colExterior.add(
    createBox('EXT_Entrance_Frame_West', [0.08, 3.20, 0.08], [-1.50, 1.60, 0.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Entrance_Frame_East', [0.08, 3.20, 0.08], [+1.50, 1.60, 0.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Entrance_Frame_Head', [1.96, 0.08, 0.08], [0.0, 3.24, 0.0], matMetalCharcoal)
  );
  // Entrance Sidelite Glazing flanking the pivot door
  colExterior.add(
    createBox('EXT_Entrance_Sidelite_West', [0.56, 3.12, 0.04], [-1.20, 1.60, 0.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Entrance_Sidelite_East', [0.56, 3.12, 0.04], [+1.20, 1.60, 0.0], matGlassFrameless)
  );

  // 3.2 Ground Floor Glazing Systems
  // West living lounge multi-panel sliding pocket glass wall
  colExterior.add(
    createBox('EXT_Glazing_Living_FloorTrack', [12.4, 0.04, 0.16], [-9.5, 0.02, -0.6], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_HeadTrack', [12.4, 0.06, 0.16], [-9.5, 3.37, -0.6], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Jamb_West', [0.06, 3.32, 0.16], [-15.67, 1.68, -0.6], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Jamb_East', [0.06, 3.32, 0.16], [-3.33, 1.68, -0.6], matMetalCharcoal)
  );
  // 3 individual sliding glass panels with interlock stiles
  colExterior.add(
    createBox('EXT_Glazing_Living_Panel_01', [4.12, 3.26, 0.04], [-13.5, 1.68, -0.62], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Panel_02', [4.12, 3.26, 0.04], [-9.5, 1.68, -0.60], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Panel_03', [4.12, 3.26, 0.04], [-5.5, 1.68, -0.58], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Interlock_Mullion_01', [0.06, 3.28, 0.08], [-11.44, 1.68, -0.61], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Living_Interlock_Mullion_02', [0.06, 3.28, 0.08], [-7.56, 1.68, -0.59], matMetalCharcoal)
  );

  // East dining 90-degree corner frameless curtain glass
  colExterior.add(
    createBox('EXT_Glazing_Dining_FloorChannel_Front', [11.2, 0.04, 0.08], [+9.2, 0.02, 0.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Dining_FloorChannel_Side', [0.08, 0.04, 6.0], [+14.8, 0.02, -3.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Dining_Corner_Front', [11.16, 3.32, 0.04], [+9.2, 1.70, 0.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Dining_Corner_Side', [0.04, 3.32, 5.96], [+14.8, 1.70, -3.0], matGlassFrameless)
  );
  // Minimalist structural corner silicone joint profile
  colExterior.add(
    createBox('EXT_Glazing_Dining_Corner_Joint', [0.04, 3.32, 0.04], [+14.8, 1.70, 0.0], matMetalCharcoal)
  );

  // 3.3 Upper Floor Glazing Systems & Balustrades
  // West upper cantilever inset glass wall & balustrade
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_DoorFrame', [11.8, 3.24, 0.08], [-9.75, 5.50, +1.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balcony_Wall', [11.64, 3.12, 0.04], [-9.75, 5.50, +1.0], matGlassFrameless)
  );
  // West upper balustrade with base shoe channel and top cap
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balustrade_Shoe', [11.8, 0.08, 0.06], [-9.75, 3.84, +3.7], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balustrade', [11.8, 1.02, 0.03], [-9.75, 4.39, +3.7], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_West_Balustrade_Cap', [11.8, 0.02, 0.03], [-9.75, 4.91, +3.7], matSteelBrushed)
  );

  // Central upper bridge floor-to-ceiling glass & balustrade
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Frame', [6.6, 3.24, 0.08], [0, 5.50, +1.5], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Mullion_01', [0.06, 3.20, 0.08], [-1.1, 5.50, +1.5], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Mullion_02', [0.06, 3.20, 0.08], [+1.1, 5.50, +1.5], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Window', [6.48, 3.12, 0.04], [0, 5.50, +1.5], matGlassFrameless)
  );
  // Central bridge balustrade with base shoe and top cap
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Balustrade_Shoe', [6.6, 0.08, 0.06], [0, 3.84, +1.9], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Balustrade', [6.6, 1.02, 0.03], [0, 4.39, +1.9], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Upper_Bridge_Balustrade_Cap', [6.6, 0.02, 0.03], [0, 4.91, +1.9], matSteelBrushed)
  );

  // East upper cantilever recessed terrace glass & horizontal wood accent wall
  colExterior.add(
    createBox('EXT_Glazing_Upper_East_Terrace_Glass', [6.0, 3.20, 0.04], [+12.75, 5.50, +1.4], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Upper_East_Wood_Accent_Backing', [0.08, 3.20, 2.8], [+15.8, 5.50, +2.8], matWalnutWood)
  );
  // Horizontal timber battens on east terrace wall
  for (let hb = 0; hb < 8; hb++) {
    const battenY = 4.10 + hb * 0.40;
    colExterior.add(
      createBox(`EXT_Upper_East_Wood_Batten_${hb + 1}`, [0.09, 0.35, 2.78], [+15.79, battenY, +2.8], matWalnutWood)
    );
  }

  // 3.4 Rear Double-Height Glass Curtain Wall (North mountain vista, Frames 214–239)
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Curtain', [12.0, 6.80, 0.05], [0, 3.40, -24.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Frame_Outer', [12.16, 6.96, 0.12], [0, 3.40, -24.0], matMetalCharcoal)
  );
  // Vertical curtain grid mullions (4 vertical mullions dividing span into 5 bays)
  for (let vm = 0; vm < 4; vm++) {
    const vmX = -4.8 + vm * 2.4;
    colExterior.add(
      createBox(`EXT_Glazing_Rear_Atrium_Mullion_V_${vm + 1}`, [0.10, 6.80, 0.14], [vmX, 3.40, -24.0], matMetalCharcoal)
    );
  }
  // Horizontal curtain grid transoms (2 horizontal transoms dividing height into 3 tiers)
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Transom_01', [12.0, 0.10, 0.14], [0, 2.27, -24.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Glazing_Rear_Atrium_Transom_02', [12.0, 0.10, 0.14], [0, 4.54, -24.0], matMetalCharcoal)
  );

  // 3.5 Terrace Deck & Infinity Lap Pool (Frames 000 & 070)
  // Main pool terrace paving deck (travertine tiles)
  colExterior.add(
    createBox('EXT_Terrace_Pool_Deck', [34.0, 0.20, 17.0], [0, -0.01, +8.5], matTravertineFloor)
  );
  // Continuous terrace drip edge profile
  colExterior.add(
    createBox('EXT_Terrace_Drip_Edge_South', [34.1, 0.04, 0.08], [0, -0.11, +17.04], matMetalCharcoal)
  );

  // East raised sun lounger plinth (framing walkway on the east side)
  colExterior.add(
    createBox('EXT_Terrace_East_Plinth', [8.0, 0.40, 8.0], [+6.5, +0.20, +10.0], matTravertineFloor)
  );
  // East plinth transition step
  colExterior.add(
    createBox('EXT_Terrace_East_Plinth_Step', [2.4, 0.20, 0.40], [+6.5, +0.10, +5.8], matTravertineFloor)
  );

  // West lounge deck (terrace area behind pool)
  colExterior.add(
    createBox('EXT_Terrace_West_Lounge_Deck', [8.0, 0.20, 6.0], [-12.0, -0.01, +6.0], matTravertineFloor)
  );

  // Infinity Lap Pool (14.0m length x 4.2m width x 1.5m depth)
  // Shifted to West terrace (X center: -8.8m, spanning X: -15.8m to -1.8m)
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Floor', [14.0, 0.20, 4.2], [-8.8, -1.50, +9.6], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_Back', [14.0, 1.50, 0.25], [-8.8, -0.75, +7.4], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_West', [0.25, 1.50, 4.2], [-15.8, -0.75, +9.6], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Basin_Wall_East', [0.25, 1.50, 4.2], [-1.8, -0.75, +9.6], matTravertineFloor)
  );

  // Pool Perimeter Honed Travertine Coping Slabs with 50mm Architectural Nosing Overhang
  colExterior.add(
    createBox('EXT_Infinity_Pool_Coping_North', [14.3, 0.08, 0.35], [-8.8, 0.04, +7.35], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Coping_West', [0.35, 0.08, 4.2], [-15.85, 0.04, +9.6], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Coping_East', [0.35, 0.08, 4.2], [-1.75, 0.04, +9.6], matTravertineFloor)
  );

  // Infinity vanishing overflow weir edge on south face (Z = +11.7m)
  colExterior.add(
    createBox('EXT_Infinity_Pool_Vanishing_Edge', [14.0, 0.15, 0.30], [-8.8, -0.10, +11.7], matTravertineFloor)
  );
  // Recessed perimeter catch basin overflow gutter trough
  colExterior.add(
    createBox('EXT_Infinity_Pool_Overflow_Gutter', [14.0, 0.30, 0.30], [-8.8, -0.35, +11.95], matConcreteFoundation)
  );

  // Internal Recessed Pool Entry Steps (3 steps into pool at east end)
  colExterior.add(
    createBox('EXT_Infinity_Pool_Step_01', [1.2, 0.25, 0.40], [-2.5, -0.22, +8.0], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Step_02', [1.2, 0.25, 0.40], [-2.5, -0.47, +8.4], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Infinity_Pool_Step_03', [1.2, 0.25, 0.40], [-2.5, -0.72, +8.8], matTravertineFloor)
  );

  // Crystalline pool water plane
  colExterior.add(
    createBox('EXT_Infinity_Pool_Water_Plane', [13.7, 0.02, 3.95], [-8.8, -0.08, +9.6], matPoolWater)
  );

  // Frameless glass balustrades around terrace perimeters with recessed base shoes and top caps
  // East raised plinth balustrade
  colExterior.add(
    createBox('EXT_Balustrade_Shoe_East_Plinth_Front', [8.0, 0.08, 0.06], [+6.5, 0.44, +14.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_East_Plinth_Front', [8.0, 1.02, 0.03], [+6.5, 0.99, +14.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Cap_East_Plinth_Front', [8.0, 0.02, 0.03], [+6.5, 1.51, +14.0], matSteelBrushed)
  );

  colExterior.add(
    createBox('EXT_Balustrade_Shoe_East_Plinth_Side', [0.06, 0.08, 8.0], [+10.5, 0.44, +10.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_East_Plinth_Side', [0.03, 1.02, 8.0], [+10.5, 0.99, +10.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Cap_East_Plinth_Side', [0.03, 0.02, 8.0], [+10.5, 1.51, +10.0], matSteelBrushed)
  );

  // West terrace perimeter balustrade
  colExterior.add(
    createBox('EXT_Balustrade_Shoe_West_Terrace_Side', [0.06, 0.08, 12.0], [-17.0, 0.14, +8.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_West_Terrace_Side', [0.03, 1.02, 12.0], [-17.0, 0.69, +8.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Cap_West_Terrace_Side', [0.03, 0.02, 12.0], [-17.0, 1.21, +8.0], matSteelBrushed)
  );

  colExterior.add(
    createBox('EXT_Balustrade_Shoe_West_Terrace_Front', [4.0, 0.08, 0.06], [-15.0, 0.14, +14.0], matMetalCharcoal)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Glass_West_Terrace_Front', [4.0, 1.02, 0.03], [-15.0, 0.69, +14.0], matGlassFrameless)
  );
  colExterior.add(
    createBox('EXT_Balustrade_Cap_West_Terrace_Front', [4.0, 0.02, 0.03], [-15.0, 1.21, +14.0], matSteelBrushed)
  );

  // Minimalist Teak Sun Loungers with Fabric Cushions (2 pairs)
  function createSunLounger(name, pos, matWood, matFabric) {
    const loungerGrp = new THREE.Group();
    loungerGrp.name = name;
    loungerGrp.position.set(pos[0], pos[1], pos[2]);

    // Teak base frame
    loungerGrp.add(createBox(`${name}_Frame`, [0.85, 0.18, 2.0], [0, 0.09, 0], matWood));
    // Angled teak backrest wedge
    loungerGrp.add(createBox(`${name}_Backrest`, [0.82, 0.14, 0.7], [0, 0.22, -0.6], matWood));
    // Tailored off-white linen cushion
    loungerGrp.add(createBox(`${name}_Cushion`, [0.80, 0.08, 1.95], [0, 0.22, 0], matFabric));

    return loungerGrp;
  }

  // West pair (behind pool, frame 000)
  colExterior.add(createSunLounger('EXT_Sun_Lounger_West_01', [-10.5, 0.09, +5.5], matWalnutWood, matFacadeStucco));
  colExterior.add(createSunLounger('EXT_Sun_Lounger_West_02', [-12.5, 0.09, +5.5], matWalnutWood, matFacadeStucco));
  // East pair on raised plinth (frame 000)
  colExterior.add(createSunLounger('EXT_Sun_Lounger_East_01', [+5.0, 0.39, +10.0], matWalnutWood, matFacadeStucco));
  colExterior.add(createSunLounger('EXT_Sun_Lounger_East_02', [+6.8, 0.39, +10.0], matWalnutWood, matFacadeStucco));

  // Exterior Entrance Steps from Pool Terrace to Foyer Threshold
  colExterior.add(
    createBox('EXT_Stairs_Entrance_Step_01', [4.5, 0.10, 1.2], [0, 0.05, +1.8], matTravertineFloor)
  );
  colExterior.add(
    createBox('EXT_Stairs_Entrance_Step_02', [4.5, 0.10, 1.2], [0, 0.10, +0.7], matTravertineFloor)
  );

  // =========================================================================
  // COLLECTION 4: 04_ENVIRONMENT
  // Hillside terrain slope, board-formed concrete retaining wall with
  // architectural formwork reveal lines, agaves, scrub, and distant mountain
  // =========================================================================
  const colEnvironment = new THREE.Group();
  colEnvironment.name = '04_ENVIRONMENT';
  houseRoot.add(colEnvironment);

  // 4.1 Hillside Topography
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

  // 4.2 Exposed Board-Formed Concrete Retaining Wall with Formwork Reveals (Frames 000 & 239)
  colEnvironment.add(
    createBox('ENV_Retaining_Wall_Concrete', [18.0, 3.2, 0.8], [-9.0, -2.5, +14.5], matConcreteFoundation)
  );
  // Horizontal formwork board grooves
  colEnvironment.add(
    createBox('ENV_Retaining_Wall_Groove_01', [18.02, 0.02, 0.82], [-9.0, -1.7, +14.5], matMetalCharcoal)
  );
  colEnvironment.add(
    createBox('ENV_Retaining_Wall_Groove_02', [18.02, 0.02, 0.82], [-9.0, -2.5, +14.5], matMetalCharcoal)
  );
  colEnvironment.add(
    createBox('ENV_Retaining_Wall_Groove_03', [18.02, 0.02, 0.82], [-9.0, -3.3, +14.5], matMetalCharcoal)
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
