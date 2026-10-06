# CAMERA STATES SPECIFICATION

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Type:** `ExteriorCameraState` in `src/3d/camera/types.ts`  
**State Machine Controller:** `getStateAtProgress` in `src/3d/camera/exteriorCameraPath.ts`

---

## 1. State Machine Overview

The M6 exterior journey is organized into 5 explicit cinematic stages. Each state represents an intentional phase of architectural discovery with distinct optical, compositional, and interaction behaviors:

```text
  [ EXTERIOR_ESTABLISHING ]  (Progress 0.00 to 0.18)
             │
             ▼
  [ EXTERIOR_APPROACH ]     (Progress 0.18 to 0.42)
             │
             ▼
  [ FACADE_REVEAL ]         (Progress 0.42 to 0.68)
             │
             ▼
  [ ENTRANCE_APPROACH ]     (Progress 0.68 to 0.92)
             │
             ▼
  [ DOOR_TRANSITION ]       (Progress 0.92 to 1.00)
```

---

## 2. State Breakdown & Architectural Semantics

### State 1: `EXTERIOR_ESTABLISHING`
- **Progress Range:** $s \in [0.00, 0.18)$
- **Reference Shot:** Shot 01 (Frame 000, $t = 0.0\text{s}$)
- **Camera Elevation:** $+12.50\text{m} \to +8.00\text{m}$ (Elevated drone altitude)
- **Primary Look Target:** Center of building mass $[0.0, +3.8, +2.0]$
- **Optical Lens:** $48^\circ$ FOV ($\sim 40\text{mm}$)
- **Architectural Purpose:**
  Establishes the macro context of "The Portfolio House": cantilevered dual masses, flat gravel roof with skylight curb, horizontal ground terrace plinth, and infinity lap pool surrounded by rugged hillside terrain.
- **HUD Readout:** Shows hero title and overall project orientation.

---

### State 2: `EXTERIOR_APPROACH`
- **Progress Range:** $s \in [0.18, 0.42)$
- **Reference Shot:** Shot 01 (Frame 034, $t = 1.4\text{s}$) to Shot 02 transition
- **Camera Elevation:** $+8.00\text{m} \to +2.20\text{m}$ (Continuous crane glide descent)
- **Primary Look Target:** South living pavilion & terrace plinth $[0.0, +3.0, +1.8]$
- **Optical Lens:** $50^\circ \to 52^\circ$ FOV
- **Architectural Purpose:**
  Brings the viewer down from the sky into human architectural scale. Transitions from reading the overall building silhouette to appreciating the stepped board-formed concrete retaining plinth, sliding glass pocket tracks, and teak sun loungers.
- **HUD Readout:** Indicates descent velocity and terrace plinth approach.

---

### State 3: `FACADE_REVEAL`
- **Progress Range:** $s \in [0.42, 0.68)$
- **Reference Shot:** Shot 02 (Frame 070, $t = 2.9\text{s}$)
- **Camera Elevation:** Fixed human eye-level ($+1.65\text{m}$)
- **Primary Look Target:** Main entrance portal $[0.0, +1.60, 0.0]$
- **Optical Lens:** $54^\circ \to 55^\circ$ FOV ($\sim 32\text{mm}$)
- **Architectural Purpose:**
  Pure eye-level tracking across the honed travertine pavers parallel to the reflective lap pool weir edge. The camera frames the monumental entrance portal between two structural columns beneath the deep cantilever overhang soffit.
- **Leading Lines:** Infinity pool weir edge, travertine joint orthogonals, and cantilever soffit reveal.

---

### State 4: `ENTRANCE_APPROACH`
- **Progress Range:** $s \in [0.68, 0.92)$
- **Reference Shot:** Shot 02 (Frame 095, $t = 3.9\text{s}$)
- **Camera Elevation:** $+1.62\text{m} \to +1.60\text{m}$ (Approaching portal)
- **Primary Look Target:** Pivot door leaf & handle $[0.0, +1.60, -2.0]$
- **Optical Lens:** $55^\circ \to 56^\circ$ FOV
- **Architectural Purpose:**
  The entrance portal becomes the dominant destination in frame. The 9-plank horizontal walnut pivot door, illuminated cyan handle channel, and dark charcoal sidelite frames fill the composition.
- **Interaction Trigger:** Proximity subsystem triggers smooth inward rotation of `GEO_Door_Pivot_Leaf` around its offset hinge ($X = -0.65\text{m}$).

---

### State 5: `DOOR_TRANSITION`
- **Progress Range:** $s \in [0.92, 1.00]$
- **Reference Shot:** Shot 02 (Frame 108, $t = 4.5\text{s}$)
- **Camera Elevation:** $+1.60\text{m}$ (Standing eye-level at threshold)
- **Primary Look Target:** Foyer gallery corridor vanishing point $[0.0, +1.60, -6.0]$
- **Optical Lens:** $56^\circ$ FOV ($\sim 28\text{mm}$)
- **Architectural Purpose:**
  The door is swung fully open to $-85^\circ$, completely clearing the walkway. The camera is centered at $[0.0, 1.60, 2.2]$ looking straight down the corridor axis. Travertine floor tiles flow unbroken across the threshold into the foyer.
- **Handoff Target:** Fully establishes the starting viewpoint for M7 Interior Camera Journey.
