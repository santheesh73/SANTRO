import * as THREE from 'three';
import { ARCHITECTURAL_MATERIALS } from './materialDefinitions';
import { MaterialDisplayMode } from './types';

// Texture Caches to avoid redundant network requests and duplicate GPU uploads
const baseTextureMap = new Map<string, THREE.Texture>();
const derivedTextureMap = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

function loadCachedTexture(url: string, repeat: [number, number] = [1, 1]): THREE.Texture {
  const cacheKey = `${url}_${repeat[0]}_${repeat[1]}`;
  if (derivedTextureMap.has(cacheKey)) {
    return derivedTextureMap.get(cacheKey)!;
  }

  let baseTex = baseTextureMap.get(url);
  if (!baseTex) {
    baseTex = textureLoader.load(url);
    baseTex.wrapS = THREE.RepeatWrapping;
    baseTex.wrapT = THREE.RepeatWrapping;
    baseTex.colorSpace = THREE.NoColorSpace; // Strictly Linear for normal and roughness data maps
    baseTextureMap.set(url, baseTex);
  }

  if (repeat[0] === 1 && repeat[1] === 1) {
    derivedTextureMap.set(cacheKey, baseTex);
    return baseTex;
  }

  // Clone texture sharing underlying image source to save GPU VRAM
  const derivedTex = baseTex.clone();
  derivedTex.wrapS = THREE.RepeatWrapping;
  derivedTex.wrapT = THREE.RepeatWrapping;
  derivedTex.repeat.set(repeat[0], repeat[1]);
  derivedTex.colorSpace = THREE.NoColorSpace;
  derivedTex.needsUpdate = true;
  derivedTextureMap.set(cacheKey, derivedTex);
  return derivedTex;
}

// Material ID false colors for auditing (Section 38 & 39)
const MATERIAL_ID_COLORS: Record<string, number> = {
  MAT_Wall_Main: 0xECEBE4,
  MAT_Wall_Secondary: 0xD4D3CC,
  MAT_Concrete: 0x8A857B,
  MAT_Stone: 0xF3ECE0,
  MAT_Terrace: 0xC4BCAB,
  MAT_Wood_Entrance: 0xB5651D,
  MAT_Wood_Interior: 0x8B4513,
  MAT_Wood_Deck: 0xCD853F,
  MAT_Deck: 0xCD853F,
  MAT_Glass_Clear: 0x00CED1,
  MAT_Glass_Dark: 0x1E3F66,
  MAT_Metal_Dark: 0x2F4F4F,
  MAT_Metal_Brushed: 0xA9A9A9,
  MAT_Water: 0x00BFFF,
  MAT_Ground: 0x8B7355,
  MAT_Vegetation: 0x228B22,
  MAT_Roof_Gravel: 0x708090,
  MAT_LED_Cyan: 0x00FFFF,
  MAT_Light_Cove_Warm: 0xFFD700,
};

// Reusable clay materials for Clay -> Material validation (Section 32)
// Architectural solid surfaces render in neutral matte clay
const CLAY_SOLID_MATERIAL = new THREE.MeshStandardMaterial({
  name: 'DEBUG_Clay_Neutral',
  color: 0xD8D6CF,
  roughness: 0.85,
  metalness: 0.0,
});

// Architectural glass in clay mode remains transmissive so interior spaces remain readable
const CLAY_GLASS_MATERIAL = new THREE.MeshPhysicalMaterial({
  name: 'DEBUG_Clay_Glazing',
  color: 0xEAE8E2,
  roughness: 0.05,
  metalness: 0.0,
  transmission: 0.90,
  ior: 1.52,
  transparent: true,
  opacity: 0.90,
  depthWrite: false,
});

// Pool water in clay mode remains transmissive to inspect pool basin and submerged steps
const CLAY_WATER_MATERIAL = new THREE.MeshPhysicalMaterial({
  name: 'DEBUG_Clay_Water',
  color: 0xC8D4D8,
  roughness: 0.08,
  metalness: 0.0,
  transmission: 0.88,
  ior: 1.333,
  transparent: true,
  opacity: 0.90,
  depthWrite: false,
});

// Reusable normal material for Normal direction debugging (Section 39)
const NORMAL_DEBUG_MATERIAL = new THREE.MeshNormalMaterial({
  name: 'DEBUG_Normals',
});

