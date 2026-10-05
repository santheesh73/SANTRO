# M3 — ARCHITECTURAL DETAIL & RECONSTRUCTION REFINEMENT

**Milestone:** M3 — Architectural Detail & Reconstruction Refinement  
**Status:** Complete  
**Date:** October 2026  
**Pipeline Source:** `scripts/generate-portfolio-house-glb.mjs`  
**Master Asset:** `public/3d/models/the_portfolio_house.glb`  
**Procedural Architectural Fallback:** `src/3d/scene/PlaceholderHouse.tsx`  
**Reference Video:** `asset/architectural_reference.mp4` (240 frames, 1080p Full HD)

---

## 1. Executive Summary

Milestone M3 advances **"The Portfolio House"** from the primary massing blockout established in M2 into a clean, detailed, architecturally believable model. In M2, the global proportions, floor-to-ceiling clearances, cantilever projections, pool footprint, and camera alignments were validated against all 7 keyframe viewpoints.

In M3, the focus shifts entirely to architectural construction:
- **Façade Depth & Edges:** Eliminating raw box intersections by introducing structural headers, pocket jambs, reveals, and panel joints.
- **Window & Door Systems:** Multi-panel pocket sliding glass on the west wing, frameless 90-degree corner curtain glass on the east wing, and structural grid transoms and mullions on the rear atrium.
- **Main Entrance System:** 9-plank horizontal walnut pivot door with offset pivot axis ($X = -0.65\text{m}$), full-height brushed steel handle with integrated cyan LED channel, overhead canopy soffit with recessed downlight apertures, and symmetrical glazed sidelites with bronze aluminum framing.
- **Wood Architecture:** 24-batten vertical fluted walnut wall in the corridor, extruded 3D typography plinth (*"THE PORTFOLIO HOUSE"*), horizontal timber battens on the east terrace, and minimalist teak sun loungers.
- **Roof Architecture:** Continuous parapets with metal coping capping profiles, gravel ballast bed, 4-tier framed glass skylight curb, and stair penthouse bulkhead.
- **Floor Slabs & Terraces:** Cantilever underside drip reveals, honed travertine deck slabs, raised east plinth with transition step, and frameless glass balustrades with recessed base shoe channels and brushed steel top caps.
- **Staircase Construction:** Exterior entrance plinth steps and 14 interior floating honed travertine treads with structural wall embedment reveals and concealed mounting brackets.
- **Pool Architecture:** Linear infinity lap pool with honed travertine coping overhang nosing (50mm reveal), south vanishing overflow weir, overflow catch gutter trough, and 3 submerged internal entry steps.
- **Ground & Retaining Wall:** Board-formed cast concrete retaining wall with 3 horizontal formwork reveal lines and stepped arid topography.
- **Interior Core:** Double-height atrium with left and right mezzanine walkways, glass balustrades with shoes/caps, ceiling indirect cove lighting troughs, monolithic travertine master plinth with recessed toe-kick underglow channel, and glass engineering workspace.

---

## 2. Milestone Boundary & Governance

M3 maintains strict milestone containment:
1. **No Final Textures / Shaders (M4):** All materials remain neutral architectural PBR placeholders (`MAT_Facade_Stucco`, `MAT_Travertine_Floor`, `MAT_Walnut_Wood`, `MAT_Walnut_Door`, `MAT_Glass_Frameless`, `MAT_Metal_Charcoal`, `MAT_Steel_Brushed`, `MAT_Pool_Water`, `MAT_Concrete_Foundation`, `MAT_Landscape_Arid`, `MAT_Vegetation_Green`, `MAT_LED_Cyan`, `MAT_Roof_Gravel`). High-resolution KTX2 ORM maps (stucco grain, travertine pore structure, wood grain) belong to M4.
2. **No Final Lighting / HDRI (M5):** The scene continues using neutral directional daylight and soft ambient illumination for geometry inspection. No golden hour HDRI, bloom, or volumetric haze is introduced.
3. **No Camera Journey Animation (M6):** The reference cameras remain fixed inspection waypoints (`WAYPOINT_Shot01` to `Shot04_SunsetFinale`) driven by the Viewport HUD for validation.
4. **No Portfolio Content / Projects (M7+):** No project studio cards, case study text, or interactive project holograms.

