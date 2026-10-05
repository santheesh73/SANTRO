# CAMERA SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M0 — Project Baseline & Reference Analysis  
**Coordinate System:** Right-Handed Cartesian ($+X$ = East/Right, $+Y$ = Up/Elevation, $+Z$ = South/Forward toward pool)  
**Units:** Meters ($1.0 \text{ unit} = 1.0 \text{ meter}$)  
**Reference Source:** `asset/architectural_reference.mp4` (10.00s, 240 frames, 1080p, 24 fps)  
**Keyframe Set:** `asset/reference_frames/`

---

## 1. Camera Architecture Overview

The camera in "The Portfolio House" is not a passive viewport; it is an architectural narrator. It guides the visitor through an orchestrated spatial sequence from an aerial mountain perspective, down across the reflective pool terrace plinth, through the walnut pivot entrance door, along the gallery axis, past the glass engineering lab, into the monumental double-height exhibition atrium, and finally toward the twilight mountain horizon.

In the interactive web experience, this trajectory is governed by a continuous parametric spline parameter $t \in [0.0, 1.0]$. The visitor can traverse the trajectory via scroll progression, direct room navigation, or autonomous cinematic playback. At designated waypoints, the camera unlocks an interactive orbital inspection mode.

```text
TRAJECTORY SCHEMATIC (PLAN VIEW, TOP-DOWN):

       [ NORTH: REAR MOUNTAIN VALLEY ]
                     |
     +---------------+---------------+
     | DOUBLE-HEIGHT | ENGINEERING   |
     | ATRIUM        | LAB / ARCHIVE |
     | (Shot 04)     |               |
     +-------^-------+---------------+
             |
     +-------|-------+---------------+
     | GLASS | CORRIDOR              |
     | LAB   | (Shot 03)             |
     +-------+-------^---------------+
                     |
     +---------------+---------------+
     | FOYER         | STAIRWAY      |
     | (End Shot 02) |               |
     +-------^-------+---------------+
             | [ PIVOT DOOR ]
             |
     +-------|-----------------------+
     | POOL TERRACE PLINTH           |
     | (Start Shot 02)               |
     |                               |
     | [ INFINITY LAP POOL ]         |
     +-------------------------------+
             ^
             |
       [ AERIAL DRONE CRANE (Shot 01) ]
       [ SOUTH: VALLEY RIDGEWAY ]
```

---

## 2. Reference Shot Analysis (Frame-by-Frame Breakdown)

The reference video consists of 4 distinct cinematic shots totaling 240 frames. Below is the frame-accurate analysis:

### SHOT 01 — Exterior Establishing Crane / Drone Descent
- **Frame Range:** Frames 000 – 034 (0.00s – 1.42s, duration: 1.46s)
- **Start Position:** $[X: +4.2\text{m}, Y: +12.5\text{m}, Z: +26.0\text{m}]$ (`REFERENCE ESTIMATE`)
- **End Position:** $[X: +2.1\text{m}, Y: +8.0\text{m}, Z: +18.5\text{m}]$ (`REFERENCE ESTIMATE`)
- **Camera Height ($Y$):** Starts at $+12.5\text{m}$ (elevated drone altitude), descends smoothly to $+8.0\text{m}$.
- **Look-at Target:** Center mass of the house facade $[X: 0.0\text{m}, Y: +3.8\text{m}, Z: +2.0\text{m}]$.
- **Movement Direction:** Downward, forward ($-Z$), and slightly inward toward the building center axis.
- **Velocity Profile:** Gentle ease-in, steady descent velocity, continuous forward crane glide.
- **Field of View (FOV):** $48^\circ$ (approx. $38\text{mm}$ full-frame equivalent lens). Zero wide-angle edge warping.
- **Lighting State:** Late afternoon golden hour sun casting crisp shadows angled down-right at roughly $35^\circ$ elevation.
- **Architectural Focus:** Volumetric silhouette of the twin cantilevered upper boxes, the horizontal roof deck, the ground-level terrace plinth, and the reflective pool surface. Title overlay: *"THE PORTFOLIO HOUSE"*.
- **Transition Out:** Hard cut on beat at Frame 035 to the pool terrace level.

---

