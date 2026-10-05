# BLENDER SCENE CONVENTIONS & MODELING SPECIFICATIONS

**Project:** "THE PORTFOLIO HOUSE" — SANTRO  
**Milestone:** M1 — 3D Asset Pipeline & Web Foundation  
**Target DCC:** Blender 4.x / 5.x  
**Format:** Metric glTF 2.0 Binary (`.glb`)  

---

## 1. World Scale & Coordinate System Conventions

To ensure seamless alignment between Blender, React Three Fiber, camera splines, and interactive plinths:

### 1.1 Dimensional Units
- **System:** Metric
- **Unit Scale:** `1.000000` ($1.0 \text{ Blender Unit} = 1.0 \text{ Meter}$)
- **Length Unit:** Meters

### 1.2 Coordinate System (Right-Handed Cartesian)
- **$+X$ (Right / East):** Towards the dining suite and hillside vista.
- **$-X$ (Left / West):** Towards the guest suite and infinity pool lounger deck.
- **$+Y$ (Elevation / Up):** Real-world vertical altitude.
- **$-Y$ (Down):** Substructure, pool basin depth, and retaining walls.
- **$+Z$ (Forward / South):** Towards the front infinity pool and valley approach.
- **$-Z$ (Rear / North):** Towards the rear double-height atrium and mountain backdrop.

### 1.3 Architectural Reference Origin (`[0, 0, 0]`)
- **Center of the Main Entrance Door Threshold at Finished Floor Level.**
- $X = 0.0\text{m}$ corresponds to the door opening center.
- $Y = 0.0\text{m}$ corresponds to the finished honed travertine floor level throughout the ground floor.
- $Z = 0.0\text{m}$ aligns with the exterior face of the front entrance portal columns.

---

## 2. Collection Hierarchy & Object Naming

Blender scenes must be organized into 5 standardized root collections:

```text
THE_PORTFOLIO_HOUSE.blend
├── 01_ARCHITECTURE
│   ├── GEO_Foundation_Plinth         # Stepped concrete base, hillside retaining walls
│   ├── GEO_Ground_Slab               # Main floor travertine slab
│   ├── GEO_Cantilever_Left           # Upper west volume (studio / guest wing)
│   ├── GEO_Cantilever_Right          # Upper east volume (terrace alcove)
│   ├── GEO_Roof_Structure            # Flat roof deck, perimeter parapets, skylights
│   ├── GEO_Walls_Exterior            # Off-white ivory stucco walls
│   ├── GEO_Walls_Interior            # Interior drywall partitions & ceilings
│   ├── GEO_Glazing_Exterior          # Sliding pocket glass panels, corner curtain walls
│   ├── GEO_Frames_Aluminum           # Charcoal anodized frames, stiles, sills
│   ├── GEO_Door_Pivot_Frame          # Outer portal frame, sidelite pillars
│   └── GEO_Door_Pivot_Leaf           # Pivot door leaf (ORIGIN: X: -0.65m on hinge axis)
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
    ├── ANCHOR_Door_Hinge_Pivot       # Rotation pivot for entrance door (X: -0.65m)
    └── ANCHOR_Project_Plinths_01_07  # World positions for 7 interactive project holograms
```

---

## 3. Model Segmentation Strategy

The residence must not be merged into a single monolithic mesh. Instead, logical segmentation enables:
1. **Dynamic Door Animation:** `GEO_Door_Pivot_Leaf` rotates independently on its vertical hinge axis without matrix conflicts.
2. **Material Batching:** Meshes sharing static PBR materials (e.g. all exterior stucco walls) are merged into a single node to minimize WebGL draw calls.
3. **Frustum & Occlusion Culling:** Interior joinery and rear atrium elements are segmented from exterior facades, allowing Three.js to cull off-screen nodes automatically.
4. **Selective Shader Passes:** Emissive plinth reveal strips and refractive pool water surfaces exist as isolated meshes for custom shader bindings.

---

## 4. Transform & Geometry Standards

### 4.1 Transforms
- **Static Objects:** All Location, Rotation, and Scale transforms must be applied (`Ctrl+A > Apply All Transforms`) before export so `position = [0, 0, 0]`, `rotation = [0, 0, 0]`, `scale = [1, 1, 1]`.
- **Dynamic Pivot Doors:** Dynamic meshes like `GEO_Door_Pivot_Leaf` must have their object origin set precisely at the vertical hinge axis ($250\text{mm}$ offset from the left jamb) so single-axis rotation ($\Delta R_y$) animates without compound matrix offsets.

### 4.2 Topology Cleanliness
- **Watertight Manifold:** Zero non-manifold edges, zero zero-area degenerate triangles, zero loose vertices.
- **Normal Vectors:** All face normals must be consistently oriented outward. Custom split normals must be smoothed and validated.
- **Eliminate Coplanar Z-Fighting:** No coplanar faces sharing the exact same coordinate plane (e.g. glass panels touching floor slabs must maintain a $2\text{mm}$ clearance gap).
- **Culled Geometry:** Geometry that is completely occluded from all possible camera vantage points (such as the bottom of the ground floor slab submerged underground or inner wall cavities) must be aggressively deleted to conserve memory.

---

## 5. Material & Texture Conventions

### 5.1 Material Naming Standards
Materials must strictly use the prefix `MAT_`:
- `MAT_Facade_Stucco` (Off-white architectural plaster, Roughness: 0.82)
- `MAT_Interior_Walnut` (Fluted vertical walnut battens, Roughness: 0.42, Clearcoat: 0.15)
- `MAT_Pivot_Door` (Horizontal planked walnut, Roughness: 0.38)
- `MAT_Floor_Travertine` (Honed limestone flooring, Roughness: 0.34)
- `MAT_Glass_Clear` (Low-iron architectural glass, Transmission: 0.96, Roughness: 0.015, IOR: 1.52)
- `MAT_Metal_Charcoal` (Dark charcoal anodized aluminum frames, Roughness: 0.32, Metalness: 0.85)
- `MAT_Metal_Steel` (Brushed stainless steel hardware, Roughness: 0.22, Metalness: 0.95)
- `MAT_Pool_Water` (Refractive pool water surface, Transmission: 0.98, IOR: 1.333)
- `MAT_Concrete_Plinth` (Board-formed concrete retaining walls, Roughness: 0.88)
- `MAT_Hologram_Cyan` (Electric cyan blueprint projection, Emissive: `#00F0FF`)

### 5.2 Texture Channel Packing (ORM)
Textures are channel-packed into single composite maps to minimize HTTP requests and GPU texture samplers:
- **Red (R):** Ambient Occlusion (AO)
- **Green (G):** Roughness
- **Blue (B):** Metalness

### 5.3 Texel Density & Resolution Budget
| Category | Max Resolution | Target Texel Density | Target Format |
| :--- | :--- | :--- | :--- |
| **Hero Interior Joinery** | $2048 \times 2048$ | $512 \text{ px/m}$ | KTX2 Basis Universal |
| **Exterior Facade & Floors**| $1024 \times 1024$ | $256 \text{ px/m}$ | KTX2 Basis Universal |
| **Distant Terrain & Props** | $512 \times 512$ | $128 \text{ px/m}$ | KTX2 Basis Universal |
| **Total Uncompressed VRAM**| $\le 15.0 \text{ MB}$ | — | Wire Size: $< 3.5 \text{ MB}$ |
