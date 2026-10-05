import { PBRMaterialSpec } from './types';

/**
 * SANTRO M4 — PRODUCTION PBR ARCHITECTURAL MATERIAL CATALOG
 *
 * Strictly adheres to M4 specifications:
 * - 18 reference-calibrated PBR materials + MAT_Deck alias
 * - Standardized naming convention (MAT_*)
 * - Physically calibrated base color, roughness, metalness, and transmission
 * - Real optical glass with volume thickness & attenuation
 * - Seamless PBR micro-texture map associations & dual-layer pool water
 */
export const ARCHITECTURAL_MATERIALS: Record<string, PBRMaterialSpec> = {
  // 1. Architectural: Primary Facade Stucco
  MAT_Wall_Main: {
    name: 'MAT_Wall_Main',
    category: 'Architectural',
    color: 0xECEBE4,
    roughness: 0.82,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/stucco_normal.png',
    roughnessMapUrl: '/3d/textures/stucco_roughness.png',
    normalScale: [0.35, 0.35],
    textureRepeat: [8.0, 8.0],
    description: 'Matte architectural stucco plaster with ultra-fine grain and soft diffuse scatter.',
  },

  // 2. Architectural: Interior Plaster & Soffits
  MAT_Wall_Secondary: {
    name: 'MAT_Wall_Secondary',
    category: 'Architectural',
    color: 0xF2F1EA,
    roughness: 0.85,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/stucco_normal.png',
    roughnessMapUrl: '/3d/textures/stucco_roughness.png',
    normalScale: [0.25, 0.25],
    textureRepeat: [6.0, 6.0],
    description: 'Smooth interior architectural plaster and recessed ceiling soffits.',
  },

  // 3. Architectural: Board-Formed Concrete
  MAT_Concrete: {
    name: 'MAT_Concrete',
    category: 'Architectural',
    color: 0x969288,
    roughness: 0.80,
    metalness: 0.02,
    normalMapUrl: '/3d/textures/concrete_normal.png',
    roughnessMapUrl: '/3d/textures/concrete_roughness.png',
    normalScale: [0.65, 0.65],
    textureRepeat: [2.0, 1.0],
    description: 'Heavy architectural concrete with 150mm horizontal timber formwork seams and subtle porosity.',
  },

  // 4. Architectural: Honed Travertine / Limestone Flooring
  MAT_Stone: {
    name: 'MAT_Stone',
    category: 'Architectural',
    color: 0xDDD6C8,
    roughness: 0.35,
    metalness: 0.02,
    normalMapUrl: '/3d/textures/travertine_normal.png',
    roughnessMapUrl: '/3d/textures/travertine_roughness.png',
    normalScale: [0.45, 0.45],
    textureRepeat: [4.0, 4.0],
    description: 'Monolithic honed cream limestone tiles with crisp recessed joints and silky specular response.',
  },

  // 5. Ground / Exterior: Exterior Honed Travertine Terrace Deck
  MAT_Terrace: {
    name: 'MAT_Terrace',
    category: 'Ground',
    color: 0xD8D1C2,
    roughness: 0.38,
    metalness: 0.02,
    normalMapUrl: '/3d/textures/travertine_normal.png',
    roughnessMapUrl: '/3d/textures/travertine_roughness.png',
    normalScale: [0.55, 0.55],
    textureRepeat: [6.0, 6.0],
    description: 'Exterior pool terrace paving deck slabs with slip-resistant honed finish.',
  },

  // 6. Wood: Horizontal Planked Walnut Pivot Door
  MAT_Wood_Entrance: {
    name: 'MAT_Wood_Entrance',
    category: 'Wood',
    color: 0x6B4423,
    roughness: 0.38,
    metalness: 0.0,
    clearcoat: 0.20,
    clearcoatRoughness: 0.35,
    normalMapUrl: '/3d/textures/walnut_normal.png',
    roughnessMapUrl: '/3d/textures/walnut_roughness.png',
    normalScale: [0.4, 0.4],
    textureRepeat: [2.0, 2.0],
    description: 'Horizontal tongue-and-groove solid American walnut planks with rich amber undertone.',
  },

  // 7. Wood: Vertical Fluted Walnut Paneling & Joinery
  MAT_Wood_Interior: {
    name: 'MAT_Wood_Interior',
    category: 'Wood',
    color: 0x5A3825,
    roughness: 0.42,
    metalness: 0.0,
    clearcoat: 0.15,
    clearcoatRoughness: 0.40,
    normalMapUrl: '/3d/textures/walnut_normal.png',
    roughnessMapUrl: '/3d/textures/walnut_roughness.png',
    normalScale: [0.5, 0.5],
    textureRepeat: [1.0, 4.0],
    description: 'Deep warm walnut battens with vertical linear shadow flutes and hand-rubbed oil sheen.',
  },

  // 8. Wood: Minimalist Teak Sun Loungers
  MAT_Wood_Deck: {
    name: 'MAT_Wood_Deck',
    category: 'Wood',
    color: 0x7A5332,
    roughness: 0.50,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/walnut_normal.png',
    roughnessMapUrl: '/3d/textures/walnut_roughness.png',
    normalScale: [0.3, 0.3],
    textureRepeat: [1.0, 2.0],
    description: 'Weathered architectural plantation teak framing for pool deck loungers.',
  },

  // 8b. Ground / Deck: Alias for Section 6 compliance (MAT_Deck)
  MAT_Deck: {
    name: 'MAT_Deck',
    category: 'Wood',
    color: 0x7A5332,
    roughness: 0.50,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/walnut_normal.png',
    roughnessMapUrl: '/3d/textures/walnut_roughness.png',
    normalScale: [0.3, 0.3],
    textureRepeat: [1.0, 2.0],
    description: 'Weathered architectural plantation teak framing for pool deck loungers (MAT_Deck alias).',
  },

  // 9. Glass: Ultra-Clear Frameless Architectural Glazing
  MAT_Glass_Clear: {
    name: 'MAT_Glass_Clear',
    category: 'Glass',
    color: 0xFFFFFF,
    roughness: 0.015,
    metalness: 0.0,
    transparent: true,
    opacity: 1.0,
    transmission: 0.94,
    ior: 1.52,
    thickness: 0.6,
    attenuationColor: 0xEEF5F5,
    attenuationDistance: 8.0,
    description: 'Low-iron crystal-clear architectural safety glass with neutral specular highlights and physical volume.',
  },

  // 10. Glass: Bronze-Tinted Skylight & Clerestory Glazing
  MAT_Glass_Dark: {
    name: 'MAT_Glass_Dark',
    category: 'Glass',
    color: 0x242A30,
    roughness: 0.05,
    metalness: 0.05,
    transparent: true,
    opacity: 1.0,
    transmission: 0.65,
    ior: 1.52,
    thickness: 1.0,
    attenuationColor: 0x1A2026,
    attenuationDistance: 4.0,
    description: 'Solar-control tinted glazing for rooftop skylight curb and privacy transoms.',
  },

  // 11. Metal: Anodized Dark Charcoal Aluminum
  MAT_Metal_Dark: {
    name: 'MAT_Metal_Dark',
    category: 'Metal',
    color: 0x1F1F21,
    roughness: 0.30,
    metalness: 0.88,
    description: 'Matte dark charcoal architectural aluminum with subtle micro-metallic sheen.',
  },

  // 12. Metal: Precision Brushed Stainless Steel
  MAT_Metal_Brushed: {
    name: 'MAT_Metal_Brushed',
    category: 'Metal',
    color: 0xC0C0C4,
    roughness: 0.22,
    metalness: 0.95,
    description: 'Precision-machined 316 stainless steel with fine directional hairline brushing.',
  },

  // 13. Water: Infinity Lap Pool Crystalline Water
  MAT_Water: {
    name: 'MAT_Water',
    category: 'Water',
    color: 0x38A3A5,
    roughness: 0.05,
    metalness: 0.0,
    transparent: true,
    opacity: 1.0,
    transmission: 0.92,
    ior: 1.333,
    thickness: 1.4,
    attenuationColor: 0x228085,
    attenuationDistance: 2.2,
    normalMapUrl: '/3d/textures/water_normal_1.png',
    normalMap2Url: '/3d/textures/water_normal_2.png',
    normalScale: [0.35, 0.35],
    textureRepeat: [4.0, 2.0],
    textureRepeat2: [6.0, 3.0],
    description: 'Clean chlorinated pool water with dual-layer capillary wave displacement and turquoise absorption.',
  },

  // 14. Ground: Arid Hillside Terrain & Desert Earth
  MAT_Ground: {
    name: 'MAT_Ground',
    category: 'Ground',
    color: 0x7D6E58,
    roughness: 0.92,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/ground_normal.png',
    normalScale: [0.6, 0.6],
    textureRepeat: [8.0, 8.0],
    description: 'Arid desert earth, weathered rock, and sedimentary hillside soil slope.',
  },

  // 15. Vegetation: Desert Agave & Chaparral Foliage
  MAT_Vegetation: {
    name: 'MAT_Vegetation',
    category: 'Vegetation',
    color: 0x4D583F,
    roughness: 0.75,
    metalness: 0.0,
    description: 'Matte desert succulent leaves and drought-tolerant chaparral scrub foliage.',
  },

  // 16. Architectural: Washed River Pebble Roof Ballast Bed
  MAT_Roof_Gravel: {
    name: 'MAT_Roof_Gravel',
    category: 'Architectural',
    color: 0x8E8B82,
    roughness: 0.90,
    metalness: 0.0,
    normalMapUrl: '/3d/textures/gravel_normal.png',
    normalScale: [0.8, 0.8],
    textureRepeat: [12.0, 10.0],
    description: 'Washed river gravel ballast bed protecting the parapet roof waterproof membrane.',
  },

  // 17. Lighting: Calibrated Holographic Cyan Blueprint Channel
  MAT_LED_Cyan: {
    name: 'MAT_LED_Cyan',
    category: 'Lighting',
    color: 0x00F0FF,
    roughness: 0.10,
    metalness: 0.0,
    emissive: 0x00F0FF,
    emissiveIntensity: 2.5,
    description: 'Luminous electric cyan architectural accent channel and nightlight indicator.',
  },

  // 18. Lighting: Concealed Warm White Architectural Light Cove
  MAT_Light_Cove_Warm: {
    name: 'MAT_Light_Cove_Warm',
    category: 'Lighting',
    color: 0xFFF2D6,
    roughness: 0.30,
    metalness: 0.0,
    emissive: 0xFFF2D6,
    emissiveIntensity: 2.0,
    description: 'Concealed 2700K linear warm white LED diffuser slot in ceiling coves.',
  },
};
