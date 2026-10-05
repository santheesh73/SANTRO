# MATERIAL SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M0 — Project Baseline & Reference Analysis  
**Rendering Engine:** Three.js / React Three Fiber (WebGL 2.0 / WebGPU-ready)  
**PBR Pipeline:** Metallic-Roughness Workflow with ORM Channel Packing  
**Color Space:** Linear workflow with sRGB Base Color maps and Linear data maps  
**Reference Source:** `asset/architectural_reference.mp4`

---

## 1. Material Architecture & Philosophy

The architectural visual language in "The Portfolio House" is rooted in **warm modern minimalism and authentic tactile materiality**. It completely eschews artificial sci-fi hyper-gloss, generic video-game plastic surfaces, and excessive neon clutter. Every surface is calibrated to reflect real-world physics:

1. **Restrained Architectural Palette:** Off-white plaster, honed travertine, fluted American walnut, anodized dark charcoal aluminum, and crystal-clear low-iron glass.
2. **Tactile Micro-Details:** Subtle surface roughness variations, micro-porosity in stone, anisotropic grain in walnut battens, and water surface capillary motion.
3. **High-Tech Emissive Accents:** Precise, calibrated holographic cyan blueprint projections (`#00F0FF` / `#2DD4BF`) and warm architectural light grazing channels (`#FFF2D6`, 2700K–3000K) that punctuate the serene natural materials.

---

## 2. Core Architectural Material Library

Below is the definitive catalog of all 14 materials required for the house reconstruction:

### 01. Smooth Architectural Stucco / Facade Plaster (`mat_facade_stucco`)
- **Reference Context:** Cantilevered exterior facades, perimeter walls, exterior ceiling soffits (Shots 01, 02).
- **Visual Description:** Matte, seamless architectural plaster with ultra-fine grain and soft diffuse light scattering.
- **Base Color:** `#ECEBE4` (sRGB: `[0.925, 0.921, 0.894]`) — warm ivory/off-white.
- **Roughness:** $0.82$ (high diffuse scatter).
- **Metalness:** $0.00$.
- **Normal Map:** Subtle micro-stucco plaster noise (1024×1024, tiling: $8.0 \times 8.0\text{m}$).
- **Ambient Occlusion:** Baked AO in corner reveals and cantilever recesses.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 02. Vertical Fluted American Walnut Paneling (`mat_interior_wood`)
- **Reference Context:** Corridor right wall, executive office joinery, atrium accent panels (Shots 02, 03, 04).
- **Visual Description:** Rich, warm deep brown walnut battens with vertical linear shadow flutes and silky satin oil sheen.
- **Base Color:** `#5A3825` (sRGB: `[0.353, 0.220, 0.145]`) — deep warm walnut.
- **Roughness:** $0.42$ (satin wood finish).
- **Metalness:** $0.00$.
- **Clearcoat:** $0.15$ with $0.35$ clearcoat roughness (hand-rubbed architectural oil finish).
- **Normal Map:** High-precision vertical rib normal profile ($40\text{mm}$ batten, $15\text{mm}$ flute reveal) + micro-wood grain.
- **Three.js Class:** `THREE.MeshPhysicalMaterial`

### 03. Horizontal Planked Walnut Pivot Door (`mat_pivot_door`)
- **Reference Context:** Main entrance pivot door (Shot 02, Frames 070–115).
- **Visual Description:** Horizontal tongue-and-groove solid walnut planks with subtle timber grain variations and rich amber tones.
- **Base Color:** `#6B4423` (sRGB: `[0.420, 0.267, 0.137]`).
- **Roughness:** $0.38$.
- **Metalness:** $0.00$.
- **Clearcoat:** $0.20$.
- **Normal Map:** 9 horizontal plank divisions with $4\text{mm}$ bevel shadow lines.
- **Three.js Class:** `THREE.MeshPhysicalMaterial`

