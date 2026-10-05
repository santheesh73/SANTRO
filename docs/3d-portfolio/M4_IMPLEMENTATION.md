# M4 — ARCHITECTURAL MATERIALS & SURFACE REALISM IMPLEMENTATION SPECIFICATION

**Milestone:** M4 — Architectural Materials  
**Status:** Complete  
**Engine:** Three.js r180 / React Three Fiber v9 (WebGL 2.0 / WebGPU-ready)  
**Tone Mapping:** ACESFilmic Tone Mapping  
**PBR Pipeline:** Metallic-Roughness PBR with Physical Transmission & Clearcoat  
**Color Space Workflow:** sRGB Base Colors & Textures with Linear Data Normal/Roughness Maps  
**Model:** `public/3d/models/the_portfolio_house.glb`  
**Reference Video:** `asset/architectural_reference.mp4`  

---

## 1. Executive Summary

Milestone **M4** elevates "The Portfolio House" from a pristine architectural clay massing and detail model (established in M2 & M3) into a **materially convincing, tactile architectural environment**. 

Following the strict milestone progression:
```text
M0 — Reference Analysis
        ↓
M1 — 3D Asset Pipeline
        ↓
M2 — House Blockout
        ↓
M3 — Architectural Detail
        ↓
M4 — Architectural Materials & Surface Realism [CURRENT]
        ↓
M5 — Lighting & Atmosphere
        ↓
M6 — Exterior Camera Journey
```

In strict accordance with the material philosophy:
1. **Materials enhance the architecture; they do not disguise geometry.**
2. **Restrained PBR materiality:** No plastic-looking concrete, no mirror-like glass everywhere, no sci-fi hyper-gloss, no excessive bloom, and zero generative AI visual cliches.
3. **100% Milestone Boundary Adherence:** Strictly architectural materials, neutral inspection illumination only. Dynamic golden hour / sunset lighting, volumetric sun shafts, and moody night skies remain strictly deferred to **M5**. Interactive scroll cameras remain deferred to **M6**.

---

## 2. Centralized Material System Architecture

The material system is centralized into an 18-material production catalog structured across 8 architectural categories:

```text
MATERIALS (18 Production Slots)
│
├── Architectural
│   ├── MAT_Wall_Main         (Off-white facade stucco, roughness 0.82)
│   ├── MAT_Wall_Secondary    (Interior plaster & soffits, roughness 0.85)
│   ├── MAT_Concrete          (Board-formed foundation & retaining walls, roughness 0.80)
│   ├── MAT_Stone             (Honed travertine / limestone flooring & plinths, roughness 0.35)
│   └── MAT_Roof_Gravel       (Washed river pebble ballast bed, roughness 0.90)
│
├── Wood
│   ├── MAT_Wood_Entrance     (Horizontal planked walnut pivot door, roughness 0.38, clearcoat 0.20)
│   ├── MAT_Wood_Interior     (Vertical fluted walnut wall & executive desk, roughness 0.42, clearcoat 0.15)
│   └── MAT_Wood_Deck         (Weathered architectural teak sun loungers, roughness 0.50)
│
├── Glass
│   ├── MAT_Glass_Clear       (Low-iron architectural glazing, transmission 0.96, IOR 1.52, roughness 0.02)
│   └── MAT_Glass_Dark        (Bronze-tinted clerestory & skylight glass, transmission 0.70, IOR 1.52)
│
├── Metal
│   ├── MAT_Metal_Dark        (Anodized dark charcoal aluminum frames & reveals, metalness 0.88, roughness 0.30)
│   └── MAT_Metal_Brushed     (Precision brushed 316 stainless steel hardware & caps, metalness 0.95, roughness 0.22)
│
├── Ground
│   ├── MAT_Terrace           (Exterior honed travertine pool deck slabs, roughness 0.38)
│   └── MAT_Ground            (Arid hillside terrain & desert soil, roughness 0.92)
│
├── Water
│   └── MAT_Water             (Infinity lap pool crystalline water, transmission 0.95, IOR 1.333, animated ripples)
│
├── Vegetation
│   └── MAT_Vegetation        (Drought-tolerant agave & chaparral foliage, roughness 0.75)
│
└── Lighting Diffusers
    ├── MAT_LED_Cyan          (Calibrated architectural blueprint accent channel, emissive 2.5)
    └── MAT_Light_Cove_Warm   (Concealed 2700K linear warm white LED diffuser, emissive 2.0)
```

