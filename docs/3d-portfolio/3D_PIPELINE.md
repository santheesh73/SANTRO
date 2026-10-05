# 3D ASSET PIPELINE & WEB DELIVERY SPECIFICATION

**Project:** "THE PORTFOLIO HOUSE" — SANTRO  
**Milestone:** M1 — 3D Asset Pipeline & Web Foundation  
**Target Format:** Web-Optimized Binary glTF (`.glb`)  
**Primary Toolchain:** Blender 4.x/5.x, `@gltf-transform/cli`, Meshoptimizer, Draco, Basis Universal  
**Runtime:** Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)  

---

## 1. End-to-End Pipeline Overview

The asset pipeline establishes a strict unidirectional workflow guaranteeing that high-fidelity architectural models from Blender are delivered to the browser with minimal transfer size and locked 60fps rendering:

```text
REFERENCE VIDEO (asset/architectural_reference.mp4)
     ↓
BLENDER 3D RECONSTRUCTION (blender/the_portfolio_house.blend)
  • Metric scale (1.0m = 1.0 unit)
  • Origin [0, 0, 0] at entrance threshold
  • Strict collection hierarchy
  • Applied transforms & unified normals
     ↓
INTERMEDIATE EXPORT (the_portfolio_house_raw.glb)
  • Headless script: 3d-source/scripts/export_portfolio_house.py
  • glTF 2.0 Binary with custom node extras
     ↓
WEB OPTIMIZATION PIPELINE (scripts/optimize-model.mjs)
  • Dedup: deduplicate identical buffers & materials
  • Prune: remove orphan nodes, unused textures
  • Weld: combine duplicate vertices (tolerance: 0.0001m)
  • Reorder: cache-locality indexing
  • Meshopt: EXT_meshopt_compression / Draco quantization
  • KTX2: Basis Universal UASTC texture transcoding
     ↓
PRODUCTION WEB ASSET (public/3d/models/the_portfolio_house.glb)
  • Size budget: < 8.0 MB
  • Triangle budget: < 180,000
     ↓
REACT THREE FIBER RUNTIME (src/3d/loaders/ModelLoader.tsx)
  • Suspense boundary + preloader
  • ACESFilmic ToneMapping & PCF soft shadows
  • Deep GPU disposal on unmount
```

---

## 2. Blender Production Workflow

### 2.1 Automated Headless Export
When Blender is available in the execution environment, asset export is completely automated via CLI:

```bash
# Execute headless export from project root:
blender -b 3d-source/blender/the_portfolio_house.blend -P 3d-source/scripts/export_portfolio_house.py
```

The script automatically:
1. Validates metric scene units (`1.0 unit = 1.0 meter`).
2. Applies transforms (`Ctrl+A`) for all static architectural meshes.
3. Preserves explicit origins for dynamic elements (`GEO_Door_Pivot_Leaf` hinge axis, `WAYPOINT_*` nodes).
4. Unifies face normals outward.
5. Exports binary GLB directly to `public/3d/models/the_portfolio_house_raw.glb`.

### 2.2 Manual Blender Export Protocol
If executing Blender interactively through the GUI:
1. Open `the_portfolio_house.blend`.
2. Ensure viewport units are set to **Metric** with Unit Scale **1.000000**.
3. Select architectural collections (`01_ARCHITECTURE`, `02_INTERIOR_JOINERY`, `03_EXTERIOR_ELEMENTS`, `04_ENVIRONMENT`, `05_SYSTEM_ANCHORS`).
4. Press `File > Export > glTF 2.0 (.glb/.gltf)`.
5. Set the following export flags:
   - **Format:** `glTF Binary (.glb)`
   - **Include:** Check `Selected Objects`, `Custom Properties`
   - **Transform:** Check `+Y Up`
   - **Geometry:** Check `Apply Modifiers`, `Normals`, `Tangents`
   - **Animation:** Check `Shape Keys`, uncheck `Skins` (if no skeletal rigs)
   - **Compression:** Uncheck Draco inside Blender (compression is handled in Step 3 for granular control)