### 04. Honed Travertine / Limestone Flooring (`mat_floor_travertine`)
- **Reference Context:** Terrace deck, pool surround, foyer, corridor, and atrium floor slabs (Shots 01, 02, 03, 04).
- **Visual Description:** Monolithic honed cream limestone tiles ($1.20\text{m} \times 0.60\text{m}$) with soft directional reflections, faint sedimentary veining, and micro-pores.
- **Base Color:** `#DDD6C8` (sRGB: `[0.867, 0.839, 0.784]`) — warm sandy cream.
- **Roughness:** $0.34$ (honed architectural stone; creates soft elongated sun and downlight specular reflections).
- **Metalness:** $0.00$.
- **Roughness Map:** Subtle variation map simulating natural mineral density differences.
- **Normal Map:** Flat surface with crisp $3\text{mm}$ recessed tile joints.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 05. Ultra-Clear Architectural Glazing (`mat_glass_clear`)
- **Reference Context:** Ground floor sliding walls, workspace partition, upper balustrades, and rear vista curtain wall (All Shots).
- **Visual Description:** High-transmission low-iron architectural safety glass with neutral reflections and zero green tint.
- **Base Color:** `#FFFFFF` (sRGB: `[1.0, 1.0, 1.0]`).
- **Transmission:** $0.96$ (physically transmits interior geometry and exterior mountain landscape).
- **Roughness:** $0.015$ (near-perfect specular clarity).
- **IOR (Index of Refraction):** $1.52$ (standard architectural crown glass).
- **Thickness:** $0.012\text{m}$ (12mm tempered monolithic panel).
- **Attenuation Color:** `#FAFCFC` (attenuation distance: $10.0\text{m}$).
- **Three.js Class:** `THREE.MeshPhysicalMaterial`

### 06. Anodized Dark Charcoal Aluminum (`mat_metal_charcoal`)
- **Reference Context:** Window frames, sliding door stiles, recessed ceiling channels, and structural glazing shoes (All Shots).
- **Visual Description:** Matte dark charcoal architectural aluminum with subtle micro-metallic sparkle.
- **Base Color:** `#1F1F21` (sRGB: `[0.122, 0.122, 0.129]`).
- **Roughness:** $0.32$.
- **Metalness:** $0.85$.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 07. Brushed Stainless Steel Hardware (`mat_metal_steel`)
- **Reference Context:** Door pulls, frameless glass spider fittings, workspace desk accessories (Shots 02, 03).
- **Visual Description:** Precision-machined 316 stainless steel with fine directional hairline brushing.
- **Base Color:** `#C0C0C4` (sRGB: `[0.753, 0.753, 0.769]`).
- **Roughness:** $0.22$.
- **Metalness:** $0.95$.
- **Anisotropy:** $0.65$ aligned with the hardware cylinder axis.
- **Three.js Class:** `THREE.MeshPhysicalMaterial`

### 08. Infinity Pool Water (`mat_pool_water`)
- **Reference Context:** Front exterior lap pool and vanishing overflow edge (Shots 01, 02).
- **Visual Description:** Clean, transparent chlorinated water with animated wind ripples and turquoise absorption depth.
- **Base Color:** `#38A3A5` (sRGB: `[0.220, 0.639, 0.647]`).
- **Transmission:** $0.98$.
- **Roughness:** $0.05$.
- **IOR:** $1.333$ (pure water).
- **Animated Normal:** Dual scrolling procedural water ripple normal maps with opposing vectors:
  - Layer 1: Velocity $[+0.015, +0.008]$, scale: $3.0$
  - Layer 2: Velocity $[-0.008, +0.012]$, scale: $5.0$
- **Three.js Class:** Custom Water Shader / `THREE.MeshPhysicalMaterial` with normal UV time scroll.

### 09. Holographic Blueprint HUD / Spatial Projection (`mat_hologram_cyan`)
- **Reference Context:** Projected schematics on workspace glass and floating 3D plinth models (Shots 03, 04).
- **Visual Description:** Luminous, semi-transparent electric cyan vector graphics with horizontal scanlines and grazing Fresnel edge glow.
- **Base Color:** `#00F0FF` (Cyan) and `#2DD4BF` (Mint Teal).
- **Blending:** Additive Blending (`THREE.AdditiveBlending`) or Custom Alpha Blending.
- **Emissive Intensity:** $2.5$ (triggers selective post-processing bloom).
- **Depth Write:** `false` (prevents sorting artifacts with background geometry).
- **Custom Shader Uniforms:**
  - `uTime`: Scanline scroll speed ($1.2\text{ rad/s}$).
  - `uFresnelPower`: $2.8$ (concentrates emission at geometry silhouettes).
  - `uOpacity`: $0.65$.

