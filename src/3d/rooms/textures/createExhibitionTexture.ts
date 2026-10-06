import * as THREE from 'three';

export interface CanvasTextureOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
}

/**
 * Creates a high-DPI HTML5 CanvasTexture in client memory without external network font requests.
 * Uses system fonts and hardware 2D canvas routines.
 */
export function createDynamicCanvasTexture(
  drawFn: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  options: CanvasTextureOptions = {}
): THREE.CanvasTexture | null {
  if (typeof document === 'undefined') {
    return null; // Safe for Node.js / SSR
  }

  const width = options.width ?? 1024;
  const height = options.height ?? 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Background Fill
  ctx.fillStyle = options.backgroundColor ?? '#111215';
  ctx.fillRect(0, 0, width, height);

  // Border Hairline
  if (options.borderWidth && options.borderWidth > 0) {
    ctx.strokeStyle = options.borderColor ?? 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = options.borderWidth;
    ctx.strokeRect(
      options.borderWidth / 2,
      options.borderWidth / 2,
      width - options.borderWidth,
      height - options.borderWidth
    );
  }

  // Draw custom layout
  drawFn(ctx, width, height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.anisotropy = 8;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Text drawing helper with word wrapping
 */
export function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 4
): number {
  const words = text.split(' ');
  let line = '';
  let lineCount = 0;
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      lineCount++;
      if (lineCount >= maxLines - 1) {
        // truncate remaining
        const remaining = words.slice(n).join(' ');
        ctx.fillText((remaining.slice(0, 40) + '...').trim(), x, currentY);
        return currentY;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY;
}
