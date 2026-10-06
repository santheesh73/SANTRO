# M7 IMPLEMENTATION: INTERIOR CINEMATIC CAMERA JOURNEY

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Status:** COMPLETE & VERIFIED  
**System Architecture:** Unified Continuous Parametric Spline & Decoupled Architectural Camera Rig  
**Coordinate System:** Right-Handed Cartesian ($+X$ = East, $+Y$ = Up, $+Z$ = South)  
**Primary Reference:** `asset/architectural_reference.mp4` (Frames 108–212, Shot 02, Shot 03 & Shot 04)

---

## 1. Architectural Overview

Milestone M7 extends the architectural cinematography established in M6 into the interior of "The Portfolio House". 

The experience is engineered as a **single continuous architectural film**. The visitor never perceives a section break or camera teleportation; instead, they experience the tangible physical sensation of crossing the threshold into a bespoke modernist villa:

```text
========================================================================================
                          M6 -> M7 UNIFIED RUNTIME PIPELINE
========================================================================================

  [ Multi-Device Input Listener (useCameraInput.ts) ]
  • Mouse wheel, trackpad continuous scroll, touch swipe, keyboard arrows
  • Normalized progress parameter: p in [0.0, 1.0]
          │
          ▼
  [ CameraController.tsx Render Loop (useFrame) ]
  • Exponential progress inertia decay:
      p(t) = Lerp(p(t-1), targetProgress, 1 - exp(-6.2 * dt))
          │
          ├───────────────────────────────┬───────────────────────────────┐
          ▼                               ▼                               ▼
    [ p in [0.00, 0.50] ]           [ p = 0.50 HANDOFF ]            [ p in [0.50, 1.00] ]
    EXTERIOR CINEMATIC JOURNEY      DOOR THRESHOLD BOUNDARY         INTERIOR CINEMATIC JOURNEY
    • Aerial Establishing           • Position: [0.0, 1.6, 2.2]     • Door Threshold Passage
    • Descent Glide                 • Target:   [0.0, 1.6, -6.0]    • Foyer Vestibule Crossing
    • Pool Terrace Tracking         • FOV:      56 deg              • Walnut Feature Wall Settle
    • Portal Approach               • Door:     -85 deg (Fully Open)• Corridor Axial Travel
    • Door Open Proximity           • Discontinuity: 0.000m         • Glass Workspace Reveal
                                                                    • Double-Height Atrium Emergence
                                                                    • Travertine Plinth & Vista
          │                                                               │
          └───────────────────────────────┬───────────────────────────────┘
                                          ▼
  [ Master CameraRig (CameraRig.ts) ]
  • Independent Position Damping: camera.position.lerp(P(p), 1 - exp(-4.8 * dt))
  • Independent Target Damping:   smoothedTarget.lerp(L(p), 1 - exp(-5.8 * dt))
  • Strict Level-Horizon LookAt:  Zero roll, upright architectural verticals
  • Optical Lens FOV Damping:     camera.fov.lerp(F(p), 1 - exp(-4.0 * dt))
  • Spatial Boundary Clamping:    Y >= 1.45m ground clearance, Z >= -24.0m depth
          │
          ▼
  [ Subsystems Synchronization ]
  ├──> ToneMappingExposureController:
  │      p in [0.46, 0.58] ramps interiorFactor from 0.0 -> 1.0
  │      Applies ocular iris adaptation: +0.10 exposure compensation inside
  ├──> DoorInteractionController:
  │      Z in [4.5m, 2.2m] swings pivot door 0 -> -85 deg; remains stably open inside (Z <= 2.2m)
  ├──> State Machine Sync:
  │      Emits 8 interior spatial states to Zustand store without high-frequency re-renders
  └──> ViewportHUD: Real-time scrubber (0% Establishing -> 50% Threshold -> 100% Atrium)
```

---

## 2. Component Architecture & Code Organization

The interior camera system extends the modular architecture under `src/3d/camera/`:

