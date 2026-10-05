# M3 REFERENCE COMPARISON: "THE PORTFOLIO HOUSE"

**Milestone:** M3 — Architectural Detail & Reconstruction Refinement  
**Reference Video:** `asset/architectural_reference.mp4`  
**Reference Keyframes:** `asset/reference_frames/`  
**Model Under Test:** `public/3d/models/the_portfolio_house.glb` (and procedural fallback `src/3d/scene/PlaceholderHouse.tsx`)

---

## 1. Frame 000 — Shot 01: Exterior Establishing Drone Descent

### REFERENCE VIEW
- **Architecture:** Two-story stepped plinth luxury modernist residence perched upon an arid hillside ridge.
- **Massing:** Twin upper cantilever boxes projecting over recessed ground wings, separated by a recessed central connecting bridge and anchored by a flat roof with continuous parapet and rear-east stair bulkhead.
- **Façade:** Smooth off-white stucco with sharp horizontal and vertical shadow reveals; solid front cubic face on the upper east volume.
- **Openings:** Recessed ground-floor pocket glazing on the west; frameless 90° corner glass curtain wall on the east; floor-to-ceiling glass on upper terraces.
- **Entrance:** Recessed central entry portal flanked by structural white columns, recessed canopy soffit with flush downlights, and oversized walnut pivot door.
- **Terrace:** Broad honed cream travertine terrace deck with perimeter glass balustrades anchored in recessed base shoes and topped with brushed steel caps; raised east sun lounger plinth (+0.20m) with transition step.
- **Pool:** Linear infinity lap pool on the west terrace directly atop an exposed board-formed concrete retaining wall; 50mm travertine coping nosing reveal; south vanishing overflow weir reflecting sky.
- **Interior:** Visible depth through front glazing showing gallery corridor spine, walnut batten wall, and double-height core.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Surface micro-detail (stucco plaster grain, travertine tile joints, wood grain) is represented by clean neutral PBR colors; scheduled for M4 KTX2 ORM texture mapping.
2. Sunlight elevation and golden hour warm ambient fill are neutral; scheduled for M5 lighting milestone.

### NEXT CORRECTION
Progress to M4 to author high-resolution PBR surface maps without modifying architectural geometry.

---

## 2. Frame 070 — Shot 02: Pool Terrace Walkthrough Approach

### REFERENCE VIEW
- **Architecture:** Human-eye pedestrian perspective ($Y \approx 1.65\text{m}$) crossing the travertine pool terrace toward the main entrance.
- **Massing:** West cantilever overhang ($3.80\text{m}$ projection) creating deep natural solar shading over ground lounge; East cantilever overhang ($4.20\text{m}$ projection) framing approach.
- **Façade:** Structural columns, fascia header beams, and underside soffit drip reveals clearly readable.
- **Openings:** Ground pocket sliding glass showing 3 panels with dark aluminum stiles; 90° corner glass showing minimalist silicone corner joint.
- **Entrance:** Pivot door leaf ($1.80\text{m} \times 3.20\text{m}$) with 9 horizontal walnut planks and vertical steel handle with glowing cyan LED strip channel; symmetrical glass sidelites with bronze framing.
- **Terrace:** Travertine paving with continuous south drip edge profile; two pairs of minimalist teak sun loungers with tailored linen cushions.
- **Pool:** Honed travertine coping overhang nosing, south vanishing overflow weir, overflow catch gutter trough, and 3 internal submerged travertine entry steps at east end.
- **Interior:** Direct axial sightline through clear sidelites into the warm illuminated foyer vestibule.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Water surface wave displacement / normal caustics are represented as a clean smooth transparent water plane; scheduled for M4 water shader.
2. Teak wood grain and fabric cushion weave textures scheduled for M4.

### NEXT CORRECTION
Preserve all entrance portal and pool coping geometric relationships in M4 shader authoring.

---

## 3. Frame 108 — Shot 02: Pivot Door Threshold Passage

