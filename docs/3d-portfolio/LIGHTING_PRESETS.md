# LIGHTING PRESETS CATALOG — SANTRO M5

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Status:** Approved Specification  

---

## 1. Overview

SANTRO M5 implements 4 canonical Time-of-Day states as centralized, reactive presets. Each preset encapsulates sun position, intensities, color temperatures, atmospheric fog parameters, and interior fixture balances.

```text
[ DAY ] ───▶ [ GOLDEN_HOUR ] ───▶ [ DUSK ] ───▶ [ INTERIOR ]
(12:00 PM)     (05:30 PM)          (07:45 PM)     (Gallery Core)
```

---

## 2. Detailed Preset Catalog

### Preset 1: DAY (`day`)
- **Display Label:** `DAY` (12:00 PM)
- **Visual Mood:** High-noon architectural clarity, bright neutral daylight, crisp geometry, clean glass reflections.
- **Architectural Rationale:** Validates that white stucco (`#ECEBE4`) and board-formed concrete (`#969288`) do not blow out or wash into flat white under intense sun.
- **Key Parameters:**
  - `exposure`: `1.05`
  - `sun.position`: `[22, 42, 16]` (~55° elevation from SSE)
  - `sun.intensity`: `2.8`
  - `sun.color`: `#FFFEF4` (~5500K)
  - `environment.hemiSkyColor`: `#E6F0FA`
  - `environment.hemiGroundColor`: `#DDD6C8`
  - `environment.hemiIntensity`: `0.70`
  - `atmosphere.skyColor`: `#D9E4EE`
  - `atmosphere.fogColor`: `#E2E8EE`
  - `atmosphere.fogDensity`: `0.0070`
  - `entrance.soffitDownlightIntensity`: `1.5`
  - `entrance.doorLEDIntensity`: `0.8`
  - `interior.corridorDownlightIntensity`: `1.2`
  - `interior.atriumCoveIntensity`: `1.8`
  - `pool.underwaterIntensity`: `0.6`

---

### Preset 2: GOLDEN_HOUR (`golden_hour`)
- **Display Label:** `GOLDEN` (05:30 PM) — **Default Hero Preset**
- **Visual Mood:** Late afternoon warm golden sunlight (~3500K) at 35° elevation from West-Southwest. Long raking shadows, warm amber facade highlights, silky travertine terrace specular, golden horizon haze.
- **Architectural Rationale:** Directly matches Reference Video Shots 1 & 2 (`asset/reference_frames/frame_000_t00.00s.png` to `frame_085_t03.54s.png`). Warmth comes from calibrated directional sun angle and ground bounce rather than an artificial global orange filter.
- **Key Parameters:**
  - `exposure`: `1.15`
  - `sun.position`: `[28, 22, 20]` (~35° elevation from WSW)
  - `sun.intensity`: `3.2`
  - `sun.color`: `#FFE9C8` (~3500K)
  - `environment.hemiSkyColor`: `#F3E8DC`
  - `environment.hemiGroundColor`: `#D5C2AB`
  - `environment.hemiIntensity`: `0.85`
  - `atmosphere.skyColor`: `#E5DED6`
  - `atmosphere.fogColor`: `#E8DED2`
  - `atmosphere.fogDensity`: `0.0065`
  - `entrance.soffitDownlightIntensity`: `2.4`
  - `entrance.doorLEDIntensity`: `1.5`
  - `interior.corridorDownlightIntensity`: `2.2`
  - `interior.atriumCoveIntensity`: `3.0`
  - `pool.underwaterIntensity`: `1.4`

---

### Preset 3: DUSK (`dusk`)
- **Display Label:** `DUSK` (07:45 PM)
- **Visual Mood:** Twilight blue hour with deep indigo/lavender sky and warm sunset afterglow on the horizon. Sunlight drops to a low grazing rim; interior architectural practical lights glow warmly through floor-to-ceiling glass, transforming the villa into a luminous architectural lantern.
- **Architectural Rationale:** Directly matches Reference Video Shot 4 finale (`asset/reference_frames/frame_214_t08.92s.png` to `frame_239_t09.96s.png`). Demonstrates high-contrast evening drama and reveals interior spaces from exterior viewpoints.
- **Key Parameters:**
  - `exposure`: `1.30`
  - `sun.position`: `[30, 6, 25]` (~8° elevation at horizon)
  - `sun.intensity`: `0.65`
  - `sun.color`: `#FF9D66` (~2200K)
  - `environment.hemiSkyColor`: `#303952`
  - `environment.hemiGroundColor`: `#221D28`
  - `environment.hemiIntensity`: `0.40`
  - `atmosphere.skyColor`: `#1E2436`
  - `atmosphere.fogColor`: `#222538`
  - `atmosphere.fogDensity`: `0.0090`
  - `entrance.soffitDownlightIntensity`: `4.0`
  - `entrance.doorLEDIntensity`: `2.5`
  - `interior.corridorDownlightIntensity`: `4.2`
  - `interior.atriumCoveIntensity`: `6.0`
  - `pool.underwaterIntensity`: `3.8`

---

### Preset 4: INTERIOR (`interior`)
- **Display Label:** `INTERIOR` (Gallery Core)
- **Visual Mood:** Calibrated specifically for spatial navigation through the gallery corridor, glass workspace, and double-height atrium. Soft daylight filters through windows and skylights, while warm 2800K ceiling downlights and linear coves define spatial intimacy and material richness.
- **Architectural Rationale:** Matches Reference Video Shots 2 & 3 interior walkthrough (`asset/reference_frames/frame_108_t04.50s.png` to `frame_185_t07.71s.png`). Prevents interior corridors from appearing dark or cave-like while maintaining soft contact shadows.
- **Key Parameters:**
  - `exposure`: `1.25`
  - `sun.position`: `[20, 30, 15]` (~45° elevation from SE)
  - `sun.intensity`: `1.2`
  - `sun.color`: `#FDFAF2` (~5000K)
  - `environment.hemiSkyColor`: `#3A4556`
  - `environment.hemiGroundColor`: `#2C2824`
  - `environment.hemiIntensity`: `0.35`
  - `atmosphere.skyColor`: `#0F131A`
  - `atmosphere.fogColor`: `#12151E`
  - `atmosphere.fogDensity`: `0.0080`
  - `entrance.soffitDownlightIntensity`: `2.8`
  - `entrance.doorLEDIntensity`: `1.2`
  - `interior.corridorDownlightIntensity`: `3.5`
  - `interior.atriumCoveIntensity`: `5.5`
  - `pool.underwaterIntensity`: `2.0`

---

## 3. Developer Solo & Inspection Modes

In addition to the 4 time-of-day presets, the developer toolbar in `ViewportHUD.tsx` provides 4 lighting isolation modes:

| Solo Mode | Active Components | Purpose |
| :--- | :--- | :--- |
| **ALL** | Sun + Environment + Entrance + Interior + Pool + Accents | Full orchestrated architectural visualization. |
| **SUN** | Directional Sun Light only | Audits sun angle, shadow direction, cantilever drop shadows, and facade raking contrast. |
| **ENV** | Hemisphere Light + Ambient Fill only | Audits diffuse ambient occlusion, sky/ground color balance, and fill softness. |
| **INT** | Interior Downlights + Entrance + Plinth Cove only | Audits practical luminaire spacing, light radius falloffs, and warmth distribution. |