### SHOT 02 — Approach Across Pool Terrace & Entrance Door Passage
- **Frame Range:** Frames 035 – 131 (1.46s – 5.46s, duration: 4.04s)
- **Start Position:** $[X: -1.2\text{m}, Y: +1.65\text{m}, Z: +14.8\text{m}]$ (eye level above pool deck)
- **End Position:** $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: -2.5\text{m}]$ (inside entrance foyer corridor)
- **Camera Height ($Y$):** Constant eye-level height ($1.65\text{m} \to 1.60\text{m}$ relative to finished floor level).
- **Look-at Target:** Pivot door center $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: 0.0\text{m}]$ transitioning down the gallery axis $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: -12.0\text{m}]$.
- **Movement Direction:** Pure forward dolly pushing along the main architectural entry axis ($-Z$).
- **Door Interaction Event (Frames 095–108):** 
  - As the camera reaches $Z \approx +2.8\text{m}$, the walnut pivot door rotates smoothly inward around its offset hinge ($250\text{mm}$ from left jamb), swinging from $0^\circ \to -85^\circ$.
  - The illuminated cyan handle trace catches specular highlights.
  - The camera glides through the opening without stopping or clipping geometry.
- **Velocity Profile:** Smooth linear cruise with subtle ease-out as the camera crosses the threshold.
- **Field of View (FOV):** $56^\circ$ (approx. $28\text{mm}$ full-frame equivalent lens) capturing the cantilever soffit overhead and limestone pavers below.
- **Lighting State:** Bright exterior sunlight transitioning through the threshold into warm interior architectural illumination ($\sim 3000\text{K}$).
- **Architectural Focus:** Infinity pool edge, honed travertine floor slabs, teak sun loungers, pivot door mechanics, recessed downlights, and the initial glimpse of the vertical fluted walnut wall.
- **Transition Out:** Cut along the corridor axis at Frame 132.

---

### SHOT 03 — Gallery Corridor Tracking Past Glass Engineering Lab
- **Frame Range:** Frames 132 – 167 (5.50s – 6.96s, duration: 1.50s)
- **Start Position:** $[X: +0.2\text{m}, Y: +1.60\text{m}, Z: -3.5\text{m}]$
- **End Position:** $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: -8.8\text{m}]$
- **Camera Height ($Y$):** Fixed human standing eye-level ($1.60\text{m}$).
- **Look-at Target:** Leading hallway vanishing point $[X: -0.3\text{m}, Y: +1.55\text{m}, Z: -16.0\text{m}]$, with subtle lateral framing bias toward the left workspace.
- **Movement Direction:** Axial tracking shot along $-Z$.
- **Velocity Profile:** Constant cruising velocity ($\sim 3.5\text{m/s}$ equivalent).
- **Field of View (FOV):** $58^\circ$ (approx. $26\text{mm}$ lens), providing expansive horizontal perspective.
- **Lighting State:** Balanced interior architectural lighting: linear dark ceiling reveals with warm recessed downlights paired with cyan emissive holographic schematics and workstation monitors inside the glass office.
- **Architectural Focus:** Frameless floor-to-ceiling glass enclosure on the left housing the executive walnut desk and dual iMac setup; vertical fluted walnut feature wall and floating stone staircase on the right.
- **Transition Out:** Seamless cut into the double-height atrium at Frame 168.

---

### SHOT 04 — Double-Height Exhibition Atrium & Twilight Finale
- **Frame Range:** Frames 168 – 239 (7.00s – 9.96s, duration: 3.00s)
- **Sub-segment 4A (Interior Atrium Push, Frames 168–213):**
  - **Start Position:** $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: -9.5\text{m}]$
  - **End Position:** $[X: 0.0\text{m}, Y: +1.60\text{m}, Z: -16.0\text{m}]$ (approaching rear glass vista)
  - **Look-at Target:** Rear mountain vista horizon $[X: 0.0\text{m}, Y: +2.0\text{m}, Z: -35.0\text{m}]$.
  - **Movement Direction:** Forward along $-Z$, sweeping between the mezzanine balconies.
  - **Architectural Focus:** Monumental $6.8\text{m}$ ceiling height, warm linear ceiling cove troughs, floating mezzanine bridges, central travertine plinth with warm base under-glow, and cyan holographic project models.
- **Sub-segment 4B (Twilight Vista Dissolve / Crane Pull-Out, Frames 214–239):**
  - **Transition Type:** Cinematic cross-dissolve / camera focal push transitioning from the rear glass wall to an elevated dusk aerial perspective.
  - **Finale Position:** $[X: -6.0\text{m}, Y: +14.0\text{m}, Z: -32.0\text{m}]$ looking back south-east toward the illuminated house.
  - **FOV:** Expands to $46^\circ$ ($40\text{mm}$ lens) capturing the full dramatic mountain ridge and twilight sky.
  - **Lighting State:** Evening twilight (sky gradient of magenta, lavender, and deep indigo); interior lighting glows warmly through all glazed facades, creating a luminous architectural lantern effect.