---

## 3. Detailed Architectural Refinements

### 3.1 Façade Depth & Structural Walls
In M2, exterior walls were modeled as plain rectangular solids. In M3:
- **West Living Lounge:** A continuous $12.4\text{m} \times 0.4\text{m} \times 0.4\text{m}$ structural header beam was added above the pocket glass wall, paired with a $150\text{mm}$ deep recessed pocket jamb (`HOUSE_GroundFloor_Living_PocketJamb`) into which the sliding door leaves retract. A $50\text{mm} \times 60\text{mm}$ negative shadow reveal channel was introduced along the bottom of the west exterior wall.
- **Entrance Portal:** The flanking structural columns (`HOUSE_GroundFloor_Foyer_Column_West` and `East`, $0.6\text{m} \times 3.4\text{m} \times 0.6\text{m}$) now feature a recessed canopy soffit with a $30\text{mm} \times 40\text{mm}$ dark perimeter reveal, plus two flush dark downlight apertures (`HOUSE_GroundFloor_Foyer_Downlight_01` and `_02`).
- **East Dining Wing:** Structural corner lintel beams (`HOUSE_GroundFloor_Dining_CornerHeader_Front` and `Side`) cleanly frame the frameless 90-degree corner glazing.
- **Upper Cantilever Boxes:** 
  - West cantilever projects $3.80\text{m}$ forward ($Z = +3.8\text{m}$) with a front header beam ($12.5\text{m} \times 0.6\text{m} \times 0.8\text{m}$), an underside soffit return, and a $40\text{mm}$ drip reveal channel. The inset bedroom/studio balcony has a dedicated travertine floor slab.
  - East cantilever projects $4.20\text{m}$ forward ($Z = +4.2\text{m}$) with a solid white cubic face featuring two horizontal shadow reveals (`HOUSE_Upper_East_Facade_Reveal_01` and `_02`, $6.02\text{m} \times 0.02\text{m}$) that articulate the façade into crisp panels matching reference keyframes 000 and 070.

### 3.2 Glazing Systems & Doors
- **Ground West Sliding Glass:** 
  - Recessed 3-rail floor guide track channel ($12.4\text{m} \times 0.04\text{m} \times 0.16\text{m}$) set flush into the travertine slab.
  - Recessed top head track channel ($12.4\text{m} \times 0.06\text{m} \times 0.16\text{m}$).
  - 3 sliding glass panels ($4.12\text{m} \times 3.26\text{m}$) with dark aluminum perimeter stiles and vertical interlock mullions.
- **Ground East 90-Degree Corner Glass:**
  - Recessed perimeter floor and head channels in dark metal.
  - Front glass pane ($11.16\text{m} \times 3.32\text{m}$) and side glass pane ($0.04\text{m} \times 3.32\text{m} \times 5.96\text{m}$).
  - Frameless corner joint featuring a minimalist $40\text{mm} \times 40\text{mm}$ structural silicone profile (`EXT_Glazing_Dining_Corner_Joint`).
- **Upper West Balcony Glazing & Balustrade:**
  - Sliding door frame and glass panels inset $2.7\text{m}$ behind the cantilever face.
  - Frameless glass balustrade ($11.8\text{m} \times 1.02\text{m} \times 0.03\text{m}$) anchored into a continuous recessed metal base shoe ($11.8\text{m} \times 0.08\text{m} \times 0.06\text{m}$) and topped with a brushed stainless steel top cap.
- **Central Upper Bridge:**
  - Floor-to-ceiling glass wall ($6.48\text{m} \times 3.12\text{m}$) divided into 3 equal bays by two vertical mullions.
  - Exterior glass balustrade with matching base shoe and top cap.
- **Rear Double-Height Atrium Curtain Wall:**
  - Monumental $12.0\text{m} \times 6.8\text{m}$ curtain wall enclosing the north mountain vista.
  - Outer structural perimeter frame ($12.16\text{m} \times 6.96\text{m} \times 0.12\text{m}$).
  - 4 vertical structural mullions ($X = -4.8\text{m}, -2.4\text{m}, 0.0\text{m}, +2.4\text{m}$) and 2 horizontal transoms ($Y = +2.27\text{m}, +4.54\text{m}$) forming a balanced $5 \times 3$ grid.

