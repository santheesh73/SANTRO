# EXTERIOR TO INTERIOR TRANSITION SPECIFICATION

**Milestones:** M6 (Exterior) $\to$ M7 (Interior)  
**Primary Reference:** `asset/architectural_reference.mp4` (Frames 095–133)  
**Handoff Point:** Unified Progress $p = 0.50$ (Door Threshold, $Z = +2.20\text{m}$)

---

## 1. The Threshold Problem in Architectural 3D

In interactive WebGL portfolios, moving from an outdoor landscape into an interior structure frequently suffers from four common technical regressions:
1. **Camera Reset / Teleportation:** A sudden jump in position or look direction as a new room or page view initializes.
2. **Exposure Shock / Crushed Shadows:** Bright exterior sunlight suddenly turns interior walls pitch black, or interior exposure blows out exterior windows.
3. **Geometry Clipping:** The camera near plane clips through the door leaf or door frame jambs.
4. **Velocity Jerk:** Momentum resets to zero at the threshold, destroying the kinetic feeling of walking through a house.

Milestone M7 solves all four issues systematically.

---

## 2. Mathematical Handoff Verification ($p = 0.50$)

The boundary handoff is evaluated between the final exterior waypoint and the first interior waypoint:

```text
========================================================================================
                      EXTERIOR -> INTERIOR HANDOFF METRICS
========================================================================================

Parameter                    Exterior (M6 wp-05)     Interior (M7 int-wp-01)   Delta / Error
────────────────────────────────────────────────────────────────────────────────────────
Position X                   0.0000 m                0.0000 m                  0.0000 m
Position Y                   1.6000 m                1.6000 m                  0.0000 m
Position Z                  +2.2000 m               +2.2000 m                  0.0000 m
Target X                     0.0000 m                0.0000 m                  0.0000 m
Target Y                     1.6000 m                1.6000 m                  0.0000 m
Target Z                    -6.0000 m               -6.0000 m                  0.0000 m
Optical FOV                 56.0000 deg             56.0000 deg                0.0000 deg
Camera Roll                  0.0000 deg              0.0000 deg                0.0000 deg
Door Angle                 -85.0000 deg            -85.0000 deg                0.0000 deg
────────────────────────────────────────────────────────────────────────────────────────
```

Because both splines evaluate to identical spatial coordinates and orientation quaternions at $p = 0.50$, the transition is mathematically indistinguishable from a single continuous curve.

---

## 3. Pivot Door Kinematic Synchronization

The front entrance walnut pivot door rotation is tied to the camera's spatial proximity:
- **Trigger Range:** $Z \in [+4.50\text{m}, +2.20\text{m}]$ (corresponding to unified $p \in [0.44, 0.50]$).
- **Hinge Pivot Axis:** Located at $X = -0.65\text{m}, Y = 0.00\text{m}, Z = 0.00\text{m}$.
- **Kinematic Formula:**
  $$\theta(Z) = \text{smoothstep}(4.5, 2.2, Z) \times (-1.484\text{ rad}) \quad (\approx -85^\circ)$$
- When the camera crosses $Z = 2.20\text{m}$, the door is fully open at $-85^\circ$.
- As the camera advances into the foyer ($Z < 2.20\text{m}$ down to $-14.50\text{m}$), the door remains stably open.
- If the visitor scrolls backward toward the pool, the door smoothly swings closed and latches flush into its frame.

---

## 4. Ocular Iris Exposure Adaptation

Human eyes adapt gradually when stepping from bright outdoor sunlight into an interior room:
- **Adaptation Zone:** Unified progress $p \in [0.46, 0.58]$ ($Z \in [+2.8\text{m}, -1.8\text{m}]$).
- **Smooth Transition Factor:**
  $$\alpha(p) = \text{smoothstep}(0.46, 0.58, p)$$
- **Renderer Exposure:**
  $$\text{Exposure}(p) = \text{Exposure}_{\text{preset}} + 0.10 \times \alpha(p)$$
- **Direct Sunlight Modulation:**
  $$I_{\text{sun}}(p) = I_{\text{sun, preset}} \times (1.0 - 0.20 \times \alpha(p))$$
- **Interior Practicals Boost:**
  $$I_{\text{interior}}(p) = I_{\text{interior, preset}} \times (1.0 + 0.15 \times \alpha(p))$$

### Visual Result:
Exterior windows remain crisp and readable (not blown out), while interior honed travertine, fluted walnut battens, and desk surfaces remain luminous and warm without black shadow crushing.

---

## 5. Bidirectional Momentum & Velocity Continuity

The user virtual scroll input is accumulated into `targetProgress` and damped into `currentProgressRef.current` via:

$$p(t) = \text{Lerp}(p(t-1), p_{\text{target}}, 1.0 - e^{-6.2 \Delta t})$$

Because $p(t)$ is continuous and differentiable:
- Instantaneous camera velocity $\mathbf{v}(t) = \frac{d\mathbf{P}}{dt} = \frac{d\mathbf{P}}{dp} \frac{dp}{dt}$ has no step discontinuites across the threshold.
- Reversing scroll smoothly reverses $\frac{dp}{dt}$ and retraces the path out through the doorway.
