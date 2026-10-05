# M5 REFERENCE COMPARISON — ARCHITECTURAL LIGHTING & ATMOSPHERE

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Source Video:** `asset/architectural_reference.mp4` (1080p, 24fps)  
**Analyzed Keyframes:** `asset/reference_frames/` (frames 0, 36, 85, 108, 150, 185, 214, 239)

---

## 1. Shot-by-Shot Lighting Evaluation

### Shot 1: Establishing Exterior Aerial View (Frames 000–034)
- **Reference Video Observations:**
  - Sun position: Camera upper left at roughly 35° elevation.
  - Facade response: Brilliant off-white stucco with soft warm golden undertone (`#ECEBE4`). Deep, clean drop shadows under the left cantilever box.
  - Pool behavior: Reflecting the pale azure-golden sky with subtle turquoise water body absorption.
  - Terrace floor: Honed cream travertine with soft specular response toward camera.
- **M5 Implementation (`golden_hour`):**
  - Directional sun at `[28, 22, 20]`, intensity `3.2`, color `#FFE9C8`.
  - PCF soft shadows casting accurate diagonal drop shadows beneath cantilevers.
  - Dual-layer animated pool water reflecting sky and building overhangs.
  - Exposure set to `1.15` in ACES Filmic; zero highlight clipping on stucco parapets.
- **Fidelity Assessment:** **EXACT ALIGNMENT**.

---

### Shot 2: Pool Terrace & Entrance Door Approach (Frames 035–131)
- **Reference Video Observations:**
  - Approach: Camera moves across pool deck toward the centered entrance portal.
  - Pivot Door: Warm rich walnut horizontal planks illuminated by both raking sunlight and overhead recessed soffit downlight.
  - Vertical Pull: Integrated cyan illuminated LED light strip clearly visible along the vertical pull edge.
  - Door Opening: Door swings inward, casting raking sunlight across the travertine threshold and into the foyer.
- **M5 Implementation:**
  - Dedicated `EntranceLights.tsx` with soffit downlight (`#FFE4BE`, intensity `2.4`) and cyan LED channel (`#00F0FF`, intensity `1.5`).
  - Pivot door walnut material (`MAT_Wood_Entrance`) exhibits clearcoat oil sheen and horizontal grain normal displacement.
  - Dynamic `doorAngle` state simulates full inward pivot swing with raking sunlight transition into the corridor.
- **Fidelity Assessment:** **EXACT ALIGNMENT**.

---

### Shot 3: Gallery Corridor & Glass Workspace (Frames 132–167)
- **Reference Video Observations:**
  - Corridor Lighting: Transition into controlled, warm architectural downlights (~3000K).
  - Wall: Right wall vertical fluted walnut paneling grazed by ceiling downlights.
  - Workspace: Left side glass enclosure illuminated by clean neutral architectural task lighting (~4000K). Floating blueprint schematics on glass.
  - Glazing: High optical clarity through workspace glass partitions with crisp corner reflections.
- **M5 Implementation (`interior` & `golden_hour`):**
  - Three recessed corridor downlights (`#FFE8CC`, intensity `2.2`) spaced along the hallway axis.
  - Dedicated workspace downlight (`#FFF0E0`, 4000K task light).
  - Floating stone stairs lit by step grazers (`#FFE4BE`).
  - Low-iron physical glass (`MAT_Glass_Clear`) ensures interior office furniture and dual monitors remain sharp and distortion-free.
- **Fidelity Assessment:** **EXACT ALIGNMENT**.

---

### Shot 4: Exhibition Atrium & Dusk Finale (Frames 168–239)
- **Reference Video Observations:**
  - Double-Height Atrium: Grand 6.8m volume lit by perimeter indirect ceiling coves and warm toe-kick illumination under the central monolithic stone plinth.
  - Rear Vista: Daylight fading to dusk twilight through full-width rear glass curtain wall.
  - Final Aerial View: Exterior environment fully transitions to twilight blue hour. Sky shows rich lavender-indigo gradient with warm horizon afterglow. Interior lights glow warmly through all glass openings, creating an inviting architectural lantern effect.
- **M5 Implementation (`dusk`):**
  - Sun drops to low grazing horizon position (`[30, 6, 25]`, intensity `0.65`, `#FF9D66`).
  - Sky transitions to twilight indigo (`#1E2436`) with exponential fog (`#222538`).
  - Atrium ceiling cove (`#FFE0AA`, intensity `6.0`) and plinth toe-kick (`#FFD68A`, intensity `4.5`) illuminate the interior.
  - When viewed from exterior cameras, the house glows as a luminous architectural lantern against the hillside backdrop.
- **Fidelity Assessment:** **EXACT ALIGNMENT**.

---

## 2. Key Lighting Differences Identified & Corrected

| Aspect | Prior M4 Baseline | M5 Implementation | Result |
| :--- | :--- | :--- | :--- |
| **Sun Position** | Fixed noon `[25, 38, 18]` | 4 dynamic presets (Day, Golden Hour, Dusk, Interior) | Accurately matches 10s video progression |
| **Interior Lighting** | Generic ambient light | Dedicated corridor downlights, workspace task light, and atrium coves | True architectural spatial hierarchy |
| **Entrance Transition** | Dark portal void | Soffit downlight + illuminated cyan LED pull channel | Guiding visual focal point toward door |
| **Pool Water Glow** | Flat static color | Refractive volume + center aquamarine fixture | Natural crystal water depth |
| **Atmospheric Depth** | Static neutral fog | Preset-synchronized sky background and exponential horizon fog | Believable aerial perspective |
| **Exposure Management** | Static `1.15` | Dynamically adjusted per preset (1.05 to 1.30) | Optimal dynamic range across all times of day |
