# ARCHITECTURAL DETAIL SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M3 — Architectural Detail & Reconstruction Refinement  
**Coordinate System:** Right-Handed Cartesian ($+X$ East, $+Y$ Up, $+Z$ South toward pool, $-Z$ North toward atrium)  
**Base Units:** Metric Meters ($1.0\text{ unit} = 1.0\text{ meter}$)  
**World Origin:** $[0.0, 0.0, 0.0]$ at Entrance Threshold Finished Floor Level

---

## 1. Global Elevation & Section Datum

| Datum Level | Elevation ($Y$) | Architectural Significance |
| :--- | :--- | :--- |
| **Foundation Base** | $-1.80\text{m}$ | Underside of monolithic concrete substructure plinth |
| **Retaining Base** | $-3.50\text{m}$ | Base of stepped lower southwest foundation plinth |
| **Terrain Valley Base** | $-7.00\text{m}$ | Fore slope terrain intersection |
| **Ground Slab Bottom** | $-0.40\text{m}$ | Underside of ground reinforced concrete structural slab |
| **Ground Finished Floor (FFL)** | $0.00\text{m}$ | Finished travertine level of foyer, terrace deck, and plinth |
| **Pool Water Surface** | $-0.08\text{m}$ | Crystalline water surface plane |
| **Pool Overflow Weir** | $-0.10\text{m}$ | Crest of southern vanishing overflow edge weir |
| **Pool Basin Floor** | $-1.50\text{m}$ | Finished floor of swimming basin |
| **Ground Ceiling / Lintel** | $+3.40\text{m}$ | Underside of inter-floor structural slab |
| **Entrance Canopy Soffit** | $+3.00\text{m}$ | Recessed entrance foyer ceiling |
| **Upper Floor Slab Bottom** | $+3.40\text{m}$ | Soffit of upper cantilever projections |
| **Upper Floor Slab Top / FFL** | $+3.80\text{m}$ | Finished floor level of bedrooms, bridge, and mezzanine |
| **Balustrade Top Rail** | $+4.82\text{m}$ | Top edge of upper glass balustrade cap ($1.02\text{m}$ above slab) |
| **Upper Floor Ceiling** | $+7.00\text{m}$ | Underside of master roof structural slab |
| **Roof Slab Top** | $+7.40\text{m}$ | Top of master reinforced concrete roof slab |
| **Roof Parapet Coping Top** | $+8.11\text{m}$ | Top crest of perimeter parapet metal coping cap |
| **Roof Skylight Ridge** | $+7.97\text{m}$ | Top edge of central atrium skylight curb |
| **Penthouse Bulkhead Top** | $+9.46\text{m}$ | Top crest of rear-east stair penthouse enclosure |

---

## 2. Wall Construction & Assembly Details

### 2.1 Exterior Stucco Assemblies
- **Wall Thickness:** $0.40\text{m}$ ($400\text{mm}$) standard exterior structural masonry/concrete assembly.
- **Surface Finish:** Smooth off-white/ivory architectural plaster (`MAT_Facade_Stucco`, `#ECEBE4`, roughness 0.82).
- **Base Shadow Reveal:** $50\text{mm} \text{ depth} \times 60\text{mm} \text{ height}$ negative reveal channel at the junction between exterior walls and floor slab/plinth (`MAT_Metal_Charcoal`).
- **Jamb Reveals:** Window openings feature $150\text{mm}$ deep exterior reveals to create realistic solar shading and depth.
- **Façade Panel Joints:** Solid cubic masses (e.g., East Cantilever Front Face) feature horizontal negative reveal grooves ($20\text{mm} \text{ width} \times 20\text{mm} \text{ depth}$) spaced at $1.20\text{m}$ vertical centers.

### 2.2 Interior Partitions
- **Dividing Walls:** $0.30\text{m}$ to $0.40\text{m}$ structural shear partitions; $0.15\text{m}$ to $0.20\text{m}$ interior room demising walls.
- **Baseboard Shadow Reveal:** $30\text{mm} \times 40\text{mm}$ dark bronze recessed base channel along corridor and gallery walls.
- **Ceiling Reveals:** $120\text{mm} \text{ width} \times 60\text{mm} \text{ depth}$ recessed black architectural lighting reveal trough along the circulation spine.

---

## 3. Fenestration & Glazing Systems

