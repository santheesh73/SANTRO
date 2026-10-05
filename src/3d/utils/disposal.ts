import * as THREE from 'three';

/**
 * Recursively disposes of an object, its children, geometries, materials, and textures.
 * Critical for preventing WebGL context memory leaks on component unmounts.
 */
export function disposeThreeObject(obj: THREE.Object3D | null | undefined): void {
  if (!obj) return;

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) {
        child.geometry.dispose();
      }

      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((mat) => disposeMaterial(mat));
        } else {
          disposeMaterial(child.material);
        }
      }
    } else if (child instanceof THREE.Light) {
      if (child.shadow && child.shadow.map) {
        child.shadow.map.dispose();
      }
    }
  });

  if (obj.parent) {
    obj.parent.remove(obj);
  }
}

/**
 * Disposes of a single material and all its attached textures
 */
export function disposeMaterial(material: THREE.Material): void {
  // Dispose all potential textures on the material
  const mat = material as unknown as Record<string, unknown>;
  const textureKeys = [
    'map',
    'normalMap',
    'roughnessMap',
    'metalnessMap',
    'aoMap',
    'emissiveMap',
    'alphaMap',
    'envMap',
    'clearcoatMap',
    'clearcoatRoughnessMap',
    'clearcoatNormalMap',
    'transmissionMap',
  ];

  for (const key of textureKeys) {
    const val = mat[key];
    if (val && typeof val === 'object' && 'dispose' in val && typeof (val as THREE.Texture).dispose === 'function') {
      (val as THREE.Texture).dispose();
    }
  }

  material.dispose();
}