### 10. Cast Board-Formed Concrete Plinth (`mat_concrete_plinth`)
- **Reference Context:** Hillside foundation walls, terrace retaining plinths (Shot 01).
- **Visual Description:** Heavy architectural concrete with horizontal timber grain texture transferred from wooden formwork molds.
- **Base Color:** `#A39E93` (sRGB: `[0.639, 0.620, 0.576]`).
- **Roughness:** $0.78$.
- **Metalness:** $0.02$.
- **Normal Map:** $150\text{mm}$ horizontal wood board seams with porous aggregate relief.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 11. Washed River Pebble Roof Ballast (`mat_roof_gravel`)
- **Reference Context:** Parapet flat roof decks (Shot 01).
- **Visual Description:** Dry light gray rounded river pebbles preventing roof membrane UV degradation.
- **Base Color:** `#8E8B82` (sRGB: `[0.557, 0.545, 0.510]`).
- **Roughness:** $0.90$.
- **Metalness:** $0.00$.
- **Normal Map:** Dense pebble aggregate bump map.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 12. Arid Xeriscape Vegetation (`mat_vegetation_arid`)
- **Reference Context:** Hillside terrain, succulent planter beds along pool retaining wall (Shots 01, 02).
- **Visual Description:** Fleshy blue-green agave leaves, dry olive scrub, and golden desert grass.
- **Base Color:** Agave: `#4D6A56`, Scrub: `#4D533C`, Grass: `#A89874`.
- **Roughness:** $0.55$.
- **Translucency / Subsurface:** Thin foliage transmission ($0.25$) on back-lit leaves.
- **Side:** `THREE.DoubleSide`.
- **Three.js Class:** `THREE.MeshStandardMaterial`

### 13. Indirect Warm Architectural Light Cove (`mat_light_cove_warm`)
- **Reference Context:** Travertine plinth recessed base reveal, atrium ceiling cove troughs, foyer linear slot (Shots 02, 03, 04).
- **Visual Description:** Linear concealed LED strip diffuser glowing with continuous warm white light.
- **Base Color:** `#FFF2D6` (Color temperature: $2700\text{K}$).
- **Emissive Color:** `#FFF2D6`.
- **Emissive Intensity:** $3.2$.
- **Three.js Class:** `THREE.MeshBasicMaterial` (unlit emissive strip paired with real Three.js area/rect proxy light).

### 14. Distant Mountain Ridge Terrain (`mat_terrain_mountain`)
- **Reference Context:** Mountain ridgelines and valley panorama (Shots 01, 04).
- **Visual Description:** Layered geological rock and arid scrub terrain fading into atmospheric aerial haze.
- **Base Color:** `#585148` (sRGB: `[0.345, 0.318, 0.282]`).
- **Roughness:** $0.85$.
- **Atmospheric Fog:** Integrated with Three.js scene exponential fog (`THREE.FogExp2`).
- **Three.js Class:** `THREE.MeshStandardMaterial`

---

## 3. PBR Texture Channel Packing & Budget Specification

To ensure optimal GPU memory bandwidth and rapid asset delivery over the web, all textures must strictly adhere to the standardized **ORM** channel-packing format:

```text
ORM TEXTURE PACKING SPECIFICATION (Single 8-bit PNG/WebP/KTX2):
+-------------------------------------------------------+
| RED Channel (R)   --> Ambient Occlusion (AO)          |
| GREEN Channel (G) --> Roughness                       |
| BLUE Channel (B)  --> Metalness                       |
+-------------------------------------------------------+
```

### Texture Resolution Budgets

