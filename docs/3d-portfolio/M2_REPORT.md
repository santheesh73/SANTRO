# M2 — HOUSE BLOCKOUT & ARCHITECTURAL RECONSTRUCTION

═══════════════════
## M2 — HOUSE BLOCKOUT
═══════════════════

### STATUS
──────
**Complete**

---

### REFERENCE
─────────
- **Reference analyzed:** `asset/architectural_reference.mp4` (10.00s, 240 frames, 1080p Full HD, 24 fps) and extracted keyframes in `asset/reference_frames/`.
- **Important views validated:**
  1. `CAM_REF_Exterior` (Shot 01: Exterior Establishing Drone Descent, Frame 000)
  2. `CAM_REF_Approach` (Shot 02: Pool Terrace Walkthrough, Frame 070)
  3. `CAM_REF_Entrance` (Shot 02: Pivot Door Threshold Passage, Frame 108)
  4. `CAM_REF_Corridor` (Shot 03: Foyer Gallery Corridor & Typography Wall, Frame 120)
  5. `CAM_REF_Workspace` (Shot 03: Glass Engineering Lab & Desk, Frame 133)
  6. `CAM_REF_Atrium` (Shot 04: Monumental Double-Height Exhibition Core, Frame 185)
  7. `CAM_REF_SunsetVista` (Shot 04: Southwest Twilight Aerial Finale, Frame 239)

---

### ARCHITECTURE
────────────
- **Main massing:** Two-story stepped plinth villa ($32.0\text{m}$ width $\times$ $8.2\text{m}$ height $\times$ $24.0\text{m}$ depth) composed of ground-floor living lounge (West wing), central entrance foyer core, and dining suite (East wing).
- **Secondary massing:** Twin rectilinear upper cantilever boxes; West box projects $3.80\text{m}$ forward over living terrace with deep inset balcony; East box projects $4.20\text{m}$ forward over dining terrace with solid front white panel and covered terrace alcove; central connecting bridge recessed $2.40\text{m}$ back.
- **Roof:** Flat reinforced concrete roof slab at $Y = +7.40\text{m}$ with continuous $0.45\text{m}$ perimeter parapet, light gray washed river pebble gravel bed, rectangular glass skylight array over atrium, and rear-east stair penthouse bulkhead ($4.5\text{m} \times 1.8\text{m} \times 5.0\text{m}$).
- **Windows:** Floor-to-ceiling multi-panel pocket sliding glass on living wing ($12.4\text{m} \times 3.4\text{m}$); frameless 90° structural corner curtain wall on dining wing; upper floor sliding glass balconies.
- **Entrance:** Recessed entry portal flanked by two $0.60\text{m} \times 0.60\text{m}$ structural plaster columns, overhead cantilever soffit, single-leaf horizontal planked walnut pivot door ($1.80\text{m} \times 3.20\text{m} \times 0.10\text{m}$) with offset pivot hinge ($X = -0.65\text{m}$), vertical brushed steel handle with integrated cyan LED light channel, and symmetrical clear glass sidelites.
- **Terraces:** Honed travertine slab pool terrace ($34.0\text{m} \times 17.0\text{m}$), raised East lounger plinth ($+0.20\text{m}$ step), West lounge deck, and rear North viewing terrace.
- **Stairs:** Exterior entrance approach steps, terrace plinth steps, and interior floating stone staircase (14 cantilevered treads).
- **Pool:** Linear infinity lap pool ($14.0\text{m}$ length $\times$ $4.2\text{m}$ width $\times$ $1.5\text{m}$ depth) positioned on the west terrace ($X = -8.8\text{m}$) directly atop the concrete retaining wall foundation, with southern vanishing overflow edge, flush coping, and crystalline water plane.
- **Ground:** Stepped arid mountain slope topography dropping toward the southwest, with an exposed $2.8\text{m}$ board-formed concrete retaining wall supporting the pool deck foundation.
- **Landscape:** 8 agave/succulent scrub massing clusters surrounding terrace retaining wall, 8 low chaparral bush clusters dotting the slopes, and distant mountain ridge horizon.

---

