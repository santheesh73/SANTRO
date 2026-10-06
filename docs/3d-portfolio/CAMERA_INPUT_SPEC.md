# CAMERA INPUT SPECIFICATION: NORMALIZATION & SMOOTHING

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Hook:** `src/3d/camera/useCameraInput.ts`  
**Configuration:** `CAMERA_CONFIG.input` in `src/3d/camera/CameraConfig.ts`

---

## 1. Input Architecture Overview

The camera journey is driven by virtual normalized progress $s \in [0.0, 1.0]$. 
Crucially:
> **The system never maps raw input deltas directly to `camera.position`.**

Directly adding wheel deltas to camera position creates jumpy, jarring, and non-cinematic movements. Instead, multi-device physical inputs are normalized into scalar progression deltas, accumulated into a damped `targetProgress` variable, and then smoothly evaluated through 3D splines.

```text
  [ Raw Mouse Wheel ] ──> Normalize deltaMode (Pixel vs Line vs Page) ──┐
  [ Mobile Touch ]    ──> Compute touch delta (Y_prev - Y_curr)      ───┼──> Δs
  [ Keyboard Keys ]   ──> Apply fixed discrete step (+/- 0.04)         ──┤
                                                                         │
                                                                         ▼
                                                     targetProgress = Clamp(targetProgress + Δs, 0.0, 1.0)
                                                                         │
                                                                         ▼
                                                     smoothedProgress = Lerp(smoothedProgress, targetProgress, 1 - exp(-6.2 * dt))
                                                                         │
                                                                         ▼
                                                     P(s), L(s), F(s) Spline Evaluation
```

---

## 2. Input Device Normalization

### 2.1 Mouse Wheel & Trackpad
- **Event:** `window.addEventListener('wheel', handleWheel, { passive: false })`
- **Delta Mode Handling:**
  - `deltaMode === 0` (Pixel delta, standard trackpad/smooth mouse): $\text{delta} = \Delta Y$
  - `deltaMode === 1` (Line delta, notched wheel): $\text{delta} = \Delta Y \times 24$
  - `deltaMode === 2` (Page delta): $\text{delta} = \Delta Y \times 600$
- **Progress Multiplier:**
  $$\Delta s = \text{delta} \times 0.00065$$
- **UI Protection:** Ignores wheel events originating inside interactive HUD buttons, sliders, or select controls (`target.closest('button, input, select')`).

### 2.2 Mobile Touch & Gesture
- **Events:** `touchstart`, `touchmove`, `touchend`
- **Calculation:** Single-finger swipe tracking:
  $$\Delta Y = Y_{\text{start}} - Y_{\text{curr}}$$
  $$\Delta s = \Delta Y \times 0.0018$$
- Continuous drag feels natural and matches standard mobile scroll physics.

### 2.3 Keyboard Controls
- **Keys:**
  - `ArrowDown`, `PageDown`: $+0.04$ progress (forward glide)
  - `ArrowUp`, `PageUp`: $-0.04$ progress (reverse glide)
  - `Space`: $+0.08$ progress (double step forward; `Shift + Space` steps backward)
  - `Home`: Instantly resets `targetProgress` to $0.00$
  - `End`: Snaps `targetProgress` to $1.00$ (threshold framing)

---

## 3. Physics Smoothing & Momentum Decay

Virtual progress updates employ exponential decay damping inside `useFrame`:
$$s(t) = \text{Lerp}\left(s(t-1), s_{\text{target}}, 1.0 - e^{-\lambda_{\text{inertia}} \Delta t}\right)$$
- $\lambda_{\text{inertia}} = 6.2\text{ s}^{-1}$
- Preserves a short, elegant momentum glide after the user releases the trackpad or stops scrolling, simulating the heavy inertia of a physical mechanical camera dolly.

---

## 4. Boundary Enforcement

To prevent camera overshoot or infinite runaway:
- Target progress is strictly clamped to $[0.000, 1.000]$.
- When scrolling backward at $s = 0.000$, progress remains pinned at $0.000$.
- When reaching the entrance threshold at $s = 1.000$, progression stops cleanly in front of the open pivot door without penetrating interior walls prematurely.

---

## 5. Accessibility (`prefers-reduced-motion`)

The hook automatically queries `window.matchMedia('(prefers-reduced-motion: reduce)')`:
- When reduced motion is detected:
  - Input sensitivity is halved.
  - Camera transitions between validation shots use smooth fades rather than rapid dolly acceleration.
  - Micro-movement breathing is disabled.