// Caches for PBR and debug mode instances to prevent GPU memory leak on toolbar toggles
const pbrMaterialInstances = new Map<string, THREE.Material>();
const roughnessDebugCache = new Map<string, THREE.MeshBasicMaterial>();
const metalnessDebugCache = new Map<string, THREE.MeshBasicMaterial>();
const idDebugCache = new Map<string, THREE.MeshBasicMaterial>();

export function getOrCreatePBRMaterial(specName: string): THREE.Material {
  if (pbrMaterialInstances.has(specName)) {
    return pbrMaterialInstances.get(specName)!;
  }

  const spec = ARCHITECTURAL_MATERIALS[specName];
  if (!spec) {
    // Fallback for unmatched materials
    const fallback = new THREE.MeshStandardMaterial({
      name: specName,
      color: 0xCCCCCC,
      roughness: 0.7,
      metalness: 0.1,
    });
    pbrMaterialInstances.set(specName, fallback);
    return fallback;
  }

  let material: THREE.Material;

  if (spec.transmission && spec.transmission > 0) {
    // Upgrade to Physical Material for glass and water
    const physMat = new THREE.MeshPhysicalMaterial({
      name: spec.name,
      color: spec.color,
      roughness: spec.roughness,
      metalness: spec.metalness,
      transmission: spec.transmission,
      ior: spec.ior ?? 1.5,
      thickness: spec.thickness ?? 0.5,
      attenuationColor: spec.attenuationColor != null ? new THREE.Color(spec.attenuationColor) : new THREE.Color(0xFFFFFF),
      attenuationDistance: spec.attenuationDistance ?? 5.0,
      transparent: spec.transparent ?? false,
      opacity: spec.opacity ?? 1.0,
      depthWrite: false, // Clean depth sorting for physical transmissive surfaces
    });

    if (spec.normalMapUrl) {
      physMat.normalMap = loadCachedTexture(spec.normalMapUrl, spec.textureRepeat ?? [1, 1]);
      if (spec.normalScale) {
        physMat.normalScale.set(spec.normalScale[0], spec.normalScale[1]);
      }
    }

    // Special dual-layer capillary wave shader hook for pool water
    if (spec.name === 'MAT_Water' && spec.normalMap2Url) {
      const tex2 = loadCachedTexture(spec.normalMap2Url, spec.textureRepeat2 ?? [6.0, 3.0]);
      physMat.userData.waterUniforms = {
        uNormalMap2: { value: tex2 },
        uWaterTime: { value: 0 },
      };

      physMat.onBeforeCompile = (shader) => {
        shader.uniforms.uNormalMap2 = physMat.userData.waterUniforms.uNormalMap2;
        shader.uniforms.uWaterTime = physMat.userData.waterUniforms.uWaterTime;

        shader.fragmentShader = `
          uniform sampler2D uNormalMap2;
          uniform float uWaterTime;
        ` + shader.fragmentShader;

        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <normal_fragment_maps>',
          `
          #ifdef USE_NORMALMAP
            vec2 uv1 = vNormalMapUv + vec2(uWaterTime * 0.015, uWaterTime * 0.008);
            vec2 uv2 = vNormalMapUv * 1.5 + vec2(-uWaterTime * 0.010, uWaterTime * 0.012);
            vec3 n1 = texture2D( normalMap, uv1 ).xyz * 2.0 - 1.0;
            vec3 n2 = texture2D( uNormalMap2, uv2 ).xyz * 2.0 - 1.0;
            vec3 mapN = normalize(vec3(n1.xy * 0.6 + n2.xy * 0.4, n1.z));
            mapN.xy *= normalScale;
            #ifdef USE_TANGENT
              normal = normalize( vTBN * mapN );
            #else
              normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
            #endif
          #endif
          `
        );
      };
    }

    material = physMat;
  } else if (spec.clearcoat && spec.clearcoat > 0) {
    // Physical Material for satin oiled wood with clearcoat sheen
    const woodMat = new THREE.MeshPhysicalMaterial({
      name: spec.name,
      color: spec.color,
      roughness: spec.roughness,
      metalness: spec.metalness,
      clearcoat: spec.clearcoat,
      clearcoatRoughness: spec.clearcoatRoughness ?? 0.35,
    });

    if (spec.normalMapUrl) {
      woodMat.normalMap = loadCachedTexture(spec.normalMapUrl, spec.textureRepeat ?? [1, 1]);
      if (spec.normalScale) {
        woodMat.normalScale.set(spec.normalScale[0], spec.normalScale[1]);
      }
    }
    if (spec.roughnessMapUrl) {
      woodMat.roughnessMap = loadCachedTexture(spec.roughnessMapUrl, spec.textureRepeat ?? [1, 1]);
    }

    material = woodMat;
  } else {
    // Standard PBR Material
    const stdMat = new THREE.MeshStandardMaterial({
      name: spec.name,
      color: spec.color,
      roughness: spec.roughness,
      metalness: spec.metalness,
      transparent: spec.transparent ?? false,
      opacity: spec.opacity ?? 1.0,
    });

    if (spec.emissive) {
      stdMat.emissive = new THREE.Color(spec.emissive);
      stdMat.emissiveIntensity = spec.emissiveIntensity ?? 1.0;
    }

    if (spec.normalMapUrl) {
      stdMat.normalMap = loadCachedTexture(spec.normalMapUrl, spec.textureRepeat ?? [1, 1]);
      if (spec.normalScale) {
        stdMat.normalScale.set(spec.normalScale[0], spec.normalScale[1]);
      }
    }

    if (spec.roughnessMapUrl) {
      stdMat.roughnessMap = loadCachedTexture(spec.roughnessMapUrl, spec.textureRepeat ?? [1, 1]);
    }

    material = stdMat;
  }

  pbrMaterialInstances.set(specName, material);
  return material;
}

