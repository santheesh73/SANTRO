export type MaterialDisplayMode =
  | 'pbr'
  | 'clay'
  | 'normals'
  | 'roughness'
  | 'metalness'
  | 'ids';

export interface PBRMaterialSpec {
  name: string;
  category: 'Architectural' | 'Wood' | 'Glass' | 'Metal' | 'Ground' | 'Water' | 'Vegetation' | 'Lighting';
  color: number;
  roughness: number;
  metalness: number;
  transparent?: boolean;
  opacity?: number;
  transmission?: number;
  ior?: number;
  thickness?: number;
  attenuationColor?: number;
  attenuationDistance?: number;
  emissive?: number;
  emissiveIntensity?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  normalMapUrl?: string;
  normalMap2Url?: string;
  roughnessMapUrl?: string;
  normalScale?: [number, number];
  textureRepeat?: [number, number];
  textureRepeat2?: [number, number];
  description: string;
}
