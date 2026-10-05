# M1 — 3D ASSET PIPELINE & WEB RENDERING FOUNDATION IMPLEMENTATION

**Milestone:** M1 — 3D Asset Pipeline & Web 3D Foundation  
**Repository:** `santheesh73/SANTRO`  
**Date:** October 2026  
**Status:** COMPLETE  

---

## 1. Executive Summary

Milestone **M1** establishes the production-grade 3D asset pipeline, WebGL rendering environment, and application infrastructure for **SANTRO** ("The Portfolio House").

In strict accordance with milestone boundaries:
- **No final house modeling** was attempted (owned by M2/M3).
- **No portfolio rooms or final materials** were created (owned by M3/M4).
- **No cinematic spline journeys or audio** were introduced (owned by M6/M7/M13).

Instead, M1 provides a battle-tested technical foundation validating that:
1. React Three Fiber and Three.js render reliably inside the Next.js 16 App Router.
2. Responsive canvas resizing, ACESFilmic tone mapping, and clamped device pixel ratios (DPR) prevent GPU thrashing.
3. A centralized asset registry (`ASSET_MANIFEST`) manages external models and prevents path scattering.
4. An external GLB loading system (`ModelLoader`) handles loading states, error boundaries, and deep GPU resource disposal.
5. A metric architectural placeholder validates real-world scale, directional shadows, and camera orientation.
6. Blender automation and `@gltf-transform` optimization scripts are structured and ready to receive M2 geometry.

---

## 2. Technical Stack & Dependencies

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `^15.2.0` / `16.x` | Application shell, SSR/SSG, WebGL client island |
| **Runtime & Language**| React + TypeScript | `^19.0.0` / `5.7+` | Concurrent rendering, strict type checking |
| **3D Rendering** | Three.js | `^0.180.0` | WebGL 2.0 core rendering engine |
| **Declarative 3D** | `@react-three/fiber` (R3F) | `^9.0.0` | Declarative Three.js scene graph in React 19 |
| **3D Helpers** | `@react-three/drei` | `^10.0.0` | `useGLTF` loaders, perspective camera, orbit controls |
| **State Orchestration**| Zustand | `^5.0.0` | Spatial state machine, quality tiers, loading flags |
| **Styling** | Tailwind CSS v4 | `^4.0.0` | Modern CSS variable tokens & UI overlay layout |
| **Icons** | Lucide React | `^1.44.0` | Hairline architectural HUD indicators |

---

## 3. Directory Structure

The repository structure cleanly separates 3D rendering concerns from standard web UI:

```text
santheesh73/SANTRO/
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout, meta tags, responsive viewport
│   │   ├── page.tsx                    # Client canvas island mount & HUD overlay
│   │   └── globals.css                 # Base theme and canvas overflow styling
│   ├── 3d/
│   │   ├── assets/
│   │   │   ├── manifest.ts             # Centralized typed asset registry
│   │   │   └── config.ts               # Asset URL resolution & path constants
│   │   ├── camera/
│   │   │   ├── PerspectiveCamera.tsx   # 48° FOV architectural camera
│   │   │   └── CameraController.tsx    # Damped orbit inspection controls
│   │   ├── environment/
│   │   │   └── Atmosphere.tsx          # Dynamic sky, exponential fog, ground horizon
│   │   ├── lighting/
│   │   │   └── SceneLighting.tsx       # Directional sun with PCF soft shadows
│   │   ├── loaders/
│   │   │   ├── ModelLoader.tsx         # GLTF/GLB loader with cloning & disposal
│   │   │   └── useAssetPreload.ts      # Multi-asset preloading hook
│   │   ├── scene/
│   │   │   ├── ArchitecturalScene.tsx  # Scene graph root (lights, camera, geometry)
│   │   │   └── PlaceholderHouse.tsx    # Metric architectural massing placeholder
│   │   ├── state/
│   │   │   └── useHouseStore.ts        # Zustand spatial and performance store
│   │   └── utils/
│   │       ├── quality.ts              # HIGH/MEDIUM/LOW tier configuration
│   │       ├── webgl.ts                # WebGL 2.0 diagnostic detection
│   │       └── disposal.ts             # Deep GPU resource cleanup utility
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── CanvasContainer.tsx     # R3F Canvas wrapper with tone mapping & DPR
│   │   │   ├── LoadingOverlay.tsx      # Minimal hairline loading indicator
│   │   │   ├── WebGLFallback.tsx       # Fallback card when WebGL is unavailable
│   │   │   └── ErrorBoundary3D.tsx     # React Error Boundary for 3D crashes
│   │   └── ui/
│   │       ├── QualitySelector.tsx     # Interactive quality tier switcher
│   │       └── ViewportHUD.tsx         # Architectural HUD overlay
│   ├── data/                           # Authentic engineering data (Santheesh S)
│   │   ├── profile.ts
│   │   ├── projects.ts                 # 7 production projects (ORION, HeartTune, etc.)
│   │   ├── skills.ts                   # 4 categories, 23 verified technologies
│   │   └── proof.ts
│   └── types/
│       └── index.ts                    # Domain interfaces and quality definitions
│
├── 3d-source/
│   └── scripts/
│       └── export_portfolio_house.py   # Headless Blender Python export automation
│
├── public/
│   └── 3d/
│       ├── models/                     # Production GLB assets
│       ├── textures/                   # KTX2 PBR textures
│       ├── environment/                # HDR environment maps
│       └── placeholders/               # Metric validation models
│
├── scripts/
│   ├── optimize-model.mjs              # Command-line asset optimization pipeline
│   ├── verify-assets.mjs               # Asset manifest & budget verification
│   └── generate-placeholder-glb.mjs    # Binary GLB validation generator
│
└── docs/3d-portfolio/                  # Engineering specifications suite
    ├── M0_BASELINE.md
    ├── M1_IMPLEMENTATION.md            # (This document)
    ├── 3D_PIPELINE.md
    ├── BLENDER_CONVENTIONS.md
    ├── WEBGL_PERFORMANCE.md
    ├── ASSET_MANIFEST.md
    └── M1_REPORT.md
```

