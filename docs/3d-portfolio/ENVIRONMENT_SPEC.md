# ENVIRONMENT SPECIFICATION — SANTRO M5

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Status:** Approved Specification  

---

## 1. Environmental Atmosphere Philosophy

The environmental atmosphere serves as the **spatial envelope and natural horizon** for The Portfolio House. It establishes the Mediterranean/Southern California hillside geography described in the reference video analysis.

### Restraint Principles:
- **No Dramatic Fantasy Clouds:** The sky is kept architectural, subtle, and natural.
- **No Heavy Smog or Dense Fog:** Fog is calibrated as subtle aerial perspective rather than volumetric game smoke. The house remains crisp and readable from all viewpoints.
- **Seamless Horizon Ground Blending:** The distant terrain horizon disc (radius 180m at Y = -1.8m) harmoniously matches the atmospheric fog color and arid mountain earth tones.

---

## 2. Atmospheric Sky & Horizon Gradient

The atmospheric environment is managed dynamically via `src/3d/environment/Atmosphere.tsx`, updating background clear color, exponential fog (`fogExp2`), and the ground horizon disc to match the active Time-of-Day preset.

| Preset | Background Sky Color | Fog Color | Fog Density | Horizon Ground Color | Ground Roughness |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DAY** | `#D9E4EE` (Clean Azure Sky) | `#E2E8EE` | `0.0070` | `#D2CDC3` | `0.95` |
| **GOLDEN_HOUR** | `#E5DED6` (Warm Golden-Azure) | `#E8DED2` | `0.0065` | `#D4CBBE` | `0.95` |
| **DUSK** | `#1E2436` (Twilight Indigo) | `#222538` | `0.0090` | `#2C2A33` | `0.95` |
| **INTERIOR** | `#0F131A` (Night Exterior) | `#12151E` | `0.0080` | `#1B1D24` | `0.95` |

---

## 3. Atmospheric Fog Calibration (`fogExp2`)

Three.js `fogExp2` calculates distance falloff using the exponential formula:

$$\text{factor} = e^{-(\text{distance} \times \text{density})^2}$$

### Distance Falloff Table (Golden Hour @ density = 0.0065):
- **0m to 25m (Hero Villa & Pool Terrace):**
  - Visibility factor: $1.00 \to 0.97$
  - Impact: Effectively zero obscuration; crisp architectural geometry and sharp texture details are preserved.
- **25m to 60m (Plinth Retaining Step & Agave Slopes):**
  - Visibility factor: $0.97 \to 0.86$
  - Impact: Gentle atmospheric softening that establishes spatial depth relative to the foreground terrace.
- **60m to 120m (Midground Chaparral Ridges):**
  - Visibility factor: $0.86 \to 0.54$
  - Impact: Pronounced aerial perspective; distant terrain features recede into the horizon haze.
- **120m to 180m (Distant Horizon Disc Boundary):**
  - Visibility factor: $0.54 \to 0.25$
  - Impact: Ground horizon disc softly dissolves into the sky background color with zero visible hard edge seam.

---

## 4. Environmental Fill & Ground Travertine Bounce

In real-world architectural photography, sunlight hitting large-format light limestone terrace slabs reflects strong upward secondary fill onto soffits, walls, and ceiling overhangs.

In SANTRO M5, this physical phenomenon is simulated through the calibrated `THREE.HemisphereLight`:
- **Sky Light Component:** Radiates down from the sky hemisphere (`#E6F0FA` for Day, `#F3E8DC` for Golden Hour).
- **Ground Bounce Component:** Radiates upward from the limestone terrace and arid earth (`#DDD6C8` for Day, `#D5C2AB` for Golden Hour).
- **Result:** Volumetric overhangs and recessed window reveals retain warm luminous bounce without crushing to black or requiring expensive real-time global illumination passes.

---

## 5. Offline Reliability & Performance Isolation

- **Zero External Network Dependencies:** The environment does not fetch external HDRI files over CDN or GitHub, eliminating network latency, bandwidth spikes, and offline loading failures.
- **GPU Overhead:** Exponential fog and hemisphere irradiance require zero additional texture memory and compute in trivial single-instruction fragment shader operations.
- **Mobile Compatibility:** Fully compatible with iOS Safari and Android WebGL implementations.
