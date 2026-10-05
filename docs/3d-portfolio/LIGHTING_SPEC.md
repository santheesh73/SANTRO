# LIGHTING SPECIFICATION — SANTRO M5

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Status:** Approved Specification  

---

## 1. Architectural Lighting Philosophy

The lighting design for **The Portfolio House** is conceived as a high-end architectural visualization study rather than an entertainment or gaming scene. Light exists to **reveal architecture, material honesty, volumetric depth, and spatial hierarchy**.

### Core Tenets:
1. **Architecture is the Hero:** Lighting never compensates for geometry or material flaws; it sculpts volumetric cantilevers, accentuates horizontal reveal joints, and articulates material grain.
2. **Restrained Color Palettes:** All general architectural sources adhere strictly to real-world correlated color temperatures (2700K–5500K). Neon colors are prohibited, with the singular exception of the engineered cyan LED channel on the pivot door pull (`#00F0FF`, matching reference frames 95–108).
3. **Hierarchy of Illumination:** Primary sun and environmental fill form the structural base, layered with recessed architectural downlights, concealed ceiling coves, and subtle floor grazing.
4. **Natural Transitions:** Moving from exterior daylight into the entrance foyer and gallery exhibits believable luminance adaptation without black voids or blown-out windows.

---

## 2. Lighting System Hierarchy

```text
1. SUN / SKY (Primary Key Source)
   - Dominates exterior scene
   - Defines building silhouette, cantilever drop shadows, and terrace raking angles

2. ENVIRONMENTAL FILL (Hemisphere Irradiance)
   - Diffuse sky scatter and ground plane bounce
   - Prevents pitch-black architectural shadows while maintaining directional contrast

3. ARCHITECTURAL LIGHTING (Cantilever Soffits & Formwork Grazers)
   - Concealed luminaires grazing vertical concrete and horizontal soffit reveals
   - Accentuates structural articulation at dusk and blue hour

4. INTERIOR PRACTICAL LIGHTING (Corridor Downlights & Atrium Coves)
   - 3000K recessed square downlights casting soft cones onto honed limestone floors
   - 2700K continuous indirect linear LED cove grazing atrium ceilings
   - 4000K clean task lighting inside the glass engineering workspace

5. LOCAL ACCENT LIGHTING (Cyan Door LED & Pool Weir Edge)
   - Micro-luminaire embedded in the walnut pivot door vertical pull handle
   - Subtle edge glow tracing the infinity pool vanishing weir

6. REFLECTION & SPECULAR RESPONSE
   - High-roughness diffuse scatter on stucco and concrete
   - Silky specular highlights on honed travertine flooring
   - Real Fresnel reflection and volume transmission through frameless clear glass and pool water
```

---

## 3. Light Source Catalog & Calibration

### 3.1 Primary Sun Light (`SunLight_Primary`)
- **Type:** `THREE.DirectionalLight`
- **Target Coordinates:** Centered around villa core `[0.0, 0.0, -6.0]`
- **Positions & Intensities:**
  - *Day:* `[22, 42, 16]`, Intensity `2.8`, Color `#FFFEF4` (~5500K)
  - *Golden Hour:* `[28, 22, 20]`, Intensity `3.2`, Color `#FFE9C8` (~3500K)
  - *Dusk:* `[30, 6, 25]`, Intensity `0.65`, Color `#FF9D66` (~2200K)
  - *Interior:* `[20, 30, 15]`, Intensity `1.2`, Color `#FDFAF2` (~5000K)
- **Shadow Frustum:** Orthographic bounds `[-28, +28, +26, -26]`, Near `1.0`, Far `95.0`
- **Bias Calibration:** `bias = -0.00025`, `normalBias = 0.022`

### 3.2 Environmental Fill (`EnvironmentLight`)
- **HemisphereLight:**
  - *Day:* Sky `#E6F0FA`, Ground `#DDD6C8`, Intensity `0.70`
  - *Golden Hour:* Sky `#F3E8DC`, Ground `#D5C2AB`, Intensity `0.85`
  - *Dusk:* Sky `#303952`, Ground `#221D28`, Intensity `0.40`
  - *Interior:* Sky `#3A4556`, Ground `#2C2824`, Intensity `0.35`
- **AmbientLight:**
  - *Day:* `#F5F7FA`, Intensity `0.20`
  - *Golden Hour:* `#FFF2E0`, Intensity `0.25`
  - *Dusk:* `#2A2B3D`, Intensity `0.12`
  - *Interior:* `#3A3B48`, Intensity `0.25`