| Material Category | Diffuse / BaseColor | ORM (AO/Rough/Metal) | Normal Map | Target Disk (KTX2) |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Facade Stucco** | 1024 × 1024 | 1024 × 1024 | 1024 × 1024 | $\sim 280\text{ KB}$ |
| **Fluted Walnut Paneling** | 1024 × 1024 | 1024 × 1024 | 1024 × 1024 | $\sim 340\text{ KB}$ |
| **Pivot Door Planks** | 1024 × 1024 | 1024 × 1024 | 1024 × 1024 | $\sim 310\text{ KB}$ |
| **Travertine Floor Slabs** | 2048 × 2048 | 2048 × 2048 | 2048 × 2048 | $\sim 780\text{ KB}$ |
| **Concrete Plinth** | 1024 × 1024 | 1024 × 1024 | 1024 × 1024 | $\sim 260\text{ KB}$ |
| **Mountain Ridge Terrain** | 1024 × 1024 | 1024 × 1024 | 1024 × 1024 | $\sim 220\text{ KB}$ |
| **Glazing / Glass** | Procedural (No Maps) | Procedural | None | $0\text{ KB}$ |
| **Metals / Aluminum** | Procedural / Uniform | Uniform | Micro-noise 512 | $\sim 60\text{ KB}$ |

**Total Texture Memory Footprint:** $< 14.5\text{ MB}$ uncompressed VRAM ($< 3.2\text{ MB}$ compressed over wire via KTX2 Basis Universal).

---

## 4. Dynamic Day-to-Twilight Material Transition

As established in `REFERENCE_ANALYSIS.md`, the experience transitions from **late afternoon golden hour** (exterior approach) to **evening twilight** (atrium and rear mountain vista). 

In WebGL, this is executed dynamically as a function of the camera progress $t \in [0.0, 1.0]$:

```text
LIGHTING & MATERIAL DYNAMICS (t: 0.0 -> 1.0):

t: 0.00 (Exterior Day)   --> Sun Intensity: 2.8 | Sky: Golden Azure  | Emissive: Off / Low
t: 0.40 (Interior Foyer) --> Sun Intensity: 1.8 | Sky: Warm Horizon  | Coves: On (1.5)
t: 0.75 (Exhibition Lab) --> Sun Intensity: 0.8 | Sky: Pastel Dusk   | Coves: 3.2 | Hologram: 2.5
t: 1.00 (Twilight Vista) --> Sun Intensity: 0.0 | Sky: Dusk Indigo   | Coves: 3.5 | Windows: Glowing Lantern
```

### Material Property Modulations:
1. **Emissive Coves & Plinths:**
   $$I_{\text{cove}}(t) = \text{lerp}(0.8, 3.5, \text{smoothstep}(0.3, 0.7, t))$$
2. **Holographic Schematics:**
   $$I_{\text{holo}}(t) = \text{lerp}(0.0, 2.5, \text{smoothstep}(0.45, 0.65, t))$$
3. **Glass Reflections:**
   As exterior ambient light drops, interior glass transitions naturally via Fresnel physics from high transparency to prominent interior specular reflections of the glowing wood and plinths.

---

## 5. Performance Tier Material Scaling

To guarantee smooth 60fps execution across diverse client hardware, materials adapt according to the device tier:

| Feature / Property | High Tier (Desktop GPU) | Medium Tier (Laptop / Modern Mobile) | Low Tier (Budget Mobile) |
| :--- | :--- | :--- | :--- |
| **Glass Shading** | `MeshPhysicalMaterial` (Transmission, IOR, Roughness) | Alpha Blended `MeshStandardMaterial` (Opacity 0.15) | Simple Transparent Phong / Basic |
| **Pool Water** | Custom Refractive Normal Shader | Animated Normal `MeshStandardMaterial` | Flat Tinted Transparent Plane |
| **Anisotropic Wood** | Clearcoat + Anisotropy active | Standard Roughness map | Uniform roughness value |
| **Texture Filtering** | Anisotropy 8×, Mipmaps | Anisotropy 2×, Mipmaps | Bilinear, no anisotropic filter |
| **Hologram Bloom** | Full Selective UnrealBloomPass | Optimized single-pass bloom | Simple additive glow sprite |

---

## 6. Material Verification & Acceptance Criteria for M4

During Milestone M4 (Materials), the implementation must verify:
1. **Color Fidelity:** Facade stucco hex `#ECEBE4` and travertine `#DDD6C8` match reference frame pixel samples under calibrated daylight.
2. **Specular Reflections:** Honed travertine produces realistic elongated specular highlights from the interior downlights without pixelated noise.
3. **Transmission Performance:** Low-iron glass does not cause GPU frame drops or alpha-sorting z-buffer artifacts with interior objects.
4. **Zero Uncompressed PNGs:** Every texture file bundled into `public/models/` is encoded in KTX2 or optimized WebP with ORM channel packing.
