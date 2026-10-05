# MILESTONE ROADMAP: M0 THROUGH M16

**Project:** "THE PORTFOLIO HOUSE" — Cinematic 3D Architectural Web Portfolio  
**Author:** Senior Creative Frontend Engineer & 3D Technical Artist  
**Milestone Scope:** M0 through M16  
**Repository:** `santheesh73/SANTRO`

---

## 1. Architectural Dependency Graph (DAG)

To guarantee that the 3D portfolio is built upon a solid technical and architectural foundation without premature optimization or guesswork, milestones must be executed in strict sequential dependency:

```text
M0: Project Baseline & Reference Analysis  [COMPLETED]
 │
 ├──> M1: 3D Asset Pipeline & Tooling
       │
       └──> M2: House Architectural Blockout (Massing & Proportions)
             │
             └──> M3: Architectural Detailing & Fenestration
                   │
                   └──> M4: PBR Material Library & Texture Calibration
                         │
                         └──> M5: Lighting & Atmospheric Calibration (Day to Dusk)
                               │
                               ├──> M6: Exterior Camera Choreography (Shots 01 & 02)
                               │     │
                               └──> M7: Interior Camera Trajectory (Shots 03 & 04)
                                     │
                                     └──> M8: Portfolio Room Spatial Layout
                                           │
                                           ├──> M9: 360° Room Inspection & Controls
                                           │
                                           └──> M10: Portfolio Content Integration
                                                 │
                                                 └──> M11: Exhibition Plinths & Holograms
                                                       │
                                                       └──> M12: Cinematic UI Navigation
                                                             │
                                                             └──> M13: Cinematic Polish & Audio
                                                                   │
                                                                   └──> M14: WebGL Performance & Mobile
                                                                         │
                                                                         └──> M15: Accessibility (a11y)
                                                                               │
                                                                               └──> M16: Production Launch
```

---

## 2. Comprehensive Milestone Specifications

---

### M0 — Project Baseline & Reference Analysis (Current Milestone)
- **Status:** **COMPLETE**
- **Objective:** Deep audit of existing repository (`santheesh73/Portfolio`), frame-by-frame analysis of reference video (`asset/architectural_reference.mp4`), establishing reconstruction strategy, asset pipeline, scene architecture, and exhaustive technical specifications for M1–M16.
- **Key Deliverables:**
  - `docs/3d-portfolio/M0_BASELINE.md`
  - `docs/3d-portfolio/REFERENCE_ANALYSIS.md`
  - `docs/3d-portfolio/ARCHITECTURE_SPEC.md`
  - `docs/3d-portfolio/CAMERA_SPEC.md`
  - `docs/3d-portfolio/MATERIAL_SPEC.md`
  - `docs/3d-portfolio/ASSET_PIPELINE.md`
  - `docs/3d-portfolio/SCENE_ARCHITECTURE.md`
  - `docs/3d-portfolio/MILESTONE_ROADMAP.md`
  - `docs/3d-portfolio/M0_REPORT.md`
- **Acceptance Criteria:** All 9 core documentation files authored, existing codebase verified building cleanly, reference metrics extracted, and git repository pushed.

---

### M1 — 3D Asset Pipeline & Tooling
- **Dependency:** M0
- **Objective:** Establish the production asset export, quantization, and compression workflow connecting Blender to React Three Fiber.
- **Key Deliverables:**
  - Headless Blender Python export automation script (`export_portfolio_house.py`).
  - Command-line optimization pipeline script (`scripts/optimize-model.ts`) integrating `@gltf-transform/cli`, Meshoptimizer, and Draco decoders.
  - Test cube/blockout roundtrip test confirming automated export $\to$ optimization $\to$ R3F rendering.
- **Acceptance Criteria:** Export script runs without errors, produces valid `.glb` with Draco/Meshopt compression, and loads inside Next.js Canvas island.

---

### M2 — House Architectural Blockout (Massing & Proportions)
- **Dependency:** M1
- **Objective:** Construct the volumetric low-poly blockout of the complete residence adhering strictly to the dimensions in `ARCHITECTURE_SPEC.md`.
- **Key Deliverables:**
  - Plinth substructure ($36\text{m} \times 28\text{m}$), ground-floor structural cores, left cantilever box ($9.5\text{m} \times 3.6\text{m} \times 11.0\text{m}$), right cantilever box ($10.5\text{m} \times 3.6\text{m} \times 12.0\text{m}$), connecting bridge, roof parapet, and infinity pool basin ($14\text{m} \times 4.2\text{m}$).
  - Low-poly terrain hillside mesh.
- **Acceptance Criteria:** Volumetric silhouette matches reference frames (Frames 0, 24, 70) with verified spatial clearances ($3.4\text{m}$ ground, $3.2\text{m}$ upper).

---

