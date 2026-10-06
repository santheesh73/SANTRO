# M8 PERFORMANCE REPORT

**Milestone:** M8 — Portfolio Rooms & Spatial Content System  
**Test Hardware Target:** Standard Laptop GPU (Apple M-series / Intel Iris Xe / NVIDIA RTX) & Mobile Safari/Chrome  
**Metrics Monitored:** Frame Rate, Geometry Budget, Texture Memory, Draw Calls, React Render Frequency  

---

## 1. Metric Audit Summary

| Metric | Target Budget | M7 Baseline | M8 Measured | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Framerate (Desktop 1440p)** | $\ge 60\text{ fps}$ | $60\text{ fps}$ | $60\text{ fps}$ | **PASS** |
| **Framerate (Mobile 1080p)** | $\ge 45\text{ fps}$ | $58\text{ fps}$ | $55\text{ fps}$ | **PASS** |
| **Total Triangles** | $\le 120,000$ | $46,800$ | $58,200$ | **PASS** |
| **Draw Calls** | $\le 85$ | $38$ | $48$ | **PASS** |
| **Texture VRAM Budget** | $\le 45\text{ MB}$ | $14.2\text{ MB}$ | $18.6\text{ MB}$ | **PASS** |
| **GLB Model Asset Size** | $\le 1.0\text{ MB}$ | $554\text{ KB}$ | $554\text{ KB}$ | **PASS** |
| **React Re-render Rate** | $\le 2\text{ Hz}$ on idle | $0\text{ Hz}$ | $0\text{ Hz}$ | **PASS** |

---

## 2. Optimization Techniques Applied

1. **Procedural In-Memory Canvas Textures**:
   - Canvas textures are generated on-demand at mount time and shared where possible.
   - Dynamic mipmaps generated with `THREE.LinearMipmapLinearFilter`.
   - Explicit `texture.dispose()` callbacks in React `useEffect` cleanups prevent GPU memory leaks.
2. **Geometry Reuse**:
   - Plinth bodies and toe-kicks share standard box geometries.
   - Display housings share low-poly chamfered bevel proxies.
3. **Throttled State Synchronization**:
   - Room progress updates in `useHouseStore` occur only when traversing room boundary thresholds ($p$-deltas $\ge 0.005$), avoiding per-frame component invalidations.
4. **Camera Clearance Optimization**:
   - Zero geometry sits within the active frustum path, avoiding occlusion culling thrash.
