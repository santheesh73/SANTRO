# M9 IMPLEMENTATION SPECIFICATION — 360° ROOM EXPERIENCE & IMMERSIVE SPATIAL PRESENTATION

**Milestone:** M9 — 360° Room Experience & Immersive Spatial Presentation  
**Role:** Senior Cinematic Technical Director, Architectural Visualization Specialist, Interactive Camera Systems Engineer  
**Status:** COMPLETE & VALIDATED  
**Architecture Principle:** *The Architecture Pauses, the Visitor Observes, the Journey Naturally Resumes.*

---

## 1. Executive Summary

Milestone M9 introduces the **immersive room experience system** into the cinematic 3D architectural portfolio. Building directly upon the unified camera spline of M6/M7 and the 10-room spatial exhibition architecture of M8, M9 implements authored, museum-grade room inspections.

Crucially, **360° is NOT interpreted as continuous automated spinning or disorienting game-like orbit controls**. Instead, M9 implements a disciplined cinematic grammar:
- **Natural Arrival:** Velocity gradually decays as the camera enters the space.
- **Settle:** The camera stabilizes and frames the primary architectural composition.
- **Hero Reveal:** The primary visual volume and exhibition layout are deliberately unveiled.
- **Content Beats:** The camera performs controlled, slow, intentional inspections of physical exhibits (workstations, plinths, steles, tablets), holding long enough for visual readability.
- **Natural Resume:** The camera accelerates forward smoothly to rejoin the global circulation spine.
- **Zero Click Barrier:** The entire room inspection plays automatically with scroll or playback, while remaining 100% reversible upon backward scrolling.

---

## 2. System Hierarchy & Architecture

M9 extends the master camera system cleanly without creating a competing controller or replacing existing systems:

```text
Camera System
    │
    ├── Exterior Camera (M6 Establishing & Approach Spline)
    ├── Interior Camera (M7 Corridor Spine & Threshold Handoff)
    ├── Room Experience Controller (M9 Master Coordinator)
    │       ├── Arrival (Deceleration into space)
    │       ├── Settle (Orientation lock & composure)
    │       ├── Reveal (Architectural space overview)
    │       ├── Room Inspection (Controlled panoramic movement)
    │       ├── Content Beats (Physical exhibit observation)
    │       └── Exit / Resume (Seamless boundary handoff)
    │
    └── Global Journey Progress [0.0, 1.0]
```

### Module Separation:
- **`src/3d/rooms/experience/types.ts`**: Strict TypeScript contracts for states, anchors, beats, timelines, intensity tiers, and options.
- **`src/3d/rooms/experience/roomExperienceConfigs.ts`**: Authored data-driven configurations for all rooms, with Project Studio as the primary demonstration showcase.
- **`src/3d/rooms/experience/RoomTimeline.ts`**: Pure mathematical spline and keyframe evaluator (Centripetal Catmull-Rom, smoothstep cubic Hermite easing).
- **`src/3d/rooms/experience/RoomExperienceController.ts`**: Master singleton orchestrating active room lookup, local progress normalization, edge blending, and decoupled position/target evaluation.
- **`src/3d/rooms/experience/RoomExperienceDebug.tsx`**: Development-only 3D visualizer rendering inspection splines, sightline rays, and anchor markers.
- **`src/3d/camera/CameraController.tsx`**: Master camera loop delegating to `roomExperienceController.evaluate()` with 0-cascade ref-throttled store synchronization.

---

## 3. Core Room Experience State Machine

The room experience is governed by a deterministic, finite state machine:

```text
IDLE
  ↓ (Enter room progress segment)
ROOM_APPROACH
  ↓
ROOM_ARRIVAL (p: 0.00 → 0.10)
  ↓
ROOM_SETTLE (p: 0.10 → 0.20)
  ↓
ROOM_REVEAL (p: 0.20 → 0.25)
  ↓
CONTENT_BEATS / ROOM_INSPECTION (p: 0.25 → 0.94)
  ↓
ROOM_EXIT (p: 0.94 → 0.98)
  ↓
RESUME_JOURNEY (p: 0.98 → 1.00)
  ↓
IDLE (Handoff to next circulation segment)
```

Each state transition is deterministic and strictly derived from the normalized local progress $p_{\text{local}} \in [0.0, 1.0]$.

---

## 4. Room Timeline & Mathematical Spline Engine

### 4.1 Global Progress Normalization
Global journey progress $p_{\text{global}} \in [0.0, 1.0]$ maps continuously to the active room's authored segment $[p_{\text{start}}, p_{\text{end}}]$:

$$p_{\text{local}} = \frac{p_{\text{global}} - p_{\text{start}}}{p_{\text{end}} - p_{\text{start}}}$$

For Project Studio, $[p_{\text{start}}, p_{\text{end}}] = [0.74, 0.84]$.

### 4.2 Independent Spline Trajectories
Two independent Centripetal Catmull-Rom spline curves with tension $\tau = 0.5$ are computed per room:
1. $\mathbf{P}(u)$: Camera 3D World Position curve.
2. $\mathbf{T}(u)$: Camera 3D Look-At Target curve.