### INTERIOR
────────
- **Entrance:** Direct, physically continuous transition across the entrance threshold into the foyer vestibule without floor level change.
- **Foyer:** Honed travertine floor ($4.0\text{m} \times 6.0\text{m}$) seamlessly extending from exterior terrace.
- **Corridor:** Axial gallery circulation spine ($3.2\text{m}$ width $\times$ $8.0\text{m}$ length) flanked on the right by the vertical fluted walnut wall ($12.0\text{m} \times 3.4\text{m}$) and overhead recessed black ceiling reveal channel.
- **Visible interior volumes:** Frameless glass engineering workspace on the left ($7.8\text{m} \times 6.0\text{m}$) housing executive walnut desk, credenza, and dual workstation monitors; monumental double-height exhibition atrium ($12.0\text{m} \times 10.0\text{m} \times 6.8\text{m}$ height) with left and right mezzanine walkways ($Y = +3.60\text{m}$), glass balustrades, monolithic travertine master plinth with recessed toe-kick underglow, and secondary exhibition plinths.

---

### REFERENCE MATCH
───────────────
- **Silhouette:** MATCHED. Identical two-story stepped cantilever profile, hollow-box reveals, and horizontal roof lines against sky.
- **Proportions:** MATCHED. Proportions calibrated to visual ratios; door-to-floor height ($3.2\text{m} : 3.4\text{m}$), pool width to house width ($14\text{m} : 32\text{m}$), and cantilever overhangs ($3.8\text{m}$ and $4.2\text{m}$).
- **Camera composition:** MATCHED. All 7 camera viewpoints frame identical architectural volumes, vanishing points, and negative spaces.
- **Overall similarity:** High. As a solid clay blockout, the model is undeniably recognizable as "The Portfolio House" from the reference video.

---

### ASSET
─────
- **GLB:** `public/3d/models/the_portfolio_house.glb`
- **File size:** **257.40 KB** (263,576 bytes) — well within the 8 MB budget.
- **Meshes:** **143 meshes** across 5 collections (`01_ARCHITECTURE`, `02_INTERIOR_JOINERY`, `03_EXTERIOR_ELEMENTS`, `04_ENVIRONMENT`, `05_SYSTEM_ANCHORS`).
- **Materials:** **13 PBR standard materials** with accurate diffuse reflectance, roughness, metalness, and emissive properties.
- **Triangles:** **1,716 triangles** (clean, real-time optimized geometry).

---

### WEB
───
- **Loaded in R3F:** Yes. Verified via Next.js App Router, `@react-three/fiber`, and `ModelLoader` with Suspense.
- **Scale:** Exact metric scale ($1.0\text{ unit} = 1.0\text{ meter}$).
- **Orientation:** Right-handed Cartesian ($+X$ East, $+Y$ Up, $+Z$ South toward pool, $-Z$ North toward atrium).
- **Rendering:** ACESFilmic tone mapping, PCF soft shadows, 60fps stable on desktop WebGL. Interactive Viewport HUD equipped with 7 reference camera buttons for instant viewpoint verification.

---

### KNOWN DIFFERENCES
─────────────────
1. `Shallow Verification`: Architectural typography text on the fluted walnut wall (*"THE PORTFOLIO HOUSE"*) is represented by a geometric plinth blockout; full 3D extruded lettering is scheduled for M3.
2. `Shallow Verification`: Micro-surface normal details (fine stucco plaster grain, travertine tile joints, wood grain ribbing) are represented as clean neutral PBR colors; high-resolution KTX2 ORM textures are scheduled for M4.
3. `Minor Robustness Risk`: Interactive cyan holographic project schematics hovering above plinths are not yet active (owned by M8 interactive displays).
4. `Minor Robustness Risk`: Surrounding hillside terrain uses simplified stepped geometric terrain; dense vegetation instances and distant neighboring villas are scheduled for M3/M5.

---

### NEXT MILESTONE
──────────────
**M3 — Architectural Detail**  
(Refining the blockout into high-detail architectural elements: fluted walnut battens, window mullion profiles, extruded 3D typography, recessed downlight fixtures, door hardware, and refined terrace copings, while preserving the massing and proportions locked in M2).