---

## 3. PBR Texture Pipeline & Generation

All micro-textures are generated procedurally via a standalone Node.js script (`scripts/generate-textures.mjs`) with zero external binary dependencies, leveraging native `node:zlib` deflate compression and CRC-32 chunk calculation to output production-grade 8-bit RGBA PNG files:

| Map Name | Resolution | Channels | Role | Visual Function |
| :--- | :--- | :--- | :--- | :--- |
| `stucco_normal.png` | 512 × 512 | RGB | Normal | High-frequency isotropic micro-stucco plaster scatter |
| `stucco_roughness.png` | 512 × 512 | Grayscale | Roughness | Restrained 0.80–0.84 diffuse plaster roughness |
| `travertine_normal.png` | 1024 × 1024 | RGB | Normal | 1.2m × 0.6m tile joints (3mm bevel) + mineral pore relief |
| `travertine_roughness.png` | 1024 × 1024 | Grayscale | Roughness | Honed limestone mineral vein variation (0.34–0.40) |
| `walnut_normal.png` | 1024 × 1024 | RGB | Normal | Longitudinal vertical timber grain relief |
| `walnut_roughness.png` | 1024 × 1024 | Grayscale | Roughness | Hand-rubbed satin oil sheen variation (0.38–0.45) |
| `concrete_normal.png` | 1024 × 1024 | RGB | Normal | 150mm board-formed timber formwork seams & air pores |
| `concrete_roughness.png` | 1024 × 1024 | Grayscale | Roughness | Matte cast concrete mineral scatter (0.76–0.84) |
| `water_normal_1.png` | 512 × 512 | RGB | Normal | Primary pool capillary wind ripples |
| `water_normal_2.png` | 512 × 512 | RGB | Normal | Secondary cross-directional counter wave ripples |
| `gravel_normal.png` | 512 × 512 | RGB | Normal | Rounded river pebble aggregate bump relief |
| `ground_normal.png` | 512 × 512 | RGB | Normal | Weathered desert soil and hillside slope micro-relief |

**Total Wire Footprint:** `2,524.84 KB` ($2.47\text{ MB}$, Budget: $\le 3.2\text{ MB}$; 21.1% headroom).  
**Total GPU VRAM Footprint:** `31.96 MB` uncompressed across all 12 maps.

---

## 4. Architectural Surface Look-Development

### 4.1 Stucco Plaster (`MAT_Wall_Main`, `MAT_Wall_Secondary`)
- **Reference Match:** Cantilevered facade boxes, perimeter solid walls, soffits (Frames 000, 070, 239).
- **Physical Values:** Base Color `#ECEBE4`, Roughness 0.82, Metalness 0.00.
- **Surface Detail:** Mapped with `stucco_normal.png` tiled at 8.0 × 8.0 scale, generating soft diffuse light scatter without synthetic flat CG plastic shine.

### 4.2 Board-Formed Concrete (`MAT_Concrete`)
- **Reference Match:** Hillside retaining wall supporting infinity pool and foundation plinths (Frames 000, 239).
- **Physical Values:** Base Color `#969288`, Roughness 0.80, Metalness 0.02.
- **Surface Detail:** Mapped with `concrete_normal.png` exhibiting 150mm horizontal timber formwork board seams and subtle aggregate relief. Paired with 3 structural geometric reveal grooves ($18.0\text{m} \times 0.02\text{m} \times 0.82\text{m}$).

### 4.3 Honed Travertine & Limestone (`MAT_Stone`, `MAT_Terrace`)
- **Reference Match:** Exterior pool terrace deck, raised sun lounger plinth, foyer vestibule floor, gallery corridor, floating stairs, and atrium plinths (Frames 000, 070, 108, 120, 185).
- **Physical Values:** Base Color `#DDD6C8` (interior) / `#D8D1C2` (exterior terrace), Roughness 0.35–0.38, Metalness 0.02.
- **Surface Detail:** 1.20m × 0.60m modular tile grid joints with subtle mineral density variation, delivering soft elongated specular reflections under daylight and recessed downlights.

