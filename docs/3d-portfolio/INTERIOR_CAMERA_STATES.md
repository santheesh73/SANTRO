# INTERIOR CAMERA STATES SPECIFICATION

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Type Contract:** `InteriorCameraState` (`src/3d/camera/types.ts`)  
**Design Philosophy:** States represent **physical spatial moments and architectural thresholds**, not web application views.

---

## 1. Interior State Machine Overview

The interior journey defines 8 explicit spatial states:

```text
DOOR_THRESHOLD (p_int = 0.00)
      │
      ▼
FOYER_ENTRY (p_int in [0.06, 0.18))
      │
      ▼
FOYER_HOLD (p_int in [0.18, 0.31))
      │
      ▼
CORRIDOR_ENTRY (p_int in [0.31, 0.45))
      │
      ▼
CORRIDOR_TRAVEL (p_int in [0.45, 0.59))
      │
      ▼
GALLERY_REVEAL (p_int in [0.59, 0.73))
      │
      ▼
GALLERY_ENTRY (p_int in [0.73, 0.88))
      │
      ▼
INTERIOR_ROOM_APPROACH (p_int in [0.88, 1.00])
```

---

## 2. State-by-State Architectural Breakdown

### 1. `DOOR_THRESHOLD` ($p_{\text{int}} \in [0.00, 0.06)$, Unified $p \in [0.50, 0.53)$)
- **Spatial Position:** $[0.00, 1.60, 2.20]$
- **Look Target:** $[0.00, 1.60, -6.00]$
- **Lens FOV:** $56.0^\circ$
- **Door Mechanical State:** Fully open ($-85.0^\circ$ rotation)
- **Lighting Transition:** Exterior daylight meets entrance soffit downlight and door handle cyan LED
- **Narrative Function:** The visitor pauses at the threshold of the home. The exterior pool terrace vanishes behind the camera frustum as the interior volume comes into sharp focus.

---

### 2. `FOYER_ENTRY` ($p_{\text{int}} \in [0.06, 0.18)$, Unified $p \in [0.53, 0.59)$)
- **Spatial Position:** $[0.10, 1.60, -0.60]$
- **Look Target:** $[0.40, 1.60, -5.00]$
- **Lens FOV:** $57.0^\circ$
- **Door Mechanical State:** Stably open ($-85.0^\circ$)
- **Lighting Transition:** Iris adaptation begins; tone mapping exposure ramps $+0.04$
- **Narrative Function:** Crossing into the foyer vestibule across the stainless steel threshold expansion joint. Architectural scale shifts from expansive outdoor terrace to intimate $3.4\text{m}$ ceiling height.

---

### 3. `FOYER_HOLD` ($p_{\text{int}} \in [0.18, 0.31)$, Unified $p \in [0.59, 0.66)$)
- **Spatial Position:** $[0.20, 1.60, -1.80]$
- **Look Target:** $[1.60, 1.60, -4.20]$
- **Lens FOV:** $58.0^\circ$
- **Pacing Rhythm:** Deliberate deceleration / settle
- **Architectural Framing:** 24-batten vertical fluted walnut wall, monolithic travertine typography plinth, and floating stone stair treads with brushed steel pins.
- **Narrative Function:** Gives the visitor time to absorb the material language of the villa before proceeding down the circulation corridor.

---

### 4. `CORRIDOR_ENTRY` ($p_{\text{int}} \in [0.31, 0.45)$, Unified $p \in [0.66, 0.73)$)
- **Spatial Position:** $[0.10, 1.60, -3.80]$
- **Look Target:** $[0.00, 1.60, -10.00]$
- **Lens FOV:** $58.0^\circ$
- **Lighting Transition:** Warm recessed ceiling downlights ($2700\text{K}$) create soft pools on travertine floor slabs.
- **Narrative Function:** Re-orients smoothly along the central circulation axis. The ceiling linear reveal draws the visitor forward.

---

### 5. `CORRIDOR_TRAVEL` ($p_{\text{int}} \in [0.45, 0.59)$, Unified $p \in [0.73, 0.80)$)
- **Spatial Position:** $[0.00, 1.60, -6.00]$
- **Look Target:** $[-0.60, 1.55, -10.50]$
- **Lens FOV:** $58.0^\circ$
- **Motion Character:** Controlled linear tracking shot at steady velocity ($3.5\text{m/s}$ virtual pace).
- **Narrative Function:** Cinematic connector moving through the home. Subtle glance toward the left reveals the frameless glass partition.

---

### 6. `GALLERY_REVEAL` ($p_{\text{int}} \in [0.59, 0.73)$, Unified $p \in [0.80, 0.87)$)
- **Spatial Position:** $[-0.35, 1.60, -7.80]$
- **Look Target:** $[-3.20, 1.40, -8.50]$
- **Lens FOV:** $60.0^\circ$
- **Decoupled Framing:** Camera body remains in the safe corridor, while look target pans $45^\circ$ left into the glass office.
- **Architectural Framing:** Executive walnut desk, credenza, dual iMac workstations, and cyan emissive screens.
- **Narrative Function:** Architectural discovery of the engineering workspace through low-iron glass without penetrating walls.

---

### 7. `GALLERY_ENTRY` ($p_{\text{int}} \in [0.73, 0.88)$, Unified $p \in [0.87, 0.94)$)
- **Spatial Position:** $[0.00, 1.60, -10.20]$
- **Look Target:** $[0.00, 1.50, -15.00]$
- **Lens FOV:** $56.0^\circ$
- **Spatial Expansion:** Ceiling steps up from $3.4\text{m}$ to $6.8\text{m}$.
- **Architectural Framing:** Cantilevered mezzanine walkway bridges, glass balustrades with metal shoes, and linear ceiling coves.
- **Narrative Function:** Dramatic emergence from the corridor into the monumental double-height exhibition volume.

---

### 8. `INTERIOR_ROOM_APPROACH` ($p_{\text{int}} \in [0.88, 1.00]$, Unified $p \in [0.94, 1.00]$)
- **Spatial Position:** $[0.00, 1.60, -14.50]$
- **Look Target:** $[0.00, 1.30, -19.50]$
- **Lens FOV:** $54.0^\circ$
- **Pacing Rhythm:** Gentle ease-out to complete halt.
- **Architectural Framing:** Monolithic travertine exhibition plinth with warm underglow, framed by the floor-to-ceiling rear glass curtain wall revealing the twilight mountain silhouette.
- **Narrative Function:** Climax of the interior walkthrough; resting position for subsequent milestone spatial exploration.