The parameter $u(p)$ is evaluated with cubic smoothstep easing within each keyframe segment, eliminating instantaneous velocity spikes.

### 4.3 Boundary Handoff Continuity & Seamless Chaining
Rather than artificially blending against disconnected corridor spine coordinates, the master interior journey is architected as an unbroken, continuous chain of authored room experiences where each room's arrival coordinates mathematically equal the previous room's exit coordinates ($< 0.001\text{m}$ error):
- Entrance threshold handoff ($p = 0.50$): $[0.0, 1.60, 2.2] \to$ Foyer Arrival $[0.0, 1.60, 2.2]$
- Foyer Exit ($p = 0.62$): $[0.10, 1.60, -3.8] \to$ Gallery Arrival $[0.10, 1.60, -3.8]$
- Gallery Exit ($p = 0.74$): $[0.0, 1.60, -10.2] \to$ Project Studio Arrival $[0.0, 1.60, -10.2]$
- Project Studio Exit ($p = 0.84$): $[-0.50, 1.60, -11.5] \to$ Engineering Lab Arrival $[-0.50, 1.60, -11.5]$
- Engineering Lab Exit ($p = 0.90$): $[0.0, 1.60, -13.5] \to$ Archive Arrival $[0.0, 1.60, -13.5]$
- Archive Exit ($p = 0.94$): $[0.0, 1.60, -16.5] \to$ Study Arrival $[0.0, 1.60, -16.5]$
- Study Exit ($p = 0.97$): $[0.0, 1.60, -17.0] \to$ Contact Arrival $[0.0, 1.60, -17.0]$
- Contact Exit ($p = 0.995$): $[0.0, 1.60, -18.2] \to$ Terrace Arrival $[0.0, 1.60, -18.2]$

This guarantees exact $C^0$ positional continuity ($0.000\text{m}$ error), look-target continuity ($0.000\text{m}$ error), and FOV continuity throughout the entire portfolio with zero camera jumping.

---

## 5. Camera Movement & Cinematography Rules

1. **Slow & Intentional:** Room inspection is 40% slower than corridor travel.
2. **Stable Level-Horizon:** Camera roll is locked strictly at $0^\circ$ via `applyLevelHorizonLookAt`.
3. **Believable Height:** Camera height remains strictly at human eye level ($1.60\text{m} \pm 0.05\text{m}$).
4. **Independent Look Target Decoupling:** The camera position dollies smoothly along safe central pathways while the look-target independently pans and tilts to frame exhibits.
5. **No Game-Like Movement:** No free mouse look, no uncontrolled orbits, no camera shake, and no head-bob.
6. **Anti-Motion-Sickness Yaw Limit:** Maximum angular rotation rate is strictly capped at $\le 12^\circ$ per 1% timeline step.

---

## 6. Project Studio Showcase Implementation

Project Studio ($Z: -10.2\text{m}$ to $-18.5\text{m}$) serves as the primary validation showcase for M9, inspecting the 7 verified projects across 7 authored beats:

| Beat ID | Progress | Target | Exhibit Type | Framing Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `ps-beat-01-orion` | 0.22 – 0.35 | `[-2.60, 1.35, -12.2]` | Primary Featured | ORION On-Device AI Monolith & WebGPU metrics |
| `ps-beat-02-supporting-west` | 0.35 – 0.47 | `[-3.90, 1.30, -13.6]` | Supporting Compact | PRYSM GPU Shaders & BHOOMI Satellite Crop ML |
| `ps-beat-03-hearttune` | 0.47 – 0.59 | `[-2.60, 1.35, -14.2]` | Selected Standard | HEARTTUNE Emotion Audio ML & PWA buffers |
| `ps-beat-04-cross-atrium` | 0.59 – 0.70 | `[2.20, 1.45, -13.2]` | Architectural Volume | Atrium double-height balance & East plinth lineup |
| `ps-beat-05-nisf-minchal` | 0.70 – 0.81 | `[2.60, 1.35, -12.2]` | Selected & Supporting | NISF Vector Critique & MINCHAL Energy OCR |
| `ps-beat-06-ahal-ai` | 0.81 – 0.90 | `[2.60, 1.35, -14.2]` | Selected Standard | AHAL AI Code Intelligence & AST dependency graph |
| `ps-beat-07-finale` | 0.90 – 0.94 | `[-3.20, 1.40, -10.5]` | Architectural Culmination | Symmetrical axis framing plinth array & lab transition |

---

## 7. Performance & Optimization Architecture

- **Zero Garbage Collection:** Scratch vectors (`_spinePos`, `_spineTarget`, `_roomPos`, `_roomTarget`) are statically allocated at module scope.
- **Throttled Store Synchronization:** `CameraController` uses internal mutable refs (`lastRoomStateRef`, `lastBeatIdRef`, `lastLocalProgressRef`) to eliminate 60Hz React re-render cascades. Zustand updates occur only on discrete state/beat transitions or 1% progress steps.
- **Precomputed Curves:** Catmull-Rom spline curves are pre-instantiated once at initialization time.
- **Tree-Shaken Debugger:** `RoomExperienceDebug` is rendered conditionally and unregisters all GPU line geometries and materials upon unmount.
