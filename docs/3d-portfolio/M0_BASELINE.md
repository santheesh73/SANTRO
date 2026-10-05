# M0 — PROJECT BASELINE & TECHNICAL INVENTORY

**Date:** October 2026  
**Milestone:** M0 — Project Baseline & Reference Analysis  
**Author:** Senior Creative Frontend Engineer & 3D Technical Artist  
**Repository:** `santheesh73/SANTRO` / Workspace Baseline: `santheesh73/Portfolio`

---

## 1. Project Overview

This baseline audit evaluates the existing portfolio codebase (`santheesh73/Portfolio`) as the historical foundation for transitioning into **SANTRO** (`santheesh73/SANTRO`), a cinematic, interactive 3D architectural web portfolio. 

> **Repository Architecture Note:**  
> The current workspace (`d:\Projects\Santro`, repository `santheesh73/SANTRO`) is a clean, dedicated repository created specifically for the next-generation 3D architectural experience. The technical inventory and data models analyzed below were audited from the predecessor repository (`santheesh73/Portfolio`). In Milestone M1/M2, the Next.js 16 / React 19 application shell and data structures will be established in `SANTRO` cleanly, devoid of legacy 2D bloat, while preserving 100% of Santheesh's authentic project data and engineering achievements.

In this new paradigm, the portfolio is not a standard flat web document with a 3D canvas background. Instead, **the architecture itself is the user interface**: visitors physically journey through a modern luxury residence where each room, plinth, and spatial vista houses Santheesh's engineering work, projects, technical proficiencies, and architectural narrative.

---

## 2. Current Technical Stack Inventory

| Domain | Current Technology | Version | Notes / Assessment |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router, Turbopack) | `16.3.4` | Modern Next.js App Router architecture. Supports React Server Components (RSC) and client-side WebGL canvas islands. |
| **Runtime & Language** | React + TypeScript | `React 19.2.8` / `TS 5.x` | React 19 concurrent features. Strict TypeScript configuration enabled. |
| **Styling** | Tailwind CSS v4 + `@tailwindcss/postcss` | `^4.0.0` | Uses `@theme` CSS variable tokens in `src/app/globals.css`. |
| **Animation (2D UI)** | Motion for React (`motion`) | `^13.2.0` | Handles HUD, overlay transitions, and spring animations with reduced-motion support. |
| **3D Rendering** | Three.js | `^0.186.0` | Core WebGL/WebGPU-ready 3D rendering engine. |
| **3D React Binding** | `@react-three/fiber` (R3F) | `^9.8.0` | Declarative Three.js scene graph for React 19. |
| **3D Utilities** | `@react-three/drei` | `^10.7.8` | Provides loaders (`useGLTF`), camera controls, HTML overlays, and environment maps. |
| **State Management** | Zustand | `^5.0.0` | Fast, lightweight external state store for camera progress and room states. |
| **Icons** | Lucide React | `^1.44.0` | Minimalist stroke iconography for UI controls and HUD markers. |
| **Utility Libraries** | `clsx`, `tailwind-merge` | `2.1.1` / `3.6.0` | Class concatenation and conflict resolution. |
| **Build System** | Turbopack (`next build`) | Node 20+ | Production builds compile static routes (`SSG`) and prerendered artifacts. |
| **Linting & Types** | ESLint 9 (`eslint-config-next`) + `tsc` | Strict | Verified clean type checking and zero lint errors. |

---

## 3. Entry Points and Routing

- **Root Layout:** `src/app/layout.tsx`  
  Defines root `<html>` and `<body>` tags, font configurations (`Geist Sans`, `Geist Mono`), SEO metadata (`title`, `description`, `openGraph`), and viewport parameters.
- **Root Page:** `src/app/page.tsx`  
  Currently mounts a conventional vertical scrolling layout (`Hero`, `IdentityNarrative`, `ProjectsSection`, `AboutSection`, `SkillsSection`, `ProofSection`, `ContactSection`) wrapped in `ThemeProvider`.
- **Global Styling:** `src/app/globals.css`  
  Contains Tailwind CSS v4 `@theme` tokens, smooth scroll utilities, custom scrollbars, and color definitions.
