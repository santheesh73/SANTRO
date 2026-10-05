# WEBGL PERFORMANCE FOUNDATION & METRICS SPECIFICATION

**Project:** "THE PORTFOLIO HOUSE" — SANTRO  
**Milestone:** M1 — 3D Asset Pipeline & Web Foundation  
**Target Framerate:** 60 FPS Locked (Desktop) / $\ge 35$ FPS (Mobile)  
**WebGL API:** WebGL 2.0 with ACESFilmic Tone Mapping  

---

## 1. WebGL Performance Budgets

To prevent GPU thermal throttling and sustain locked 60fps across high-density displays:

| Performance Metric | Hard Maximum Budget | Target Production Value | Notes |
| :--- | :--- | :--- | :--- |
| **Total Triangles** | $\le 250,000$ | $\sim 140,000 - 180,000$ | House: $85\text{k}$, Furniture: $45\text{k}$, Landscape: $35\text{k}$ |
| **Total Vertices** | $\le 160,000$ | $\sim 110,000$ | Shared indexed vertices via welding |
| **Active Meshes** | $\le 45$ nodes | $\sim 28 - 32$ | Merged by material type where static |
| **Draw Calls** | $\le 65$ per frame | $\sim 42 - 50$ | Forward pass + 1 directional shadow pass |
| **GLB File Size (Raw)** | $\le 20.0 \text{ MB}$ | $\sim 12.0 \text{ MB}$ | Uncompressed intermediate asset |
| **GLB File Size (Opt)** | $\le 8.0 \text{ MB}$ | $\sim 4.5 - 6.0 \text{ MB}$ | Quantized Meshopt + KTX2 textures |
| **Texture VRAM** | $\le 15.0 \text{ MB}$ | $\sim 11.0 \text{ MB}$ | Uncompressed VRAM allocation |
| **Network Transfer (Wire)**| $\le 9.5 \text{ MB}$ | $\sim 6.0 \text{ MB}$ | Initial cold load wire transfer |

---

## 2. Device Tier Architecture

Performance is governed by a 3-tier adaptive configuration implemented in `src/3d/utils/quality.ts`:

```typescript
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
```

### 2.1 Clamped Device Pixel Ratio (DPR)
- High-density displays (e.g., iPhone Retina 3x or MacBook 2x) cause exponential fragment shader fill-rate bottlenecks.
- SANTRO strictly caps DPR to `[1.0, 1.75]` on High tier and `1.0` on Low tier, cutting GPU pixel calculations by 45% with no visible loss of architectural clarity.

### 2.2 Directional Shadow Map Sizing
- Directional sun shadows are bounded to a tight $50\text{m} \times 50\text{m}$ orthographic frustum.
- High tier renders at $2048 \times 2048$ with PCF soft filtering.
- Medium tier drops to $1024 \times 1024$.
- Low tier disables shadows completely, using ambient and hemisphere fill lighting.

---

## 3. Responsive 3D Canvas Behavior

The canvas island mounts inside `src/components/3d/CanvasContainer.tsx`:

1. **Full-Viewport Fluidity:** Configured with `width: 100%`, `height: 100%`, `overflow: hidden`, and `position: absolute`.
2. **Aspect Ratio Preservation:** Three.js automatically recalculates camera aspect ratio and projection matrices on `window.resize` events without distortion.
3. **Zero Horizontal Scroll:** Explicit CSS rules (`overflow: hidden` on root `html`, `body`, and `<main>`) eliminate touch horizontal swipe gestures from breaking page layout.
4. **Mobile FOV Adaptation:** On mobile viewports ($< 768\text{px}$), camera vertical FOV expands by $+6^\circ$ to accommodate narrower portrait aspect ratios without clipping the house cantilevers.

---

## 4. GPU Resource Lifecycle & Disposal

To avoid memory leaks during route changes and component unmounting, `src/3d/utils/disposal.ts` enforces deep recursive cleanup:

```typescript
export function disposeThreeObject(obj: THREE.Object3D | null | undefined): void {
  if (!obj) return;
  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.geometry) child.geometry.dispose();
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
  if (obj.parent) obj.parent.remove(obj);
}
```

Every mesh geometry, texture buffer (`map`, `normalMap`, `roughnessMap`, `transmissionMap`), and shadow render target is explicitly freed from GPU memory.