### M3 — Architectural Detailing & Fenestration
- **Dependency:** M2
- **Objective:** Refine geometry to production fidelity with precise architectural reveals, glazing, joinery, and furniture.
- **Key Deliverables:**
  - Horizontal planked walnut pivot door with offset vertical hinge node ($X: -0.65\text{m}$) and vertical pull bar.
  - Multi-panel sliding pocket glass doors and 90° frameless corner glass curtain walls.
  - Vertical fluted walnut batten feature wall ($14\text{m} \times 3.4\text{m}$) with mounted 3D typography.
  - Cantilevered floating limestone staircase.
  - Frameless structural glass balustrades and teak sun loungers.
  - Executive walnut desk, return credenza, and dual iMac models.
- **Acceptance Criteria:** All visible architectural features from reference frames 36 to 214 modeled with clean quad topology, zero non-manifold edges, and triangle count $< 140\text{k}$.

---

### M4 — PBR Material Library & Texture Calibration
- **Dependency:** M3
- **Objective:** Author, pack, and calibrate all 14 architectural materials specified in `MATERIAL_SPEC.md`.
- **Key Deliverables:**
  - Stucco, fluted walnut, travertine, anodized charcoal aluminum, low-iron glass, board-formed concrete, gravel, and water materials.
  - KTX2 / Basis Universal ORM channel-packed texture sets ($1024^2$ / $2048^2$).
  - Animated water surface normal shader.
- **Acceptance Criteria:** Material color samples match reference frame color values; hone travertine exhibits soft specular reflections under directional light; total texture memory $< 15\text{MB}$ VRAM.

---

### M5 — Lighting & Atmospheric Calibration (Day to Dusk)
- **Dependency:** M4
- **Objective:** Implement physical lighting, shadows, and dynamic day-to-twilight sky transitions matching the reference progression.
- **Key Deliverables:**
  - Golden hour directional sunlight ($35^\circ$ elevation) with PCF soft shadow maps.
  - Dynamic sky dome transitioning from golden azure to twilight indigo gradient.
  - Interior downlight arrays, warm linear ceiling cove strips, and plinth base reveals.
  - Exponential distance fog (`THREE.FogExp2`).
- **Acceptance Criteria:** Renders match the warm golden exterior of Shot 01/02 and the atmospheric dusk glow of Shot 04; zero shadow acne or edge light leaks.

---

### M6 — Exterior Camera Choreography (Shots 01 & 02)
- **Dependency:** M5
- **Objective:** Implement the exterior camera spline trajectory, descent crane, pool approach, and dynamic door opening.
- **Key Deliverables:**
  - Spline waypoints $t = 0.00 \to 0.28$ parameterized via centripetal Catmull-Rom curve.
  - Dynamic proximity door opening function ($\theta_{\text{door}}(Z)$ swinging $0^\circ \to -85^\circ$ as camera approaches).
  - Quaternion Slerp look-at tracking with dampQ smoothing.
- **Acceptance Criteria:** Exterior flight matches reference frames 000–131 in speed, height, framing, and door clearance with zero geometry clipping.

---

### M7 — Interior Camera Trajectory (Shots 03 & 04)
- **Dependency:** M6
- **Objective:** Implement the interior corridor tracking shot, workspace pass, atrium expansion, and rear twilight vista crane.
- **Key Deliverables:**
  - Spline waypoints $t = 0.28 \to 1.00$.
  - Continuous axial tracking through corridor past glass workspace at $1.60\text{m}$ eye level.
  - Double-height atrium volumetric reveal.
  - Dissolve / camera transition to the elevated twilight perspective.
- **Acceptance Criteria:** Interior walkthrough matches reference frames 132–239 with locked horizon ($0^\circ$ roll) and zero stuttering.

---

### M8 — Portfolio Room Spatial Layout & Waypoint Architecture
- **Dependency:** M7
- **Objective:** Spatially map Santheesh's portfolio narrative across the architectural zones of the residence.
- **Key Deliverables:**
  - Zone 01: EXTERIOR (Identity & Hero)
  - Zone 02: FOYER (About & Architectural Index)
  - Zone 03: GALLERY (Story & Principles)
  - Zone 04: PROJECT STUDIO (7 Production Projects)
  - Zone 05: ENGINEERING LAB (AI & Tech Stack)
  - Zone 06: ARCHIVE (Hackathons & Open Source Proof)
  - Zone 07: STUDY (Engineering Philosophy)
  - Zone 08: CONTACT (Direct Inquiry & Social Links)
  - Zone 09: TERRACE (Cinematic Finale)
- **Acceptance Criteria:** Every zone mapped to exact 3D coordinates and camera spline segments.

---

### M9 — 360° Room Experience & Interactive Orbit Controls
- **Dependency:** M8
- **Objective:** Enable visitors to pause at any room waypoint and break out into an interactive 360° inspection orbit.
- **Key Deliverables:**
  - Constrained spherical orbit controls ($|\Delta \theta| \le 35^\circ$, $|\Delta \phi| \le 20^\circ$).
  - Smooth spring return to the primary cinematic spline upon release.
  - Pointer drag, touch swipe, and device orientation handling.