- **Special Routes & Metadata:**  
  - `src/app/not-found.tsx` — 404 page  
  - `src/app/error.tsx` — Client-side error boundary  
  - `src/app/robots.ts` & `src/app/sitemap.ts` — Canonical search engine indexing  
  - `src/app/opengraph-image.tsx` — Dynamic OG banner generator  

---

## 4. Current Component Architecture

The existing codebase contains two competing paradigms:

### Paradigm A: 2D Flat Web Portfolio (Currently Active on `page.tsx`)
```text
src/components/
├── home/         # Hero, HeroVisual, IdentityNarrative, HeroScrollCue
├── projects/     # ProjectsSection, FeaturedProject, ProjectCard
├── about/        # AboutSection, EngineeringPrinciples, EducationCard
├── skills/       # SkillsSection, SkillGroup, SkillCard
├── proof/        # ProofSection, ProofTimeline, ProofCard
├── contact/      # ContactSection, CopyEmailButton
├── layout/       # Navbar, Footer
├── ui/           # Button, Badge, Card, Container, SectionHeading
└── motion/       # FadeIn, Reveal, Stagger
```

### Paradigm B: Early Procedural 3D Prototype (Unmounted in `page.tsx`)
```text
src/components/house/
├── HouseExperience.tsx       # Main canvas wrapper and UI overlay orchestrator
├── HouseScene.tsx            # R3F Canvas root containing lighting, camera rig, and house geometry
├── CameraRig.tsx             # Spline-based and waypoint-based camera animator (24KB)
├── SpatialNavigation.ts      # Spatial state definitions, waypoints, and room progress curves
├── ExteriorHouse.tsx         # Procedural Three.js box geometry attempting to fake house exterior
├── Entrance.tsx              # Procedural pivot door geometry
├── Foyer.tsx                 # Procedural hallway walls and lighting
├── Corridor.tsx              # Hallway procedural geometry
├── HouseLighting.tsx         # Sun, ambient, and directional lighting
├── InteriorLighting.tsx      # Downlights and accent fixtures
├── Atmosphere.tsx            # Sky, fog, and background hemisphere
├── CinematicHUD.tsx          # Minimal HUD showing room title, coordinates, and navigation cues
├── FinalExitOverlay.tsx      # Terrace exit modal
├── HouseErrorBoundary.tsx    # Fallback error wrapper
├── HouseFallback.tsx         # Low-spec / non-WebGL fallback view
├── LoadingScene.tsx          # Preload spinner and asset progress
└── rooms/                    # Procedural project plinths and tech stack pedestals
```

---

## 5. Current Data Structures & Source of Truth

The data layer in `src/data/` represents authentic engineering proof for **Santheesh S**:

1. `src/data/profile.ts`: Profile metadata, roles (AI Software Engineer, Full-Stack Developer), bio, and links.
2. `src/data/projects.ts`: Exactly 7 verified production projects:
   - **ORION:** Next-generation AI multimodal workspace
   - **HeartTune:** Emotion-aware audio intelligence engine
   - **NISF:** Real-time semantic search and vector retrieval platform
   - **AHAL AI:** Autonomous agent workflow orchestration
   - **PRYSM:** GPU-accelerated real-time visualization tool
   - **BHOOMI:** Geospatial ML intelligence platform
   - **MINCHAL:** Ultra-low-latency distributed inference pipeline
3. `src/data/skills.ts`: Exactly 4 engineering categories with 23 verified technologies:
   - Category 01: `AI & Machine Learning` (PyTorch, LangChain, Transformers, Ollama, etc.)
   - Category 02: `Frontend Engineering` (Next.js, React, Three.js, TypeScript, Tailwind)
   - Category 03: `Backend Systems` (Node.js, FastAPI, Python, PostgreSQL)
   - Category 04: `Data & Infrastructure` (Supabase, Docker, Pinecone, Redis, etc.)
4. `src/data/proof.ts`: Hackathons, open-source milestones, and achievements.
5. `src/theme/rooms.ts` & `src/theme/colors.ts`: Identity colors mapped to each project.

---

## 6. Current 3D Capabilities & Limitations

### Capabilities
- R3F (`v9.8.0`) and Three.js (`v0.186.0`) are installed and functional.
- Mathematical camera interpolation logic (`CatmullRomCurve3`, quaternions, damping) exists in `CameraRig.tsx`.
- Spatial state machine concept (`EXTERIOR → ENTRANCE → FOYER → PROJECTS → LAB → ARCHIVE → STUDY → CONTACT → TERRACE`) is partially prototyped in `SpatialNavigation.ts`.

