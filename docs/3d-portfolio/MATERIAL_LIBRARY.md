# MATERIAL LIBRARY: "THE PORTFOLIO HOUSE"

**Milestone:** M4 — Architectural Materials & Surface Realism  
**Renderer:** Three.js / React Three Fiber (WebGL 2.0 / WebGPU-ready)  
**Workflow:** Metallic-Roughness PBR Workflow  
**Color Space:** Linear Workflow with sRGB Base Color Maps and Linear Data Maps  

---

## 1. Master Material Catalog

The production material library consists of 18 strictly standardized materials adhering to the `MAT_*` naming convention:

| Material | Purpose | Base Color | Roughness | Metalness | Textures (Roughness/Other) | Normal Map | UV Strategy | Used By | Performance Cost |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`MAT_Wall_Main`** | Primary exterior facade stucco & cantilever shells | `#ECEBE4`<br>(warm ivory) | $0.82$ | $0.00$ | `stucco_roughness.png` | `stucco_normal.png`<br>(scale: 0.35) | Tiled<br>($8 \times 8$) | Cantilever boxes, perimeter walls, header beams, boundary walls | Low |
| **`MAT_Wall_Secondary`** | Interior wall plaster, soffits & ceilings | `#F2F1EA`<br>(off-white) | $0.85$ | $0.00$ | `stucco_roughness.png` | `stucco_normal.png`<br>(scale: 0.25) | Tiled<br>($6 \times 6$) | Foyer soffits, cantilever bottom soffits, mezzanine walkways, lounger cushions | Low |
| **`MAT_Concrete`** | Cast board-formed concrete foundation & retaining walls | `#969288`<br>(warm gray) | $0.80$ | $0.02$ | `concrete_roughness.png` | `concrete_normal.png`<br>(scale: 0.65) | Tiled<br>($2 \times 1$) | Foundation plinth, stepped retaining step, hillside retaining wall, overflow gutter | Low–Medium |
| **`MAT_Stone`** | Honed travertine / limestone interior flooring & plinths | `#DDD6C8`<br>(sandy cream) | $0.35$ | $0.02$ | `travertine_roughness.png` | `travertine_normal.png`<br>(scale: 0.45) | Tiled<br>($4 \times 4$) | Foyer floor, corridor floor, atrium floor, floating steps, exhibition plinths, pool basin & internal steps | Low–Medium |
| **`MAT_Terrace`** | Exterior honed travertine terrace deck slabs | `#D8D1C2`<br>(weathered cream) | $0.38$ | $0.02$ | `travertine_roughness.png` | `travertine_normal.png`<br>(scale: 0.55) | Tiled<br>($6 \times 6$) | Pool deck, raised lounger plinth, transition steps, pool coping nosing slabs, vanishing weir edge | Low–Medium |
| **`MAT_Wood_Entrance`** | Horizontal planked American walnut pivot door | `#6B4423`<br>(warm amber brown) | $0.38$ | $0.00$ | `walnut_roughness.png`<br>Clearcoat: $0.20$ | `walnut_normal.png`<br>(scale: 0.40) | Tiled<br>($2 \times 2$) | 9 horizontal entrance door planks | Low |
| **`MAT_Wood_Interior`** | Vertical fluted American walnut wall & joinery | `#5A3825`<br>(deep rich brown) | $0.42$ | $0.00$ | `walnut_roughness.png`<br>Clearcoat: $0.15$ | `walnut_normal.png`<br>(scale: 0.50) | Tiled<br>($1 \times 4$) | 24-batten feature wall, backing panels, executive desk, modesty panel, credenza, terrace accent wall | Medium |
| **`MAT_Wood_Deck`** / **`MAT_Deck`** | Minimalist architectural teak sun lounger frames | `#7A5332`<br>(medium teak) | $0.50$ | $0.00$ | `walnut_roughness.png` | `walnut_normal.png`<br>(scale: 0.30) | Tiled<br>($1 \times 2$) | 4 teak sun lounger frames & backrest wedges | Low |
| **`MAT_Glass_Clear`** | Ultra-clear low-iron architectural safety glazing | `#FFFFFF`<br>(neutral clear) | $0.015$ | $0.00$ | Transmission: $0.94$<br>IOR: $1.52$<br>Thickness: $0.6$<br>Attenuation: `#EEF5F5` | Procedural<br>(smooth) | Screen / Object | Pocket sliding glass, 90° corner glass, workspace partitions, upper balustrades, rear curtain wall | High (Transmission) |
| **`MAT_Glass_Dark`** | Bronze-tinted solar control clerestory & skylight glass | `#242A30`<br>(smoky bronze) | $0.05$ | $0.05$ | Transmission: $0.65$<br>IOR: $1.52$<br>Thickness: $1.0$<br>Attenuation: `#1A2026` | Procedural<br>(smooth) | Screen / Object | Rooftop skylight glazing | Medium |
| **`MAT_Metal_Dark`** | Anodized dark charcoal architectural aluminum | `#1F1F21`<br>(dark charcoal) | $0.30$ | $0.88$ | Uniform | Micro-noise | Object | Window frames, tracks, mullions, coping capping profiles, reveal channels, desk legs, monitor screens | Low |
| **`MAT_Metal_Brushed`** | Precision hairline brushed 316 stainless steel | `#C0C0C4`<br>(platinum steel) | $0.22$ | $0.95$ | Uniform | Micro-noise | Cylindrical / Object | Door handle, pivot hinge caps, stair mounting pins, balustrade top caps, monitor stands | Low |
| **`MAT_Water`** | Crystalline infinity lap pool water | `#38A3A5`<br>(turquoise blue) | $0.05$ | $0.00$ | Transmission: $0.92$<br>IOR: $1.333$<br>Thickness: $1.4$<br>Attenuation: `#228085` | Dual Scrolling:<br>`water_normal_1.png`<br>`water_normal_2.png` | Dynamic UV scroll & GPU shader blend | West terrace infinity lap pool water surface plane | High (Transmission & Animation) |
| **`MAT_Ground`** | Arid hillside desert earth & rock terrain | `#7D6E58`<br>(warm sand earth) | $0.92$ | $0.00$ | Uniform | `ground_normal.png`<br>(scale: 0.60) | Tiled<br>($8 \times 8$) | North, East, West & South hillside terrain slopes, rear mountain horizon | Low |
| **`MAT_Vegetation`** | Drought-tolerant agave & desert chaparral scrub | `#4D583F`<br>(muted olive green) | $0.75$ | $0.00$ | Uniform | Uniform | Object | 8 agave succulent clusters, 8 chaparral bush masses | Low |
| **`MAT_Roof_Gravel`** | Washed rounded river pebble parapet roof ballast | `#8E8B82`<br>(pebble gray) | $0.90$ | $0.00$ | Uniform | `gravel_normal.png`<br>(scale: 0.80) | Tiled<br>($12 \times 10$) | Main flat roof ballast gravel bed | Low |
| **`MAT_LED_Cyan`** | Calibrated holographic / architectural cyan channel | `#00F0FF`<br>(electric cyan) | $0.10$ | $0.00$ | Emissive: `#00F0FF`<br>Intensity: $2.5$ | None | Object | Pivot door handle nightlight indicator channel | Low |
| **`MAT_Light_Cove_Warm`**| Concealed 2700K linear warm white LED diffuser | `#FFF2D6`<br>(warm white) | $0.30$ | $0.00$ | Emissive: `#FFF2D6`<br>Intensity: $2.0$ | None | Object | Corridor ceiling lighting strip, double-height atrium ceiling indirect light coves | Low |

---

## 2. Reusability & Instancing Analysis

- **Material Slots in GLB:** 18 total.
- **Mesh Objects Covered:** 300 total meshes.
- **Average Mesh-to-Material Ratio:** $16.6 : 1$.
- **High-Reuse Heroes:**
  - `MAT_Metal_Dark`: 74 meshes (all framing, reveals, coping, mullions).
  - `MAT_Stone`: 46 meshes (interior floors, 14 floating steps, plinths, pool basin & steps).
  - `MAT_Wall_Main`: 42 meshes (all exterior perimeter walls, cantilever shells, headers, parapets).
  - `MAT_Wood_Interior`: 33 meshes (24 battens, backing wall, executive desk, credenza, accent panels).
  - `MAT_Glass_Clear`: 26 meshes (all frameless windows, balustrades, and interior partitions).
  - `MAT_Vegetation`: 16 meshes (8 agave clusters, 8 chaparral bushes).
  - `MAT_Metal_Brushed`: 22 meshes (pivot hardware, 14 stair pins, balustrade caps, door handles).

Zero accidental duplicate materials (`Material.001`, `Material.002`) exist in the production model.
