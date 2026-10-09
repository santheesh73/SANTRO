# ROOM CAMERA BEATS — SPATIAL EXHIBIT FRAMING CATALOG

**System:** SANTRO 3D Architectural Portfolio  
**Milestone:** M9 — 360° Room Experience & Immersive Spatial Presentation  
**Status:** COMPLETE & VERIFIED  
**Purpose:** Technical catalog of all authored camera beats across portfolio rooms.

---

## 1. Project Studio Beats (`project-studio`)

The Project Studio is located in the double-height atrium ($Z: -10.2\text{m}$ to $-18.5\text{m}$). The camera executes an authored 7-beat walkthrough inspecting all seven verified portfolio projects:

### Beat 01: ORION // On-Device Privacy-First AI
- **Beat ID:** `ps-beat-01-orion`
- **Progress Range:** $p_{\text{local}} \in [0.22, 0.35]$ (Global: $[0.762, 0.775]$)
- **Camera Position:** `[-1.20, 1.60, -11.90]`
- **Look Target:** `[-2.60, 1.35, -12.20]`
- **Lens FOV:** $56^\circ$
- **State:** `CONTENT_BEAT`
- **Importance:** `primary`
- **Hold Duration Fraction:** $0.35$
- **Framing Composition:** Three-quarter eye-level perspective framing the primary monolithic plinth, local WebGPU inference indicators, and zero-server-egress architecture.
- **Clearance to Exhibit:** $1.43\text{m}$ (exceeds near clip plane by $14\times$).

### Beat 02: PRYSM & BHOOMI // Graphics & Satellite ML
- **Beat ID:** `ps-beat-02-supporting-west`
- **Progress Range:** $p_{\text{local}} \in [0.35, 0.47]$ (Global: $[0.775, 0.787]$)
- **Camera Position:** `[-1.40, 1.60, -13.20]`
- **Look Target:** `[-3.90, 1.30, -13.60]`
- **Lens FOV:** $58^\circ$
- **State:** `ROOM_INSPECTION`
- **Importance:** `supporting`
- **Hold Duration Fraction:** $0.25$
- **Framing Composition:** Controlled lateral glance toward the West outer wing, grouping the 2M particle GPU compute sandbox and the SIH multispectral agricultural command center.
- **Clearance to Exhibit:** $2.53\text{m}$.

### Beat 03: HEARTTUNE // Emotion-Responsive Audio ML
- **Beat ID:** `ps-beat-03-hearttune`
- **Progress Range:** $p_{\text{local}} \in [0.47, 0.59]$ (Global: $[0.787, 0.799]$)
- **Camera Position:** `[-0.80, 1.60, -13.80]`
- **Look Target:** `[-2.60, 1.35, -14.20]`
- **Lens FOV:** $56^\circ$
- **State:** `CONTENT_BEAT`
- **Importance:** `secondary`
- **Hold Duration Fraction:** $0.30$
- **Framing Composition:** Intimate eye-level framing of the biometric audio streaming display, 64-sample Web Audio API synthesis engine, and offline PWA synchronization.
- **Clearance to Exhibit:** $1.84\text{m}$.

### Beat 04: Atrium Central Symmetry // East Wing Glance
- **Beat ID:** `ps-beat-04-cross-atrium`
- **Progress Range:** $p_{\text{local}} \in [0.59, 0.70]$ (Global: $[0.799, 0.810]$)
- **Camera Position:** `[0.00, 1.60, -13.20]`
- **Look Target:** `[2.20, 1.45, -13.20]`
- **Lens FOV:** $58^\circ$
- **State:** `ROOM_INSPECTION`
- **Importance:** `secondary`
- **Hold Duration Fraction:** $0.20$
- **Framing Composition:** Balanced panoramic cross-atrium orientation framing the double-height spatial volume and orienting the viewer toward the eastern exhibition wing.
- **Yaw Angular Swing:** $28^\circ$ (well within anti-nausea safety limit).

### Beat 05: NISF & MINCHAL // Generative AI & Energy OCR
- **Beat ID:** `ps-beat-05-nisf-minchal`
- **Progress Range:** $p_{\text{local}} \in [0.70, 0.81]$ (Global: $[0.810, 0.821]$)
- **Camera Position:** `[0.80, 1.60, -12.80]`
- **Look Target:** `[2.60, 1.35, -12.20]`
- **Lens FOV:** $56^\circ$
- **State:** `CONTENT_BEAT`
- **Importance:** `secondary`
- **Hold Duration Fraction:** $0.30$
- **Framing Composition:** Framing the HNSW vector critique platform and accessible bilingual electricity consumption OCR plinth.
- **Clearance to Exhibit:** $1.89\text{m}$.

### Beat 06: AHAL AI // Repository & Document Intelligence
- **Beat ID:** `ps-beat-06-ahal-ai`
- **Progress Range:** $p_{\text{local}} \in [0.81, 0.90]$ (Global: $[0.821, 0.830]$)
- **Camera Position:** `[0.60, 1.60, -13.80]`
- **Look Target:** `[2.60, 1.35, -14.20]`
- **Lens FOV:** $56^\circ$
- **State:** `CONTENT_BEAT`
- **Importance:** `secondary`
- **Hold Duration Fraction:** $0.30$
- **Framing Composition:** Framing codebase AST dependency graph indexing, multi-agent planner loops, and technical intelligence reports.
- **Clearance to Exhibit:** $2.03\text{m}$.