### 3.1 Ground West Pocket Sliding Glass System
- **Total Span:** $12.40\text{m}$ width $\times$ $3.40\text{m}$ height.
- **Pocket Depth:** $150\text{mm}$ recessed wall pocket on the west jamb into which panels retract.
- **Floor Guide Track:** $12.40\text{m} \times 0.04\text{m} \times 0.16\text{m}$ triple-rail dark bronze anodized aluminum track recessed flush into travertine.
- **Head Guide Track:** $12.40\text{m} \times 0.06\text{m} \times 0.16\text{m}$ head track recessed into ceiling soffit.
- **Panels:** 3 sliding sashes ($4.12\text{m} \text{ width} \times 3.26\text{m} \text{ height} \times 0.04\text{m} \text{ thickness}$).
- **Stiles & Interlocks:** $60\text{mm} \text{ face} \times 80\text{mm} \text{ depth}$ dark aluminum vertical interlock profiles.
- **Glazing:** Low-iron ultra-clear tempered insulated glass units (opacity 0.35, roughness 0.05).

### 3.2 Ground East Frameless 90° Corner Glass System
- **Front Pane:** $11.16\text{m} \text{ width} \times 3.32\text{m} \text{ height} \times 0.04\text{m} \text{ thickness}$.
- **Side Return Pane:** $0.04\text{m} \text{ thickness} \times 3.32\text{m} \text{ height} \times 5.96\text{m} \text{ depth}$.
- **Corner Joint:** $40\text{mm} \times 40\text{mm}$ structural silicone corner profile with zero opaque corner post, maximizing visual continuity.
- **Perimeter Channels:** $80\text{mm} \text{ width} \times 40\text{mm} \text{ depth}$ recessed u-channels at floor and head.

### 3.3 Rear Double-Height Atrium Curtain Wall
- **Total Span:** $12.00\text{m}$ width $\times$ $6.80\text{m}$ height.
- **Perimeter Structural Frame:** $120\text{mm} \text{ face} \times 120\text{mm} \text{ depth}$ dark charcoal aluminum box profile.
- **Vertical Mullions:** 4 structural mullions ($100\text{mm} \times 140\text{mm}$) spaced at $2.40\text{m}$ centers ($X = -4.8\text{m}, -2.4\text{m}, 0.0\text{m}, +2.4\text{m}$).
- **Horizontal Transoms:** 2 structural transoms ($100\text{mm} \times 140\text{mm}$) at $Y = +2.27\text{m}$ and $+4.54\text{m}$.
- **Bay Grid:** 15 equal glazed lites ($2.40\text{m} \text{ width} \times 2.27\text{m} \text{ height}$).

---

## 4. Main Entrance Pivot Door System

```text
                                  +-------------------+
                                  |   CANOPY SOFFIT   |  Y = +3.40m
  +--------+                      +-------------------+                      +--------+
  | WEST   |  +--------------+    |  TOP PIVOT PLATE  |    +--------------+  | EAST   |
  | COLUMN |  |   WEST       |    +-------------------+    |   EAST       |  | COLUMN |
  | (0.6m) |  |   SIDELITE   |    |  PLANK 09         |    |   SIDELITE   |  | (0.6m) |
  |        |  |   (0.56m)    |    |  PLANK 08         |    |   (0.56m)    |  |        |
  |        |  |              |    |  PLANK 07         |    |              |  |        |
  |        |  |              |  +-+  PLANK 06         |    |              |  |        |
  |        |  |              |  | |  PLANK 05         |    |              |  |        |
  |        |  |              |  |H|  PLANK 04         |    |              |  |        |
  |        |  |              |  |A|  PLANK 03         |    |              |  |        |
  |        |  |              |  |N|  PLANK 02         |    |              |  |        |
  |        |  |              |  |D|  PLANK 01         |    |              |  |        |
  |        |  +--------------+  +-+-------------------+    +--------------+  |        |
  |        |                      | BOTTOM PIVOT PLATE|                      |        |
  +--------+----------------------+-------------------+----------------------+--------+
  |              TRAVERTINE ENTRANCE APPROACH STEPS (4.5m x 1.2m)                     |
  +-----------------------------------------------------------------------------------+
```

### 4.1 Pivot Door Leaf Specifications
- **Leaf Dimensions:** Width $1.80\text{m}$, Height $3.20\text{m}$, Thickness $0.10\text{m}$.
- **Clear Opening:** $1.96\text{m} \text{ width} \times 3.24\text{m} \text{ height}$.
- **Hinge Pivot Axis Offset:** $X = -0.65\text{m}$ relative to center ($250\text{mm}$ offset from west jamb).
- **Hardware Caps:** $140\text{mm} \text{ diameter} \times 40\text{mm} \text{ height}$ circular brushed stainless steel top and bottom pivot plates.
- **Leaf Construction:** 9 solid horizontal American Walnut planks ($1.80\text{m} \text{ width} \times 0.337\text{m} \text{ height} \times 0.10\text{m} \text{ thickness}$).
- **Shadow Reveals:** $15\text{mm}$ negative horizontal reveal grooves between planks.
- **Pull Handle:** Full-height brushed stainless steel bar ($2.10\text{m} \text{ height} \times 0.06\text{m} \text{ width} \times 0.08\text{m} \text{ depth}$).
- **Handle Illumination:** Integrated recessed cyan LED channel ($2.06\text{m} \times 0.02\text{m} \times 0.02\text{m}$, emissive intensity $2.5\times$).
- **Sidelites:** Symmetrical $0.56\text{m} \times 3.12\text{m}$ clear glass panels with $80\text{mm} \times 80\text{mm}$ dark bronze perimeter frames.
- **Canopy Downlights:** 2 flush circular architectural downlight apertures ($180\text{mm}$ diameter) at $X = \pm 0.90\text{m}$.