/**
 * Applies the requested MaterialDisplayMode across all meshes in the scene hierarchy.
 * Uses cached materials to prevent memory leakage and shader re-compilation churn.
 */
export function applyArchitecturalMaterials(
  root: THREE.Object3D,
  mode: MaterialDisplayMode = 'pbr'
): void {
  root.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const currentMat = mesh.material as THREE.Material;
    if (!currentMat) return;

    // Preserve original material name in userData
    if (!mesh.userData.originalMaterialName) {
      mesh.userData.originalMaterialName = currentMat.name || 'MAT_Wall_Main';
    }
    const matName = mesh.userData.originalMaterialName as string;

    switch (mode) {
      case 'clay':
        if (matName === 'MAT_Glass_Clear' || matName === 'MAT_Glass_Dark') {
          mesh.material = CLAY_GLASS_MATERIAL;
        } else if (matName === 'MAT_Water') {
          mesh.material = CLAY_WATER_MATERIAL;
        } else {
          mesh.material = CLAY_SOLID_MATERIAL;
        }
        break;

      case 'normals':
        mesh.material = NORMAL_DEBUG_MATERIAL;
        break;

      case 'roughness': {
        let debugMat = roughnessDebugCache.get(matName);
        if (!debugMat) {
          const spec = ARCHITECTURAL_MATERIALS[matName];
          const rVal = spec ? spec.roughness : 0.5;
          debugMat = new THREE.MeshBasicMaterial({
            name: `DEBUG_Rough_${matName}`,
            color: new THREE.Color(rVal, rVal, rVal),
          });
          roughnessDebugCache.set(matName, debugMat);
        }
        mesh.material = debugMat;
        break;
      }

      case 'metalness': {
        let debugMat = metalnessDebugCache.get(matName);
        if (!debugMat) {
          const spec = ARCHITECTURAL_MATERIALS[matName];
          const mVal = spec ? spec.metalness : 0.0;
          debugMat = new THREE.MeshBasicMaterial({
            name: `DEBUG_Metal_${matName}`,
            color: new THREE.Color(0, mVal * 0.8, mVal),
          });
          metalnessDebugCache.set(matName, debugMat);
        }
        mesh.material = debugMat;
        break;
      }

      case 'ids': {
        let debugMat = idDebugCache.get(matName);
        if (!debugMat) {
          const idColor = MATERIAL_ID_COLORS[matName] ?? 0xFF00FF;
          debugMat = new THREE.MeshBasicMaterial({
            name: `DEBUG_ID_${matName}`,
            color: idColor,
          });
          idDebugCache.set(matName, debugMat);
        }
        mesh.material = debugMat;
        break;
      }

      case 'pbr':
      default:
        mesh.material = getOrCreatePBRMaterial(matName);
        break;
    }
  });
}