---

## 3. Web Trajectory Parameterization: Normalized Spline Waypoints

To reproduce the cinematic cadence in WebGL, the continuous camera path is parameterized over $t \in [0.0, 1.0]$. The trajectory is defined by a cubic centripetal Catmull-Rom spline with knot vector positions $\mathbf{P}(t)$, look-at points $\mathbf{L}(t)$, and field-of-view values $\text{FOV}(t)$:

| Param $t$ | Spatial Zone / Room | Portfolio Content Association | Camera Position $[X, Y, Z]$ | Look-At Target $[X, Y, Z]$ | FOV | Camera Mode |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **0.000** | `EXTERIOR` (Aerial Establishing) | Identity & Hero Overview | $[+4.2, +12.5, +26.0]$ | $[0.0, +3.8, +2.0]$ | $48^\circ$ | Cinematic Crane |
| **0.080** | `EXTERIOR` (Descent Midpoint) | Hillside & Villa Context | $[+2.8, +7.5, +19.5]$ | $[0.0, +3.2, +2.0]$ | $50^\circ$ | Spline Follow |
| **0.150** | `EXTERIOR` (Pool Approach) | Hero Narrative & Pool Plinth | $[-1.2, +1.65, +14.8]$ | $[0.0, +1.60, 0.0]$ | $54^\circ$ | Spline Follow |
| **0.220** | `EXTERIOR` (Infinity Pool Crossing) | Reflection & Architecture | $[-0.5, +1.65, +7.5]$ | $[0.0, +1.60, 0.0]$ | $56^\circ$ | Spline Follow |
| **0.280** | `ENTRANCE` (Pivot Door Threshold) | Spatial Transition Portal | $[0.0, +1.60, +2.2]$ | $[0.0, +1.60, -6.0]$ | $56^\circ$ | Trigger Door Open |
| **0.350** | `FOYER` (Directory Wall) | About & Architectural Index | $[+0.2, +1.60, -1.8]$ | $[+1.8, +1.60, -4.5]$ | $58^\circ$ | Room Waypoint (Foyer) |
| **0.440** | `GALLERY` (Circulation Corridor) | Visual Introduction & Story | $[+0.1, +1.60, -5.0]$ | $[0.0, +1.60, -14.0]$ | $58^\circ$ | Spline Follow |
| **0.550** | `PROJECT STUDIO` (Glass Workspace) | 7 Production Projects (ORION, HeartTune...) | $[-0.4, +1.60, -7.5]$ | $[-3.2, +1.40, -8.0]$ | $60^\circ$ | Room Waypoint (Studio) |
| **0.650** | `ENGINEERING LAB` (Stairway Vista) | Technical Stack (AI, Frontend, Backend, Infra) | $[+0.2, +1.60, -9.0]$ | $[+2.4, +2.20, -9.5]$ | $58^\circ$ | Room Waypoint (Lab) |
| **0.750** | `ARCHIVE` & `STUDY` (Double-Height Atrium) | Hackathon Victories & Principles | $[0.0, +1.60, -11.5]$ | $[0.0, +1.20, -14.0]$ | $54^\circ$ | Room Waypoint (Atrium)|
| **0.850** | `CONTACT` (Rear Vista Approach) | Communication & Social Links | $[0.0, +1.60, -16.5]$ | $[0.0, +2.0, -35.0]$ | $50^\circ$ | Room Waypoint (Contact)|
| **0.930** | `TERRACE` (Rear Viewing Deck) | Final Cinematic Moment | $[0.0, +1.65, -20.5]$ | $[0.0, +2.5, -40.0]$ | $48^\circ$ | Room Waypoint (Terrace)|
| **1.000** | `EXTERIOR` (Twilight Ridge Finale) | Concluding Architectural Pan | $[-6.0, +14.0, -32.0]$ | $[+2.0, +4.0, -15.0]$ | $45^\circ$ | Cinematic Dusk Finale |

---

## 4. Mathematical Camera Rig Specification