### 3.3 Entrance Lighting (`EntranceLights`)
- **Soffit Downlight:** `[0.15, 3.35, 0.35]`, SpotLight (angle $\pi / 3.5$, penumbra 0.75, decay 2.0). Intensity: Day `1.5`, Golden Hour `2.4`, Dusk `4.0`, Interior `2.8`.
- **Door Cyan LED:** `[0.52, 1.45, 0.08]`, PointLight (distance 2.2m, decay 2.0). Color `#00F0FF`. Intensity: Day `0.8`, Golden Hour `1.5`, Dusk `2.5`, Interior `1.2`.
- **Threshold Bounce:** `[0.0, 0.05, 0.2]`, PointLight (distance 3.0m, decay 2.0). Intensity: Day `0.4`, Golden Hour `0.8`, Dusk `1.2`, Interior `0.9`.

### 3.4 Gallery Corridor & Interior Fixtures (`InteriorLights`)
- **Corridor Downlights (3x):** `[0.5, 3.35, -2.5]`, `[0.5, 3.35, -5.5]`, `[0.5, 3.35, -8.5]`. Color `#FFF0D6` (3000K). Distance 5.5m–6.0m, decay 2.0.
- **Glass Workspace Linear Downlight:** `[-5.2, 3.35, -5.8]`. Color `#F8F6F0` (4000K). Distance 7.0m, decay 2.0.
- **Atrium Ceiling Indirect Cove:** `[0.0, 6.6, -16.0]`. Color `#FFEECF` (2700K). Distance 14.0m, decay 2.0.
- **Monolithic Plinth Toe-Kick Glow:** `[0.0, 0.12, -16.0]`. Color `#FFDFAB` (2700K). Distance 5.0m, decay 2.0.
- **Floating Staircase Step Grazing Light:** `[2.5, 1.6, -5.0]`. Color `#FFE4BE`. Distance 4.5m, decay 2.0.
- **Rear Vista Glazing Wall Wash:** `[0.0, 3.2, -23.5]`. Color `#FFEBD2`. Distance 9.0m, decay 2.0.

### 3.5 Infinity Lap Pool Fixtures (`PoolLighting`)
- **Submerged Luminaires (3x):** West `[-4.5, -0.65, 6.5]`, Center `[0.0, -0.65, 6.5]`, East `[4.5, -0.65, 6.5]`. Color `#48C5C5` (aquamarine chlorinated water). Distance 5.0m–6.5m, decay 2.0.
- **Vanishing Weir Rim Grazing Light:** `[0.0, 0.05, 8.6]`. Color `#80DEDE`. Distance 4.0m, decay 2.0.

### 3.6 Cantilever Soffits & Retaining Wall (`ArchitecturalLights`)
- **West Overhang Soffit Downlight:** `[-9.0, 3.38, 2.5]`. Color `#FFE4BE`. SpotLight.
- **East Overhang Soffit Downlight:** `[9.0, 3.38, 2.5]`. Color `#FFE4BE`. SpotLight.
- **Board-Formed Concrete Retaining Wall Grazer:** `[-4.0, 0.15, 8.2]`. Color `#E8DCCB`. PointLight.

---

## 4. Architectural Transition Protocol

When the viewer approaches and enters the villa:
1. **Exterior Approach (Z: +25m to +5m):** Dominated by directional sunlight and sky hemisphere fill.
2. **Entrance Portal (Z: +5m to +0.5m):** Eye transitions into the shadow of the entrance overhang. Soffit downlight and pivot door walnut grain become prominent.
3. **Threshold Crossing (Z: +0.5m to -1.5m):** Door swings open, allowing raking sunlight to streak across the honed travertine floor slab. Warm corridor downlights guide the viewer forward.
4. **Gallery Corridor & Workspace (Z: -1.5m to -10m):** Sunlight fades; warm ceiling fixtures and clean 4000K workspace task lighting define interior volumes.
5. **Double-Height Atrium (Z: -10m to -24m):** Grand 6.8m volume opens up, lit by perimeter ceiling coves, glowing plinth toe-kicks, and daylight through high clerestory glazing.

---

## 5. Tone Mapping & Exposure Calibration

- **Tone Mapper:** `THREE.ACESFilmicToneMapping`
- **Output Color Space:** `THREE.SRGBColorSpace`
- **Exposure Schedule:**
  - Day: `1.05`
  - Golden Hour: `1.15`
  - Dusk: `1.30`
  - Interior: `1.25`
