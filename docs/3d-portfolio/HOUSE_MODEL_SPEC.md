# HOUSE MODEL SPECIFICATION: "THE PORTFOLIO HOUSE"

**Milestone:** M2 — House Blockout & Architectural Reconstruction  
**Asset Path:** `public/3d/models/the_portfolio_house.glb`  
**Coordinate System:** Right-Handed Cartesian ($+X$ = East, $+Y$ = Up, $+Z$ = South)  
**Base Units:** Metric Meters ($1.0\text{ unit} = 1.0\text{ meter}$)  
**Origin:** $[0.0, 0.0, 0.0]$ at Entrance Threshold Finished Floor Level

---

## 1. Primary Building Massing & Spatial Dimensions

The 3D model of "The Portfolio House" is an exact rectilinear volumetric reconstruction based on reference video visual metrics and architectural standards.

### 1.1 Global Enclosure Envelope
- **Total Architectural Footprint (X × Y × Z):** $32.0\text{m} \times 8.2\text{m} \times 24.0\text{m}$ (excluding external terraces & terrain).
- **Substructure Plinth Envelope:** $36.0\text{m} \times 1.8\text{m} \times 38.0\text{m}$.
- **Ground Floor Height:** Finished floor to ceiling clearance: $3.40\text{m}$ ($Y = 0.0\text{m} \to +3.40\text{m}$).
- **Inter-Floor Structural Slab:** Thickness $0.40\text{m}$ ($Y = +3.40\text{m} \to +3.80\text{m}$, center: $Y = +3.60\text{m}$).
- **Upper Floor Height:** Finished floor to ceiling clearance: $3.20\text{m}$ ($Y = +3.80\text{m} \to +7.00\text{m}$).
- **Roof Structural Slab:** Thickness $0.40\text{m}$ ($Y = +7.00\text{m} \to +7.40\text{m}$, center: $Y = +7.20\text{m}$).
- **Perimeter Parapet Height:** $0.45\text{m}$ ($Y = +7.40\text{m} \to +7.85\text{m}$).
- **Total Structure Height Above Ground:** $7.85\text{m}$ (roof edge) / $8.50\text{m}$ (penthouse stair bulkhead).

---

## 2. Volumetric Breakdown by Zone

### 2.1 Substructure & Plinth
| Object Name | Dimensions $[X, Y, Z]$ | Center $[X, Y, Z]$ | Material | Description |
| :--- | :--- | :--- | :--- | :--- |
| `HOUSE_Plinth_Foundation` | $[36.0, 1.8, 38.0]$ | $[0.0, -0.9, -6.0]$ | `MAT_Concrete_Foundation` | Monolithic foundation plinth supporting house and terrace |
| `HOUSE_Plinth_Retaining_Step` | $[28.0, 2.6, 22.0]$ | $[-4.0, -2.2, +8.0]$ | `MAT_Concrete_Foundation` | Stepped lower plinth absorbing steep southwest slope |
| `ENV_Retaining_Wall_Concrete` | $[18.0, 3.2, 0.8]$ | $[-9.0, -2.5, +14.5]$ | `MAT_Concrete_Foundation` | Exposed board-formed retaining wall under pool terrace |

### 2.2 Ground Floor Masses
| Object Name | Dimensions $[X, Y, Z]$ | Center $[X, Y, Z]$ | Material | Description |
| :--- | :--- | :--- | :--- | :--- |
| `HOUSE_FloorSlab_Ground` | $[32.0, 0.4, 24.0]$ | $[0.0, -0.2, -12.0]$ | `MAT_Concrete_Foundation` | Ground structural slab beneath living, foyer, dining |
| `HOUSE_GroundFloor_Living_WestWall` | $[0.4, 3.4, 12.0]$ | $[-16.0, 1.7, -6.0]$ | `MAT_Facade_Stucco` | West perimeter wall of ground living room |
| `HOUSE_GroundFloor_Living_BackWall` | $[13.0, 3.4, 0.4]$ | $[-9.5, 1.7, -12.0]$ | `MAT_Facade_Stucco` | North dividing wall between living and workspace |
| `HOUSE_GroundFloor_Foyer_Column_West`| $[0.6, 3.4, 0.6]$ | $[-1.8, 1.7, 0.0]$ | `MAT_Facade_Stucco` | Left structural entrance column |
| `HOUSE_GroundFloor_Foyer_Column_East`| $[0.6, 3.4, 0.6]$ | $[+1.8, 1.7, 0.0]$ | `MAT_Facade_Stucco` | Right structural entrance column |
| `HOUSE_GroundFloor_Foyer_Soffit` | $[4.2, 0.4, 1.2]$ | $[0.0, 3.2, 0.0]$ | `MAT_Facade_Stucco` | Recessed entrance soffit with downlights |
| `HOUSE_GroundFloor_Dining_EastWall` | $[0.4, 3.4, 12.0]$ | $[+16.0, 1.7, -6.0]$ | `MAT_Facade_Stucco` | East perimeter wall of dining suite |
| `HOUSE_GroundFloor_Dining_BackWall` | $[13.0, 3.4, 0.4]$ | $[+9.5, 1.7, -12.0]$ | `MAT_Facade_Stucco` | North dividing wall behind dining room |