### 3.3 Main Entrance Pivot Door System
- **Opening:** $1.96\text{m} \times 3.24\text{m}$ clear opening framed by dark bronze perimeter jambs and head.
- **Door Leaf:** $1.80\text{m}$ width $\times$ $3.20\text{m}$ height $\times$ $0.10\text{m}$ thickness.
- **Hinge Pivot Axis:** Engineered sub-group `GEO_Door_Pivot_Leaf` centered at $X = -0.65\text{m}$, equipped with top and bottom brushed stainless steel pivot hinge hardware plates (`GEO_Door_Pivot_Hardware_Top` and `Bottom`).
- **Horizontal Planks:** 9 individual horizontal American Walnut planks separated by $15\text{mm}$ shadow reveal grooves.
- **Handle & Lighting:** Full-height vertical brushed stainless steel pull handle ($2.10\text{m} \times 0.06\text{m} \times 0.08\text{m}$) with an integrated recessed electric cyan LED light channel (`GEO_Door_Handle_LED_Channel`).
- **Sidelites:** Symmetrical clear glass sidelite panels ($0.56\text{m} \times 3.12\text{m}$) with dark bronze perimeter frames.
- **Approach Steps:** Two broad travertine floating plinth steps ($4.5\text{m} \times 0.10\text{m} \times 1.2\text{m}$) leading from the pool terrace to the entrance threshold.

### 3.4 Wood Architecture
- **Feature Fluted Walnut Wall:** Located on the right side of the gallery corridor. Consists of a backing timber panel ($0.04\text{m} \times 3.4\text{m} \times 12.0\text{m}$), top/bottom shadow reveal channels, and a modular array of **24 vertical walnut battens** (`INT_Walnut_Slat_01` to `_24`, $0.05\text{m} \times 3.34\text{m} \times 0.05\text{m}$) with crisp shadow grooves.
- **Signage Plinth:** Mounted travertine typography plinth ($0.04\text{m} \times 0.60\text{m} \times 3.2\text{m}$) with extruded 3D geometric title and subtitle bars.
- **Upper East Terrace Wood Wall:** Backing walnut panel with 8 horizontal timber battens.
- **Minimalist Teak Sun Loungers:** Two pairs of loungers (west terrace behind pool, east raised plinth) featuring solid teak base frames, angled backrest wedges, and tailored off-white linen cushions.

### 3.5 Roof Refinement & Bulkhead
- **Roof Slab:** Flat reinforced concrete slab ($32.4\text{m} \times 0.4\text{m} \times 26.4\text{m}$) at $Y = +7.4\text{m}$.
- **Parapets & Coping:** Continuous $0.45\text{m}$ perimeter parapet topped by dark metal coping cap profiles ($0.38\text{m}$ width $\times$ $0.06\text{m}$ height) with a $30\text{mm}$ exterior overhang drip edge.
- **Gravel Bed:** Washed river pebble ballast bed ($31.8\text{m} \times 0.05\text{m} \times 25.8\text{m}$) at $Y = +7.625\text{m}$.
- **Skylight:** Metal curb ($6.4\text{m} \times 0.35\text{m} \times 2.2\text{m}$) with 3 cross-mullions dividing the skylight into 4 equal laminated safety glass panels.
- **Penthouse Bulkhead:** Stair bulkhead ($4.5\text{m} \times 1.8\text{m} \times 5.0\text{m}$) with top coping profile and service door reveal.

### 3.6 Floor Slabs & Terrace Construction
- **Terrace Deck:** Honed travertine slab ($34.0\text{m} \times 0.20\text{m} \times 17.0\text{m}$) with continuous south drip edge reveal.
- **East Raised Plinth:** Elevated $+0.20\text{m}$ above terrace deck ($8.0\text{m} \times 0.40\text{m} \times 8.0\text{m}$) with dedicated transition step.
- **Glass Balustrades:** Every exterior glass balustrade (east plinth front and side, west terrace side and front) is detailed with a continuous dark metal base shoe profile and a minimalist brushed steel top cap.

