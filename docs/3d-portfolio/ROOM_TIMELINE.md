# ROOM TIMELINE SPECIFICATION — AUTHORED PROGRESSION MATRICES

**System:** SANTRO 3D Architectural Portfolio  
**Milestone:** M9 — 360° Room Experience & Immersive Spatial Presentation  
**Status:** COMPLETE & NUMERICALLY VALIDATED  
**Architecture:** Data-Driven Timelines Parameterized Over Normalized Local Progress $p_{\text{local}} \in [0.0, 1.0]$.

---

## 1. Global Progress Partitioning

The continuous journey progress $p_{\text{global}} \in [0.0, 1.0]$ allocates dedicated progress intervals to each room experience:

| Room Name | Room ID | Global Range ($p_{\text{global}}$) | Local Duration ($\Delta p$) | Intensity |
| :--- | :--- | :--- | :--- | :--- |
| **Exterior Grounds** | `exterior` | $0.000 \to 0.400$ | $0.400$ | MINIMAL |
| **Entrance Portal** | `entrance` | $0.400 \to 0.500$ | $0.100$ | MINIMAL |
| **Foyer Vestibule** | `foyer` | $0.500 \to 0.620$ | $0.120$ | MEDIUM |
| **Gallery Corridor** | `gallery` | $0.620 \to 0.740$ | $0.120$ | LOW |
| **Project Studio** | `project-studio` | $0.740 \to 0.840$ | $0.100$ | HIGH |
| **Engineering Lab** | `engineering-lab` | $0.840 \to 0.900$ | $0.060$ | MEDIUM-HIGH |
| **Archive** | `archive` | $0.900 \to 0.940$ | $0.040$ | MEDIUM |
| **Study** | `study` | $0.940 \to 0.970$ | $0.030$ | LOW |
| **Contact Pavilion**| `contact` | $0.970 \to 0.995$ | $0.025$ | LOW |
| **Rear Terrace** | `terrace` | $0.995 \to 1.000$ | $0.005$ | MINIMAL |

---

## 2. Project Studio Authored Timeline (`project-studio`)

Global Range: $[0.740, 0.840]$ $\implies$ Local Duration: $10\%$ of global journey.

```text
p_local   State             Camera Position         Look-At Target         FOV   Beat / Purpose
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
0.000     ROOM_ARRIVAL      [ 0.00, 1.60, -10.20]   [ 0.00, 1.50, -15.00]  56°   Gallery-to-Atrium handoff (0.000m error)
0.100     ROOM_SETTLE       [ 0.00, 1.60, -10.80]   [ 0.00, 1.55, -15.50]  56°   Deceleration & volumetric framing
0.180     ROOM_REVEAL       [-0.35, 1.60, -11.40]   [ 0.00, 1.50, -14.20]  57°   Double-height space reveal
0.220     CONTENT_BEAT      [-1.20, 1.60, -11.90]   [-2.60, 1.35, -12.20]  56°   ORION approach
0.280     CONTENT_BEAT      [-1.20, 1.60, -11.90]   [-2.60, 1.35, -12.20]  56°   ORION hold (WebGPU & metrics)
0.350     ROOM_INSPECTION   [-1.40, 1.60, -13.20]   [-3.90, 1.30, -13.60]  58°   PRYSM & BHOOMI lateral glance
0.470     CONTENT_BEAT      [-0.80, 1.60, -13.80]   [-2.60, 1.35, -14.20]  56°   HEARTTUNE approach
0.530     CONTENT_BEAT      [-0.80, 1.60, -13.80]   [-2.60, 1.35, -14.20]  56°   HEARTTUNE hold (Audio buffer metrics)
0.590     ROOM_INSPECTION   [ 0.00, 1.60, -13.20]   [ 2.20, 1.45, -13.20]  58°   East Wing cross-atrium orientation
0.700     CONTENT_BEAT      [ 0.80, 1.60, -12.80]   [ 2.60, 1.35, -12.20]  56°   NISF & MINCHAL approach
0.750     CONTENT_BEAT      [ 0.80, 1.60, -12.80]   [ 2.60, 1.35, -12.20]  56°   NISF & MINCHAL hold (Vector & OCR)
0.810     CONTENT_BEAT      [ 0.60, 1.60, -13.80]   [ 2.60, 1.35, -14.20]  56°   AHAL AI approach
0.850     CONTENT_BEAT      [ 0.60, 1.60, -13.80]   [ 2.60, 1.35, -14.20]  56°   AHAL AI hold (AST graph metrics)
0.900     ROOM_INSPECTION   [-0.20, 1.60, -12.50]   [-3.20, 1.40, -10.50]  57°   Walkway re-alignment to Lab portal
0.960     ROOM_EXIT         [-0.50, 1.60, -11.50]   [-3.20, 1.40, -10.50]  58°   Engineering Lab portal approach
1.000     RESUME_JOURNEY    [-0.50, 1.60, -11.50]   [-3.20, 1.40, -10.50]  58°   Handoff to Engineering Lab (0.000m error)
```

---

## 3. Engineering Lab Authored Timeline (`engineering-lab`)

Global Range: $[0.840, 0.900]$.