### 2.3 Upper Floor Cantilever Boxes (Signature Architectural Identity)
| Object Name | Dimensions $[X, Y, Z]$ | Center $[X, Y, Z]$ | Material | Description |
| :--- | :--- | :--- | :--- | :--- |
| `HOUSE_Upper_West_SideWall` | $[0.4, 3.6, 15.8]$ | $[-16.0, 5.6, -4.1]$ | `MAT_Facade_Stucco` | West cantilever outer wall (projects to $Z=+3.8\text{m}$) |
| `HOUSE_Upper_West_InnerWall`| $[0.4, 3.6, 15.8]$ | $[-3.5, 5.6, -4.1]$ | `MAT_Facade_Stucco` | West cantilever dividing wall |
| `HOUSE_Upper_West_HeaderBeam`| $[12.5, 0.6, 0.8]$ | $[-9.75, 7.1, +3.4]$| `MAT_Facade_Stucco` | West cantilever front header beam |
| `HOUSE_Upper_West_BottomSoffit`| $[12.5, 0.4, 3.8]$ | $[-9.75, 3.6, +1.9]$| `MAT_Facade_Stucco` | West cantilever underside projection soffit |
| `HOUSE_Upper_West_InsetWall` | $[12.1, 3.4, 0.3]$ | $[-9.75, 5.5, +0.9]$| `MAT_Facade_Stucco` | Inset bedroom/studio rear glazed wall line |
| `HOUSE_Upper_East_InnerWall`| $[0.4, 3.6, 16.2]$ | $[+3.5, 5.6, -3.9]$ | `MAT_Facade_Stucco` | East cantilever dividing wall |
| `HOUSE_Upper_East_OuterWall`| $[0.4, 3.6, 16.2]$ | $[+16.0, 5.6, -3.9]$| `MAT_Facade_Stucco` | East cantilever outer wall (projects to $Z=+4.2\text{m}$) |
| `HOUSE_Upper_East_FrontSolidFace`| $[6.0, 3.6, 0.5]$| $[+6.5, 5.6, +3.95]$| `MAT_Facade_Stucco` | Solid white cubic face visible in establishing view |
| `HOUSE_Upper_East_HeaderBeam`| $[6.5, 0.6, 0.5]$ | $[+12.75, 7.1, +3.95]$| `MAT_Facade_Stucco` | Header beam framing the inset covered terrace alcove |
| `HOUSE_Upper_East_BottomSoffit`| $[12.5, 0.4, 4.2]$| $[+9.75, 3.6, +2.1]$| `MAT_Facade_Stucco` | East cantilever underside projection soffit |
| `HOUSE_Upper_Bridge_Header` | $[6.6, 0.5, 0.4]$ | $[0.0, 7.15, +1.4]$ | `MAT_Facade_Stucco` | Recessed connecting bridge header (recessed $2.4\text{m}$) |
| `HOUSE_Upper_Bridge_BackWall`| $[6.6, 3.4, 0.3]$ | $[0.0, 5.5, -6.0]$ | `MAT_Facade_Stucco` | Bridge rear partition wall |