| File | Role & Responsibility |
| :--- | :--- |
| `types.ts` | Type contracts for `InteriorCameraState`, unified `CameraJourneyState`, and waypoints |
| `CameraConfig.ts` | Spatial boundaries (`minZ: -24.0m`), interior exposure boost (`+0.12`), and transition thresholds |
| `interiorCameraPath.ts` | Master authored 8-waypoint interior spline trajectory with piecewise progress mapping |
| `CameraPath.ts` | Unified master trajectory coordinating seamless handoff between Exterior ($p \le 0.50$) and Interior ($p \ge 0.50$) |
| `CameraValidationShots.ts` | 9 Calibrated Validation Shots spanning Establishing to Double-Height Atrium Core |
| `CameraPresets.ts` | Unified registry of validation shots and reference camera views |
| `CameraRig.ts` | Controlled zero-allocation camera rig decoupling position, orientation, look target, and lens FOV |
| `CameraInterpolation.ts` | Zero-allocation mathematical utilities, Catmull-Rom evaluations, and level-horizon matrices |
| `CameraController.tsx` | Master coordinator driving CameraRig spline follow, orbit inspection, and throttled UI synchronization |
| `CameraDebug.tsx` | 3D debug visualizer rendering cyan exterior spline, amber interior spline, and waypoint markers |
| `DoorInteractionController.tsx` | Proximity controller maintaining -85° door rotation throughout interior navigation |

---

## 3. Seamless M6 Handoff Engineering

The transition between M6 (Exterior) and M7 (Interior) adheres to strict continuity mathematics:

1. **Zero Positional Discontinuity ($C^0$ Continuity):**
   - At $p = 0.50$ (normalized journey progress):
   - Exterior endpoint: $\mathbf{P}_{\text{ext}}(1.0) = [0.000\text{m}, 1.600\text{m}, 2.200\text{m}]$
   - Interior startpoint: $\mathbf{P}_{\text{int}}(0.0) = [0.000\text{m}, 1.600\text{m}, 2.200\text{m}]$
   - Position delta: $\Delta \mathbf{P} = 0.0000\text{m}$.

2. **Zero Target & Orientation Discontinuity:**
   - Exterior target: $\mathbf{T}_{\text{ext}}(1.0) = [0.000\text{m}, 1.600\text{m}, -6.000\text{m}]$
   - Interior target: $\mathbf{T}_{\text{int}}(0.0) = [0.000\text{m}, 1.600\text{m}, -6.000\text{m}]$
   - Target delta: $\Delta \mathbf{T} = 0.0000\text{m}$.
   - Horizon orientation: Zero roll ($0.0^\circ$) across both sides.

3. **Zero Optical Jump:**
   - Both trajectories specify exactly $56.0^\circ$ FOV ($28\text{mm}$ lens equivalent).

4. **Momentum & Velocity Continuity:**
   - The user's scroll input drives a single smoothed progress variable `currentProgressRef.current` with exponential inertia damping. When crossing $p = 0.50$, the velocity vector $\mathbf{v} = \frac{d\mathbf{P}}{dt}$ transitions smoothly without stutter or pause.

---

## 4. Architectural Occlusion & Reveal Techniques

M7 utilizes intentional architectural occlusion to build cinematic tension:
- **Door Frame Portal:** The jambs and header of the entrance portal frame the fluted walnut wall before revealing the broader volume.
- **Fluted Walnut Wall Settle:** At $Z = -1.8\text{m}$, the camera momentarily slows its forward push, allowing the eye to register the vertical rhythm of the 24 walnut battens and the floating travertine treads on the right.
- **Glass Lab Reveal:** Rather than rotating the camera body abruptly, the camera continues tracking down the corridor centerline ($X \approx -0.35\text{m}$ to $0.0\text{m}$) while the independent look-target pans gently into the executive desk and monitor setup, allowing the room to slide naturally into frame.
- **Double-Height Spatial Release:** Moving from the $3.4\text{m}$ ceiling height of the corridor into the $6.8\text{m}$ volume of the atrium creates an authentic architectural moment of expansion.
