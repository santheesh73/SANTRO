# M5 IMPLEMENTATION — ARCHITECTURAL LIGHTING & ENVIRONMENTAL ATMOSPHERE

**Milestone:** M5 — Architectural Lighting & Environmental Atmosphere  
**Status:** Complete & Validated  
**Previous Baseline:** M4 — Surface Realism & PBR Material System (`42bff15`)  
**Visual Truth:** Reference Video (`asset/architectural_reference.mp4`, 1080p, 24fps) & Keyframes (`asset/reference_frames/`)

---

## 1. Executive Summary

Milestone M5 establishes the architectural lighting, time-of-day transitions, and environmental atmosphere for **The Portfolio House**. The objective is to present the house not as a game level or generic CGI render, but as a **professionally photographed architectural visualization**.

The implementation delivers:
1. **Centralized Lighting System Architecture** (`src/3d/lighting/`): Decoupled, modular lighting components orchestrated through a single reactive system.
2. **Directional Sunlight System** (`SunLight.tsx`): Physically calibrated sun elevation, azimuth, and intensity casting crisp, soft PCF architectural shadows.
3. **Environmental Sky & Ground Fill** (`EnvironmentLight.tsx`): Calibrated hemisphere irradiance balancing sky azure and travertine ground bounce without flattening geometry.
4. **4 Canonical Time-of-Day States** (`LightingPresets.ts`):
   - **DAY** (12:00 PM): High-noon architectural clarity, neutral ivory stucco, deep cantilever shadows, crisp pool reflections.
   - **GOLDEN_HOUR** (05:30 PM): Late afternoon golden sunlight (~3500K) at 35° elevation, matching Reference Video Shots 1 & 2.
   - **DUSK** (07:45 PM): Twilight blue hour with horizon afterglow, glowing interior lantern effect, matching Reference Video Shot 4.
   - **INTERIOR** (Gallery Core): Balanced spatial intimacy through the corridor, workspace, and exhibition atrium.
5. **Architectural Practical & Accent Fixtures**:
   - **Entrance Lighting** (`EntranceLights.tsx`): Soffit downlight washing the walnut pivot door, illuminated cyan LED door pull channel, threshold bounce.
   - **Interior Fixtures** (`InteriorLights.tsx`): Gallery corridor recessed square downlights, workspace linear task lighting, double-height atrium indirect ceiling cove, monolithic travertine plinth toe-kick light, floating stair grazers.
   - **Infinity Lap Pool Lighting** (`PoolLighting.tsx`): Submerged architectural pool lights (chlorinated aquamarine balance, NOT neon blue) and vanishing weir edge illumination.
   - **Architectural Accents** (`ArchitecturalLights.tsx`): Cantilever soffit reveals and board-formed concrete retaining wall grazing light.
6. **Dynamic Atmospheric Environment** (`Atmosphere.tsx`): Preset-synchronized background sky color, subtle exponential horizon fog (`fogExp2`), and distant terrain horizon disc.
7. **Developer Lighting Inspection Mode**: Integrated into `ViewportHUD.tsx` with one-click preset switching (`DAY`, `GOLDEN`, `DUSK`, `INTERIOR`) and component solo modes (`ALL`, `SUN`, `ENV`, `INT`).

---

## 2. File & Component Architecture

```text
src/3d/lighting/
├── types.ts                  # TypeScript interfaces for all lighting configs & presets
├── LightingConfig.ts          # Spatial fixture positions, bounds & default constants
├── LightingPresets.ts         # Catalog of the 4 canonical Time-of-Day presets
├── SunLight.tsx               # Directional sunlight with quality-aware PCF soft shadows
├── EnvironmentLight.tsx       # Hemispherical sky/ground fill & ambient baseline
├── EntranceLights.tsx         # Entrance soffit downlight, cyan door LED, and threshold bounce
├── InteriorLights.tsx         # Gallery corridor, workspace, atrium cove, and plinth fixtures
├── PoolLighting.tsx           # Submerged aquamarine pool luminaires and weir rim grazing
├── ArchitecturalLights.tsx    # Cantilever soffit reveal washers and retaining wall grazer
├── LightingSystem.tsx         # Master orchestrator component with ACES exposure controller
├── SceneLighting.tsx          # Backwards-compatible drop-in entry point
└── index.ts                   # Barrel export

src/3d/environment/
└── Atmosphere.tsx             # Preset-synchronized background sky, fogExp2, and horizon disc

src/3d/state/
└── useHouseStore.ts           # State management: timeOfDay & lightingDebugSolo

src/components/ui/
└── ViewportHUD.tsx            # Interactive HUD controls for Time-of-Day and solo isolation
```

