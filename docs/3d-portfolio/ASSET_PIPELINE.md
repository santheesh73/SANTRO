# 3D ASSET PIPELINE SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M0 — Project Baseline & Reference Analysis  
**Target Format:** Web-Optimized Binary glTF (`.glb`)  
**Primary DCC Tool:** Blender 4.x / 5.x  
**Optimization Toolchain:** `@gltf-transform/cli`, Meshoptimizer (`meshopt`), Draco, Basis Universal (`toktx`)  
**Target Runtime:** Three.js / React Three Fiber (`@react-three/fiber`, `@react-three/drei`)

---

## 1. Asset Pipeline Architecture Overview

To achieve an uncompromised cinematic architectural visualization on the web while sustaining locked 60fps rendering, the asset pipeline enforces a rigorous unidirectional workflow from reference analysis to runtime consumption:

```text
+---------------------------------------------------------------------------------------+
| PHASE 1: REFERENCE SPECIFICATION (M0)                                                 |
| Architectural Dimensions -> Camera Trajectory -> Material Signatures -> Lighting      |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 2: BLENDER 3D RECONSTRUCTION (M1 - M3)                                          |
| Blockout (M2) -> Clean Subdivision & Detailing (M3) -> UV Mapping & Texel Calibration |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 3: PBR MATERIAL AUTHORING & PACKING (M4)                                        |
| 14 Material Slots -> ORM Channel Packing -> Basis Universal KTX2 Texture Compression  |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 4: OPTIMIZATION & GEOMETRY COMPRESSION (M14)                                    |
| gltf-transform -> Weld -> Prune -> Dedup -> Meshopt Quantization -> Draco Fallback   |
+---------------------------------------------------------------------------------------+
                                           |
                                           v
+---------------------------------------------------------------------------------------+
| PHASE 5: WEBGL RUNTIME INTEGRATION (R3F)                                              |
| public/models/the_portfolio_house.glb -> useGLTF (Suspense) -> Scene Graph Mounting   |
+---------------------------------------------------------------------------------------+
```

---

## 2. Blender Scene Hierarchy & Collection Organization

The Blender master file (`blender/the_portfolio_house.blend`) must be structured with strict collection hygiene. Meshes must never be left floating in the root scene:

```text
THE_PORTFOLIO_HOUSE.blend
├── 01_ARCHITECTURE
│   ├── GEO_Foundation_Plinth         # Stepped concrete base, hillside retaining walls
│   ├── GEO_Ground_Slab               # Main floor slab (honed travertine)
│   ├── GEO_Cantilever_Left           # Upper west volume (guest suite / studio)
│   ├── GEO_Cantilever_Right          # Upper east volume (terrace & master wing)
│   ├── GEO_Roof_Structure            # Flat roof deck, perimeter parapets, skylights
│   ├── GEO_Walls_Exterior            # Off-white ivory stucco walls
│   ├── GEO_Walls_Interior            # Interior drywall partitions & ceilings
│   ├── GEO_Glazing_Exterior          # Sliding pocket glass panels, corner curtain walls
│   ├── GEO_Frames_Aluminum           # Charcoal anodized frames, stiles, sills
│   ├── GEO_Door_Pivot_Frame          # Outer portal frame, structural sidelite pillars
│   └── GEO_Door_Pivot_Leaf           # Pivot door leaf (Walnut planks, vertical bar)
│
├── 02_INTERIOR_JOINERY
│   ├── GEO_Foyer_Walnut_Wall         # Fluted vertical walnut batten feature wall
│   ├── GEO_Foyer_Typography          # Architectural lettering ("THE PORTFOLIO HOUSE")
│   ├── GEO_Floating_Stairs           # Cantilevered limestone treads & hidden stringer
│   ├── GEO_Office_Glass_Enclosure    # Frameless glass partitions, pivot door, pulls
│   ├── GEO_Office_Desk_Credenza      # Walnut executive desk & task chairs
│   ├── GEO_Office_Workstation        # Dual iMac models, keyboard, desk accessories
│   ├── GEO_Atrium_Mezzanine          # Upper floor gallery walkway & glass guardrails
│   ├── GEO_Plinth_Master             # Central travertine exhibition plinth with LED reveal
│   └── GEO_Plinths_Satellite         # Flanking stone pedestals for secondary projects
│
├── 03_EXTERIOR_ELEMENTS
│   ├── GEO_Infinity_Pool_Basin       # Submerged pool structure, tile lining, weir trough
│   ├── GEO_Pool_Water_Surface        # Planar quad mesh for animated refractive water shader
│   ├── GEO_Terrace_Loungers          # Minimalist teak sun loungers & linen cushions
│   ├── GEO_Balustrades_Glass         # Structural glass railings on pool and upper decks
│   └── GEO_Terrace_Planters          # Travertine perimeter planter boxes
│
├── 04_ENVIRONMENT
│   ├── GEO_Terrain_Hillside          # Sculpted arid mountain slope topography
│   ├── GEO_Terrain_Distant_Ridges    # Low-poly background mountain ridges
│   └── GEO_Vegetation_Instances      # Instanced Agave americana clusters & arid scrub
│
└── 05_SYSTEM_ANCHORS (Empties / Non-rendering nodes)
    ├── WAYPOINT_Exterior_Hero        # Camera spline waypoint 0.00
    ├── WAYPOINT_Entrance_Door        # Camera spline waypoint 0.28
    ├── WAYPOINT_Foyer_Directory      # Camera spline waypoint 0.35
    ├── WAYPOINT_Workspace_Lab        # Camera spline waypoint 0.55
    ├── WAYPOINT_Exhibition_Atrium    # Camera spline waypoint 0.75
    ├── WAYPOINT_Terrace_Vista        # Camera spline waypoint 0.93
    ├── ANCHOR_Door_Hinge_Pivot       # Rotation pivot for entrance door ($X: -0.65\text{m}$)
    └── ANCHOR_Project_Plinths_01_07  # World positions for 7 interactive project holograms
```

