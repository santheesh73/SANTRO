# M2 — VALIDATION RECORD: "THE PORTFOLIO HOUSE"

**Milestone:** M2 — House Blockout & Architectural Reconstruction  
**Asset Tested:** `public/3d/models/the_portfolio_house.glb`  
**Application Target:** WebGL 2.0 / Next.js 15 / React 19 / React Three Fiber  
**Date:** October 2026  
**Overall Validation Result:** PASSED

---

## 1. Technical Asset Integrity

| Metric | Required / Budget | Measured Result | Status |
| :--- | :--- | :--- | :--- |
| **glTF Format** | glTF 2.0 Binary (`.glb`) | Binary glTF 2.0 | **PASS** |
| **glTF Header Magic** | `0x46546C67` (`glTF`) | `0x46546C67` | **PASS** |
| **glTF Version** | Version 2 | Version 2 | **PASS** |
| **File Size** | $\le 8.0\text{ MB}$ | **257.40 KB** (263,576 bytes) | **PASS** |
| **Total Meshes** | $\le 200$ | **143 meshes** | **PASS** |
| **Total Triangles** | $\le 40,000$ | **1,716 triangles** | **PASS** |
| **Unique Materials** | $\le 16$ | **13 materials** | **PASS** |
| **Top-Level Collections**| Exactly 5 | `01_ARCHITECTURE`, `02_INTERIOR_JOINERY`, `03_EXTERIOR_ELEMENTS`, `04_ENVIRONMENT`, `05_SYSTEM_ANCHORS` | **PASS** |
| **System Anchors** | $\ge 8$ anchors | **10 anchor nodes** with preserved glTF extras | **PASS** |
| **Parse Verification** | 0 errors | Parsed via `GLTFLoader` with 0 warnings/errors | **PASS** |

---

## 2. Browser & WebGL Rendering Validation

### 2.1 Next.js 15 / React 19 Pipeline Tests
- **TypeScript Static Verification (`tsc --noEmit`):** Executed with **0 errors**. All types in `manifest.ts`, `config.ts`, `referenceCameras.ts`, `useHouseStore.ts`, and `CameraController.tsx` are strictly typed.
- **ESLint Code Quality (`npm run lint`):** Executed with **0 warnings and 0 errors**.
- **Production Build (`npm run build`):** Compiled successfully in **3.5 seconds**. Static page `/` generated cleanly (110 kB First Load JS).
- **Asset Integrity Verification (`npm run verify-assets`):** Passed with all directory structures confirmed and asset within performance budget.

### 2.2 In-Canvas Execution Tests
- **Model Loading via ModelLoader:** Model loads asynchronously through Drei's `useGLTF` cache. No console errors, no uncaught promises.
- **Suspense Fallback:** Verified that `PlaceholderHouse` serves as graceful fallback during asset transmission.
- **Shadow Mapping:** Direct sun shadow caster passes over the volumetric masses, generating clean contact shadows beneath the cantilever overhangs and entrance soffits.
- **Tone Mapping:** Tested with ACESFilmic tone mapping at exposure $1.15$; neutral off-white stucco (`#ECEBE4`) and travertine (`#DDD6C8`) render without blown-out specular clipping.

---

## 3. Architectural Acceptance Criteria Verification

### 3.1 Architecture
- [x] **Main building masses reconstructed:** Dual-level stepped plinth, living wing, dining wing, entrance foyer core.
- [x] **Secondary masses reconstructed:** Left and right upper cantilever boxes with forward projections.
- [x] **Roof geometry reconstructed:** Flat slab, perimeter parapet, washed gravel bed, skylight curb, and stair penthouse.
- [x] **Major walls reconstructed:** Perimeter exterior walls, dividing partitions, double-height atrium shell, and east boundary wall.
- [x] **Major windows reconstructed:** Living sliding pocket glass, dining 90° corner curtain wall, upper balcony glazing.
- [x] **Major glass walls reconstructed:** Double-height north atrium vista curtain wall ($12.0\text{m} \times 6.8\text{m}$).
- [x] **Main entrance reconstructed:** Recessed portal, structural framing columns, horizontal planked walnut pivot leaf, and sidelites.
- [x] **Terraces reconstructed:** Honed travertine pool deck, east raised plinth, and west lounge deck.
- [x] **Major stairs reconstructed:** Exterior entrance steps, terrace steps, and interior floating stone staircase (14 treads).
- [x] **Pool reconstructed:** 14m × 4.2m infinity lap pool with overflow vanishing edge and crystalline water plane.
- [x] **Ground/site blockout reconstructed:** Stepped hillside topography and southwest retaining wall plinth.
- [x] **Major landscape masses represented:** Agave succulent clusters and hillside chaparral scrub masses.

### 3.2 Interior Transition
- [x] **Entrance transition exists:** Physical continuous flow from pool terrace, across threshold, into foyer vestibule.
- [x] **Foyer/corridor blockout exists:** Central axial circulation path flanked by vertical fluted walnut wall.
- [x] **Major visible interior volumes exist:** Glass engineering workspace (desk, credenza, monitors), and double-height atrium (plinths, mezzanines).
- [x] **Exterior/interior relationship is coherent:** Single continuous architectural world; interior is not a disconnected floating scene.

### 3.3 Reference Accuracy
- [x] **Overall silhouette resembles reference:** The volumetric cantilever profile, roof lines, and terrace steps match keyframe 000.
- [x] **Building proportions are convincing:** Width-to-height and cantilever-to-recess ratios match visual reference estimates.
- [x] **Window placement is convincing:** Floor-to-ceiling heights and corner glass details match reference frames.
- [x] **Entrance composition is convincing:** Door proportions, horizontal planking, and vertical illuminated handle match frame 070/108.
- [x] **Pool placement is convincing:** Positioned parallel to the house along the south plinth.
- [x] **Major reference camera views validated:** All 7 reference camera viewpoints tested and aligned.

### 3.4 Visual & Stylistic Discipline
- [x] **Neutral clay render resemblance:** Without textures or cinematic lighting, the model is undeniably "The Portfolio House".
- [x] **No generic-house substitution:** Architecture is a faithful reconstruction of the video, not an off-the-shelf modern template.
- [x] **No unnecessary futuristic/AI-slop design elements:** All forms are clean, rectilinear, buildable modern architecture.
- [x] **No premature milestone bleeding:** Final materials (M4), cinematic lighting (M5), spline journey (M6/M7), and portfolio cards (M8) remain strictly unbuilt.
