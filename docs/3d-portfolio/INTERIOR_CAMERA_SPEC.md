# INTERIOR CAMERA SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Coordinate System:** Right-Handed Cartesian ($+X$ = East, $+Y$ = Up, $+Z$ = South)  
**Units:** Meters ($1.0 \text{ unit} = 1.0 \text{ meter}$)  
**Reference Video Range:** Frames 108 – 200 (4.50s – 8.33s)

---

## 1. Master Camera Rig Architecture

The interior camera rig in `CameraRig.ts` encapsulates four decoupled spatial components:

```text
+--------------------------------------------------------------------------+
|                            MASTER CAMERA RIG                             |
+--------------------------------------------------------------------------+
  1. Position:      P(t) in R^3  - Dolly movement with exponential damping
  2. Look Target:   L(t) in R^3  - Independent focal target with separate damping
  3. Orientation:   Q(t) in SO(3)- Strict Level-Horizon Look-At matrix (0 deg roll)
  4. Lens FOV:      F(t) in R    - Optical focal length damping (24mm to 40mm)
```

By decoupling Position from the Look Target, the camera can execute tracking moves along the corridor axis while the visual framing pans smoothly to reveal artwork, glass workspaces, or structural features.

---

## 2. Architectural Camera Height & Eye-Level Standards

Interior spaces require rigorous camera height discipline to maintain architectural believability:
- **Finished Floor Level (FFL):** $Y = 0.00\text{m}$.
- **Standard Standing Eye-Level:** $Y = 1.60\text{m}$ (representing a $1.72\text{m} - 1.75\text{m}$ human observer).
- **Allowed Vertical Variation:** $\pm 0.05\text{m}$ ($1.58\text{m} - 1.62\text{m}$) across thresholds and transitions.
- **Corridor Ceiling Elevation:** $Y = +3.40\text{m}$ (providing $1.80\text{m}$ head clearance).
- **Atrium Ceiling Elevation:** $Y = +6.80\text{m}$ (providing $5.20\text{m}$ vertical volume).
- **Safety Boundary Ground Clearance:** $Y \ge 1.45\text{m}$ strictly enforced in `CameraRig.ts`.

---

## 3. Optical Field of View (FOV) & Lens Specification

Wide-angle distortion undermines modernist architectural proportions. The interior lens profile is calibrated to full-frame optical equivalents:

| Journey Stage | Horizontal FOV | 35mm Equiv Focal Length | Architectural Intent |
| :--- | :--- | :--- | :--- |
| **Door Threshold** | $56.0^\circ$ | $\approx 28\text{mm}$ | Frames walnut door jambs and deep vestibule corridor |
| **Foyer Vestibule** | $57.0^\circ$ | $\approx 27\text{mm}$ | Captures fluted wall and floating staircase base |
| **Foyer Settle** | $58.0^\circ$ | $\approx 26\text{mm}$ | Intimate framing of travertine typography plinth |
| **Corridor Axis** | $58.0^\circ$ | $\approx 26\text{mm}$ | Expansive one-point perspective down longitudinal axis |
| **Workspace Reveal** | $60.0^\circ$ | $\approx 24\text{mm}$ | Captures lateral width of glass office and dual iMac desks |
| **Atrium Emergence** | $56.0^\circ$ | $\approx 28\text{mm}$ | Compresses perspective to accentuate double-height volume |
| **Atrium Core / Vista** | $54.0^\circ$ | $\approx 30\text{mm}$ | Monumental framing of central plinth and mountain horizon |

---

## 4. Decoupled Look-Target Trajectory

The camera position tracks along the safe circulation axis, while the look target navigates the architectural focal points:

```text
[ Camera Position Path ]            [ Look Target Path ]
Z = +2.20m, X =  0.00m    ───────>  Z =  -6.00m, X =  0.00m (Corridor Vanishing Point)
Z = -0.60m, X = +0.10m    ───────>  Z =  -5.00m, X = +0.40m (Vestibule Center)
Z = -1.80m, X = +0.20m    ───────>  Z =  -4.20m, X = +1.60m (Fluted Walnut Wall & Stair)
Z = -3.80m, X = +0.10m    ───────>  Z = -10.00m, X =  0.00m (Corridor Longitudinal Axis)
Z = -6.00m, X =  0.00m    ───────>  Z = -10.50m, X = -0.60m (Corridor & Left Office Glass)
Z = -7.80m, X = -0.35m    ───────>  Z =  -8.50m, X = -3.20m (Executive Desk & iMac Screens)
Z = -10.20m, X = 0.00m    ───────>  Z = -15.00m, X =  0.00m (Double-Height Atrium Center)
Z = -14.50m, X = 0.00m    ───────>  Z = -19.50m, X =  0.00m (Exhibition Plinth & Mountain Vista)
```

---

## 5. Damping Dynamics & Physical Inertia

Camera updates adhere to exponential decay formulas ensuring 60–120Hz frame-rate independence:

$$\mathbf{x}(t) = \text{Lerp}(\mathbf{x}(t-1), \mathbf{x}_{\text{target}}, 1.0 - e^{-\lambda \Delta t})$$

- **Position Lerp Rate ($\lambda_{\text{pos}} = 4.8\text{ s}^{-1}$):** Heavy, deliberate camera dolly weight preventing erratic jumps.
- **Target Lerp Rate ($\lambda_{\text{target}} = 5.8\text{ s}^{-1}$):** Fluid reframing with zero mechanical snapping.
- **FOV Lerp Rate ($\lambda_{\text{fov}} = 4.0\text{ s}^{-1}$):** Smooth optical zoom compensation.
- **Scroll Inertia Rate ($\lambda_{\text{scroll}} = 6.2\text{ s}^{-1}$):** Smooth progress deceleration.

---

## 6. Strict Level-Horizon Matrix Calculation

To prevent nausea and preserve vertical architectural lines (columns, jambs, mullions):
- The camera roll angle is strictly enforced at $0.0^\circ$.
- Computed using `applyLevelHorizonLookAt` in `CameraInterpolation.ts`:
  1. Forward vector: $\mathbf{f} = \text{normalize}(\mathbf{L} - \mathbf{P})$.
  2. Right vector: $\mathbf{r} = \text{normalize}(\mathbf{f} \times [0, 1, 0])$.
  3. Orthogonal Up vector: $\mathbf{u} = \mathbf{r} \times \mathbf{f}$.
  4. Form rotational basis matrix and convert to quaternion.
