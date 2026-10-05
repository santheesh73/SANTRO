export interface WebGLSupportStatus {
  supported: boolean;
  webgl2: boolean;
  renderer: string;
  vendor: string;
  maxTextureSize: number;
  errorMessage?: string;
}

/**
 * Validates WebGL and WebGL 2.0 availability before initializing Three.js canvas.
 */
export function checkWebGLSupport(): WebGLSupportStatus {
  if (typeof window === 'undefined') {
    return {
      supported: true,
      webgl2: true,
      renderer: 'Server-Side Rendering',
      vendor: 'Node.js',
      maxTextureSize: 4096,
    };
  }

  try {
    const canvas = document.createElement('canvas');
    const gl2 = canvas.getContext('webgl2');

    if (gl2) {
      const debugInfo = gl2.getExtension('WEBGL_debug_renderer_info');
      const vendor = debugInfo
        ? gl2.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : gl2.getParameter(gl2.VENDOR);
      const renderer = debugInfo
        ? gl2.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : gl2.getParameter(gl2.RENDERER);
      const maxTextureSize = gl2.getParameter(gl2.MAX_TEXTURE_SIZE);

      return {
        supported: true,
        webgl2: true,
        renderer: String(renderer || 'WebGL 2.0 Hardware'),
        vendor: String(vendor || 'Standard Vendor'),
        maxTextureSize: Number(maxTextureSize) || 4096,
      };
    }

    const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl1) {
      const debugInfo = (gl1 as WebGLRenderingContext).getExtension('WEBGL_debug_renderer_info');
      const vendor = debugInfo
        ? (gl1 as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : (gl1 as WebGLRenderingContext).getParameter((gl1 as WebGLRenderingContext).VENDOR);
      const renderer = debugInfo
        ? (gl1 as WebGLRenderingContext).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : (gl1 as WebGLRenderingContext).getParameter((gl1 as WebGLRenderingContext).RENDERER);
      const maxTextureSize = (gl1 as WebGLRenderingContext).getParameter((gl1 as WebGLRenderingContext).MAX_TEXTURE_SIZE);

      return {
        supported: true,
        webgl2: false,
        renderer: String(renderer || 'WebGL 1.0 Fallback'),
        vendor: String(vendor || 'Standard Vendor'),
        maxTextureSize: Number(maxTextureSize) || 2048,
      };
    }

    return {
      supported: false,
      webgl2: false,
      renderer: 'None',
      vendor: 'None',
      maxTextureSize: 0,
      errorMessage: 'WebGL is not supported or hardware acceleration is disabled in your browser.',
    };
  } catch (err) {
    return {
      supported: false,
      webgl2: false,
      renderer: 'None',
      vendor: 'None',
      maxTextureSize: 0,
      errorMessage: err instanceof Error ? err.message : 'Unknown WebGL detection error',
    };
  }
}
