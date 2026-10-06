# EXTERIOR CAMERA PATH SPECIFICATION

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Spline Formulation:** Centripetal Catmull-Rom ($\alpha = 0.5$)  
**Subdivision Samples:** 200 arc-length samples  
**Source Code:** `src/3d/camera/exteriorCameraPath.ts`

---

## 1. Spline Trajectory Overview

The M6 exterior camera path translates the cinematography of Shot 01 (Frames 000–034) and Shot 02 (Frames 035–108) into a continuous, interactive spatial traversal parameterized over normalized progress $s \in [0.0, 1.0]$.

```text
TRAJECTORY PLAN (TOP-DOWN & ELEVATION):

      [ NORTH ]
         │
         │  Z = +0.0m [ ENTRANCE WALL ]
         │  Z = +2.2m [ WP-05: DOOR THRESHOLD ] (Y = 1.60m, LookAt: Z = -6.0m)
         │       ▲
         │       │ [ Approach: Door rotates to -85 deg ]
         │  Z = +6.5m [ WP-04: ENTRANCE PORTAL ] (Y = 1.62m, LookAt: Z = -2.0m)
         │       ▲
         │       │ [ Human Eye-Level Terrace Walk: Y = 1.65m ]
         │  Z = +10.5m [ WP-03b: LAP POOL CROSSING ] (X = -0.8m)
         │       ▲
         │       │ [ Weir Edge Travertine Plinth ]
         │  Z = +14.8m [ WP-03: POOL TERRACE REVEAL ] (X = -1.2m, Y = 1.65m)
         │       ▲
         │       │ [ Descent Touchdown ]
         │  Z = +16.5m [ WP-02b: PLINTH TRANSITION ] (X = +0.2m, Y = 2.20m)
         │       ▲
         │       │ [ Downward Drone Crane Glide: Y = 5.8m ]
         │  Z = +19.5m [ WP-02: APPROACH GLIDE ] (X = +2.1m, LookAt: Façade)
         │       ▲
         │       │ [ Establishing Altitude: Y = 12.5m ]
         │  Z = +26.0m [ WP-01: AERIAL ESTABLISHING ] (X = +4.2m, LookAt: House Mass)
         │
      [ SOUTH ]
```

---

## 2. Authored Waypoints Master Table

| ID | Progress $s$ | State | Camera Position $[X, Y, Z]$ | Look Target $[X, Y, Z]$ | FOV | Shot Reference | Architectural Narrative & Shot Purpose |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **wp-01** | $0.00$ | `EXTERIOR_ESTABLISHING` | $[+4.20, +12.50, +26.00]$ | $[0.00, +3.80, +2.00]$ | $48^\circ$ | Shot 01 (Frame 000, 0.0s) | Elevated aerial crane establishing perspective. Frames full architectural massing, twin cantilevered upper boxes, flat gravel roof, infinity lap pool, and hillside plinth. |
| **wp-02** | $0.20$ | `EXTERIOR_APPROACH` | $[+2.10, +5.80, +19.50]$ | $[0.00, +3.00, +1.80]$ | $50^\circ$ | Shot 01 (Frame 034, 1.4s) | Continuous forward crane glide descending toward the pool terrace level. Reveals board-formed concrete retaining steps and south living pavilion depth. |
| **wp-02b** | $0.35$ | `EXTERIOR_APPROACH` | $[+0.20, +2.20, +16.50]$ | $[0.00, +2.00, +1.00]$ | $52^\circ$ | Shot 01–02 Transition | Decelerating descent meeting the travertine terrace plinth at eye level. Smoothes spline tangent to guarantee zero vertical undershoot below human eye level. |
| **wp-03** | $0.50$ | `FACADE_REVEAL` | $[-1.20, +1.65, +14.80]$ | $[0.00, +1.60, 0.00]$ | $54^\circ$ | Shot 02 (Frame 070, 2.9s) | Eye-level tracking across honed travertine pavers along the infinity pool weir edge. Frames the entrance portal between structural columns beneath the cantilever soffit. |
| **wp-03b** | $0.65$ | `FACADE_REVEAL` | $[-0.80, +1.65, +10.50]$ | $[0.00, +1.60, -0.50]$ | $55^\circ$ | Shot 02 Lap Pool Walk | Steady forward tracking along the pool water reflection, establishing strong perspective orthogonals leading directly to the walnut pivot entrance door. |
| **wp-04** | $0.80$ | `ENTRANCE_APPROACH` | $[-0.30, +1.62, +6.50]$ | $[0.00, +1.60, -2.00]$ | $55^\circ$ | Shot 02 (Frame 095, 3.9s) | Narrowing composition directly confronting the entrance portal. Reveals walnut plank grain, brushed steel handle, and illuminated cyan channel. Triggers door opening. |
| **wp-05** | $1.00$ | `DOOR_TRANSITION` | $[0.00, +1.60, +2.20]$ | $[0.00, +1.60, -6.00]$ | $56^\circ$ | Shot 02 (Frame 108, 4.5s) | Final exterior waypoint directly framing the open doorway threshold. Door swung to $-85^\circ$; camera frames the foyer gallery corridor and sets up M7 interior traversal. |

---

## 3. Mathematical Spline Formulation

1. **Centripetal Parameterization ($\alpha = 0.5$):**
   Three.js `THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5)` parameterizes knot vectors by square root of distance:
   $$\Delta t_i = \|\mathbf{P}_{i+1} - \mathbf{P}_i\|^{0.5}$$
   This guarantees that the curve is strictly free of self-intersections, cusp loops, and unnatural overshoots.
2. **Intermediate Leveling Waypoints:**
   Waypoints `wp-02b` and `wp-03b` provide curvature stabilization between the aerial descent ($Y = 12.5\text{m} \to 2.2\text{m}$) and the horizontal terrace stroll ($Y = 1.65\text{m}$), eliminating vertical sag below the $1.45\text{m}$ safety floor.
3. **Equidistant Arc-Length Re-parameterization:**
   The spline pre-computes 200 equidistant arc-length segments on scene boot, ensuring constant velocity response when scrolling through the journey.
