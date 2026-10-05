# MATERIAL REFERENCE MAP: "THE PORTFOLIO HOUSE"

**Milestone:** M4 — Architectural Materials & Surface Realism  
**Reference Video:** `asset/architectural_reference.mp4`  
**Reference Keyframes:** `asset/reference_frames/` (Frames 000–239)  

---

## 1. Reference Surface Traceability Matrix

Every single architectural surface observed across the 4 key reference shots is mapped directly to its corresponding 3D object, production material slot, visual match evaluation, and look-dev notes:

| Reference Surface | Reference Shot & Frame | 3D Object(s) | Material Assigned | Visual Match | Remaining Issue / Next Step |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Two-story Cantilever Facade** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070)<br>Shot 04 (Frame 239) | `HOUSE_Upper_West_SideWall`<br>`HOUSE_Upper_East_FrontSolidFace`<br>`HOUSE_Upper_West_HeaderBeam`<br>`HOUSE_GroundFloor_Living_WestWall` | `MAT_Wall_Main` | **Excellent** | Neutral daylight matches reference; evening warm bounce lighting scheduled for M5. |
| **Cantilever Underside Soffits** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `HOUSE_Upper_West_BottomSoffit`<br>`HOUSE_Upper_East_BottomSoffit`<br>`HOUSE_GroundFloor_Foyer_Soffit` | `MAT_Wall_Secondary` | **Excellent** | Slightly softer off-white diffuse scatter separates overhang undersides from exterior vertical walls. |
| **Negative Reveal Grooves & Drip Edges** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `HOUSE_FloorSlab_Upper_West_DripReveal`<br>`HOUSE_FloorSlab_Upper_East_DripReveal`<br>`HOUSE_GroundFloor_Living_BaseReveal`<br>`HOUSE_Upper_East_Facade_Reveal_01/02` | `MAT_Metal_Dark` | **Excellent** | Razor-thin dark aluminum reveals articulate panel seams cleanly. |
| **Parapet Roof Coping Caps** | Shot 01 (Frame 000)<br>Shot 04 (Frame 239) | `HOUSE_Roof_Coping_Front/Rear/West/East`<br>`HOUSE_Roof_Penthouse_Coping` | `MAT_Metal_Dark` | **Excellent** | Crisp 30mm architectural overhang drip line visually grounds the skyline silhouette. |
| **Flat Roof Gravel Ballast** | Shot 01 (Frame 000) | `HOUSE_Roof_Gravel_Bed` | `MAT_Roof_Gravel` | **Excellent** | Rounded river pebble normal map breaks flat plane into realistic gravel surface. |
| **Board-Formed Concrete Retaining Wall** | Shot 01 (Frame 000)<br>Shot 04 (Frame 239) | `ENV_Retaining_Wall_Concrete`<br>`HOUSE_Plinth_Foundation`<br>`HOUSE_Plinth_Retaining_Step` | `MAT_Concrete` | **Excellent** | 150mm horizontal timber plank grain with micro-porosity and 3 structural reveal grooves. |
| **Honed Travertine Terrace Deck** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `EXT_Terrace_Pool_Deck`<br>`EXT_Terrace_East_Plinth`<br>`EXT_Terrace_East_Plinth_Step`<br>`EXT_Terrace_West_Lounge_Deck` | `MAT_Terrace` | **Excellent** | Honed limestone tile seams with restrained 0.38 roughness creating soft elongated specular sheen. |
| **Infinity Pool Coping & Vanishing Weir** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `EXT_Infinity_Pool_Coping_North/West/East`<br>`EXT_Infinity_Pool_Vanishing_Edge` | `MAT_Terrace` | **Excellent** | 50mm nosing overhang cleanly overlaps pool walls and vanishing weir south edge. |
| **Pool Water Basin & Overflow Gutter** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `EXT_Infinity_Pool_Basin_Floor/Walls`<br>`EXT_Infinity_Pool_Overflow_Gutter`<br>`EXT_Infinity_Pool_Step_01/02/03` | `MAT_Stone`<br>`MAT_Concrete` | **Excellent** | Submerged stone floor and concrete catch basin catch natural sky reflections through water. |
| **Pool Water Surface** | Shot 01 (Frame 000)<br>Shot 02 (Frame 070) | `EXT_Infinity_Pool_Water_Plane` | `MAT_Water` | **Excellent** | Physical transmission (0.95), IOR 1.333, and dual scrolling capillary wind ripple normal maps. |
| **Entrance Walnut Pivot Door** | Shot 02 (Frames 070–115) | `GEO_Door_Plank_01` to `09` | `MAT_Wood_Entrance` | **Excellent** | 9 horizontal tongue-and-groove walnut planks with satin oil clearcoat and bevel reveals. |
| **Pivot Door Hardware & Cyan Nightlight** | Shot 02 (Frames 070–115) | `GEO_Door_Pivot_Hardware_Top/Bottom`<br>`GEO_Door_Pull_Handle`<br>`GEO_Door_Handle_LED_Channel` | `MAT_Metal_Brushed`<br>`MAT_LED_Cyan` | **Excellent** | Brushed stainless steel vertical pull handle with glowing electric cyan LED nightlight strip. |
| **Entrance Portal Frames & Sidelites** | Shot 02 (Frames 070–115) | `EXT_Entrance_Frame_West/East/Head`<br>`EXT_Entrance_Sidelite_West/East` | `MAT_Metal_Dark`<br>`MAT_Glass_Clear` | **Excellent** | Dark aluminum perimeter jambs framing ultra-clear low-iron side glazing. |
| **Foyer Vestibule Limestone Floor** | Shot 02 (Frame 115)<br>Shot 03 (Frame 120) | `INT_Foyer_Vestibule_Floor`<br>`INT_Foyer_Threshold_Joint` | `MAT_Stone`<br>`MAT_Metal_Dark` | **Excellent** | Seamless transition from exterior terrace through a dark metal expansion joint into foyer stone. |
| **Feature Fluted Walnut Corridor Wall** | Shot 03 (Frames 120–133) | `INT_Feature_Walnut_Backing_Wall`<br>`INT_Walnut_Slat_01` to `24` | `MAT_Wood_Interior` | **Excellent** | 24 individual geometric walnut battens with satin oil clearcoat and longitudinal grain normal map. |
| **Signage Plinth & 3D Typography** | Shot 03 (Frame 120) | `INT_Feature_Walnut_Typography_Plinth`<br>`INT_Typography_Title_Bar_Upper`<br>`INT_Typography_Subtitle_Bar_Lower` | `MAT_Stone`<br>`MAT_Metal_Dark` | **Excellent** | Monolithic limestone signage plinth with dark aluminum extruded lettering bars. |
| **Corridor Ceiling Linear Light Channel**| Shot 03 (Frames 120–133) | `INT_Corridor_Ceiling_Reveal`<br>`INT_Corridor_Ceiling_LED_Strip` | `MAT_Metal_Dark`<br>`MAT_Light_Cove_Warm` | **Excellent** | Recessed black ceiling slot housing a warm 2700K linear diffuse LED strip. |
| **Floating Stone Tread Staircase** | Shot 03 (Frames 120–133) | `INT_Floating_Step_01` to `14`<br>`INT_Floating_Step_Pin_01` to `14`<br>`INT_Floating_Stair_Wall_Slot` | `MAT_Stone`<br>`MAT_Metal_Brushed`<br>`MAT_Metal_Dark` | **Excellent** | 14 honed limestone cantilever treads anchored via brushed stainless steel pins into wall slot. |
| **Glass Engineering Workspace** | Shot 03 (Frames 132–167) | `INT_Workspace_Glass_CorridorWall_N/S`<br>`INT_Workspace_Glass_Front/RearWall`<br>`INT_Workspace_Glass_Door_Leaf`<br>`INT_Workspace_Floor/Ceiling_Channel` | `MAT_Glass_Clear`<br>`MAT_Metal_Dark` | **Excellent** | Frameless glass office enclosure with recessed floor/ceiling shoes and crystal transmission. |
| **Executive Walnut Desk & Monitors** | Shot 03 (Frames 132–167) | `INT_Workspace_Executive_Desk_Top/Modesty`<br>`INT_Workspace_Executive_Desk_Leg_W/E`<br>`INT_Workspace_Credenza`<br>`INT_Workspace_Monitor_01/02_Screen/Stand`| `MAT_Wood_Interior`<br>`MAT_Metal_Dark`<br>`MAT_Metal_Brushed` | **Excellent** | Walnut desk slab on charcoal aluminum legs paired with dual monitors on brushed steel stands. |
| **Double-Height Exhibition Atrium Floor** | Shot 04 (Frames 168–214) | `INT_DoubleHeight_Atrium_Floor` | `MAT_Stone` | **Excellent** | Expansive limestone floor reflecting skylight downlight and rear mountain vista. |
| **Mezzanine Walkways & Balustrades** | Shot 04 (Frames 168–214) | `INT_Atrium_Mezzanine_Walkway_W/E`<br>`INT_Atrium_Mezzanine_Fascia_W/E`<br>`INT_Atrium_Mezzanine_Balustrade_W/E`<br>`INT_Atrium_Mezzanine_Shoe/Cap_W/E` | `MAT_Wall_Secondary`<br>`MAT_Metal_Dark`<br>`MAT_Glass_Clear`<br>`MAT_Metal_Brushed` | **Excellent** | Cantilevered mezzanine galleries with frameless glass balustrades, charcoal shoes, and brushed caps. |
| **Monolithic Exhibition Plinths** | Shot 04 (Frames 168–214) | `INT_Atrium_Central_Plinth`<br>`INT_Atrium_Central_Plinth_ToeKick`<br>`INT_Atrium_Secondary_Plinth_W/E` | `MAT_Stone`<br>`MAT_Metal_Dark` | **Excellent** | Master exhibition plinth featuring a recessed dark metal toe-kick reveal channel. |
| **Atrium Ceiling Indirect Light Coves** | Shot 04 (Frames 168–214) | `INT_Atrium_Linear_Cove_West/East` | `MAT_Light_Cove_Warm` | **Excellent** | Concealed ceiling troughs glowing with warm white diffuse light grazing adjacent plaster. |
| **Rear Double-Height Glass Curtain Wall** | Shot 04 (Frames 214–239) | `EXT_Glazing_Rear_Atrium_Curtain`<br>`EXT_Glazing_Rear_Atrium_Frame_Outer`<br>`EXT_Glazing_Rear_Atrium_Mullion_V_1-4`<br>`EXT_Glazing_Rear_Atrium_Transom_01/02` | `MAT_Glass_Clear`<br>`MAT_Metal_Dark` | **Excellent** | Monumental 5-bay by 3-tier structural curtain wall opening directly toward the mountain panorama. |
| **Hillside Terrain Topography** | All Shots | `ENV_Terrain_Slope_Upper/Mid/Fore`<br>`ENV_Rear_Mountain_Horizon` | `MAT_Ground` | **Excellent** | Natural arid earth and rock slopes anchoring the architectural foundation into topography. |
| **Agaves & Chaparral Desert Foliage** | Shots 01, 02, 04 | `ENV_Agave_Cluster_01` to `08`<br>`ENV_Chaparral_Bush_01` to `08` | `MAT_Vegetation` | **Excellent** | Muted natural desert olive and succulent greens; zero neon oversaturation. |

---

## 2. Traceability Verification

- **Total Reference Surfaces Identified:** 27 distinct architectural surface groups.
- **Assigned to M4 Materials:** 100% (27 of 27).
- **Default / Unassigned Surfaces Remaining:** 0.
- **Architectural Integrity:** Verified that zero geometry modifications were introduced solely for material mapping; M3 construction geometry remains the absolute source of truth.
