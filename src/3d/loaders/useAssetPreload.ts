import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

/**
 * Hook to preload GLTF/GLB models in advance to prevent frame hitching during walkthroughs.
 */
export function useAssetPreload(urls: string[]) {
  useEffect(() => {
    urls.forEach((url) => {
      try {
        useGLTF.preload(url);
      } catch (err) {
        console.warn(`[AssetPreload] Failed to preload asset: ${url}`, err);
      }
    });

    return () => {
      urls.forEach((url) => {
        try {
          useGLTF.clear(url);
        } catch {
          // Ignore clear errors on unmount
        }
      });
    };
  }, [urls]);
}