---

## 5. Wood Architectural Joinery

### 5.1 Fluted Walnut Batten Wall (Foyer & Corridor)
- **Total Span:** $12.00\text{m} \text{ length} \times 3.40\text{m} \text{ height} \times 0.15\text{m} \text{ depth}$.
- **Backing Panel:** $12.00\text{m} \times 3.40\text{m} \times 0.04\text{m}$ American Walnut panel.
- **Batten System:** 24 vertical solid walnut slats (`INT_Walnut_Slat_01` to `_24`).
- **Slat Dimensions:** $0.05\text{m} \text{ width} \times 3.34\text{m} \text{ height} \times 0.05\text{m} \text{ depth}$.
- **Slat Spacing:** $0.504\text{m}$ center-to-center spacing ($454\text{mm}$ clear between slats).
- **Perimeter Framing:** $60\text{mm} \times 30\text{mm}$ dark metal shadow reveal channel at floor and ceiling junctions.
- **Architectural Signage Plinth:** Honed travertine floating panel ($3.20\text{m} \text{ length} \times 0.60\text{m} \text{ height} \times 0.04\text{m} \text{ depth}$) mounted at $Y = +1.85\text{m}$.
- **Extruded 3D Typography:** Metal title bar ($2.80\text{m} \times 0.08\text{m} \times 0.02\text{m}$) and subtitle bar ($2.40\text{m} \times 0.04\text{m} \times 0.015\text{m}$).

### 5.2 East Upper Terrace Timber Wall
- **Wall Dimensions:** $2.80\text{m} \text{ depth} \times 3.20\text{m} \text{ height} \times 0.08\text{m} \text{ thickness}$.
- **Batten System:** 8 horizontal walnut battens ($2.78\text{m} \times 0.35\text{m} \times 0.09\text{m}$) with $50\text{mm}$ shadow reveal grooves.

### 5.3 Minimalist Teak Sun Loungers
- **Overall Dimensions:** $2.00\text{m} \text{ length} \times 0.85\text{m} \text{ width} \times 0.35\text{m} \text{ total height}$.
- **Frame:** Solid teak plinth frame ($2.00\text{m} \times 0.85\text{m} \times 0.18\text{m}$).
- **Backrest Wedge:** Angled teak wedge ($0.70\text{m} \times 0.82\text{m} \times 0.14\text{m}$).
- **Cushion:** Tailored off-white linen cushion ($1.95\text{m} \times 0.80\text{m} \times 0.08\text{m}$).

---

## 6. Staircases & Vertical Circulation

### 6.1 Exterior Entrance Approach Steps
- **Step Count:** 2 monolithic floating travertine plinths.
- **Width:** $4.50\text{m}$.
- **Riser Height:** $100\text{mm}$ ($0.10\text{m}$).
- **Tread Depth:** $1.20\text{m}$.
- **Elevation:** Step 1 top at $Y = +0.10\text{m}$; Step 2 top at $Y = +0.15\text{m}$ (meeting FFL).

### 6.2 Interior Floating Minimalist Staircase
- **Step Count:** 14 cantilevered stone treads.
- **Tread Width:** $1.20\text{m}$.
- **Tread Thickness:** $100\text{mm}$ ($0.10\text{m}$).
- **Tread Depth:** $320\text{mm}$ ($0.32\text{m}$).
- **Riser Height:** $220\text{mm}$ ($0.22\text{m}$).
- **Total Vertical Rise:** $3.08\text{m}$ ($Y = +0.22\text{m} \to +3.30\text{m}$).
- **Wall Support Slot:** Continuous $40\text{mm} \times 3.20\text{m} \times 5.20\text{m}$ recessed wall anchor slot in east wall.
- **Mounting Pins:** 14 stainless steel structural pin brackets ($80\text{mm} \times 50\text{mm} \times 80\text{mm}$) embedding treads into the shear wall.

---

## 7. Balustrades & Guardrails