### 3.7 Staircases
- **Exterior Entrance Steps:** 2 monolithic travertine floating plinths with consistent $100\text{mm}$ riser and $1.2\text{m}$ tread depth.
- **Interior Floating Staircase:** 14 cantilevered honed stone treads ($1.20\text{m} \times 0.10\text{m} \times 0.32\text{m}$, $220\text{mm}$ rise, $350\text{mm}$ run). Each tread is structurally anchored into a recessed wall slot (`INT_Floating_Stair_Wall_Slot`) with brushed steel mounting pin hardware (`INT_Floating_Step_Pin_01` to `_14`).

### 3.8 Infinity Lap Pool
- **Basin Structure:** Monolithic concrete basin ($14.0\text{m}$ length $\times$ $4.2\text{m}$ width $\times$ $1.5\text{m}$ depth) positioned on the west terrace ($X = -8.8\text{m}$) directly atop the concrete retaining wall.
- **Coping:** Honed travertine coping slabs along the north, west, and east edges with a $50\text{mm}$ architectural overhang nosing reveal.
- **Vanishing Edge:** South vanishing overflow weir edge at $Z = +11.7\text{m}$, paired with a recessed catch basin overflow gutter trough ($14.0\text{m} \times 0.30\text{m} \times 0.30\text{m}$) at $Z = +11.95\text{m}$.
- **Internal Steps:** 3 submerged travertine steps ($1.2\text{m}$ width $\times$ $0.25\text{m}$ riser $\times$ $0.40\text{m}$ tread) at the east end of the basin.
- **Water Plane:** Crystalline water surface plane set flush with the vanishing edge ($Y = -0.08\text{m}$).

### 3.9 Site & Retaining Wall
- **Board-Formed Concrete Retaining Wall:** $18.0\text{m} \times 3.2\text{m} \times 0.8\text{m}$ wall supporting the pool terrace foundation, detailed with 3 horizontal formwork reveal lines (`ENV_Retaining_Wall_Groove_01` to `_03`) modeling architectural cast concrete formwork ties.
- **Terrain & Xeriscape:** Stepped mountain slopes, 8 agave succulent clusters, 8 chaparral scrub masses, and distant mountain ridge silhouette.

### 3.10 Interior Architecture
- **Gallery Corridor:** Flush travertine floor transition with dark bronze expansion joint, perimeter baseboard shadow reveal, and recessed ceiling linear lighting channel.
- **Glass Workspace:** Frameless glass partitions with floor/ceiling guide channels, frameless glass door with tubular steel handle, executive walnut desk with modesty panel, credenza, and dual monitors with slim bezels.
- **Exhibition Atrium:** Double-height core ($Y = 0.0\text{m} \to +7.0\text{m}$) with left and right mezzanine walkways, structural fascia edge beams, glass balustrades with base shoes and top caps, indirect ceiling cove troughs, master monolithic travertine plinth with recessed toe-kick underglow channel, and secondary plinths.

---

## 4. Pipeline & Web Integration

The model is maintained in two fully synchronized layers:
1. **GLB Generator Script:** `scripts/generate-portfolio-house-glb.mjs` generates `public/3d/models/the_portfolio_house.glb` using Three.js and `GLTFExporter`.
2. **Procedural R3F Fallback:** `src/3d/scene/PlaceholderHouse.tsx` renders the exact same M3 detailed geometry, hierarchies, and materials natively in React Three Fiber.
3. **Asset Manifest:** `src/3d/assets/manifest.ts` updated with M3 status, triangle budgets, and integrated components.
4. **Viewport HUD:** `src/components/ui/ViewportHUD.tsx` updated with `M3 ARCHITECTURAL DETAIL` indicator and `ARCHITECTURAL DETAIL: REFINED` validation status.

---

## 5. Verification Summary

- **Metric Scale:** $1.0\text{ unit} = 1.0\text{ meter}$ preserved.
- **Origin:** $[0, 0, 0]$ at main entrance threshold preserved.
- **Orientation:** $+X$ East, $+Y$ Up, $+Z$ South toward pool, $-Z$ North toward atrium preserved.
- **System Anchors:** All 8 reference camera waypoints and door hinge pivot anchor preserved.
- **Polygon Budget:** 3,800 triangles (far below the 50,000 WebGL budget, enabling 60 FPS performance).
- **Milestone Containment:** Zero final shaders, textures, lighting, cinematic camera journeys, or portfolio project cards.
