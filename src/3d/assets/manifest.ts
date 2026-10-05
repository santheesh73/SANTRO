export type AssetStatus = 'PLANNED' | 'IN_PROGRESS' | 'AVAILABLE' | 'OPTIMIZED';
export type AssetType = 'GLB' | 'HDR' | 'KTX2' | 'TEXTURE' | 'AUDIO' | 'PROCEDURAL';

export interface AssetManifestEntry {
  id: string;
  name: string;
  category: 'house' | 'environment' | 'furniture' | 'vegetation' | 'textures' | 'audio';
  path: string;
  fallbackPath?: string;
  type: AssetType;
  purpose: string;
  status: AssetStatus;
  optimizationStatus: 'UNCOMPRESSED' | 'DRACO' | 'MESHOPT' | 'KTX2' | 'PENDING';
  expectedMilestone: string;
  fileSizeBytes?: number;
  triangleBudget?: number;
}

export const ASSET_MANIFEST: Record<string, AssetManifestEntry> = {
  // 1. ARCHITECTURAL HOUSE ASSETS
  house_placeholder: {
    id: 'house_placeholder',
    name: 'Placeholder Architectural Massing (Procedural)',
    category: 'house',
    path: 'procedural:placeholder',
    type: 'PROCEDURAL',
    purpose: 'Validation placeholder establishing scene scale, lighting response, and camera framing',
    status: 'AVAILABLE',
    optimizationStatus: 'UNCOMPRESSED',
    expectedMilestone: 'M1',
    triangleBudget: 24, // Low-poly box massing
  },
  the_portfolio_house: {
    id: 'the_portfolio_house',
    name: 'The Portfolio House Master Model',
    category: 'house',
    path: '/3d/models/the_portfolio_house.glb',
    fallbackPath: 'procedural:placeholder',
    type: 'GLB',
    purpose: 'Full reconstructed modernist architectural residence including cantilevers, foyer, and atrium',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M2',
    triangleBudget: 140000,
  },
  entrance_pivot_door: {
    id: 'entrance_pivot_door',
    name: 'Horizontal Planked Walnut Pivot Door',
    category: 'house',
    path: '/3d/models/entrance_door.glb',
    type: 'GLB',
    purpose: 'Animated walnut pivot door leaf with offset hinge pivot at X: -0.65m',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M3',
    triangleBudget: 4500,
  },

  // 2. ENVIRONMENT & ATMOSPHERE
  sky_atmosphere: {
    id: 'sky_atmosphere',
    name: 'Procedural Twilight Sky Hemisphere & Ground Horizon',
    category: 'environment',
    path: 'procedural:atmosphere',
    type: 'PROCEDURAL',
    purpose: 'Dynamic sky gradient, exponential fog, and travertine ground disc at Y: -1.8m',
    status: 'AVAILABLE',
    optimizationStatus: 'UNCOMPRESSED',
    expectedMilestone: 'M1',
    triangleBudget: 128,
  },
  terrain_hillside: {
    id: 'terrain_hillside',
    name: 'Hillside Terrain Topography',
    category: 'environment',
    path: '/3d/models/terrain_hillside.glb',
    type: 'GLB',
    purpose: 'Arid mountain slope mesh grounding the concrete foundation plinth',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M2',
    triangleBudget: 15000,
  },

  // 3. FURNITURE & INTERIOR JOINERY
  foyer_walnut_wall: {
    id: 'foyer_walnut_wall',
    name: 'Fluted Walnut Batten Feature Wall',
    category: 'furniture',
    path: '/3d/models/foyer_walnut_wall.glb',
    type: 'GLB',
    purpose: 'Architectural vertical batten wall mounting 3D typography and narrative',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M3',
    triangleBudget: 12000,
  },
  workstation_setup: {
    id: 'workstation_setup',
    name: 'Engineering Dual Workstation',
    category: 'furniture',
    path: '/3d/models/workstation_desk.glb',
    type: 'GLB',
    purpose: 'Executive walnut desk, task chairs, and dual workstation displays in glass lab',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M3',
    triangleBudget: 18000,
  },
  exhibition_plinths: {
    id: 'exhibition_plinths',
    name: 'Double-Height Atrium Exhibition Plinths',
    category: 'furniture',
    path: '/3d/models/exhibition_plinths.glb',
    type: 'GLB',
    purpose: 'Travertine pedestals with illuminated reveal coves for project holographic displays',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M8',
    triangleBudget: 10000,
  },

  // 4. VEGETATION
  agave_vegetation: {
    id: 'agave_vegetation',
    name: 'Arid Agave Americana Scrub',
    category: 'vegetation',
    path: '/3d/models/vegetation_agave.glb',
    type: 'GLB',
    purpose: 'Instanced landscape vegetation surrounding pool terrace and retaining wall',
    status: 'PLANNED',
    optimizationStatus: 'PENDING',
    expectedMilestone: 'M3',
    triangleBudget: 20000,
  },

  // 5. PBR TEXTURES
  tex_facade_stucco: {
    id: 'tex_facade_stucco',
    name: 'Fine Architectural Stucco Normal & Roughness',
    category: 'textures',
    path: '/3d/textures/stucco_orm.ktx2',
    type: 'KTX2',
    purpose: 'Micro-plaster normal and roughness detail for off-white exterior walls',
    status: 'PLANNED',
    optimizationStatus: 'KTX2',
    expectedMilestone: 'M4',
  },
  tex_travertine_floor: {
    id: 'tex_travertine_floor',
    name: 'Honed Travertine Joint & Roughness Map',
    category: 'textures',
    path: '/3d/textures/travertine_orm.ktx2',
    type: 'KTX2',
    purpose: 'Stone surface variation map providing soft specular reflections',
    status: 'PLANNED',
    optimizationStatus: 'KTX2',
    expectedMilestone: 'M4',
  },
  tex_walnut_wood: {
    id: 'tex_walnut_wood',
    name: 'American Walnut Grain & Rib Profile',
    category: 'textures',
    path: '/3d/textures/walnut_orm.ktx2',
    type: 'KTX2',
    purpose: 'Vertical batten shadow profiles and satin wood finish',
    status: 'PLANNED',
    optimizationStatus: 'KTX2',
    expectedMilestone: 'M4',
  },
};