### REFERENCE VIEW
- **Architecture:** Intimate threshold passage moving across the exterior-to-interior datum line at $[0, 0, 0]$.
- **Massing:** Compression-to-expansion spatial transition from the recessed entrance canopy ($Y = +3.00\text{m}$) into the foyer.
- **Façade:** Flanking $0.60\text{m} \times 0.60\text{m}$ structural plaster columns with return reveals.
- **Openings:** Framed door portal ($1.96\text{m} \times 3.24\text{m}$) with dark bronze perimeter jambs and header.
- **Entrance:** Heavy timber pivot door leaf rotating smoothly on its off-center pivot axis ($X = -0.65\text{m}$); circular top and bottom brushed steel pivot hardware caps; 9 walnut planks with $15\text{mm}$ shadow reveal grooves; vertical brushed steel bar handle with illuminated cyan LED channel.
- **Terrace / Floor:** Seamless, unbroken transition from exterior travertine approach steps to interior foyer floor across a subtle dark bronze expansion joint.
- **Pool:** Outside camera frame.
- **Interior:** Warm American walnut fluted batten wall coming into sharp focus on the right.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Dynamic door opening animation (`GEO_Door_Pivot_Leaf` rotation around $Y$-axis) is mechanically anchored via `ANCHOR_Door_Hinge_Pivot` but remains in its locked neutral closed position; scheduled for interaction phase.
2. High-contrast threshold sunlight spill and interior shadow penumbra scheduled for M5 lighting.

### NEXT CORRECTION
In M4, apply rich satin walnut wood maps to door planks and brushed anisotropic metallic maps to pivot hardware.

---

## 4. Frame 120 — Shot 03: Foyer Gallery Corridor & Typography Wall

### REFERENCE VIEW
- **Architecture:** Axial circulation gallery spine ($3.20\text{m}$ clear width $\times$ $8.00\text{m}$ length).
- **Massing:** Crisp vertical rhythm along right wall balanced by open glass partitions on the left.
- **Façade:** N/A (interior view).
- **Openings:** Full-height frameless glass partitions enclosing the left engineering workspace.
- **Entrance:** Pivot door threshold visible behind camera.
- **Terrace:** N/A.
- **Pool:** N/A.
- **Interior:** 
  - Right wall: $12.0\text{m} \times 3.4\text{m}$ vertical fluted walnut wall constructed of 24 crisp individual timber battens with top and bottom shadow reveal channels.
  - Architectural signage: Honed travertine floating plinth mounting 3D extruded title and subtitle bars (*"THE PORTFOLIO HOUSE"*).
  - Ceiling: Crisp drywall with a $120\text{mm} \times 60\text{mm}$ recessed black linear lighting trough running along the corridor axis.
  - Floor: Honed cream travertine slabs with perimeter baseboard negative reveals.
  - Floating staircase: 14 cantilevered stone treads visible receding along the right wall.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Micro-groove specular anisotropy on individual wood battens scheduled for M4.
2. Linear LED warm emitter glow (2700K) inside the ceiling reveal trough scheduled for M5.

### NEXT CORRECTION
Maintain exact 24-batten spacing and plinth offset when generating M4 ORM textures.

---

## 5. Frame 133 — Shot 03: Glass Engineering Lab & Desk

### REFERENCE VIEW
- **Architecture:** Dedicated engineering workspace positioned on the left side of the gallery corridor.
- **Massing:** Enclosed glass pavilion within the open ground floor volume ($7.8\text{m} \times 6.0\text{m} \times 3.34\text{m}$).
- **Façade:** Exterior west living lounge visible through interior glass walls.
- **Openings:** Frameless glass partitions with recessed floor and ceiling u-channels; frameless glass pivot door with tubular stainless steel handle.
- **Entrance:** N/A.
- **Terrace:** Exterior west lounge deck visible beyond outer glazing.
- **Pool:** West end of infinity pool visible through outer sliding doors.
- **Interior:** 
  - Executive American walnut desk ($2.40\text{m} \times 0.75\text{m} \times 1.00\text{m}$) with modesty panel and return credenza ($1.80\text{m} \times 0.80\text{m}$).
  - Dual 27-inch workstation displays with slim metal bezels, stands, and base plates.
  - Floating stone staircase treads rising in the background on the opposite side of the corridor.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Workstation monitor screens show neutral dark metal rather than high-tech UI code/wireframes (owned by M8 interactive displays).