### Critical Deficiencies of the Existing 3D Prototype
1. **Procedural Geometry vs. Reference Architecture:**  
   The existing `ExteriorHouse.tsx`, `Entrance.tsx`, and `Corridor.tsx` construct buildings out of raw Three.js primitive `<boxGeometry>` and `<planeGeometry>` blocks. They do **not** reflect the actual architecture, roof lines, cantilevers, window details, or proportions seen in the reference video (`asset/architectural_reference.mp4`).
2. **Missing Production GLB Pipeline:**  
   There is currently no external 3D asset loader (`useGLTF`), no Draco compression integration, and no Blender asset export pipeline.
3. **Materials are Generic:**  
   Existing materials use standard `meshStandardMaterial` with flat hex colors (`#f5f5f0`, `#1a1a1a`) lacking realistic PBR roughness maps, normal maps, wood grain, honed stone, or realistic architectural glass properties.
4. **Disconnected UI:**  
   The project currently defaults to a flat vertical web page. The 3D scene is bypassed in `page.tsx`.

---

## 7. Build and Verification Status

- **Type Check (`tsc --noEmit`):** PASS (0 errors).
- **ESLint (`npm run lint`):** PASS (0 warnings, 0 errors).
- **Unit Verification (`npm test` / `verify-p2.ts`):** PASS (All 5 project exhibition suites green).
- **Integration Verification (`verify-p4.ts`):** PASS (All 7 production QA suites green).
- **Next.js Production Build (`npm run build`):** PASS (Turbopack builds all 7 static pages in under 10 seconds).

---

## 8. Strategic Disposition: KEEP / MODIFY / REMOVE / ADD

### KEEP (Preserve Intact)
- **Data Models & Content (`src/data/*`):** Santheesh's real project data, technologies, timeline milestones, and profile must remain the single source of truth.
- **Type Definitions (`src/types/*`):** Clean TypeScript interfaces for projects, skills, proofs, exhibition transforms, and themes.
- **Test Scripts (`scripts/verify-p2.ts`, `scripts/verify-p4.ts`):** Crucial regression checks preventing data loss or fabricated items.
- **Core Next.js & Tailwind Configuration:** Root layout, fonts, meta tags, and utility functions (`clsx`, `twMerge`).
- **Media Asset:** `asset/architectural_reference.mp4` and extracted reference frames in `asset/reference_frames/`.

### MODIFY (Refactor for the 3D Experience)
- **`src/app/page.tsx`:** Transition from the 2D document scroll layout to the immersive 3D architectural canvas with overlay HUD.
- **`SpatialNavigation.ts` & Waypoints:** Re-align camera spline waypoints to match the exact floor plan, room layout, and camera trajectory extracted from the reference video.
- **`CinematicHUD.tsx`:** Refine HUD typography and controls to follow the reference video's clean architectural Swiss aesthetic.
- **`ThemeContext.tsx` & Theme Tokens:** Align color palette with the architectural reference (warm off-white stucco, travertine cream, dark bronze aluminum, rich walnut wood, and evening twilight lavender/magenta).

### REMOVE (Deprecate & Phase Out)
- **Procedural Primitive Meshes (`ExteriorHouse.tsx`, `Entrance.tsx`, etc.):** Replace with the Blender-reconstructed, web-optimized architectural model (`.glb`).
- **Heavy duplicate 2D page sections on mobile:** Replace with an integrated responsive layout that respects device capability without creating dual conflicting codebases.

### ADD (New Infrastructure for M1–M16)
- **3D Asset Pipeline:** Blender workspace, export scripts, and Draco/Meshopt compression pipeline.
- **Production Asset Directory:** `public/models/` housing `the_portfolio_house.glb`.
- **GLB Asset Loader & Preloader:** Robust Suspense-based loader with cache warming and progress feedback.
- **Holographic Blueprint Shader / Material:** Custom GLSL / Drei holographic material for spatial blueprints (matching frames 133 & 169).
- **PBR Architectural Material Library:** Dedicated material definitions for plaster, honed travertine, walnut, frameless glass, and water.
- **Documentation Suite:** Full M0–M16 engineering specifications in `docs/3d-portfolio/`.