| Balustrade Location | Length | Glass Height | Total Height | Base Shoe | Top Cap Profile |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Upper West Balcony** | $11.80\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Central Bridge** | $6.60\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Terrace East Front** | $8.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Terrace East Side** | $8.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Terrace West Side** | $12.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Terrace West Front** | $4.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Atrium Mezzanine West**| $10.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |
| **Atrium Mezzanine East**| $10.00\text{m}$ | $1.02\text{m}$ | $1.10\text{m}$ | $80\text{mm} \times 60\text{mm}$ metal | $20\text{mm} \times 30\text{mm}$ stainless steel |

---

## 8. Pool Architecture & Coping

### 8.1 Basin & Retaining Wall Relationship
- **Placement:** West terrace ($X = -8.8\text{m}$, spanning $X = -15.8\text{m} \to -1.8\text{m}$).
- **Footprint:** $14.00\text{m} \text{ length} \times 4.20\text{m} \text{ width} \times 1.50\text{m} \text{ depth}$.
- **Structural Wall Thickness:** $250\text{mm}$ reinforced concrete pool shell walls.
- **Foundation Support:** Directly bears upon the $18.0\text{m} \times 3.2\text{m} \times 0.8\text{m}$ board-formed concrete retaining wall.

### 8.2 Coping & Overhang Nosing
- **North Coping:** $14.30\text{m} \text{ length} \times 0.35\text{m} \text{ width} \times 0.08\text{m} \text{ thickness}$ with a $50\text{mm}$ overhang nosing reveal into the water.
- **West Coping:** $4.20\text{m} \times 0.35\text{m} \times 0.08\text{m}$ with a $50\text{mm}$ overhang nosing.
- **East Coping:** $4.20\text{m} \times 0.35\text{m} \times 0.08\text{m}$ with a $50\text{mm}$ overhang nosing.

### 8.3 Vanishing Overflow Edge & Gutter
- **Vanishing Edge Weir:** $14.00\text{m} \times 0.15\text{m} \times 0.30\text{m}$ beveled stone edge at $Z = +11.7\text{m}$.
- **Overflow Catch Basin / Gutter:** $14.00\text{m} \times 0.30\text{m} \times 0.30\text{m}$ concrete drainage trough at $Z = +11.95\text{m}$.
- **Internal Pool Steps:** 3 submerged travertine steps at the east end:
  - Step 1: $1.20\text{m} \times 0.25\text{m} \times 0.40\text{m}$ at $Y = -0.22\text{m}$.
  - Step 2: $1.20\text{m} \times 0.25\text{m} \times 0.40\text{m}$ at $Y = -0.47\text{m}$.
  - Step 3: $1.20\text{m} \times 0.25\text{m} \times 0.40\text{m}$ at $Y = -0.72\text{m}$.

---

## 9. Roof Architecture & Parapet Coping

### 9.1 Parapet Cappings
- **Parapet Height:** $0.45\text{m}$ concrete upstand ($Y = +7.40\text{m} \to +7.85\text{m}$).
- **Metal Coping Cap:** $380\text{mm} \text{ width} \times 60\text{mm} \text{ thickness}$ dark bronze anodized aluminum capping profile.
- **Overhang Drip Edge:** $30\text{mm}$ exterior overhang with downward drip return preventing wall staining.
- **Gravel Ballast Bed:** $50\text{mm}$ washed light-gray river stone bed ($31.8\text{m} \times 25.8\text{m}$) at $Y = +7.625\text{m}$.

### 9.2 Skylight Assembly
- **Curb Dimensions:** $6.40\text{m} \text{ length} \times 2.20\text{m} \text{ width} \times 0.35\text{m} \text{ height}$.
- **Cross-Mullions:** 3 aluminum mullion bars ($80\text{mm} \times 60\text{mm}$) dividing span into 4 equal glazed bays.
- **Glazing:** $40\text{mm}$ laminated safety glass ($6.00\text{m} \times 1.80\text{m}$).

### 9.3 Penthouse Bulkhead
- **Enclosure:** $4.50\text{m} \text{ width} \times 5.00\text{m} \text{ depth} \times 1.80\text{m} \text{ height}$.
- **Coping:** $4.60\text{m} \times 5.10\text{m} \times 0.06\text{m}$ perimeter capping at $Y = +9.43\text{m}$.
- **Service Door Reveal:** $0.90\text{m} \text{ width} \times 1.40\text{m} \text{ height}$ dark bronze frame.

---

## 10. Tolerances & Mesh Construction

- **Coordinate Precision:** 3 decimal places ($1.0\text{mm}$ metric tolerance).
- **Coplanar Faces:** Zero overlapping co-planar geometry. All reveals have positive geometric offsets ($10\text{mm} \to 50\text{mm}$) to prevent z-fighting in real-time WebGL engines.
- **Manifoldness:** All architectural volumes are closed solid manifolds with consistent outward-pointing surface normals.