### Beat 07: Project Studio Finale // Lab Transition Alignment
- **Beat ID:** `ps-beat-07-finale`
- **Progress Range:** $p_{\text{local}} \in [0.90, 0.94]$ (Global: $[0.830, 0.834]$)
- **Camera Position:** `[-0.20, 1.60, -12.50]`
- **Look Target:** `[-3.20, 1.40, -10.50]`
- **Lens FOV:** $57^\circ$
- **State:** `ROOM_INSPECTION`
- **Importance:** `primary`
- **Hold Duration Fraction:** $0.20$
- **Framing Composition:** Camera re-aligns smoothly along the central walkway, framing the Engineering Lab glass workstation opening in preparation for room handoff.

---

## 2. Engineering Lab Beats (`engineering-lab`)

The Engineering Lab ($X: -1.6\text{m}$ to $-7.8\text{m}$, $Z: -6.5\text{m}$ to $-13.5\text{m}$) features glass enclosure viewing:

### Beat 01: Workstation Displays & Telemetry
- **Beat ID:** `lab-beat-01-workstation`
- **Progress Range:** $p_{\text{local}} \in [0.25, 0.58]$
- **Camera Position:** `[-0.50, 1.60, -9.50]`
- **Look Target:** `[-4.40, 1.15, -9.50]`
- **Lens FOV:** $58^\circ$
- **Framing Composition:** Framed through frameless glass partition, focusing on dual matte IPS monitors presenting local inference topology and automated verification logs.

### Beat 02: Technical Capability Stack Rack
- **Beat ID:** `lab-beat-02-technical-rack`
- **Progress Range:** $p_{\text{local}} \in [0.58, 0.88]$
- **Camera Position:** `[-0.40, 1.60, -11.00]`
- **Look Target:** `[-2.40, 1.55, -11.50]`
- **Lens FOV:** $58^\circ$
- **Framing Composition:** Focusing on the anodized aluminum technical stele displaying Languages, Frontend, Backend, Data, AI/ML, and Infra domains.

---

## 3. Archive Beats (`archive`)

Located in the East wing under-mezzanine gallery ($X: +1.6\text{m}$ to $+6.0\text{m}$, $Z: -13.0\text{m}$ to $-20.0\text{m}$):

### Beat 01: Smart India Hackathon (SIH) National Championship
- **Beat ID:** `archive-beat-01-sih`
- **Progress Range:** $p_{\text{local}} \in [0.25, 0.58]$
- **Camera Position:** `[0.80, 1.60, -16.00]`
- **Look Target:** `[3.60, 1.35, -16.20]`
- **Lens FOV:** $54^\circ$
- **Framing Composition:** Framing the honed travertine proof tablet documenting the national hackathon win, BHOOMI satellite agriculture platform, and Ministry award.

### Beat 02: Open Source Vector PRs & HPC Kernels
- **Beat ID:** `archive-beat-02-hpc-oss`
- **Progress Range:** $p_{\text{local}} \in [0.58, 0.88]$
- **Camera Position:** `[0.80, 1.60, -17.40]`
- **Look Target:** `[4.00, 1.35, -18.80]`
- **Lens FOV:** $54^\circ$
- **Framing Composition:** Framing open-source SIMD distance kernels and locked 60fps 4K GPU raymarching computing awards.

---

## 4. Study Beats (`study`)

Located in the West wing under-mezzanine gallery ($X: -1.6\text{m}$ to $-6.0\text{m}$, $Z: -13.0\text{m}$ to $-20.0\text{m}$):

### Beat 01: Principles BUILD & THINK
- **Beat ID:** `study-beat-01-build-think`
- **Progress Range:** $p_{\text{local}} \in [0.30, 0.62]$
- **Camera Position:** `[-0.80, 1.60, -16.20]`
- **Look Target:** `[-3.60, 1.35, -16.50]`
- **Lens FOV:** $54^\circ$
- **Framing Composition:** Framing "Turn ideas into working products" and "Understand the problem before technology".

### Beat 02: Principles EXPLORE & REFINE
- **Beat ID:** `study-beat-02-explore-refine`
- **Progress Range:** $p_{\text{local}} \in [0.62, 0.92]$
- **Camera Position:** `[-0.80, 1.60, -17.40]`
- **Look Target:** `[-3.80, 1.35, -18.80]`
- **Lens FOV:** $54^\circ$
- **Framing Composition:** Framing "Experiment with new tools & AI" and "Iterate until experience and implementation are strong".

---

## 5. Contact Pavilion Beats (`contact`)

Located at the central rear culmination ($Z: -17.5\text{m}$ to $-21.0\text{m}$):

### Beat 01: Monolithic Contact Plinth
- **Beat ID:** `contact-beat-01-coordinates`
- **Progress Range:** $p_{\text{local}} \in [0.30, 0.68]$
- **Camera Position:** `[0.00, 1.60, -17.00]`
- **Look Target:** `[0.00, 1.15, -18.50]`
- **Lens FOV:** $54^\circ$
- **Framing Composition:** Framing direct verified coordinates (Email, GitHub, LinkedIn) resting on the travertine plinth with warm toe-kick glow.

### Beat 02: Rear Glass Panorama & Mountain Vista
- **Beat ID:** `contact-beat-02-vista`
- **Progress Range:** $p_{\text{local}} \in [0.68, 0.94]$
- **Camera Position:** `[0.00, 1.60, -17.60]`
- **Look Target:** `[0.00, 1.70, -28.00]`
- **Lens FOV:** $53^\circ$
- **Framing Composition:** Gentle camera pitch elevation framing the 6.8m double-height rear glass curtain wall and natural twilight mountain horizon.
