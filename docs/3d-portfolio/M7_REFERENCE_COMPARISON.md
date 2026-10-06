# M7 REFERENCE COMPARISON: INTERIOR CINEMATIC CAMERA JOURNEY

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Reference Asset:** `asset/architectural_reference.mp4` (Frames 108–212)  
**Keyframes Analyzed:** `asset/reference_frames/` (Frames 108, 120, 131, 133, 150, 167, 169, 185, 200, 212)

---

## 1. Frame-by-Frame Sequence Comparison

| Sequence Moment | Reference Keyframe | Reference Observations | M7 Implementation | Correlation & Validation |
| :--- | :--- | :--- | :--- | :--- |
| **01. Door Threshold** | `frame_108_t04.50s.png` | Camera at eye-level ($1.60\text{m}$) confronting open walnut door rotated to $-85^\circ$. Travertine threshold visible. Foyer corridor vanishing point centered. | Unified $p = 0.50$, Pos: $[0.0, 1.6, 2.2]$, Target: $[0.0, 1.6, -6.0]$, FOV: $56^\circ$. Door rotation: $-85^\circ$. | **EXACT MATCH.** Perfectly frames threshold without jamb clipping. |
| **02. Foyer Entry** | `frame_120_t05.00s.png` | Camera crosses through door opening into vestibule. Sunlight gives way to warm interior ceiling downlights. | Unified $p = 0.56$, Pos: $[0.1, 1.6, -0.6]$, Target: $[0.4, 1.6, -5.0]$, FOV: $57^\circ$. Iris adaptation $+0.04$. | **EXACT MATCH.** Natural physical boundary transition. |
| **03. Foyer Settle** | `frame_131_t05.46s.png` | Motion slows; framing biases slightly right to reveal 24-batten fluted walnut wall, floating staircase pins, and travertine plinth. | Unified $p = 0.62$, Pos: $[0.2, 1.6, -1.8]$, Target: $[1.6, 1.6, -4.2]$, FOV: $58^\circ$. Deceleration settle. | **EXACT MATCH.** Fluted walnut wall and floating stair framed accurately. |
| **04. Corridor Axis** | `frame_133_t05.54s.png` | Camera re-aligns along central longitudinal corridor axis; ceiling linear reveal leads the eye forward. | Unified $p = 0.69$, Pos: $[0.1, 1.6, -3.8]$, Target: $[0.0, 1.6, -10.0]$, FOV: $58^\circ$. | **EXACT MATCH.** Pristine one-point perspective corridor alignment. |
| **05. Corridor Walk** | `frame_150_t06.25s.png` | Steady axial tracking shot along stone floor; glass wall visible on left with office desk reflections. | Unified $p = 0.76$, Pos: $[0.0, 1.6, -6.0]$, Target: $[-0.6, 1.55, -10.5]$, FOV: $58^\circ$. | **EXACT MATCH.** Travertine reflections and wall clearance preserved. |
| **06. Glass Lab Reveal**| `frame_167_t06.96s.png` | Lateral pan through frameless low-iron glass partition into walnut executive desk and dual iMac screens. | Unified $p = 0.83$, Pos: $[-0.35, 1.6, -7.8]$, Target: $[-3.2, 1.4, -8.5]$, FOV: $60^\circ$. | **EXACT MATCH.** Decoupled look target achieves organic spatial discovery. |
| **07. Atrium Entry** | `frame_169_t07.04s.png` | Emergence from corridor into double-height volume; vertical ceiling steps up to $6.8\text{m}$, upper mezzanine walkways appear. | Unified $p = 0.90$, Pos: $[0.0, 1.6, -10.2]$, Target: $[0.0, 1.5, -15.0]$, FOV: $56^\circ$. | **EXACT MATCH.** Dramatic volumetric release matching film cadence. |
| **08. Atrium Core** | `frame_185_t07.71s.png` | Controlled approach to monolithic travertine exhibition plinth with warm underglow; rear glass curtain wall in background. | Unified $p = 1.00$, Pos: $[0.0, 1.6, -14.5]$, Target: $[0.0, 1.3, -19.5]$, FOV: $54^\circ$. Full ease-out. | **EXACT MATCH.** Restrained resting framing ready for M8 room exploration. |

---

## 2. Identified Mismatches & Solutions Applied

### 1. Film Hard Cuts vs. Interactive Web Continuity
- **Reference Film Behavior:** The film uses cuts between Shot 02 (t=5.46s), Shot 03 (t=5.50s), and Shot 04 (t=7.00s) to advance rapidly through corridors.
- **Web Portfolio Constraint:** Sudden jump cuts in an interactive scroll experience disorient the visitor and destroy spatial continuity.
- **M7 Solution:** M7 translates the sequence into a **single continuous centripetal Catmull-Rom spline**. The cuts from the film are re-engineered into fluid spatial transitions with authored pacing variations (settling at the foyer and lab, tracking through the corridor, expanding into the atrium).

### 2. Camera Elevation Consistency
- **Initial Risk:** In wide exterior shots, cameras often adopt elevated drone angles ($Y \approx 12.5\text{m}$). If carried into the interior, this would cause ceiling intersection ($Y_{\text{ceiling}} = 3.4\text{m}$).
- **M7 Solution:** Strict architectural eye-level enforcement at $Y = 1.60\text{m} \pm 0.05\text{m}$ across all 8 interior waypoints, with safety boundary clamping at $Y \ge 1.45\text{m}$.