### 2.4 Roof Architecture
| Object Name | Dimensions $[X, Y, Z]$ | Center $[X, Y, Z]$ | Material | Description |
| :--- | :--- | :--- | :--- | :--- |
| `HOUSE_Roof_Main_Slab` | $[32.4, 0.4, 26.4]$ | $[0.0, 7.4, -9.2]$ | `MAT_Facade_Stucco` | Master reinforced flat roof slab |
| `HOUSE_Roof_Parapets` | Perimeter $0.45\text{m}$ | $Y = 7.825\text{m}$ | `MAT_Facade_Stucco` | 4-sided parapet wall concealing drainage |
| `HOUSE_Roof_Gravel_Bed` | $[31.8, 0.05, 25.8]$| $[0.0, 7.625, -9.2]$| `MAT_Roof_Gravel` | Washed river pebble ballast surface finish |
| `HOUSE_Roof_Skylight_Curb` | $[6.4, 0.35, 2.2]$ | $[0.0, 7.775, -18.0]$| `MAT_Metal_Charcoal` | Metal curb framing atrium skylight |
| `HOUSE_Roof_Skylight_Glazing`| $[6.0, 0.05, 1.8]$ | $[0.0, 7.95, -18.0]$ | `MAT_Glass_Frameless`| Clear laminated glass skylight panes |
| `HOUSE_Roof_Penthouse_Bulkhead`| $[4.5, 1.8, 5.0]$ | $[+11.5, 8.5, -18.0]$| `MAT_Facade_Stucco` | Rear-east stair penthouse enclosure |

---

## 3. Openings & Architectural Fenestration

### 3.1 Entrance Pivot Door System
- **Total Frame Opening:** $3.20\text{m}$ height $\times$ $1.80\text{m}$ clear width.
- **Door Leaf Dimensions:** Width $1.80\text{m}$, Height $3.20\text{m}$, Thickness $0.10\text{m}$.
- **Hinge Pivot Axis:** Off-center pivot placed $250\text{mm}$ from the west jamb (world position $X = -0.65\text{m}$).
- **Leaf Construction:** 9 horizontal tongue-and-groove American Walnut timber planks separated by $15\text{mm}$ shadow reveal grooves.
- **Handle:** Full-height vertical blackened steel bar handle ($2.10\text{m} \times 0.06\text{m} \times 0.08\text{m}$) mounted on the front left edge, featuring an integrated recessed cyan LED channel (`MAT_LED_Cyan`).
- **Sidelites:** Symmetrical $0.60\text{m}$ wide clear glass vertical panels with $50\text{mm}$ charcoal anodized aluminum frames flanking the pivot door.

### 3.2 Glazing Systems
- **West Living Lounge:** Floor-to-ceiling multi-panel pocket sliding glass system ($12.4\text{m}$ width $\times$ $3.4\text{m}$ height), recessed $0.8\text{m}$ behind upper cantilever.
- **East Dining Suite:** Frameless 90° structural corner curtain wall ($11.2\text{m}$ front pane $\times$ $6.0\text{m}$ side pane $\times$ $3.4\text{m}$ height).
- **Upper West Inset Balcony:** Glazed sliding doors ($11.8\text{m} \times 3.2\text{m}$) fronted by an ultra-clear laminated glass balustrade ($1.10\text{m}$ height).
- **Upper East Covered Terrace:** Recessed sliding glass ($6.0\text{m} \times 3.2\text{m}$) accompanied by an interior horizontal walnut feature wall ($2.8\text{m}$ depth).
- **Central Upper Bridge:** Floor-to-ceiling glass wall ($6.6\text{m} \times 3.2\text{m}$) set $2.4\text{m}$ back from the front cantilever edges.
- **Rear Double-Height Atrium Vista:** Full-width structural glass curtain wall ($12.0\text{m}$ width $\times$ $6.8\text{m}$ height) framing panoramic mountain horizons.

---

## 4. Pool & Terrace Plinth

- **Pool Dimensions:** $14.0\text{m}$ length (East-West) $\times$ $4.2\text{m}$ width (North-South) $\times$ $1.5\text{m}$ depth.
- **Pool Placement:** Center $X = -8.8\text{m}$, spanning $X = -15.8\text{m} \to -1.8\text{m}$, resting on the west terrace directly above the $18.0\text{m}$ concrete retaining wall plinth and maintaining an unobstructed pedestrian path to the main entrance.
- **Vanishing Edge:** Continuous vanishing overflow trough on the south edge ($Z = +11.7\text{m}$).
- **Water Plane:** $13.8\text{m} \times 4.0\text{m}$ planar mesh at $Y = -0.08\text{m}$ (`MAT_Pool_Water`, opacity 0.75).
- **Terrace Deck:** Honed travertine paving slabs ($34.0\text{m} \times 17.0\text{m}$).
- **East Raised Plinth:** Elevated $+0.20\text{m}$ above pool deck, measuring $8.0\text{m} \times 8.0\text{m}$ (center $X = +6.5\text{m}$), housing 2 teak sun loungers and perimeter glass balustrades.
- **West Lounge Deck:** Ground-level travertine deck ($8.0\text{m} \times 6.0\text{m}$) behind pool housing 2 teak sun loungers.
- **Sun Loungers:** Low-profile teak wood frames with minimalist off-white cushions ($2.0\text{m} \times 0.85\text{m} \times 0.35\text{m}$).

