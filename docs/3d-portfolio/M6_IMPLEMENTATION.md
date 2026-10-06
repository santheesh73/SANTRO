# M6 IMPLEMENTATION: EXTERIOR CINEMATIC CAMERA JOURNEY

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Status:** COMPLETE & VERIFIED  
**System Architecture:** Decoupled Architectural Camera Rig & Normalized Spline Progression  
**Coordinate System:** Right-Handed Cartesian ($+X$ = East, $+Y$ = Up, $+Z$ = South)  
**Primary Reference:** `asset/architectural_reference.mp4` (Frames 000–108, Shot 01 & Shot 02)

---

## 1. Architectural Overview

Milestone M6 transforms the static 3D architectural house into a **cinematic exterior camera experience** directly inspired by the uploaded reference film. 

Rather than treating the 3D model as an arbitrary web canvas object with naive scroll-to-zoom controls, M6 establishes a specialized **Architectural Cinematography System** where:
> **The camera moves because the architecture gives it a reason to move.**

The exterior journey guides the visitor from an elevated aerial drone perspective, glides down across the stepped concrete plinth, tracks along the honed travertine pool terrace at true human eye-level ($1.60\text{m} - 1.65\text{m}$), frames the monumental walnut pivot door leaf, and halts directly at the open entrance threshold ready for M7 interior traversal.

```text
========================================================================================
                              M6 RUNTIME EXECUTION PIPELINE
========================================================================================

  [ Multi-Device Input ]
  • Mouse Wheel (pixel / line normalized)
  • Trackpad pinch / continuous scroll
  • Touch Swipe (iOS / Android)
  • Keyboard (Arrows / Page / Space)
          │
          ▼
  [ CameraInput (useCameraInput.ts) ]
  • Accumulates into targetProgress [0.0, 1.0]
  • Clamps to strict journey boundaries
  • Detects prefers-reduced-motion
          │
          ▼
  [ useFrame Render Loop (CameraController.tsx) ]
  • Exponential momentum decay damping:
      p(t) = Lerp(p(t-1), targetProgress, 1 - exp(-6.2 * dt))
  • Evaluates 3D Centripetal Catmull-Rom Splines:
      Position: P(p) via exteriorPositionSpline
      Target:   L(p) via exteriorTargetSpline
      FOV:      F(p) via piecewise cubic Hermite curve
  • Responsive optical modifiers (Mobile / Tablet aspect ratio adaptation)
  • Micro-movement stabilization breathing (+/- 6mm, 0.25 Hz)
  • Spatial boundary safety clamping (Y >= 1.45m ground clearance)
          │
          ├──> Independent Position Damping: camera.position.lerp(P(p), 1 - exp(-4.8 * dt))
          ├──> Independent Target Damping:   smoothedTarget.lerp(L(p), 1 - exp(-5.8 * dt))
          ├──> Strict Level-Horizon LookAt:  applyLevelHorizonLookAt (Up vector = [0, 1, 0])
          └──> Optical Lens FOV Damping:     camera.fov.lerp(F(p), 1 - exp(-4.0 * dt))
          │
          ▼
  [ Proximity Subsystems ]
  ├──> DoorInteractionController:
  │      At Z in [4.5m, 2.2m], rotates GEO_Door_Pivot_Leaf from 0 to -85 deg
  │
  ├──> State Machine Sync:
  │      p in [0.00, 0.18) -> EXTERIOR_ESTABLISHING
  │      p in [0.18, 0.42) -> EXTERIOR_APPROACH
  │      p in [0.42, 0.68) -> FACADE_REVEAL
  │      p in [0.68, 0.92) -> ENTRANCE_APPROACH
  │      p in [0.92, 1.00] -> DOOR_TRANSITION
  │
  └──> ViewportHUD: Real-time progress scrubber, state badge, 5 validation shots
```

---

## 2. Component Architecture

The camera system is strictly organized into 10 decoupled modules under `src/3d/camera/`:

| Module | Responsibility |
| :--- | :--- |
| `types.ts` | Type definitions for states, modes, waypoints, configs, and boundaries |
| `CameraConfig.ts` | Calibrated physical damping rates, optical limits, input sensitivities, and bounds |
| `CameraInterpolation.ts` | Zero-allocation mathematical utilities, Catmull-Rom evaluation, level-horizon matrix calculations |
| `exteriorCameraPath.ts` | Centralized authored 3D spline trajectory connecting 7 calibrated waypoints |
| `CameraTargets.ts` | Centralized architectural look-target definitions (house mass, pool, door portal, gallery axis) |
| `CameraValidationShots.ts` | 5 fixed reference validation shots corresponding to M6 §32 |
| `useCameraInput.ts` | Multi-device virtual scroll listener with momentum physics and boundary limits |
| `DoorInteractionController.tsx` | High-frequency 3D door rotation controller tied to camera $Z$ proximity |
| `CameraDebug.tsx` | Development-only 3D spline line and waypoint visualizer |
| `CameraController.tsx` | Master coordinator orchestrating spline follow, inspect orbit, and validation transitions |

---

## 3. High-Performance / Zero-Allocation Design

Camera calculations execute 60–120 times per second inside the `@react-three/fiber` `useFrame` render loop. To prevent browser garbage collection pauses (GC jank), the system adheres to strict allocation-free principles:

1. **Static Reusable Math Primitives:**
   All temporary vectors (`_desiredPos`, `_desiredTarget`, `_smoothedTarget`, `_microOffset`, `_forward`, `_right`, `_rotMatrix`, `_targetQuat`) are instantiated once at module scope. Zero objects are instantiated inside `useFrame`.
2. **Decoupled React State:**
   Frame-by-frame progress updates are held in mutable `useRef<number>` references. Zustand store updates for high-frequency progress (`setCinematicProgress`) are called without triggering re-renders of the root canvas scene graph.
3. **State Change Debouncing:**
   The camera state machine (`getStateAtProgress`) checks if the state string has transitioned before updating store state, eliminating redundant re-renders.

---

## 4. R3F Scene Integration

In `src/3d/scene/ArchitecturalScene.tsx`, the camera system is cleanly integrated:

```tsx
{/* 1. Architectural Perspective Camera */}
<PerspectiveCamera />

{/* 2. Damped Inspection Camera Controls with Reference View Transitions */}
<CameraController enableControls={enableControls} />

{/* 2b. Dynamic Entrance Pivot Door Synchronization */}
<DoorInteractionController />

{/* 2c. Camera Spline & Waypoints Debug Visualizer */}
<CameraDebug />
```

---

## 5. Verification Results

All modules pass automated and mathematical validation via `scripts/verify-camera-system.mjs`:
- Ground clearance check: Minimum spline elevation is $1.59\text{m}$ (well above safety boundary $1.45\text{m}$).
- Monotonic progression: All 7 waypoints progress monotonically from $0.00$ to $1.00$.
- Lens validation: All focal lengths remain between $48^\circ$ and $56^\circ$ ($40\text{mm}$ to $28\text{mm}$ full-frame equivalent).
- Door mechanics: Smooth cubic Hermite rotation from $0.0^\circ \to -85.0^\circ$ between $Z = 4.5\text{m}$ and $Z = 2.2\text{m}$.