- **Acceptance Criteria:** Orbit feels tactile and responsive; camera never clips through walls or floors; return spring is fluid with zero overshoot.

---

### M10 — Portfolio Content Integration
- **Dependency:** M9
- **Objective:** Connect Santheesh's real engineering data (`src/data/projects.ts`, `skills.ts`, `proof.ts`) into the spatial environment.
- **Key Deliverables:**
  - Integration of all 7 production projects: ORION, HeartTune, NISF, AHAL AI, PRYSM, BHOOMI, MINCHAL.
  - Integration of 23 engineering technologies across AI, Frontend, Backend, and Infrastructure.
  - Interactive project detail modal overlay with live demo links, architecture diagrams, and GitHub repositories.
- **Acceptance Criteria:** All project content matches `src/data/*` single source of truth; zero placeholder copy.

---

### M11 — Exhibition Plinths & Holographic 3D Blueprints
- **Dependency:** M10
- **Objective:** Create custom holographic spatial blueprint shaders hovering above the travertine plinths (matching reference frames 133 & 169).
- **Key Deliverables:**
  - Custom GLSL shader with animated horizontal scanlines, Fresnel rim glow, and electric cyan palette (`#00F0FF` / `#2DD4BF`).
  - Interactive project models (rotating wireframe geometries representing AI neural networks, audio waves, geospatial grids).
  - Hover states and raycasting interaction.
- **Acceptance Criteria:** Holograms display sharp wireframes, soft bloom emission, and maintain 60fps without fill-rate penalties.

---

### M12 — Cinematic Minimalist UI & Navigation Systems
- **Dependency:** M11
- **Objective:** Implement the minimalist 2D screen-space HUD overlay that supports rather than distracts from the architecture.
- **Key Deliverables:**
  - Top-left room coordinate label (`EXTERIOR // 34.0522° N, -118.2437° W`).
  - Top-right architectural index navigation directory.
  - Bottom-left normalized progress scrubber ($0.0 \to 1.0$).
  - Responsive mobile drawer navigation.
- **Acceptance Criteria:** HUD typography follows Swiss architectural grid; pointer-events cleanly isolated from the 3D canvas.

---

### M13 — Cinematic Polish, Soundscape & Post-Processing
- **Dependency:** M12
- **Objective:** Add final atmospheric polish, selective bloom, tone mapping, and an optional subtle architectural audio landscape.
- **Key Deliverables:**
  - Selective UnrealBloomPass isolated to cyan holograms and warm cove LEDs.
  - Subtle architectural camera vignette and chromatic dispersion ($< 0.002$).
  - Ambient spatial soundscape (soft desert wind on terrace, muffled acoustic warmth inside foyer, subtle UI click tones) with mute state saved in localStorage.
- **Acceptance Criteria:** Audio plays only after explicit user interaction; bloom never washes out building contrast; post-processing pass adds $< 1.5\text{ms}$ GPU overhead.

---

### M14 — WebGL Performance Optimization & Mobile Responsiveness
- **Dependency:** M13
- **Objective:** Optimize geometry, draw calls, shaders, and rendering pipelines for flawless performance across all device tiers.
- **Key Deliverables:**
  - Draco / Meshopt compression applied to all production assets.
  - Automatic GPU capability detection tiering (High / Med / Low DPR, shadow map sizing, bloom disable).
  - Mobile touch gesture tuning.
- **Acceptance Criteria:** Locked 60fps on modern desktop, $\ge 35\text{fps}$ on mobile; initial model load time $< 2.5\text{s}$ on fast 4G.

---

### M15 — Accessibility (a11y), Screen Readers & Reduced-Motion
- **Dependency:** M14
- **Objective:** Guarantee that all portfolio content is completely accessible to users with disabilities and alternative input devices.
- **Key Deliverables:**
  - Full screen reader DOM tree mirroring the 3D room contents (`role="region"`, `aria-label`).
  - Keyboard navigation support (`Tab`, `Enter`, `ArrowKeys` traversing rooms and plinths).
  - Reduced-motion mode (`prefers-reduced-motion`) replacing 3D camera travel with static architectural photography slides.
- **Acceptance Criteria:** WCAG 2.1 AA compliance; lighthouse accessibility score $\ge 95/100$.

---

### M16 — Final Production Hardening, SEO & Launch
- **Dependency:** M15
- **Objective:** Final end-to-end quality assurance, metadata verification, SEO indexing, and production deployment.
- **Key Deliverables:**
  - Full static build verification (`next build`).
  - OpenGraph social share cards, favicon set, `robots.txt`, and `sitemap.xml`.
  - Zero console warnings or WebGL memory leaks on unmount.
- **Acceptance Criteria:** Production build succeeds cleanly; all regression tests green; live deployment verified.