```text
p_local   State             Camera Position         Look-At Target         FOV   Beat / Purpose
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
0.000     ROOM_ARRIVAL      [-0.50, 1.60, -11.50]   [-3.20, 1.40, -10.50]  58°   Project Studio handoff (0.000m error)
0.100     ROOM_SETTLE       [-0.50, 1.60, -11.00]   [-3.40, 1.40, -10.00]  58°   Velocity stabilizes
0.200     ROOM_REVEAL       [-0.50, 1.60, -10.20]   [-3.80, 1.30,  -9.50]  59°   Desk and server rack overview
0.400     CONTENT_BEAT      [-0.50, 1.60,  -9.50]   [-4.40, 1.15,  -9.50]  58°   Dual IPS displays hold (Topology)
0.720     CONTENT_BEAT      [-0.40, 1.60, -11.00]   [-2.40, 1.55, -11.50]  58°   Technical capability rack stele hold
0.960     ROOM_EXIT         [ 0.00, 1.60, -13.50]   [ 3.60, 1.40, -16.20]  56°   Corridor re-alignment to East Wing
1.000     RESUME_JOURNEY    [ 0.00, 1.60, -13.50]   [ 3.60, 1.40, -16.20]  56°   Archive handoff (0.000m error)
```

---

## 4. Archive Authored Timeline (`archive`)

Global Range: $[0.900, 0.940]$.

```text
p_local   State             Camera Position         Look-At Target         FOV   Beat / Purpose
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
0.000     ROOM_ARRIVAL      [ 0.00, 1.60, -13.50]   [ 3.60, 1.40, -16.20]  56°   Engineering Lab handoff (0.000m error)
0.120     ROOM_SETTLE       [ 0.40, 1.60, -14.50]   [ 3.60, 1.40, -16.20]  55°   Under-mezzanine quiet pause
0.220     ROOM_REVEAL       [ 0.60, 1.60, -15.40]   [ 3.60, 1.35, -16.20]  55°   Travertine proof tablets reveal
0.400     CONTENT_BEAT      [ 0.80, 1.60, -16.00]   [ 3.60, 1.35, -16.20]  54°   SIH National Championship hold
0.720     CONTENT_BEAT      [ 0.80, 1.60, -17.40]   [ 4.00, 1.35, -18.80]  54°   Open Source & HPC Award hold
0.960     ROOM_EXIT         [ 0.00, 1.60, -16.50]   [-3.60, 1.40, -17.00]  55°   Turn across atrium toward West Wing
1.000     RESUME_JOURNEY    [ 0.00, 1.60, -16.50]   [-3.60, 1.40, -17.00]  55°   Study handoff (0.000m error)
```

---

## 5. Study Authored Timeline (`study`)

Global Range: $[0.940, 0.970]$.

```text
p_local   State             Camera Position         Look-At Target         FOV   Beat / Purpose
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
0.000     ROOM_ARRIVAL      [ 0.00, 1.60, -16.50]   [-3.60, 1.40, -17.00]  55°   Archive handoff (0.000m error)
0.120     ROOM_SETTLE       [-0.40, 1.60, -16.20]   [-3.60, 1.40, -16.50]  55°   Contemplative study settle
0.220     ROOM_REVEAL       [-0.60, 1.60, -16.20]   [-3.60, 1.35, -16.50]  54°   Four monolithic steles reveal
0.400     CONTENT_BEAT      [-0.80, 1.60, -16.50]   [-3.60, 1.35, -16.50]  54°   BUILD & THINK steles hold
0.720     CONTENT_BEAT      [-0.80, 1.60, -17.50]   [-3.80, 1.35, -18.80]  54°   EXPLORE & REFINE steles hold
0.960     ROOM_EXIT         [ 0.00, 1.60, -17.00]   [ 0.00, 1.15, -18.50]  54°   Return toward center axis
1.000     RESUME_JOURNEY    [ 0.00, 1.60, -17.00]   [ 0.00, 1.15, -18.50]  54°   Contact Pavilion handoff (0.000m error)
```

---

## 6. Contact Pavilion Authored Timeline (`contact`)

Global Range: $[0.970, 0.995]$.

```text
p_local   State             Camera Position         Look-At Target         FOV   Beat / Purpose
─────────────────────────────────────────────────────────────────────────────────────────────────────────────
0.000     ROOM_ARRIVAL      [ 0.00, 1.60, -17.00]   [ 0.00, 1.15, -18.50]  54°   Study handoff (0.000m error)
0.120     ROOM_SETTLE       [ 0.00, 1.60, -17.30]   [ 0.00, 1.15, -18.50]  54°   Settle before travertine plinth
0.220     ROOM_REVEAL       [ 0.00, 1.60, -17.50]   [ 0.00, 1.15, -18.50]  54°   Plinth toe-kick underglow & glass panorama
0.450     CONTENT_BEAT      [ 0.00, 1.60, -17.70]   [ 0.00, 1.15, -18.50]  54°   Contact coordinates plinth tablet hold
0.750     ROOM_INSPECTION   [ 0.00, 1.60, -18.00]   [ 0.00, 1.70, -28.00]  53°   Double-height rear glass curtain wall & vista
0.960     ROOM_EXIT         [ 0.00, 1.60, -18.20]   [ 0.00, 1.75, -32.00]  52°   Approach to terrace threshold
1.000     RESUME_JOURNEY    [ 0.00, 1.60, -18.20]   [ 0.00, 1.75, -32.00]  52°   Terrace handoff (0.000m error)
```
