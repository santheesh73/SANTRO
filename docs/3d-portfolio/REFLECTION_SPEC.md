# REFLECTION SPECIFICATION — SANTRO M5

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Status:** Approved Specification  

---

## 1. Architectural Reflection Philosophy

In high-end architectural visualization, reflections define the boundary between transparency, solidity, and depth. Glazing, polished stone, brushed metals, and pool water must exhibit **physically grounded Fresnel reflectivity** rather than artificial chrome mirrors or opaque blue glass.

### Guiding Principles:
1. **No Opaque Blue Glazing:** Clear architectural glass must remain low-iron neutral (`color: #FFFFFF`, `transmission: 0.94`, `ior: 1.52`), allowing interior sightlines to remain readable at normal viewing angles while producing clean specular reflections at glancing grazing angles.
2. **Crystalline Pool Water:** Infinity pool water reflects the golden sky and white cantilever overhangs while revealing the submerged basin steps and turquoise absorption depth.
3. **Restrained Travertine Specularity:** Honed limestone (`roughness: 0.35`) exhibits soft anisotropic specular highlights from raking sunlight rather than a glossy mirror shine.

---

## 2. Key Reflective Materials & Physical Calibration

### 2.1 Ultra-Clear Architectural Glazing (`MAT_Glass_Clear`)
- **Shader Model:** `THREE.MeshPhysicalMaterial`
- **Transmission:** `0.94`
- **Index of Refraction (IOR):** `1.52` (Crown glass)
- **Roughness:** `0.015`
- **Volume Thickness:** `0.6m`
- **Attenuation Color:** `#EEF5F5` (neutral low-iron)
- **Attenuation Distance:** `8.0m`
- **Behavior Under M5 Lighting:**
  - *Exterior Angles (Shots 1 & 2):* Reflects the golden sky and opposite landscape at shallow grazing angles (~70°–85° incident).
  - *Interior Angles (Shot 3):* High transmission allows the viewer to see through partitions into the glass engineering workspace without opacity fog.

### 2.2 Infinity Lap Pool Crystalline Water (`MAT_Water`)
- **Shader Model:** `THREE.MeshPhysicalMaterial` with dual-layer dynamic wave displacement
- **Transmission:** `0.92`
- **Index of Refraction (IOR):** `1.333` (Water)
- **Roughness:** `0.05`
- **Volume Thickness:** `1.4m`
- **Attenuation Color:** `#228085` (natural turquoise chlorination absorption)
- **Attenuation Distance:** `2.2m`
- **Behavior Under M5 Lighting:**
  - Reflects the white cantilevered facade and sky horizon.
  - Submerged center fixture creates upward luminous refraction through the animated capillary waves.

### 2.3 Honed Travertine & Limestone Deck (`MAT_Stone` / `MAT_Terrace`)
- **Shader Model:** `THREE.MeshStandardMaterial`
- **Roughness:** `0.35` (interior) / `0.38` (terrace deck)
- **Metalness:** `0.02`
- **Normal Map:** `/3d/textures/travertine_normal.png` (scale `[0.45, 0.45]`)
- **Roughness Map:** `/3d/textures/travertine_roughness.png`
- **Behavior Under M5 Lighting:**
  - At Golden Hour (35° sun angle), creates long, elegant specular sheen streaks across the terrace deck, mirroring the reference video aesthetic.

### 2.4 Anodized Dark Metal & Stainless Steel (`MAT_Metal_Dark` / `MAT_Metal_Brushed`)
- **Dark Aluminum:** `color: #1F1F21`, `roughness: 0.30`, `metalness: 0.88`. Clean metallic highlights along window mullions and roof coping.
- **Brushed Stainless Steel:** `color: #C0C0C4`, `roughness: 0.22`, `metalness: 0.95`. High-specular directional highlights on door hardware and stair anchor pins.

---

## 3. Reflection Performance & Real-Time Strategy

- **Fresnel Schlick Approximation:** Handled natively by Three.js Physical and Standard shaders with zero extra draw passes.
- **Environment Irradiance:** Diffuse and specular hemispherical fill provides soft ambient reflection without requiring expensive real-time planar reflection probes or screen-space reflection (SSR) post-processing passes.
- **Frame Rate Preservation:** Keeps GPU frame times below 14ms across desktop and mobile devices.
