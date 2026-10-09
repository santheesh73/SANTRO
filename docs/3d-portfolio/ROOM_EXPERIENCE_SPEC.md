# ROOM EXPERIENCE SPECIFICATION — ARCHITECTURAL IMMERSION ARCHITECTURE

**System:** SANTRO 3D Architectural Portfolio  
**Milestone:** M9 — 360° Room Experience & Immersive Spatial Presentation  
**Status:** SPECIFICATION COMPLETE & CODE-ALIGNED  
**Concept:** *Architectural Walkthrough with Deliberate Museum Exhibition Staging.*

---

## 1. Philosophical Framework

In conventional 3D websites, "360°" typically translates to an unconstrained camera orbit, mouse-drag rotation, or an automated turntable spin. Such mechanisms disrupt architectural composure, cause motion sickness, and reduce carefully designed architecture to an interactive toy.

In SANTRO, the room experience is defined as **an authored cinematic room inspection**:
> *“When I enter a room, the architecture pauses, the camera stabilizes, and I am granted calibrated time to observe what this space contains.”*

### The Six Phases of Spatial Immersion:
```text
Phase 1: ARRIVE    → Natural deceleration as camera crosses room portal threshold.
Phase 2: SETTLE    → Camera stabilizes; velocity reaches zero; frames space orientation.
Phase 3: REVEAL    → Gentle camera lateral dolly revealing primary architectural volume.
Phase 4: INSPECT   → Controlled cinematic path guiding the eye through physical installations.
Phase 5: BEATS     → Intentional holding moments framing specific projects, systems, or steles.
Phase 6: RESUME    → Smooth forward acceleration reconnecting with global circulation.
```

---

## 2. State Machine Specification

The room experience state machine is deterministic and synchronized with global journey progress:

| State | Entry Condition | Camera Dynamic | Look Target Dynamic | Lens FOV | Lighting State | Next State |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `IDLE` | Outside room range | Spline tracking | Spline tracking | 48°–56° | Global TOD | `ROOM_APPROACH` |
| `ROOM_APPROACH` | $p_{\text{global}} \to p_{\text{start}}$ | Deceleration | Portal forward | 56° | Room Preset Ramp | `ROOM_ARRIVAL` |
| `ROOM_ARRIVAL` | $p_{\text{local}} \in [0.00, 0.10]$ | Smooth ease-out | Room entry focus | 56° | Room Preset | `ROOM_SETTLE` |
| `ROOM_SETTLE` | $p_{\text{local}} \in [0.10, 0.20]$ | Velocity $\to 0$ | Space orientation | 56°–57° | Room Preset | `ROOM_REVEAL` |
| `ROOM_REVEAL` | $p_{\text{local}} \in [0.20, 0.25]$ | Gentle lateral dolly | Architectural center | 57° | Room Preset | `CONTENT_BEAT` |
| `CONTENT_BEAT` | Active beat progress | Hold / slow drift | Exhibit anchor | 54°–58° | Room Preset | `ROOM_INSPECTION` |
| `ROOM_INSPECTION`| Inter-beat progress | Measured dolly | Wing glance | 56°–58° | Room Preset | `CONTENT_BEAT` |
| `ROOM_EXIT` | $p_{\text{local}} \in [0.94, 0.98]$ | Smooth ease-in | Exit portal | 54°–56° | Room Preset | `RESUME_JOURNEY` |
| `RESUME_JOURNEY` | $p_{\text{local}} \ge 0.98$ | Acceleration | Corridor spine | 54°–56° | Next Zone Preset| `IDLE` |

---

## 3. Spatial Camera Anchors

Every immersive room specifies spatial anchors in the configuration layer (`ROOM_EXPERIENCE_CONFIGS`):

```ts
type RoomCameraAnchor = {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  label?: string;
  duration?: number;
  holdDuration?: number;
  easing?: string;
};
```

### Roles:
- **`arrival`**: Camera position and forward sightline when crossing into the room bounding box. Must match the incoming corridor spline within $0.001\text{m}$.
- **`settle`**: Position where velocity drops to near-zero, allowing the visitor's eyes to adjust to lighting, ceiling height, and room scale.
- **`reveal`**: Composition framing the hero architectural vista and spatial hierarchy of exhibits.
- **`beats[]`**: Sequence of physical exhibit observation keyframes.
- **`exit`**: Camera position and sightline as the camera leaves the room. Must match the outgoing corridor spline within $0.001\text{m}$.

---

## 4. Authored Room Timelines

### Timeline Structure (Normalized $p_{\text{local}} \in [0.0, 1.0]$):
```text
0.00 ─────────────────────────────────────────────── Arrival
 │
0.10 ─────────────────────────────────────────────── Settle
 │
0.20 ─────────────────────────────────────────────── Primary Architectural Reveal
 │
0.25 – 0.38 ──────────────────────────────────────── Beat 1 (Primary Exhibit)
 │
0.38 – 0.50 ──────────────────────────────────────── Beat 2 (Supporting Flank)
 │
0.50 – 0.62 ──────────────────────────────────────── Beat 3 (Selected Plinth)
 │
0.62 – 0.73 ──────────────────────────────────────── Beat 4 (Cross-Volume Glance)
 │
0.73 – 0.84 ──────────────────────────────────────── Beat 5 (Selected Plinth)
 │
0.84 – 0.94 ──────────────────────────────────────── Beat 6 (Selected Plinth)
 │
0.94 – 0.98 ──────────────────────────────────────── Final Symmetrical Composition
 │
1.00 ─────────────────────────────────────────────── Exit & Resume Journey
```

---

## 5. Experience Intensity Matrix

Not every room in an architectural house commands the same level of inspection. Intensity is graded according to architectural purpose:

| Room Name | Room ID | Intensity | Beats Count | Inspection Focus |
| :--- | :--- | :--- | :--- | :--- |
| **Project Studio** | `project-studio` | **HIGH** | 7 Beats | 7 Verified Projects, Atrium Double-Height Volume |
| **Engineering Lab** | `engineering-lab` | **MEDIUM-HIGH** | 2 Beats | Workstation Monitors, Technical Stack Rack Stele |
| **Archive** | `archive` | **MEDIUM** | 2 Beats | SIH Win, Hackathons, HPC Kernels, Vector OSS |
| **Foyer Vestibule** | `foyer` | **MEDIUM** | 2 Beats | 24-Batten Walnut Wall, Profile Identity Plaque |
| **Study** | `study` | **LOW** | 2 Beats | BUILD, THINK, EXPLORE, REFINE Principle Steles |
| **Contact Pavilion**| `contact` | **LOW** | 2 Beats | Monolithic Travertine Plinth, Rear Mountain Vista |
| **Gallery Corridor**| `gallery` | **LOW** | 1 Beat | Curatorial Lineup Overview Plaque |
| **Rear Terrace** | `terrace` | **MINIMAL** | 1 Beat | Contemplative Horizon Pause, Cantilever Slab |

---

## 6. Interaction & Navigation Model

1. **Scroll-Driven Default:** Scrolling moves the visitor forward along the authored timeline.
2. **Stateless Reversibility:** Scrolling backward evaluates the exact same spline equations in reverse with $< 0.0001\text{mm}$ error.
3. **Orbit Controls Handoff:** In inspect mode, OrbitControls takes over smoothly from the rig's current target position. Exiting inspect returns camera to the spline without disorientation.
4. **No Click Friction:** Visitors do not need to click buttons to explore a room. Exploration is natural and experiential.
