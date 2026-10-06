# CAMERA SYSTEM SPECIFICATION: ARCHITECTURAL RIG & OPTICS

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Module:** `src/3d/camera/`  
**Coordinate Standard:** $+X$ = East, $+Y$ = Up (Elevation), $+Z$ = South (Toward pool plinth)  
**Units:** Meters ($1.0 = 1.0\text{m}$)

---

## 1. Architectural Camera Rig Philosophy

In architectural visualization cinematography, the camera must convey structural gravity, scale, and material presence. Handheld wobbly cameras, rapid drone rotations, or unmotivated zoom-ins shatter architectural credibility.

The SANTRO Camera Rig enforces 4 core architectural rules:

1. **Strict Level Horizon ($0.0^\circ$ Roll):**
   The camera's Up vector is strictly constrained to $[0.0, 1.0, 0.0]$. Vertical architectural elements (columns, mullions, jambs, and corner walls) remain strictly upright across all camera angles.
2. **Decoupled Look-Target Trajectory:**
   The camera position $\mathbf{P}(t)$ and the camera look-at target $\mathbf{L}(t)$ interpolate along independent 3D splines with separate damping coefficients. This simulates a professional camera operator deliberately reframing architectural masses as the dolly moves.
3. **Calibrated Architectural Focal Lengths:**
   Lenses are restricted to moderate architectural standards ($48^\circ - 56^\circ$ FOV, equivalent to $40\text{mm} - 28\text{mm}$ full-frame photography). Zero fisheye distortion or wide-angle wall warping.
4. **Physical Dollying Momentum:**
   Transitions use exponential decay damping with custom inertia coefficients ($\lambda = 4.8 - 6.2\text{ s}^{-1}$), giving the camera rig physical weight and smooth acceleration/deceleration.

---

## 2. Mathematical Rig Formulation

```text
CAMERARIG LOGICAL ARCHITECTURE:

       [ Authored Splines ]
        ├── P(s) : Position Curve (Centripetal Catmull-Rom)
        ├── L(s) : Target Curve   (Centripetal Catmull-Rom)
        └── F(s) : FOV Curve      (Piecewise Hermite)
                 │
                 ▼
       [ Frame Evaluator ]
        Position:  P_des = P(s) + MicroDrift(t)
        Target:    L_des = L(s)
        FOV:       F_des = F(s) + ResponsiveOffset(w)
                 │
                 ▼
       [ Independent Damping ]
        P_curr = Lerp(P_curr, P_des, 1 - exp(-lambda_pos * dt))
        L_curr = Lerp(L_curr, L_des, 1 - exp(-lambda_target * dt))
        F_curr = Lerp(F_curr, F_des, 1 - exp(-lambda_fov * dt))
                 │
                 ▼
       [ Level Horizon Look-At Matrix ]
        Forward = Normalize(L_curr - P_curr)
        Right   = Normalize(Cross(Forward, [0, 1, 0]))
        Up      = Normalize(Cross(Right, Forward))
        Matrix  = [ Right | Up | -Forward ]
        Camera.quaternion = QuaternionFromMatrix(Matrix)
```

---

## 3. Damping & Dynamic Parameters

All frame-rate-independent smoothing uses the exponential decay formula:
$$\text{factor} = 1.0 - e^{-\lambda \Delta t}$$

| Parameter | Coefficient $\lambda$ | Typical Half-Life | Purpose |
| :--- | :--- | :--- | :--- |
| `damping.position` | $4.8\text{ s}^{-1}$ | $\sim 144\text{ms}$ | Heavy dolly track momentum; prevents jerky start/stops |
| `damping.target` | $5.8\text{ s}^{-1}$ | $\sim 119\text{ms}$ | Smooth reframing of architectural focal points |
| `damping.fov` | $4.0\text{ s}^{-1}$ | $\sim 173\text{ms}$ | Subtle lens adjustments between wide aerial and threshold |
| `damping.scrollInertia` | $6.2\text{ s}^{-1}$ | $\sim 112\text{ms}$ | Virtual scroll momentum continuation after user input stops |
| `damping.transitionFast`| $10.0\text{ s}^{-1}$ | $\sim 69\text{ms}$ | Fast snapping when user clicks a specific Validation Shot |

---

## 4. Optical Lens & Field of View Strategy

| Trajectory Segment | Normalized Progress $s$ | Lens FOV | 35mm Equivalent | Optical Characteristics |
| :--- | :--- | :--- | :--- | :--- |
| **Shot 01: Establishing** | $0.00 \to 0.20$ | $48^\circ$ | $\sim 40\text{mm}$ | Flattens building volumes; monumental proportion |
| **Shot 01: Glide Descent** | $0.20 \to 0.40$ | $50^\circ \to 52^\circ$ | $\sim 36\text{mm}$ | Natural spatial opening as camera descends |
| **Shot 02: Pool Approach** | $0.40 \to 0.70$ | $54^\circ$ | $\sim 32\text{mm}$ | Reveals travertine pavers and pool reflection |
| **Shot 02: Entrance Portal**| $0.70 \to 0.90$ | $55^\circ$ | $\sim 30\text{mm}$ | Emphasizes door verticality and cantilever canopy |
| **Shot 02: Door Threshold** | $0.90 \to 1.00$ | $56^\circ$ | $\sim 28\text{mm}$ | Wide enough to capture foyer axis and side wall |

---

## 5. Micro-Movement Stabilization Breathing

To avoid a lifeless, synthetic 3D rendering feel without introducing immersion-breaking handheld camera shake, the rig incorporates subtle natural stabilization breathing:
$$\Delta\mathbf{P}_{\text{drift}}(t) = \begin{bmatrix} A \sin(2\pi f t) \\ 0.5 A \cos(1.4\pi f t) \\ A \sin(\pi f t) \end{bmatrix}$$
- Amplitude $A = 0.006\text{m}$ ($6\text{mm}$)
- Frequency $f = 0.25\text{ Hz}$ (4-second gentle cycle)
- Completely imperceptible as "shake", but provides an authentic physical presence in the viewport.

---

## 6. Spatial Safety & Boundary Constraints

To prevent clipping through 3D meshes, the camera enforces hard boundaries:
- **Minimum Elevation ($Y$):** Clamped to $\ge 1.45\text{m}$. On the terrace ($Y = 0.0\text{m}$), the authored path stays at $1.59\text{m} - 1.65\text{m}$, guaranteeing zero penetration into the travertine deck or water surface.
- **Near Clipping Plane:** Configured to $0.1\text{m}$ ($10\text{cm}$), preventing clipping when gliding through the pivot door opening.
- **Lateral Range ($X$):** Bounded within $[-8.0\text{m}, +8.0\text{m}]$.
- **Longitudinal Range ($Z$):** Bounded within $[+1.8\text{m}, +32.0\text{m}]$. Camera terminates cleanly at $Z = 2.2\text{m}$ directly on the entrance portal threshold.
