import { QualityConfig, QualityTier } from '@/types';

export const QUALITY_CONFIGS: Record<QualityTier, QualityConfig> = {
  high: {
    dpr: [1, 1.75],
    shadows: true,
    shadowMapSize: 2048,
    antialias: true, // Native WebGL MSAA antialiasing enabled
    postprocessing: false, // Deferred to post-processing milestone M9
    maxLights: 4,
  },
  medium: {
    dpr: [1, 1.25],
    shadows: true,
    shadowMapSize: 1024,
    antialias: true,
    postprocessing: false,
    maxLights: 3,
  },
  low: {
    dpr: [1, 1.0],
    shadows: false,
    shadowMapSize: 512,
    antialias: true,
    postprocessing: false,
    maxLights: 2,
  },
};

/**
 * Automatically determine initial quality tier based on device hardware and screen dimensions
 */
export function detectDefaultQualityTier(): QualityTier {
  if (typeof window === 'undefined') return 'high';

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const screenWidth = window.innerWidth;

  if (isMobile || screenWidth < 768 || hardwareConcurrency < 4) {
    return 'medium';
  }

  return 'high';
}
