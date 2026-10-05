import { ASSET_MANIFEST, AssetManifestEntry } from './manifest';

/**
 * Returns the resolved asset entry by ID, or throws a descriptive error if missing.
 */
export function getAssetEntry(id: string): AssetManifestEntry {
  const entry = ASSET_MANIFEST[id];
  if (!entry) {
    throw new Error(`[AssetRegistry] Asset with id "${id}" not found in ASSET_MANIFEST.`);
  }
  return entry;
}

/**
 * Master architectural model ID and default resolver for M2+
 */
export const MASTER_HOUSE_MODEL_ID = 'the_portfolio_house';

export function getDefaultHouseModelUrl(): string | null {
  return resolveAssetUrl(MASTER_HOUSE_MODEL_ID);
}

/**
 * Resolves the URL for an asset. If the asset is procedural or unavailable without
 * a static web fallback, returns null to signal procedural rendering.
 */
export function resolveAssetUrl(id: string): string | null {
  const entry = getAssetEntry(id);
  if (entry.type === 'PROCEDURAL') {
    return null;
  }
  if (entry.status === 'AVAILABLE' || entry.status === 'OPTIMIZED') {
    return entry.path;
  }
  if (entry.fallbackPath && !entry.fallbackPath.startsWith('procedural:')) {
    return entry.fallbackPath;
  }
  return null;
}

/**
 * Centralized paths for common asset categories
 */
export const ASSET_PATHS = {
  models: '/3d/models',
  textures: '/3d/textures',
  environment: '/3d/environment',
  placeholders: '/3d/placeholders',
  draco: '/3d/draco',
} as const;