2. Glass partition cyan holographic HUD schematics are deferred to M8 interactive overlays.

### NEXT CORRECTION
Preserve clean desk joinery profiles and glass partition alignments during M4 material setup.

---

## 6. Frame 185 — Shot 04: Monumental Double-Height Exhibition Core

### REFERENCE VIEW
- **Architecture:** Monumental exhibition atrium opening to double-height volume ($12.0\text{m} \text{ width} \times 10.0\text{m} \text{ depth} \times 6.8\text{m} \text{ clearance}$).
- **Massing:** Central spatial void framed by left and right upper mezzanine gallery walkways ($Y = +3.60\text{m}$).
- **Façade:** Rear structural portal lintel beam ($12.0\text{m} \times 0.6\text{m} \times 0.5\text{m}$) spanning double-height opening.
- **Openings:** Rear full-width double-height glass curtain wall ($12.0\text{m} \times 6.8\text{m}$) with structural $5 \times 3$ grid mullions.
- **Entrance:** Foyer corridor opening into atrium from the south.
- **Terrace:** Rear north viewing terrace visible through curtain wall.
- **Pool:** N/A.
- **Interior:** 
  - Left and right mezzanine walkways with structural fascia edge beams and frameless glass balustrades with metal base shoes and brushed steel top caps.
  - Linear indirect ceiling lighting cove troughs grazing along upper ceiling edges.
  - Central monolithic travertine master exhibition plinth ($2.40\text{m} \times 0.65\text{m} \times 1.40\text{m}$) with recessed dark toe-kick reveal base for floating effect.
  - Secondary exhibition plinths along east and west gallery walls.
  - Central rectangular skylight array illuminating atrium from above.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Holographic 3D project schematics floating above plinths are deferred to M8 interactive milestone.
2. Warm indirect ceiling cove grazing light and plinth toe-kick underglow scheduled for M5 lighting.

### NEXT CORRECTION
Ensure plinth toe-kick negative reveal geometry correctly accommodates M5 point/rect lights.

---

## 7. Frame 239 — Shot 04: Southwest Twilight Aerial Finale

### REFERENCE VIEW
- **Architecture:** Grand exterior aerial establishing shot looking northeast across the infinity pool toward the entire illuminated residence.
- **Massing:** Complete two-story architectural composition with cantilevers, recessed bridge, terraces, and pool grounded against hillside.
- **Façade:** Full articulation of white stucco shells, panel reveals, header beams, and cantilever undersides.
- **Openings:** Continuous floor-to-ceiling glazing on living wing, 90° corner dining glass, upper balconies, and bridge.
- **Entrance:** Recessed entry portal with horizontal walnut pivot door and cyan LED vertical handle channel.
- **Terrace:** Travertine deck, raised east plinth with transition step, teak sun loungers, and perimeter glass balustrades with base shoes and top caps.
- **Pool:** Infinity lap pool with 50mm coping nosing reveal, vanishing overflow weir, catch basin gutter, and crystalline water plane.
- **Interior:** Internal depth visible through all transparent glass facades (foyer, walnut wall, floating stairs, atrium void).
- **Environment:** Exposed board-formed concrete retaining wall with 3 horizontal formwork grooves, stepped hillside terrain, agaves, and rear mountain horizon.

### M3 MATCH
**Excellent**

### REMAINING DIFFERENCES
1. Dramatic twilight sky gradient (pink/orange/indigo) and interior warm lantern glow through glazing scheduled for M5 cinematic lighting.
2. Micro-normal texturing across stucco, concrete, and rock scheduled for M4.

### NEXT CORRECTION
Maintain strict milestone boundaries: freeze M3 architectural geometry and transition cleanly to M4 PBR material authoring.
