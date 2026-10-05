# SANTRO — Cinematic 3D Architectural Web Portfolio

> **"You are physically walking through the work of an engineer."**

<div align="center">

<a href="https://github.com/santheesh73">
  <img src="https://img.shields.io/badge/Author-Santheesh%20S-181717?style=for-the-badge&logo=github&logoColor=white" alt="Author" />
</a>
<a href="https://github.com/santheesh73?tab=repositories">
  <img src="https://img.shields.io/badge/Projects-santheesh73-DC2626?style=for-the-badge&logo=git&logoColor=white" alt="Projects" />
</a>

<br>

<sub>Developed for Educational & Engineering Demonstration</sub><br>
<sub>Crafted with care by <a href="https://github.com/santheesh73"><b>Santheesh S</b></a></sub>

<br><br>

[![Status: M0 Baseline Complete](https://img.shields.io/badge/Status-M0%20Baseline%20Complete-emerald?style=flat-square)](docs/3d-portfolio/M0_REPORT.md)
[![Next Milestone: M1 Pipeline](https://img.shields.io/badge/Next-M1%203D%20Asset%20Pipeline-blue?style=flat-square)](docs/3d-portfolio/MILESTONE_ROADMAP.md)
[![Tech Stack: Next.js 16 | React 19 | Three.js | R3F](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20React%2019%20%7C%20R3F-purple?style=flat-square)](docs/3d-portfolio/M0_BASELINE.md)

</div>

---

## 1. Executive Summary

**SANTRO** is a next-generation interactive web portfolio for **Santheesh S** (AI Software Engineer & Full-Stack Developer). 

This is **not** a conventional flat portfolio with a 3D canvas background. Instead, **the modern modernist residence itself is the primary interface**: visitors embark on a continuous, cinematic 3D journey through "The Portfolio House", where each architectural space, plinth, and vista houses real production engineering work, AI systems, interactive blueprints, and technical proficiencies.

The visual and cinematic source of truth is the reference architectural visualization in [`asset/architectural_reference.mp4`](asset/architectural_reference.mp4).

---

## 2. Spatial Portfolio Journey

The visitor moves through 10 calibrated architectural zones along a continuous spline path ($t \in [0.0, 1.0]$):

```text
       EXTERIOR (t: 0.00 - 0.22)
          ↓  Hero Identity & Pool Plinth Overview
       ENTRANCE (t: 0.28)
          ↓  Dynamic Walnut Pivot Door Passage
       FOYER (t: 0.35)
          ↓  About Narrative & Architectural Index
       GALLERY (t: 0.44)
          ↓  Fluted Walnut Typography & Story Wall
       PROJECT STUDIO (t: 0.55)
          ↓  7 Production Projects (ORION, HeartTune, NISF...)
       ENGINEERING LAB (t: 0.65)
          ↓  Dual Workstation & 23 Engineering Technologies
       ARCHIVE (t: 0.72)
          ↓  Hackathons, Proof & Open Source Milestones
       STUDY (t: 0.78)
          ↓  Engineering Principles & Architecture Deep-Dives
       CONTACT (t: 0.88)
          ↓  Direct Communication & Social Portals
       TERRACE (t: 0.93 - 1.00)
          ↓  Twilight Mountain Vista & Concluding Elevation
```

At any designated room waypoint, visitors can pause their journey and break out into an interactive **360° orbital inspection mode** to closely examine floating holographic schematics, workstation displays, and architectural finishes.

---

## 3. Engineering Documentation Suite

Milestone **M0** establishes the definitive technical foundation. All specifications are organized under [`docs/3d-portfolio/`](docs/3d-portfolio/):

| Document | Primary Focus & Coverage |
| :--- | :--- |
| **[`M0_BASELINE.md`](docs/3d-portfolio/M0_BASELINE.md)** | Codebase audit, runtime dependencies, build status, data structures, and keep/modify/remove strategy. |
| **[`REFERENCE_ANALYSIS.md`](docs/3d-portfolio/REFERENCE_ANALYSIS.md)** | Frame-by-frame visual specification across all 240 frames of `asset/architectural_reference.mp4`. |
| **[`ARCHITECTURE_SPEC.md`](docs/3d-portfolio/ARCHITECTURE_SPEC.md)** | 3D coordinate system ($+X$ Right, $+Y$ Up, $+Z$ South), volumetric dimensions, cantilevers, fenestration, and furniture. |
| **[`CAMERA_SPEC.md`](docs/3d-portfolio/CAMERA_SPEC.md)** | 4 cinematic shots, 13 Catmull-Rom spline waypoints, quaternion Slerp damping, dynamic FOV, and proximity door trigger. |
| **[`MATERIAL_SPEC.md`](docs/3d-portfolio/MATERIAL_SPEC.md)** | 14 PBR materials (stucco, walnut, travertine, glass, aluminum, water, holograms), ORM packing, and VRAM budgets. |
| **[`ASSET_PIPELINE.md`](docs/3d-portfolio/ASSET_PIPELINE.md)** | DCC workflow from Blender collections to `@gltf-transform` quantization, KTX2 compression, and Draco decoders. |
| **[`SCENE_ARCHITECTURE.md`](docs/3d-portfolio/SCENE_ARCHITECTURE.md)** | React Three Fiber scene graph (`<HouseExperience>`), Zustand store (`useHouseStore`), lighting/shadows, and device tiers. |
| **[`MILESTONE_ROADMAP.md`](docs/3d-portfolio/MILESTONE_ROADMAP.md)** | Strict sequential dependency graph (DAG) and granular specifications for milestones M0 through M16. |
| **[`M0_REPORT.md`](docs/3d-portfolio/M0_REPORT.md)** | Final milestone verification report and formal sign-off for Milestone M1 commencement. |

---

## 4. Technical Stack Inventory

| Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.3.4` | Server components + client WebGL islands |
| **Runtime & Language** | React + TypeScript | `19.2.8` / `5.x` | Strict type checking & concurrent rendering |
| **Styling** | Tailwind CSS v4 | `^4.0.0` | Design tokens & CSS variables via `@theme` |
| **3D Rendering** | Three.js | `^0.186.0` | Core WebGL 2.0 / WebGPU-ready rendering engine |
| **React Three Binding** | `@react-three/fiber` (R3F) | `^9.8.0` | Declarative 3D scene graph orchestration |
| **3D Ecosystem** | `@react-three/drei` | `^10.7.8` | Loaders (`useGLTF`), camera controls, helpers |
| **State Management** | Zustand | `^5.0.0` | High-frequency camera progress & spatial zone store |
| **UI Motion (2D)** | Motion for React (`motion`) | `^13.2.0` | HUD transitions & reduced-motion fallbacks |
| **Icons** | Lucide React | `^1.44.0` | Minimalist architectural HUD iconography |

---

## 5. WebGL Performance Budgets

To ensure fluid 60fps performance across desktop and mobile devices:

- **Triangle Count:** $\le 250,000$ hard budget ($\sim 160\text{k}$ target).
- **Draw Calls:** $\le 65$ total per frame ($\sim 45$ target).
- **GLB File Size:** $\le 8.0\text{MB}$ compressed via Meshoptimizer & Draco.
- **Texture VRAM:** $\le 15.0\text{MB}$ total uncompressed ($< 3.5\text{MB}$ wire transfer via KTX2 Basis Universal).
- **Color Grading & Shading:** ACESFilmic ToneMapping, sRGB Color Space, PCF Soft Shadows.
- **Device Tiers:** Automatic DPR clamping (`[1.0, 1.75]`), shader fallback on mobile, and full WCAG 2.1 AA `prefers-reduced-motion` compliance.

---

## 6. Milestone Roadmap (DAG)

```text
M0: Baseline & Reference Analysis  [COMPLETE]
 └──> M1: 3D Asset Pipeline & Tooling
       └──> M2: House Architectural Blockout
             └──> M3: Architectural Detailing & Fenestration
                   └──> M4: PBR Material Library
                         └──> M5: Lighting & Day-to-Dusk Calibration
                               ├──> M6: Exterior Camera Choreography
                               └──> M7: Interior Camera Trajectory
                                     └──> M8: Portfolio Room Spatial Layout
                                           ├──> M9: 360° Room Inspection
                                           └──> M10: Portfolio Content Integration
                                                 └──> M11: Exhibition Plinths & Holograms
                                                       └──> M12: Cinematic UI Navigation
                                                             └──> M13: Cinematic Polish & Audio
                                                                   └──> M14: Performance & Mobile
                                                                         └──> M15: Accessibility (a11y)
                                                                               └──> M16: Production Launch
```

---

## 7. Repository Structure

```text
santheesh73/SANTRO/
├── README.md                             # Repository overview and architecture index
├── .gitignore                            # Production gitignore for Node, Next, Blender, OS
├── asset/                                # Source visual media
│   ├── architectural_reference.mp4       # 1080p 24fps reference video (source of truth)
│   └── reference_frames/                 # 22 extracted keyframe analyses (frames 0 to 239)
│       └── door_trans/                   # High-density door opening sequence frames
│
├── docs/3d-portfolio/                    # Engineering specifications suite
│   ├── M0_BASELINE.md
│   ├── REFERENCE_ANALYSIS.md
│   ├── ARCHITECTURE_SPEC.md
│   ├── CAMERA_SPEC.md
│   ├── MATERIAL_SPEC.md
│   ├── ASSET_PIPELINE.md
│   ├── SCENE_ARCHITECTURE.md
│   ├── MILESTONE_ROADMAP.md
│   └── M0_REPORT.md
│
├── 3d-source/                            # (M1+) DCC source files & Blender Python export scripts
└── public/models/                        # (M1+) Production WebGL-optimized GLB assets
```

---

## 8. Milestone Status

```text
M0 STATUS: COMPLETE

NEXT MILESTONE:
M1 — 3D Asset Pipeline & Tooling
```
>>>>>>> d4974cf (docs(m0): complete project baseline, reference analysis, and architectural specifications)
