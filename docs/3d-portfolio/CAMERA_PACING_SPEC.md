# CAMERA PACING SPECIFICATION

**Milestone:** M7 — Interior Cinematic Camera Journey  
**Cinematic Principle:** Rhythmic Architectural Pacing (Varied Temporal Cadence)  
**Reference Video Rhythm:** Shot 01 (1.46s) $\to$ Shot 02 (4.04s) $\to$ Shot 03 (1.50s) $\to$ Shot 04 (3.00s)

---

## 1. Pacing Hierarchy & Cinematic Rhythm

A cinematic walkthrough must never move at a monotonous, constant velocity. Moving at uniform speed feels like an automated robotic flythrough rather than an intentional film directed by an architectural visualizer.

M7 establishes a 6-stage **Cinematic Pacing Hierarchy**:

```text
EXTERIOR AERIAL ESTABLISHING ──> Moderate crane glide (establishing volume)
         ↓
POOL TERRACE APPROACH        ──> Steady human tracking (capturing reflection)
         ↓
ENTRANCE PORTAL              ──> Deliberate deceleration (door mechanical event)
         ↓
DOOR THRESHOLD CROSSING      ──> Slow, intimate transition
         ↓
FOYER VESTIBULE              ──> Settle & hold (registering walnut wall & stair)
         ↓
CORRIDOR TRAVEL              ──> Steady, purposeful tracking
         ↓
GLASS WORKSPACE REVEAL       ──> Deceleration & lateral pan (discovery)
         ↓
ATRIUM EMERGENCE             ──> Gradual deceleration & expansion
         ↓
ATRIUM PLINTH & VISTA        ──> Complete gentle ease-out to resting hold
```

---

## 2. Velocity & Spatial Progress Distribution

In parametric spline space $p \in [0.0, 1.0]$, progress is mapped so that equal scroll deltas produce variable physical distance and dwell times:

| Stage | Progress Interval $\Delta p$ | Spatial Distance $\Delta s$ | Relative Velocity Ratio | Cinematic Feel |
| :--- | :--- | :--- | :--- | :--- |
| **Exterior Aerial Crane** | $0.00 \to 0.20$ | $\approx 11.2\text{m}$ | $1.20\times$ | Dynamic aerial descent |
| **Terrace Tracking** | $0.20 \to 0.40$ | $\approx 8.8\text{m}$ | $1.00\times$ | Steady human walking pace |
| **Door Approach & Handoff**| $0.40 \to 0.53$ | $\approx 4.3\text{m}$ | $0.65\times$ | Intimate threshold encounter |
| **Foyer Settle & Hold** | $0.53 \to 0.66$ | $\approx 2.4\text{m}$ | $0.40\times$ | Architectural appreciation pause |
| **Corridor Axis Travel** | $0.66 \to 0.80$ | $\approx 4.6\text{m}$ | $0.85\times$ | Confident gallery stride |
| **Workspace Reveal** | $0.80 \to 0.87$ | $\approx 2.1\text{m}$ | $0.50\times$ | Inquisitive lateral glance |
| **Atrium Core Climax** | $0.87 \to 1.00$ | $\approx 4.4\text{m}$ | $0.45\times \to 0.0\times$ | Reverent arrival and vista hold |

---

## 3. Acceleration & Deceleration Profiles

To prevent simulator sickness and ensure optical comfort:
- **Maximum Positional Acceleration:** $|\mathbf{a}| \le 3.5\text{m/s}^2$.
- **Maximum Angular Velocity:** $|\omega| \le 30^\circ/\text{s}$ during lateral reframing.
- **Micro-Movement Breathing:** Imperceptible continuous oscillation ($\pm 6\text{mm}$ at $0.25\text{Hz}$) simulates organic human camera operator stability without handheld camera shake.

---

## 4. Reversible Pacing Dynamics

When the user scrolls backward:
- Settle zones (Foyer Hold, Workspace Reveal, Atrium Plinth) act as natural detents.
- The camera retraces the exact same velocity profile in reverse.
- Zero snap, zero overshoot, zero reverse mechanical jerk.