---

## 3. Lighting Hierarchy & Physical Calibration

The lighting system strictly adheres to the architectural visualization hierarchy:

```text
SUN / SKY (Primary Key Light)
   ↓
ENVIRONMENTAL FILL (Hemispherical Irradiance + Ambient Bounce)
   ↓
ARCHITECTURAL LIGHT (Cantilever Soffit & Retaining Wall Grazers)
   ↓
INTERIOR PRACTICAL LIGHT (Recessed Downlights, Linear Coves, Plinth Toe-Kick)
   ↓
LOCAL ACCENT LIGHT (Cyan Pivot Door LED Channel, Pool Weir Edge)
   ↓
REFLECTION / INDIRECT RESPONSE (PBR Physical Materials, Specular Highlights)
```

### Color Temperature & Spectral Calibration
- **Daylight Sun:** 5500K (`#FFFEF4`), crisp neutral white with natural daylight warmth.
- **Golden Hour Sun:** 3500K (`#FFE9C8`), radiant late afternoon golden amber.
- **Dusk Horizon Sun:** 2200K (`#FF9D66`), low raking warm orange sunset rim.
- **Interior Downlights & Coves:** 2800K–3000K (`#FFE2B8` to `#FFF0D6`), welcoming residential warmth.
- **Workspace Task Light:** 4000K (`#F8F6F0`), clean architectural neutral white.
- **Cyan LED Channel:** Electric cyan (`#00F0FF`), high-tech architectural accent matching reference frames 95–108.
- **Pool Luminaires:** Clean chlorinated aquamarine (`#48C5C5`), preserving crystal refraction without cartoonish saturation.

---

## 4. Exposure & Tone Mapping Management

Rendering uses Three.js `ACESFilmicToneMapping` with reactive exposure synchronization in `LightingSystem.tsx`:

| Preset | Apparent Time | Sun Elevation | Exposure | Tone Mapping | Key Visual Focus |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **DAY** | 12:00 PM | ~55° SSE | `1.05` | ACES Filmic | Clean white plaster, no clipping, controlled pool glare |
| **GOLDEN_HOUR** | 05:30 PM | ~35° WSW | `1.15` | ACES Filmic | Rich timber tones, raking facade shadows, golden haze |
| **DUSK** | 07:45 PM | ~8° W | `1.30` | ACES Filmic | Glowing interior lantern effect, twilight indigo sky |
| **INTERIOR** | Gallery Core | ~45° SE | `1.25` | ACES Filmic | Balanced interior shadows, clear corridor sightlines |

---

## 5. Shadow Architecture

- **Renderer Shadow Map:** `THREE.PCFSoftShadowMap`
- **Shadow Camera Frustum:** Orthographic bounds configured to tightly enclose the 36m × 38m × 8.2m villa footprint and 16m pool terrace plinth:
  - `left: -28`, `right: +28`, `top: +26`, `bottom: -26`, `near: 1.0`, `far: 95.0`
- **Shadow Biasing:**
  - `shadowBias: -0.00025`
  - `shadowNormalBias: 0.022`
  - Completely eliminates shadow acne on stucco/concrete surfaces while maintaining sharp contact grounding at wall-to-floor junctions.
- **Quality Tier Allocation:**
  - `HIGH`: 2048 × 2048 shadow map, full soft filtering.
  - `MEDIUM`: 1024 × 1024 shadow map, optimized filtering.
  - `LOW`: Directional shadows disabled, ambient hemisphere lighting enabled.

---

## 6. Verification & Validation Status

- **Architecture:** M3 geometry remains 100% intact, no accidental model mutations.
- **Materials:** All 18 M4 PBR materials respond convincingly to directional sun and environmental fill.
- **Daylight State:** Verified with clean architectural whites, high shadow definition, readable cantilevers.
- **Golden Hour State:** Verified matching Reference Shots 1 & 2 with warm raking shadows.
- **Dusk State:** Verified matching Reference Shot 4 with lantern glow through exterior glazing.
- **Interior State:** Verified with soft downlight pools along gallery corridor and atrium plinth.
- **Entrance Lighting:** Verified with soffit downlight and illuminated cyan door pull.
- **Pool Lighting:** Verified with clean aquamarine water volume and weir edge grazing.
- **Atmospheric Fog:** Restrained exponential fog (`fogExp2`, density 0.0065–0.009) providing subtle aerial depth without washing out building lines.