---

## 3. Modeling Rules & Geometry Standards

Every 3D mesh exported for the web portfolio must satisfy the following technical constraints:

### 3.1 Units and Transform Conventions
- **System Units:** Metric, $1.0\text{ unit} = 1.0\text{ meter}$.
- **World Origin:** Located at the center of the entrance door threshold at finished floor level:
  $[X: 0.0, Y: 0.0, Z: 0.0]$.
- **Freeze Transforms:** All static objects must have Location `[0, 0, 0]`, Rotation `[0, 0, 0]`, and Scale `[1, 1, 1]` applied (`Ctrl+A -> Apply All Transforms`).
- **Dynamic Pivot Doors:** Dynamic meshes (e.g., `GEO_Door_Pivot_Leaf`) must have their object origin set precisely at the vertical hinge axis ($250\text{mm}$ offset from the left jamb) so single-axis rotation ($\Delta R_y$) animates without compound matrix offsets.

### 3.2 Geometry Cleanliness
- **Manifold Geometry:** Zero non-manifold edges, zero zero-area degenerate triangles, zero loose vertices.
- **Normal Vectors:** All face normals must be consistently oriented outward. Custom split normals must be smoothed and validated.
- **Eliminate Coplanar Z-Fighting:** No coplanar faces sharing the exact same coordinate plane (e.g. glass panels touching floor slabs must maintain a $2\text{mm}$ clearance gap).
- **Culled Geometry:** Geometry that is completely occluded from all possible camera vantage points (such as the bottom of the ground floor slab submerged underground or inner wall cavities) must be aggressively deleted to conserve memory.

---

## 4. UV Unwrapping & Texel Density Standards

1. **Texel Density Budget:**
   - **Hero Interior Surfaces (Foyer wood, plinths, desk):** $512\text{ pixels per meter}$ ($5.12\text{ px/cm}$).
   - **Exterior Architectural Surfaces (Stucco, terrace travertine):** $256\text{ pixels per meter}$ ($2.56\text{ px/cm}$).
   - **Distant Environment & Terrain:** $128\text{ pixels per meter}$ ($1.28\text{ px/cm}$).
2. **UV Coordinates:**
   - **UV Channel 0 (`UVMap`):** Standard non-overlapping UV layout used for Base Color, ORM, and Normal maps.
   - **UV Seams:** Placed exclusively along architectural shadow lines, inner wall corners, floor joints, and unexposed bottom edges.

---

## 5. Web Performance Budgets

To deliver instant loading and fluid 60fps across desktop and mobile devices, the complete scene must stay within these strict parameters:

| Metric | Hard Maximum Budget | Target Production Value | Notes |
| :--- | :--- | :--- | :--- |
| **Total Triangles** | $\le 250,000$ | $\sim 140,000 - 180,000$ | House: $85\text{k}$, Furniture/Props: $45\text{k}$, Terrain/Veg: $35\text{k}$ |
| **Total Vertices** | $\le 160,000$ | $\sim 110,000$ | Indexed vertices shared via smooth normals |
| **Total Meshes** | $\le 45$ | $\sim 28 - 32$ | Merged by material type where static |
| **Draw Calls** | $\le 65$ | $\sim 42 - 50$ | Single directional shadow pass + forward scene |
| **PBR Material Slots**| $\le 16$ | $14$ unique materials | Defined in `MATERIAL_SPEC.md` |
| **GLB File Size (Raw)**| $\le 20.0\text{ MB}$ | $\sim 12.0\text{ MB}$ | Uncompressed geometry + textures |
| **GLB File Size (Opt)**| $\le 8.0\text{ MB}$ | $\sim 4.5 - 6.0\text{ MB}$ | Draco / Meshopt + KTX2 Basis Universal |
| **GPU VRAM Allocation**| $\le 180\text{ MB}$ | $\sim 110\text{ MB}$ | Textures ($65\text{MB}$) + Buffers ($45\text{MB}$) |
| **Target Framerate** | $60\text{ fps}$ (Desktop) | $60\text{ fps}$ locked | $\ge 35\text{ fps}$ on mid-tier mobile (iPhone 12 / Galaxy S21) |

---

## 6. Command-Line Optimization Toolchain

Once exported from Blender as an intermediate binary file (`the_portfolio_house_raw.glb`), the asset is processed through an automated optimization script powered by `@gltf-transform/cli`:

```bash
# Step 1: Deduplicate identical geometry buffers and materials
gltf-transform dedup \
  public/models/the_portfolio_house_raw.glb \
  public/models/the_portfolio_house_dedup.glb

# Step 2: Prune unused nodes, orphan textures, and empty collections
gltf-transform prune \
  public/models/the_portfolio_house_dedup.glb \
  public/models/the_portfolio_house_pruned.glb

# Step 3: Weld duplicate vertices with tight distance threshold (0.0001m)
gltf-transform weld --tolerance 0.0001 \
  public/models/the_portfolio_house_pruned.glb \
  public/models/the_portfolio_house_welded.glb

# Step 4: Reorder vertex and index buffers for maximum GPU cache locality
gltf-transform reorder \
  public/models/the_portfolio_house_welded.glb \
  public/models/the_portfolio_house_reordered.glb

# Step 5: Transcode all embedded textures to KTX2 / Basis Universal UASTC
gltf-transform uastc \
  public/models/the_portfolio_house_reordered.glb \
  public/models/the_portfolio_house_ktx2.glb \
  --level 2 --rdo 1.5 --zstd 18

# Step 6: Apply Meshoptimizer quantization and compression (EXT_meshopt_compression)
gltf-transform meshopt \
  public/models/the_portfolio_house_ktx2.glb \
  public/models/the_portfolio_house.glb
```

### Verification Script: `scripts/verify-assets.ts`
An automated verification script in the repository will validate:
1. File exists at `public/models/the_portfolio_house.glb`.
2. Total file size is under $8.0\text{ MB}$.
3. Header includes valid `glTF` magic bytes (`0x46546C67`).
4. Mesh count and triangle count stay within specified budget thresholds.

---

## 7. Asset Directory Structure in Repository

```text
/
├── asset/                                # Source video & analysis frames
│   ├── architectural_reference.mp4       # Primary visual source of truth
│   └── reference_frames/                 # Extracted reference frames (0 to 239)
│
├── 3d-source/                            # DCC source files (git-lfs / local working)
│   ├── blender/
│   │   ├── the_portfolio_house.blend     # Master Blender reconstruction scene
│   │   └── textures_raw/                 # 16-bit uncompressed source maps
│   └── scripts/
│       └── export_portfolio_house.py     # Headless Blender Python export script
│
├── public/models/                        # Production WebGL distribution assets
│   ├── the_portfolio_house.glb           # Primary web-optimized architectural model
│   └── draco/                            # Draco WebAssembly decoders
│
└── docs/3d-portfolio/                    # Engineering & architectural specifications
    ├── M0_BASELINE.md
    ├── REFERENCE_ANALYSIS.md
    ├── ARCHITECTURE_SPEC.md
    ├── CAMERA_SPEC.md
    ├── MATERIAL_SPEC.md
    ├── ASSET_PIPELINE.md                 # (This document)
    ├── SCENE_ARCHITECTURE.md
    ├── MILESTONE_ROADMAP.md
    └── M0_REPORT.md
```

---

## 8. Milestone M1 Handoff & Acceptance Criteria

Milestone M1 (3D Asset Pipeline) will immediately consume this specification. Acceptance criteria for M1:
1. Blender Python export automation script (`export_portfolio_house.py`) committed and operational.
2. The headless optimization pipeline (`scripts/optimize-model.ts`) installed and executing without errors.
3. Test cube/blockout pipeline run verifies that a GLB exported from Blender correctly loads in React Three Fiber with Draco/Meshopt decoders.
4. Zero visual regression or broken coordinate orientation ($+Y$ remains Up, $+Z$ faces pool).
