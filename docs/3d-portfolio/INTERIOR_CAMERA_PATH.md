# INTERIOR CAMERA PATH SPECIFICATION

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Module:** `src/3d/camera/interiorCameraPath.ts`  
**Trajectory:** Centripetal Catmull-Rom Spline ($C^1$ Continuity, $\alpha = 0.5$)  
**Piecewise Precision:** $0.000\text{m}$ coordinate deviation at all authored waypoints

---

## 1. Master Authored Interior Waypoints

The interior path is defined by 8 calibrated waypoints matching the spatial sequence of the reference video:

| ID | Progress $p_{\text{int}}$ | State | Position $[X, Y, Z]$ | Target $[X, Y, Z]$ | FOV | Shot Reference | Architectural Shot Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `int-wp-01` | **0.00** | `DOOR_THRESHOLD` | $[0.00, 1.60, 2.20]$ | $[0.00, 1.60, -6.00]$ | $56^\circ$ | Frame 108 (t=4.5s) | Door threshold passage; seamless handoff from M6 exterior camera looking straight down the corridor axis |
| `int-wp-02` | **0.12** | `FOYER_ENTRY` | $[0.10, 1.60, -0.60]$ | $[0.40, 1.60, -5.00]$ | $57^\circ$ | Frame 120 (t=5.0s) | Crossing through the open walnut door portal into the travertine vestibule; initial interior exposure adaptation |
| `int-wp-03` | **0.24** | `FOYER_HOLD` | $[0.20, 1.60, -1.80]$ | $[1.60, 1.60, -4.20]$ | $58^\circ$ | Frame 131 (t=5.46s) | Cinematic pause settling on the 24-batten fluted walnut accent wall, stone typography plinth, and floating stair |
| `int-wp-04` | **0.38** | `CORRIDOR_ENTRY` | $[0.10, 1.60, -3.80]$ | $[0.00, 1.60, -10.00]$ | $58^\circ$ | Frame 133 (t=5.54s) | Re-orienting along the gallery longitudinal axis; linear ceiling reveal and downlights guide forward travel |
| `int-wp-05` | **0.52** | `CORRIDOR_TRAVEL` | $[0.00, 1.60, -6.00]$ | $[-0.60, 1.55, -10.50]$ | $58^\circ$ | Frame 150 (t=6.25s) | Smooth tracking along honed travertine floor slabs; subtle glance toward left glass office partition |
| `int-wp-06` | **0.66** | `GALLERY_REVEAL` | $[-0.35, 1.60, -7.80]$ | $[-3.20, 1.40, -8.50]$ | $60^\circ$ | Frame 167 (t=6.96s) | Lateral reveal of the frameless glass workspace, executive walnut desk, credenza, and dual iMac setup |
| `int-wp-07` | **0.80** | `GALLERY_ENTRY` | $[0.00, 1.60, -10.20]$ | $[0.00, 1.50, -15.00]$ | $56^\circ$ | Frame 169 (t=7.04s) | Emergence from 3.4m corridor into expansive 6.8m double-height volume, revealing mezzanine walkway bridges |
| `int-wp-08` | **1.00** | `INTERIOR_ROOM_APPROACH`| $[0.00, 1.60, -14.50]$ | $[0.00, 1.30, -19.50]$ | $54^\circ$ | Frames 185–200 (t=7.7s) | Arrival before monolithic travertine plinth with warm underglow, framing double-height rear glass mountain vista |

---

## 2. Piecewise Spline Progress Mapping (`progressToSplineU`)

Standard Three.js `CatmullRomCurve3` parameterizes curves by arc length, which introduces positional drift when control points have non-uniform spacing. 

To eliminate this deviation, `interiorProgressToSplineU` maps normalized progress $p$ piecewise across spline segments:

$$\text{segT} = \frac{p - p_i}{p_{i+1} - p_i}, \quad u(p) = \frac{i + \text{segT}}{N - 1}$$

### Mathematical Validation:
- For all 8 waypoints evaluated at their authored progress:
  $$\|\mathbf{P}(p_i) - \mathbf{P}_{\text{authored}, i}\| \le 0.0005\text{m}$$
- Guarantees exact coordinate hits at every validation shot while preserving $C^1$ derivative continuity along the entire trajectory.

---

## 3. Room Transition Coordinates & Spatial Volumes

```text
    DOOR THRESHOLD         FOYER VESTIBULE        GALLERY CORRIDOR      EXHIBITION ATRIUM
  [ Z: +2.2m to 0.0m ]   [ Z: 0.0m to -3.8m ]   [ Z: -3.8m to -10.2m ] [ Z: -10.2m to -20.0m ]
          │                      │                       │                      │
   Height: 3.4m           Height: 3.4m            Height: 3.4m           Height: 6.8m
   Width:  1.96m          Width:  4.0m            Width:  3.2m           Width:  12.0m
   Travertine Joint       Fluted Walnut Wall      Glass Office on Left   Mezzanine Balustrades
   Pivot Door Opening     Floating Staircase      Linear Ceiling Reveal  Central Travertine Plinth
```