---

## 4. WebGL Canvas & Renderer Foundation

The `<CanvasContainer>` component configures the Three.js WebGLRenderer with production architectural standards:

- **Color Management:** `outputColorSpace = THREE.SRGBColorSpace` ensuring linear lighting calculations and correct sRGB gamma display.
- **Tone Mapping:** `THREE.ACESFilmicToneMapping` with exposure calibrated to `1.15`. This prevents harsh blown-out whites on ivory stucco while preserving shadow gradations.
- **Device Pixel Ratio (DPR):** Clamped dynamically:
  - `HIGH`: `[1.0, 1.75]` (eliminates 3x overdraw on Retina devices)
  - `MEDIUM`: `[1.0, 1.25]`
  - `LOW`: `[1.0, 1.0]`
- **Shadow Map Filtering:** `THREE.PCFSoftShadowMap` with tightly bounded orthographic frustum ($50\text{m} \times 50\text{m}$) preventing shadow acne and edge swimming.
- **Compositing:** `alpha: false` avoids unnecessary alpha compositing blending passes with the HTML body.

---

## 5. Architectural Placeholder Scene

To validate scale, camera framing, and lighting without prematurely building the final house, `<PlaceholderHouse />` implements real-world metric massing based on `ARCHITECTURE_SPEC.md`:

```text
       CAMERA (Shot 01 Crane: [4.2m, 12.5m, 26.0m])
          ↓
    ┌─────────────────────────────┐
    │  UPPER CANTILEVER VOLUME    │  (Y: 3.4m to 7.0m, [20m x 3.6m x 14m])
    │  ┌───────────────────────┐  │
    │  │ GROUND FLOOR CORE     │  │  (Y: 0.0m to 3.4m, [24m x 3.4m x 16m])
    │  └───────────────────────┘  │
    └─────────────────────────────┘
    ┌─────────────────────────────┐
    │  FOUNDATION PLINTH          │  (Y: -1.8m to 0.0m, [36m x 1.8m x 28m])
    │  [POOL INDICATOR: 14x4.2m]  │
    └─────────────────────────────┘
       GROUND HORIZON (R = 180m)
```

- **World Origin:** $[0, 0, 0]$ marked at the finished floor level of the entrance door threshold.
- **Shadow Validation:** Both ground floor massing and upper cantilevers cast and receive PCF soft shadows, allowing immediate visual inspection of sun angles ($35^\circ$ elevation).

---

## 6. External GLB Loading & Disposal Architecture

The asset loading system connects to `ASSET_MANIFEST`:

1. **Decoupled Architecture:** The house is never hardcoded into React JSX. It is loaded through `<ModelLoader url={url} />` which consumes paths from `ASSET_PATHS.models`.
2. **Suspense Hydration:** Handled cleanly with `<Suspense fallback={<PlaceholderHouse />}>`.
3. **Cloning & Immutability:** `gltf.scene.clone(true)` ensures that if multiple instances or re-mounts occur, transforms and materials remain uncorrupted.
4. **Deep GPU Cleanup:** `disposeThreeObject()` traverses all child meshes, disposing buffer geometries, textures (`map`, `normalMap`, `roughnessMap`), and materials on unmount to completely eliminate WebGL context memory leaks.

---

## 7. Error Handling & WebGL Diagnostics

The system handles failures gracefully across five distinct vectors:

1. **WebGL Unsupported:** Detected via `checkWebGLSupport()`. Displays `<WebGLFallback>` explaining hardware acceleration requirements.
2. **Context Loss / Crash:** Caught by `<ErrorBoundary3D>` with a clean retry button.
3. **Model 404 / Network Drop:** Handled by fallback rendering to `<PlaceholderHouse />` and reporting error to Zustand state.
4. **Texture Failure:** Material renders with fallback diffuse color without breaking the scene.
5. **Reduced Performance:** Dynamic quality tier selector allows immediate drop to `MEDIUM` or `LOW` tiers.

---

## 8. Handoff to Milestone M2

With Milestone M1 verified:
- The 3D canvas is active and responsive.
- Metric coordinate systems are established.
- The asset pipeline scripts are ready.
- **Milestone M2 (House Blockout & Architectural Reconstruction)** can begin modeling the real volumetric house in Blender and export cleanly to `public/3d/models/the_portfolio_house.glb`.
