# M2 — HOUSE BLOCKOUT & ARCHITECTURAL RECONSTRUCTION IMPLEMENTATION

**Milestone:** M2 — House Blockout & Architectural Reconstruction  
**Repository:** `santheesh73/SANTRO`  
**Date:** October 2026  
**Status:** COMPLETE  
**Primary Source of Truth:** `asset/architectural_reference.mp4` (240 frames, 1080p, 24fps)  
**Primary 3D Asset:** `public/3d/models/the_portfolio_house.glb` (257.40 KB, 143 meshes, 1,716 triangles, 13 materials)

---

## 1. Executive Summary

Milestone **M2** achieves the foundational architectural reconstruction of **"The Portfolio House"**, translating the primary cinematic reference into a clean, modular, browser-renderable 3D asset hierarchy.

In accordance with M2 principles:
- **Built the house, not a house:** Every major architectural volume, cantilever overhang, opening, entrance portal, terrace relationship, infinity lap pool, and hillside elevation directly mirrors the reference media.
- **Strictly neutral blockout:** In line with milestone boundaries, no high-frequency micro-textures, photorealistic procedural shaders, or cinematic dusk lighting were authored. Neutral architectural PBR materials carry the silhouette and massing.
- **Zero competing pipelines:** Built upon the established M1 pipeline (`three` + `GLTFExporter` + `@react-three/fiber` + `ModelLoader`). The model is fully integrated into the live Next.js application at `public/3d/models/the_portfolio_house.glb`.
- **Calibrated Reference Cameras:** Integrated 7 reference validation cameras into the WebGL scene graph and viewport HUD, enabling frame-by-frame visual verification against reference shots 01 through 04.

---

## 2. Source-to-Geometry Reconstruction Workflow

### 2.1 Visual Reference Keyframes Analyzed
The architectural model was designed through systematic dissection of keyframe extractions:
1. **Frame 000 (t=0.0s — Shot 01):** Exterior establishing wide view defining overall proportions, dual upper cantilever boxes, central bridge recess, gravel roof with skylight, infinity pool length, and steep hillside topography.
2. **Frame 070 (t=2.9s — Shot 02):** Pool terrace approach establishing entrance portal proportions, 90° corner curtain wall on the east wing, sliding pocket glass on the west wing, and frameless glass balustrades.
3. **Frame 108 (t=4.5s — Shot 02):** Pivot entrance threshold revealing the 9-plank horizontal walnut door leaf, offset hinge axis, cyan illuminated vertical handle, travertine floor slabs, and right fluted walnut wall.
4. **Frame 133 (t=5.5s — Shot 03):** Gallery corridor tracking shot revealing the left frameless glass workspace enclosure with executive walnut desk and dual monitors, and right floating stone staircase.
5. **Frame 185 (t=7.7s — Shot 04):** Monumental 6.8m double-height atrium revealing mezzanine walkways with glass balustrades, monolithic travertine master plinth with warm recessed toe-kick reveal, and rear mountain vista glazing.
6. **Frame 239 (t=10.0s — Shot 04):** Twilight aerial panoramic shot validating the full hillside estate massing, retaining wall foundation drop, and distant mountain ridge horizon.

---

## 3. Master Coordinate System & Origin Conventions

The model strictly adheres to the coordinate and scale conventions established in M0 and M1:

| Axis | Direction | Architectural Reference |
| :--- | :--- | :--- |
| **$+X$** | Right (East) | Dining Wing, Staircase, East Cantilever Terrace |
| **$-X$** | Left (West) | Living Wing, Glass Workspace, West Cantilever Box |
| **$+Y$** | Up (Elevation) | Vertical height ($1.0 \text{ unit} = 1.0 \text{ meter}$) |
| **$-Y$** | Down | Retaining plinth foundation and hillside descent |
| **$+Z$** | Forward (South) | Pool terrace plinth, infinity lap pool, camera approach |
| **$-Z$** | Backward (North) | Foyer corridor, double-height atrium, rear mountain vista |

### Key Benchmark Datums:
- `HOUSE_ORIGIN`: $[0.0, 0.0, 0.0]$ located at the finished floor level of the main entrance threshold.
- `GROUND_LEVEL`: $Y = 0.0\text{m}$ (finished floor of foyer, corridor, living, and dining rooms).
- `TERRACE_LEVEL`: $Y = -0.01\text{m}$ to $+0.20\text{m}$ (paved travertine terrace deck).
- `POOL_WATER_LEVEL`: $Y = -0.08\text{m}$ (recessed below flush coping).
- `POOL_BOTTOM_LEVEL`: $Y = -1.50\text{m}$.
- `INTER-FLOOR_SLAB`: $Y = +3.60\text{m}$ (slab thickness: $0.40\text{m}$).
- `MAIN_ROOF_LEVEL`: $Y = +7.40\text{m}$ (slab thickness: $0.40\text{m}$, parapet to $+7.825\text{m}$).
- `ATRIUM_CLEARANCE`: Finished height $6.80\text{m}$ ($Y = 0.0\text{m} \to +7.40\text{m}$).

---

## 4. Modular Collection Structure

The model geometry is partitioned into 5 standardized top-level collections adhering to `BLENDER_CONVENTIONS.md` and `3D_PIPELINE.md`:

```text
HOUSE_Master_Root
├── 01_ARCHITECTURE
│   ├── Foundation Plinths (Main plinth & southwest retaining step)
│   ├── Floor Slabs (Ground, West upper, East upper, Central bridge, Rear terrace)
│   ├── Ground Floor Masses (Living west wall, Foyer columns & soffit, Dining east wall)
│   ├── Upper Floor Cantilever Boxes (West hollow frame, East solid face & alcove, Bridge)
│   ├── Roof Assembly (Main slab, Parapets, Gravel bed, Skylight curb & glass)
│   ├── Penthouse Stair Bulkhead
│   └── Perimeter Walls (Atrium shell, East property boundary wall)
│
├── 02_INTERIOR_JOINERY
│   ├── Flooring Planes (Foyer vestibule, Central gallery corridor, Atrium floor)
│   ├── Feature Walnut Batten Wall (Corridor right wall + typography plinth)
│   ├── Ceiling Architectural Reveal (Black recessed linear channel)
│   ├── Floating Minimalist Staircase (14 cantilevered stone treads)
│   ├── Glass Engineering Workspace (Frameless glass enclosure, desk, credenza, monitors)
│   └── Double-Height Atrium (Mezzanine walkways, glass balustrades, travertine plinths)
│
├── 03_EXTERIOR_ELEMENTS
│   ├── Entrance Pivot Door System (9 horizontal planks, offset pivot, cyan LED handle)
│   ├── Sidelite Glazing & Bronze Metal Frames
│   ├── Ground Floor Glazing (Living pocket sliding doors, Dining 90° corner glass)
│   ├── Upper Floor Glazing (West balcony, East terrace alcove & wood wall, Bridge)
│   ├── Rear Mountain Vista Glass Curtain Wall (Double-height 12m × 6.8m)
│   ├── Terrace Plinth Paving (Main pool deck, East raised plinth, West lounge)
│   ├── Infinity Lap Pool (Basin walls/floor, vanishing overflow edge, water plane)
│   ├── Perimeter Frameless Glass Balustrades
│   ├── Sun Loungers (2 pairs of low minimalist teak chaise lounges)
│   └── Exterior Steps (Approach steps to entrance portal)
│
├── 04_ENVIRONMENT
│   ├── Hillside Topography (Stepped sloped terrain grounding residence)
│   ├── Exposed Concrete Retaining Wall (Supporting southwest pool deck)
│   ├── Agave Americana Scrub Clusters (8 perimeter succulent blockouts)
│   ├── Low Chaparral Bushes (8 hillside scrub masses)
│   └── Distant Mountain Horizon Silhouette
│
└── 05_SYSTEM_ANCHORS
    ├── ANCHOR_House_Origin ([0, 0, 0])
    ├── ANCHOR_Door_Hinge_Pivot ([-0.65, 1.60, 0.0] with door_trigger metadata)
    └── WAYPOINT_Shot01 through WAYPOINT_Shot04 (7 reference camera waypoints)
```

---

## 5. Technical Pipeline & Export Verification

### 5.1 Automated Scripting
The model is generated via headless Node.js Three.js automation script:
```bash
npm run generate-house
# Executes scripts/generate-portfolio-house-glb.mjs
```
The generator builds the full scene graph, associates PBR materials, attaches custom anchor extras, and exports binary glTF 2.0 (`.glb`) via `GLTFExporter`.

### 5.2 Performance Budget Adherence

| Metric | Target / Budget | M2 Actual | Status |
| :--- | :--- | :--- | :--- |
| **GLB File Size** | $\le 8.0\text{ MB}$ | **257.40 KB** | PASS (3.1% of budget) |
| **Mesh Count** | $\le 200$ | **143 meshes** | PASS |
| **Triangle Count** | $\le 40,000$ | **1,716 triangles** | PASS (4.3% of budget) |
| **Material Count** | $\le 16$ | **13 materials** | PASS |
| **glTF Version** | 2.0 Binary | **glTF 2.0 (Magic: 0x46546C67)** | PASS |
| **Build Validation**| `next build` static export | **Compiled in 3.5s, 0 errors** | PASS |
| **Type Check** | `tsc --noEmit` | **0 errors** | PASS |
| **Linter** | `next lint` | **0 warnings, 0 errors** | PASS |

---

## 6. Web Application Integration

1. **Asset Manifest (`src/3d/assets/manifest.ts`):** `the_portfolio_house` entry updated from `PLANNED` to `AVAILABLE`, with file size `263576` bytes and triangle budget `1716`.
2. **Scene Root (`src/3d/scene/ArchitecturalScene.tsx`):** Defaults `modelUrl` to `resolveAssetUrl('the_portfolio_house')`, seamlessly mounting `ModelLoader` in Suspense with fallback.
3. **Canvas Container (`src/components/3d/CanvasContainer.tsx`):** Automatically passes the resolved house URL to the 3D scene.
4. **Reference Camera Rig (`src/3d/camera/CameraController.tsx`):** Reads `activeRefCamera` from Zustand store, executing smooth exponential damping to target camera positions, look-at targets, and FOVs.
5. **Viewport HUD (`src/components/ui/ViewportHUD.tsx`):** Provides a 7-button interactive switcher enabling one-click instant validation against the reference video keyframes.