6. Export to `public/3d/models/the_portfolio_house_raw.glb`.

---

## 3. Web Optimization Toolchain (`scripts/optimize-model.mjs`)

Raw GLB files exported from 3D software contain redundant vertices, uncompressed textures, and un-quantized float arrays. The optimization pipeline processes the raw asset through six sequential passes:

### Step 1: Deduplication (`dedup`)
```bash
gltf-transform dedup input_raw.glb stage1_dedup.glb
```
- Eliminates duplicate geometry accessors, accessors with identical data, and duplicate material definitions.

### Step 2: Pruning (`prune`)
```bash
gltf-transform prune stage1_dedup.glb stage2_pruned.glb
```
- Removes empty nodes, unused texture samplers, unreferenced materials, and zero-weight skinning data.

### Step 3: Vertex Welding (`weld`)
```bash
gltf-transform weld --tolerance 0.0001 stage2_pruned.glb stage3_welded.glb
```
- Merges coplanar duplicate vertices along architectural edges with a tight $0.1\text{mm}$ threshold, reducing vertex counts by 15% to 30% while preserving sharp architectural bevels.

### Step 4: Cache-Locality Vertex Reordering (`reorder`)
```bash
gltf-transform reorder stage3_welded.glb stage4_reordered.glb
```
- Reindexes triangle vertex order using Tom Forsyth's algorithm to maximize GPU vertex cache hit rates.

### Step 5: Texture Transcoding (`uastc`)
```bash
gltf-transform uastc stage4_reordered.glb stage5_ktx2.glb --level 2 --rdo 1.5 --zstd 18
```
- Transcodes JPEG/PNG textures to Basis Universal KTX2 UASTC format. GPU textures remain compressed in VRAM, slashing VRAM footprint from $180\text{MB}$ down to $< 45\text{MB}$.

### Step 6: Meshoptimizer Quantization (`meshopt`)
```bash
gltf-transform meshopt stage5_ktx2.glb public/3d/models/the_portfolio_house.glb
```
- Quantizes vertex positions (14-bit), normals (10-bit octahedral), and UVs (12-bit), applying lossless entropy compression (`EXT_meshopt_compression`).

---

## 4. Asset Budget Verification (`scripts/verify-assets.mjs`)

Before merging any 3D asset into the repository, `npm run verify-assets` executes automated compliance checks:

| Check | Constraint | Failure Action |
| :--- | :--- | :--- |
| **Magic Header** | `0x46546C67` (glTF 2.0 Binary) | Asset rejected; corrupted export |
| **House Model Size** | $\le 8.0 \text{ MB}$ | Flagged; trigger aggressive texture downsampling |
| **Individual Props** | $\le 2.0 \text{ MB}$ | Flagged; decimate geometry |
| **Triangles (Scene)** | $\le 250,000$ (Target: $160\text{k}$) | Flagged; reduce subdivision levels |
| **Draw Calls** | $\le 65$ total | Merge static meshes sharing identical materials |

---

## 5. Web Runtime Integration in React Three Fiber

### 5.1 Declarative Loading with ModelLoader
```tsx
import { ModelLoader } from '@/3d/loaders/ModelLoader';
import { resolveAssetUrl } from '@/3d/assets/config';

<Suspense fallback={<PlaceholderHouse />}>
  <ModelLoader
    url={resolveAssetUrl('the_portfolio_house')}
    castShadow
    receiveShadow
  />
</Suspense>
```

### 5.2 GPU Resource Cleanup Protocol
When navigating away or hot-reloading:
```tsx
import { disposeThreeObject } from '@/3d/utils/disposal';

useEffect(() => {
  return () => {
    disposeThreeObject(clonedScene);
  };
}, [clonedScene]);
```
This guarantees zero WebGL memory leaks across route changes and device re-orientations.