---

## 5. Structural Interior Blockout

- **Foyer Vestibule:** $4.0\text{m} \times 6.0\text{m}$ stone floor transitioning unbroken from exterior approach.
- **Gallery Corridor:** $3.2\text{m}$ clear width $\times$ $8.0\text{m}$ length along the central architectural axis.
- **Feature Walnut Wall:** Vertical fluted American Walnut batten wall ($12.0\text{m}$ length $\times$ $3.4\text{m}$ height $\times$ $0.15\text{m}$ depth) along the east corridor wall.
- **Floating Staircase:** 14 cantilevered stone treads ($1.2\text{m}$ width $\times$ $0.32\text{m}$ tread $\times$ $0.10\text{m}$ thickness) rising from $Y = 0.22\text{m}$ to $+3.2\text{m}$.
- **Glass Workspace:** Frameless glass enclosure ($7.8\text{m} \times 6.0\text{m}$) housing executive walnut desk ($2.4\text{m} \times 1.0\text{m}$), credenza ($1.8\text{m} \times 0.8\text{m}$), and dual monitor blockouts.
- **Double-Height Atrium:** Monumental volume ($12.0\text{m} \times 10.0\text{m} \times 6.8\text{m}$ height) with left and right mezzanine walkways ($2.8\text{m}$ width at $Y = 3.6\text{m}$), glass guardrails, central travertine exhibition plinth ($2.4\text{m} \times 1.4\text{m} \times 0.65\text{m}$), and flanking secondary plinths.

---

## 6. PBR Material Assignments

| Material Name | Base Color | Roughness | Metalness | Transmission / Opacity | Used On |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `MAT_Facade_Stucco` | `#ECEBE4` | 0.82 | 0.00 | Opaque (1.0) | Exterior walls, cantilevers, soffits |
| `MAT_Travertine_Floor` | `#DDD6C8` | 0.35 | 0.05 | Opaque (1.0) | Terrace deck, foyer, corridor, plinths |
| `MAT_Walnut_Wood` | `#5A3825` | 0.42 | 0.00 | Opaque (1.0) | Feature batten wall, executive desk, loungers |
| `MAT_Walnut_Door` | `#6B4423` | 0.40 | 0.00 | Opaque (1.0) | Pivot door horizontal planks |
| `MAT_Glass_Frameless` | `#E8F4F8` | 0.05 | 0.10 | Transparent (0.35) | Balustrades, windows, workspace walls |
| `MAT_Metal_Charcoal` | `#1F1F21` | 0.28 | 0.85 | Opaque (1.0) | Window frames, mullions, ceiling reveals |
| `MAT_Steel_Brushed` | `#C0C0C4` | 0.25 | 0.95 | Opaque (1.0) | Door pull handle, hardware |
| `MAT_Pool_Water` | `#38A3A5` | 0.08 | 0.10 | Transparent (0.75) | Infinity lap pool water surface plane |
| `MAT_Concrete_Foundation` | `#8B8A85` | 0.85 | 0.05 | Opaque (1.0) | Foundation plinths, retaining walls |
| `MAT_Landscape_Arid` | `#8A795D` | 0.90 | 0.00 | Opaque (1.0) | Hillside terrain slopes, horizon ridge |
| `MAT_Vegetation_Green`| `#4D533C` | 0.85 | 0.00 | Opaque (1.0) | Agave succulent clusters, chaparral scrub |
| `MAT_LED_Cyan` | `#00F0FF` | 0.10 | 0.00 | Emissive ($2.5\times$) | Door handle light strip, spatial accents |
| `MAT_Roof_Gravel` | `#9B9A95` | 0.90 | 0.00 | Opaque (1.0) | Flat roof pebble ballast bed |