### 4.1 Spline Curve Formulation
The camera path $\mathbf{P}(t)$ and target trajectory $\mathbf{L}(t)$ are constructed using `THREE.CatmullRomCurve3`:
- **Curve Type:** Centripetal (`curveType: 'centripetal'`), setting the tension parameter $\alpha = 0.5$. This guarantees that the trajectory never overshoots corners or loops around tight waypoints.
- **Subdivision:** 200 equidistant arc-length samples cached on scene initialization to allow linear arc-length parameterization ($\text{getPointAt}(s)$).

### 4.2 Dynamic Look-At Damping
To prevent abrupt camera target snapping during scroll direction reversals, the camera's rotation is updated using spherical linear interpolation (Slerp) on quaternions:

$$\mathbf{q}_{\text{current}} = \text{Slerp}(\mathbf{q}_{\text{current}}, \mathbf{q}_{\text{target}}, 1.0 - e^{-\lambda \Delta t})$$

Where:
- $\lambda = 8.5\text{ s}^{-1}$ under standard navigation.
- $\lambda = 14.0\text{ s}^{-1}$ during automated room transitions.
- Damping is computed per-frame using Three.js / Maath `damp3` and `dampQ` functions.

### 4.3 FOV Transitions
Field of view changes smoothly along the trajectory:
$$\text{FOV}(t) = \text{CubicHermite}(\text{FOV}_k, \text{FOV}_{k+1}, u)$$
Ensures that the lens dynamically contracts during wide exterior shots ($45^\circ - 48^\circ$) to maintain monumental architectural proportions, and expands inside interior spaces ($56^\circ - 60^\circ$) to provide peripheral context without fisheye curvature.

---

## 5. Camera Interaction Modes

The camera system supports four distinct operational modes:

### Mode 1: Continuous Axial Scroll Progression (Default)
- Driven by the user's scroll input ($0.0 \le t \le 1.0$).
- Virtual scroll wheel, touch drags, or keyboard up/down arrows adjust the normalized progress variable $s$.
- Physics damping applies inertial momentum and smooth deceleration.

### Mode 2: Waypoint Room Snapping
- Clicking any room in the HUD navigation directory (e.g. `EXTERIOR`, `FOYER`, `STUDIO`, `ATRIUM`, `TERRACE`) triggers an automated camera spline transit.
- Smooth ease-in-out easing curves (duration: $1.2\text{s} - 1.8\text{s}$).

### Mode 3: Interactive Room Orbit / Spatial Inspection
- When the camera is stationary at a Room Waypoint and the user drags the mouse/pointer:
  - The camera temporarily decouples from the strict spline orientation.
  - Constrained spherical orbit ($|\Delta \theta| \le 35^\circ$, $|\Delta \phi| \le 20^\circ$) allows the user to inspect wall typography, holographic project models, or mountain views.
  - Releasing input gently springs the camera back to the primary spline orientation.

### Mode 4: Reduced-Motion / Instant Jump
- Detected via `(prefers-reduced-motion: reduce)`.
- Disables continuous fast motion across rooms.
- Replaces camera movement with subtle opacity cross-fades ($300\text{ms}$) between fixed photographic viewpoints.

---

## 6. Dynamic Door Interaction Trigger

The entrance pivot door opening is mechanically bound to the camera's spatial proximity:
- **Trigger Range:** $Z \in [+4.5\text{m}, +1.0\text{m}]$ (corresponding to $t \in [0.24, 0.30]$).
- **Door Angle Function:**
  $$\theta_{\text{door}}(Z) = \text{clamp}\left( \frac{4.5 - Z}{4.5 - 1.0}, 0.0, 1.0 \right) \times (-85.0^\circ)$$
- Smooth cubic Hermite interpolation guarantees zero mechanical jerk.
- If the user scrolls backward toward the pool, the door reverses and closes flush into its frame.

---

## 7. Camera Verification Metrics for M6 & M7

When implementing the camera rigs in M6 (Exterior) and M7 (Interior), the following tests must be satisfied:
1. **Zero Frustum Wall Penetration:** Camera near plane ($0.1\text{m}$) must never clip through the pivot door, corridor glass, or balustrades.
2. **Horizon Stability:** Camera roll must remain exactly $0^\circ$ along the entire path; the architectural verticals must stay strictly upright.
3. **Smooth Delta Acceleration:** $\frac{d^2\mathbf{P}}{dt^2}$ must not exceed $4.5\text{m/s}^2$ to prevent user motion discomfort.
4. **Framing Accuracy:** Keyframe comparisons at $t = [0.0, 0.25, 0.55, 0.75, 1.0]$ must match the extracted reference frames in `asset/reference_frames/` within $5\%$ screen-space tolerance.
