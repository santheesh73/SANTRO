# SCENE ARCHITECTURE SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M0 — Project Baseline & Reference Analysis  
**Framework:** Next.js 16 (App Router) + React 19  
**3D Engine:** Three.js (`^0.186.0`) + React Three Fiber (`@react-three/fiber` `^9.8.0`)  
**3D Ecosystem:** `@react-three/drei` (`^10.7.8`), `@react-three/postprocessing`  
**State Architecture:** Zustand (`^5.0.0`)  
**Animation (2D HUD):** Motion for React (`motion` `^13.2.0`)

---

## 1. Architectural Philosophy: The House as the Interface

Unlike traditional web portfolios where a 3D canvas acts merely as a decorative background canvas or a hero element, **"The Portfolio House" is the primary operational user interface**. 

The visitor does not read about engineering capability in isolated text boxes; they physically navigate through an architectural environment where:
- The **Entrance Foyer** displays the core identity, roles, and structural index.
- The **Gallery Corridor** showcases engineering principles on the timber wall.
- The **Glass Engineering Workspace** houses real-time workstation setups and code proof.
- The **Double-Height Exhibition Atrium** exhibits Santheesh's marquee software architectures on floating holographic travertine plinths.
- The **Rear Mountain Vista** delivers the closing contact portals and panoramic twilight view.

The UI is deliberately designed to **subordinate itself to the architecture** (minimalist typography, hairline HUD borders, uncluttered viewport).

---

## 2. Component Hierarchy & Scene Graph

```text
src/components/house/
+---------------------------------------------------------------------------------------+
| <HouseExperience>  (Client root wrapper, responsive event listener, Zustand bridge)  |
+---------------------------------------------------------------------------------------+
    |
    +---> <Canvas>  (WebGL 2.0, ACESFilmic ToneMapping, sRGB Color Management)
    |         |
    |         +---> <Suspense fallback={<LoadingScene />}>
    |         |         |
    |         |         +---> <Atmosphere />
    |         |         |     - Dynamic sky hemisphere (Golden Hour -> Twilight Indigo)
    |         |         |     - Exponential distance fog (THREE.FogExp2)
    |         |         |
    |         |         +---> <HouseLighting />
    |         |         |     - Directional Sun light with tightly bounded PCSS shadows
    |         |         |     - Ambient fill light & ground bounce
    |         |         |     - Interior downlight arrays & plinth cove glow
    |         |         |
    |         |         +---> <HouseModel />
    |         |         |     - useGLTF('/models/the_portfolio_house.glb')
    |         |         |     - Ref-hooked dynamic nodes (Door Pivot, Glass sliding)
    |         |         |     - PBR Material binding (Travertine, Walnut, Stucco, Glass)
    |         |         |
    |         |         +---> <InteractiveExhibits />
    |         |         |     - 7 Exhibition Plinth Anchors (ORION, HeartTune, NISF, etc.)
    |         |         |     - Custom Holographic Blueprint Shaders (<HologramShader />)
    |         |         |     - Raycast hitboxes & pointer hover indicators
    |         |         |
    |         |         +---> <CameraRig />
    |         |         |     - CatmullRom spline evaluation (t: 0.0 -> 1.0)
    |         |         |     - Quaternion Slerp look-at tracking with dampQ
    |         |         |     - OrbitControls breakout during Room Inspect mode
    |         |         |
    |         |         +---> <PostProcessing />
    |         |               - Selective UnrealBloomPass (Cyan holograms & LED coves)
    |         |               - Subtle architectural lens vignette & color grading
    |         |               - FXAA anti-aliasing pass
    |         |
    |         +---> <Preload all />
    |
    +---> <CinematicHUD />  (2D Screen-space Overlay, pointer-events: none)
    |         |
    |         +---> <RoomBreadcrumb />        (Top-left: Current room title & coordinates)
    |         |
    |         +---> <DirectoryNav />          (Top-right: Minimalist index room selector)
    |         |
    |         +---> <ScrollProgressIndicator /> (Bottom-left: Normalized progress bar 0.0-1.0)
    |         |
    |         +---> <InspectionControls />    (Bottom-center: "Inspect Plinth" / "Exit Orbit")
    |         |
    |         +---> <ExperienceControls />    (Bottom-right: Audio toggle, Quality toggle)
    |
    +---> <ProjectDetailModal />  (Expandable full-screen project drawer on plinth click)
```

---

## 3. WebGL Canvas Configuration

The WebGL renderer must be initialized with production-grade settings ensuring pristine architectural line clarity, accurate lighting response, and zero frame stutter:

```typescript
// Canvas Configuration Specification
export const canvasConfig: CanvasProps = {
  gl: {
    powerPreference: "high-performance",
    antialias: false, // Antialiasing handled via FXAA pass to maintain 60fps
    alpha: false,     // Opaque canvas avoids unnecessary compositing blend overhead
    depth: true,
    stencil: false,
    outputColorSpace: THREE.SRGBColorSpace,
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.15,
  },
  dpr: [1, 1.75], // Dynamically clamped between 1.0 and 1.75 to prevent Retina 3x overdraw
  camera: {
    fov: 48,
    near: 0.1,
    far: 250.0,
    position: [4.2, 12.5, 26.0],
  },
  shadows: {
    type: THREE.PCFSoftShadowMap,
  },
};
```

---

## 4. State Management Architecture: `useHouseStore`