### 4.4 American Walnut Joinery (`MAT_Wood_Entrance`, `MAT_Wood_Interior`, `MAT_Wood_Deck`)
- **Reference Match:** 9-plank horizontal pivot door (Frames 070, 108), 24-batten fluted corridor wall (Frames 120, 133), teak sun lounger frames (Frames 000), and executive workspace desk.
- **Physical Values:** Base Color `#6B4423` (entrance door) / `#5A3825` (interior wood) / `#7A5332` (teak deck), Roughness 0.38–0.50, Clearcoat 0.15–0.20, Clearcoat Roughness 0.35–0.40.
- **Surface Detail:** Directional timber grain normal map combined with geometric batten modeling ($50\text{mm}$ battens with $15\text{mm}$ reveals), generating realistic anisotropic highlights.

### 4.5 Architectural Glazing (`MAT_Glass_Clear`, `MAT_Glass_Dark`)
- **Reference Match:** Pocket sliding glass doors, 90-degree corner frameless glazing, interior office partitions, balustrades, and double-height atrium rear curtain wall.
- **Physical Values:** `MeshPhysicalMaterial`, Base Color `#FFFFFF`, Transmission 0.94, IOR 1.52 (crown glass), Roughness 0.015, Thickness 0.6m, Attenuation Color `#EEF5F5` (distance: 8.0m), `depthWrite: false`.
- **Performance Calibration:** Reusable shared material instance preventing material switching overhead.

### 4.6 Infinity Pool Water (`MAT_Water`)
- **Reference Match:** West terrace lap pool with vanishing weir edge (Frames 000, 070).
- **Physical Values:** `MeshPhysicalMaterial`, Base Color `#38A3A5`, Transmission 0.92, IOR 1.333, Roughness 0.05, Thickness 1.4m, Attenuation Color `#228085` (distance: 2.2m).
- **Dynamic Animation:** React Three Fiber `WaterController` continuously updates GPU shader time uniform in `useFrame`, driving dual-layer capillary wave displacement (`water_normal_1.png` and `water_normal_2.png` scrolling in opposing vectors) directly in the WebGL fragment shader without CPU vertex deformation.

---

## 5. WebGL & React Three Fiber Integration

1. **Model Loader Integration:**
   `src/3d/loaders/ModelLoader.tsx` automatically executes `applyArchitecturalMaterials` upon GLTF scene instancing. It wraps the material hierarchy and binds loaded PBR textures with proper `wrapS`, `wrapT`, and `repeat` attributes.

2. **Validation & Debug Modes (Section 30, 32, 38, 39):**
   The Viewport HUD provides real-time validation switches:
   - `PBR`: Full production PBR textures and physical transmission.
   - `CLAY`: Neutral clay model (`#D8D6CF`, roughness 0.85) to verify architectural silhouette readability (Section 32).
   - `NORMALS`: Visualizes surface normals via `MeshNormalMaterial`.
   - `ROUGH`: Grayscale roughness values for auditing specular falloff.
   - `METAL`: Metalness values for isolating conductive vs dielectric surfaces.
   - `MAT IDs`: Distinct false-color assignment map verifying zero accidental default materials.
   - `STUDIO SWATCHES`: Dedicated neutral studio scene (`MaterialPreviewScene.tsx`) inspecting all 13 core material spheres on display pedestals (Section 30).

---

## 6. Verification Pipeline

The automated verification pipeline enforces:
1. `npm run prebuild`:
   - Runs `scripts/generate-textures.mjs` (generates all 12 textures).
   - Runs `scripts/generate-portfolio-house-glb.mjs` (exports `the_portfolio_house.glb` with 18 strictly named materials).
   - Runs `scripts/verify-assets.mjs` (validates GLB magic header, size budget, and all 12 texture files).
2. `npm run lint`: Zero ESLint warnings or errors.
3. `npm run type-check`: Zero TypeScript compiler errors.
