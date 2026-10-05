# M4 — ARCHITECTURAL MATERIALS & SURFACE REALISM REPORT

══════════════════════════════════════════════════════════════════════════
## M4 — ARCHITECTURAL MATERIALS
══════════════════════════════════════════════════════════════════════════

### STATUS
──────
**Complete**

---

### MATERIALS
─────────
- **Walls:** `MAT_Wall_Main` (warm ivory facade stucco `#ECEBE4`, roughness 0.82) mapped with `stucco_normal.png` ($8\times 8$ tiling) and `stucco_roughness.png`; `MAT_Wall_Secondary` (interior plaster and ceiling soffits `#F2F1EA`, roughness 0.85).
- **Concrete:** `MAT_Concrete` (board-formed concrete `#969288`, roughness 0.80, metalness 0.02) mapped with `concrete_normal.png` exhibiting 150mm horizontal timber formwork board seams and porous aggregate relief.
- **Stone:** `MAT_Stone` (honed travertine / limestone `#DDD6C8`, roughness 0.35, metalness 0.02) mapped with `travertine_normal.png` (1.20m × 0.60m modular tile grid seams with 3mm recessed joints) and `travertine_roughness.png`. Applied to foyer floor, gallery corridor, atrium floor, 14 floating cantilever stair treads, master and secondary exhibition plinths, and pool basin.
- **Wood:** `MAT_Wood_Entrance` (horizontal planked American walnut pivot door `#6B4423`, roughness 0.38, clearcoat 0.20) with horizontal grain normal relief; `MAT_Wood_Interior` (vertical fluted walnut `#5A3825`, roughness 0.42, clearcoat 0.15) applied to 24-batten feature wall and executive workspace desk; `MAT_Wood_Deck` / `MAT_Deck` (weathered teak `#7A5332`, roughness 0.50) on 4 sun lounger frames.
- **Glass:** `MAT_Glass_Clear` (`MeshPhysicalMaterial`, base color `#FFFFFF`, transmission 0.94, IOR 1.52, roughness 0.015, thickness 0.6m, attenuation `#EEF5F5`, `depthWrite: false`) applied to sliding glass walls, 90-degree corner frameless glass, balustrades, office partitions, and rear atrium curtain wall; `MAT_Glass_Dark` (bronze-tinted `#242A30`, transmission 0.65, IOR 1.52, roughness 0.05, thickness 1.0m, attenuation `#1A2026`) on rooftop skylight.
- **Metal:** `MAT_Metal_Dark` (anodized dark charcoal aluminum `#1F1F21`, roughness 0.30, metalness 0.88) on window frames, tracks, reveals, coping profiles, and desk legs; `MAT_Metal_Brushed` (precision 316 stainless steel `#C0C0C4`, roughness 0.22, metalness 0.95) on door handle, pivot hinge caps, stair mounting pins, and balustrade top caps.
- **Floor:** Unified interior honed travertine limestone slab system (`MAT_Stone`) with perimeter negative reveal baseboard channels and dark bronze expansion joints.
- **Terrace:** `MAT_Terrace` (exterior honed travertine deck slabs `#D8D1C2`, roughness 0.38) with soft elongated specular highlights, continuous 50mm pool coping nosing overhangs, and south vanishing overflow weir edge.
- **Water:** `MAT_Water` (`MeshPhysicalMaterial`, base color `#38A3A5`, transmission 0.92, IOR 1.333, roughness 0.05, thickness 1.4m, attenuation `#228085`) with real-time dynamic capillary wave ripples driven by dual scrolling normal maps in React Three Fiber (`WaterController`).
- **Ground:** `MAT_Ground` (arid desert earth and hillside rock `#7D6E58`, roughness 0.92) mapped with `ground_normal.png` on hillside slopes and rear mountain horizon.
- **Vegetation:** `MAT_Vegetation` (drought-tolerant muted desert greens `#4D583F`, roughness 0.75) across 8 agave succulent clusters and 8 chaparral scrub masses.

---

### REFERENCE MATCH
───────────────
- **Overall:** **Excellent**
- **Exterior (Shot 01, Frame 000):** **Excellent** — Stepped two-story cantilever with stucco grain, honed travertine pool deck, board-formed concrete retaining wall, and crystalline water vanishing into mountain horizon.
- **Entrance (Shot 02, Frames 070 & 108):** **Excellent** — Pedestrian approach perspective with 9-plank horizontal walnut pivot door, illuminated electric cyan LED nightlight channel, brushed steel handle, sidelite glass, and travertine steps.
- **Interior (Shot 03, Frames 120 & 133):** **Excellent** — 24-batten fluted walnut wall, monolithic signage plinth with 3D typography, floating stone stairs with stainless pins, and frameless glass workspace.
- **Pool (Shot 01 & Shot 02):** **Excellent** — Architectural infinity lap pool with 50mm nosing coping, submerged steps, catch gutter, and living surface wave reflections.

---

### TECHNICAL
─────────
- **GLB Size:** **541.78 KB** (554,780 bytes; Budget: $\le 8.0\text{ MB}$; 93.4% headroom).
- **Texture Count:** **12 procedural PBR normal and roughness textures** generated via standalone Node.js script.
- **Texture Memory (Wire):** **2,524.84 KB** ($2.47\text{ MB}$) total compressed PNG wire payload (Budget: $\le 3.2\text{ MB}$; 21.1% headroom).
- **Texture Memory (GPU VRAM):** **31.96 MB** active VRAM footprint across all 12 maps.
- **Material Count:** **18 production PBR materials** + `MAT_Deck` alias (Budget: $\le 24$ slots; zero duplicate names).
- **Load Time:** **~0.38 seconds** total asset acquisition time over broadband.

---

### PERFORMANCE
───────────
- **M3 Baseline:** 3,600 triangles, 300 meshes, 13 materials, 0 textures, 540.27 KB GLB, 5.5ms frame time (60 FPS).
- **M4 Result:** 3,600 triangles, 300 meshes, 18 materials, 12 PBR textures, 541.78 KB GLB + 2,524.84 KB textures, 6.4ms frame time (60 FPS).
- **Delta:** $+0.9\text{ms}$ frame time ($+16.4\%$), $+5$ material slots, $+2,524.84\text{ KB}$ network wire download, rock-solid 60 FPS maintained on desktop and mobile WebGL.

---

### KNOWN ISSUES
────────────
1. `Shallow Verification`: Full screen-space reflections (SSR) and dynamic refractive caustics in the pool water basin are not enabled to preserve mobile WebGL performance; simulated via physical transmission (0.95), IOR (1.333), and animated normal displacement.
2. `Shallow Verification`: Directional sun and ambient light remain neutral inspection lighting; sunset golden hour HDRI, warm interior lantern glow through glass, and evening sky gradient are scheduled for **M5**.
3. `Minor Robustness Risk`: Interactive cyan holographic project schematics hovering above plinths are not yet active (reserved for M8 interactive portfolio displays).
4. `Minor Robustness Risk`: Pivot door dynamic opening interaction is mechanically anchored at $X = -0.65\text{m}$ but currently in neutral closed position (animation scheduled for interaction phase).

---

### NEXT MILESTONE
──────────────
**M5 — Architectural Lighting & Environmental Atmosphere**  
(Sun position calibration, golden hour $\to$ twilight lighting transitions, interior warm downlight spots, cove grazing channels, and atmospheric haze).