A dedicated Zustand store coordinates the continuous spatial state across 3D scene elements, camera physics, and 2D overlay HUDs:

```typescript
// src/store/useHouseStore.ts
export type SpatialZone = 
  | 'EXTERIOR'
  | 'ENTRANCE'
  | 'FOYER'
  | 'GALLERY'
  | 'STUDIO'
  | 'LAB'
  | 'ARCHIVE'
  | 'STUDY'
  | 'CONTACT'
  | 'TERRACE';

export type CameraMode = 'spline' | 'inspect' | 'free';
export type QualityTier = 'high' | 'medium' | 'low';

export interface HouseState {
  // Spatial Journey Progress (0.0 to 1.0)
  scrollProgress: number;
  targetProgress: number;
  currentZone: SpatialZone;
  
  // Camera & Interaction
  cameraMode: CameraMode;
  inspectTargetId: string | null;
  isDoorOpen: boolean;
  doorAngle: number; // in radians: 0.0 to -1.48 (approx -85 deg)
  
  // Interactive Project Modal
  activeProjectId: string | null;
  isModalOpen: boolean;
  
  // Performance & System
  qualityTier: QualityTier;
  isAudioMuted: boolean;
  isLoading: boolean;
  loadingProgress: number; // 0 to 100
  
  // Actions
  setScrollProgress: (progress: number) => void;
  navigateToZone: (zone: SpatialZone) => void;
  enterInspectMode: (targetId: string) => void;
  exitInspectMode: () => void;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
  setDoorAngle: (angle: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  toggleAudio: () => void;
}
```

---

## 5. Lighting & Shadow Architecture

To preserve cinematic realism while staying within strict mobile WebGL light limits (avoiding shader recompilations from dynamic light counts):

### 5.1 Directional Sun Light (Primary Shadow Caster)
- **Intensity:** $2.8$ (Day) $\to 0.0$ (Twilight).
- **Position:** $[+25.0\text{m}, +38.0\text{m}, +18.0\text{m}]$ casting long geometric shadows through the cantilever openings.
- **Shadow Map Resolution:** $2048 \times 2048$ with PCF soft filtering.
- **Orthographic Frustum:** Tightly bounded to $42.0\text{m} \times 42.0\text{m}$ enclosing the house and pool plinth.

### 5.2 Dynamic Hemisphere Sky Lighting
- **Sky Color:** `#E8F0FE` (Day azure) $\to `#2B2B48` (Dusk indigo).
- **Ground Color:** `#DDD6C8` (Warm travertine reflection).
- **Intensity:** $0.6$ (Day) $\to 0.25$ (Twilight).

### 5.3 Interior Architectural Downlights & Coves
- Rather than adding dozens of individual dynamic Three.js `PointLight` sources (which degrade fill rates and trigger WebGL uniform limits), interior lighting uses a **hybrid approach**:
  1. **Linear Cove Strips & Plinth Base:** Self-illuminated emissive meshes (`MeshBasicMaterial`, intensity $3.2$) with selective bloom pass.
  2. **Proxy Key Spotlights:** Exactly two optimized `SpotLight` fixtures strategically placed inside the Foyer and Atrium to cast subtle soft downlight pools onto the travertine floor.
  3. **Light Probe / Environment Irradiance:** Screen-space ambient occlusion (SSAO) and HDR environment map to illuminate shadowed interior recesses.

---

## 6. Asset Loading, Preloading & Hydration Strategy

To eliminate jarring pop-in or stuttering textures during the visitor's first walkthrough:

1. **Static Preload Hook:**  
   `useGLTF.preload('/models/the_portfolio_house.glb')` executes during root application mount, priming the browser cache.
2. **Draco / Meshopt Worker Decoders:**  
   Decoders are hosted locally in `public/draco/` and executed in web worker threads off the main UI loop.
3. **Suspense Hydration Boundary:**  
   `<Suspense fallback={<LoadingScene />}>` displays an architectural wireframe preloader with real-time percentage progress before revealing the canvas.
4. **GPU Texture Upload Warming:**  
   Before fading out the loading screen, the renderer runs a single off-screen render pass (`gl.compile(scene, camera)`) to compile all PBR shaders and upload textures into VRAM without dropped frames.

---

## 7. Responsive & Mobile Adaptive Architecture

| Device Class | Viewport Width | DPR | Shadows | Post-Processing | Camera Path Adjustments |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **High Desktop** | $\ge 1280\text{px}$ | $1.5 - 1.75$ | Enabled ($2048^2$) | Full Bloom + FXAA | Standard Reference Trajectory |
| **Laptop / Tablet**| $768\text{px} - 1279\text{px}$ | $1.25$ | Enabled ($1024^2$) | Fast Bloom | Standard Trajectory |
| **Mobile Phone** | $< 768\text{px}$ | $1.0$ | Static / Low ($512^2$) | Disabled / CSS Glow | Widened FOV ($+6^\circ$) to fit vertical screen ratio |

---

## 8. Milestone M10–M12 Integration Handoff

This architecture establishes the concrete foundation for:
- **M10 (Portfolio Content):** Binding `src/data/projects.ts` and `src/data/skills.ts` to `<InteractiveExhibits />`.
- **M11 (Exhibition Design):** Rendering holographic spatial plinths with custom shader uniforms.
- **M12 (UI Navigation):** Mounting `<CinematicHUD />` and wire-up to the Zustand `navigateToZone` action.
