# ARCHITECTURAL COMPONENT INVENTORY: "THE PORTFOLIO HOUSE"

**Milestone:** M3 — Architectural Detail & Reconstruction Refinement  
**Model Asset:** `public/3d/models/the_portfolio_house.glb`  
**Reference Video:** `asset/architectural_reference.mp4`  

---

## 1. Inventory Summary

This document provides a component-by-component inventory of all architectural elements in "The Portfolio House", tracking modeling status, level of detail, camera priority, reusability, and material assignments.

---

## 2. Component Inventory Table

| Component Name | Purpose | Reference Visibility | Modelled | Detail Level | Reusable | Camera Importance | Object Node Name | Dimensions $[X, Y, Z]$ | Material Slot |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Foundation Plinth** | Primary ground structural plinth | High | Yes | High | Yes | Hero | `HOUSE_Plinth_Foundation` | $[36.0, 1.8, 38.0]$ | `MAT_Concrete_Foundation` |
| **Stepped Retaining Plinth** | Absorbs SW slope drop | High | Yes | Medium | Yes | Hero | `HOUSE_Plinth_Retaining_Step` | $[28.0, 2.6, 22.0]$ | `MAT_Concrete_Foundation` |
| **Plinth Perimeter Reveal** | Negative shadow joint | Medium | Yes | High | Yes | Secondary | `HOUSE_Plinth_Perimeter_Reveal` | $[36.2, 0.08, 0.10]$ | `MAT_Metal_Charcoal` |
| **Ground Floor Slab** | Structural base plate | Medium | Yes | Medium | Yes | Hero | `HOUSE_FloorSlab_Ground` | $[32.0, 0.4, 24.0]$ | `MAT_Concrete_Foundation` |
| **West Upper Cantilever Slab**| Structural bed/studio floor | High | Yes | High | Yes | Hero | `HOUSE_FloorSlab_Upper_West` | $[12.5, 0.4, 15.8]$ | `MAT_Facade_Stucco` |
| **West Cantilever Drip Reveal**| Underside water drip edge | Medium | Yes | High | Yes | Hero | `HOUSE_FloorSlab_Upper_West_DripReveal`| $[12.5, 0.04, 0.06]$ | `MAT_Metal_Charcoal` |
| **East Upper Cantilever Slab**| Structural terrace floor | High | Yes | High | Yes | Hero | `HOUSE_FloorSlab_Upper_East` | $[12.5, 0.4, 16.2]$ | `MAT_Facade_Stucco` |
| **East Cantilever Drip Reveal**| Underside water drip edge | Medium | Yes | High | Yes | Hero | `HOUSE_FloorSlab_Upper_East_DripReveal`| $[12.5, 0.04, 0.06]$ | `MAT_Metal_Charcoal` |
| **Upper Bridge Floor Slab** | Central connecting walkway | Medium | Yes | Medium | Yes | Secondary | `HOUSE_FloorSlab_Upper_Bridge` | $[7.0, 0.4, 7.4]$ | `MAT_Facade_Stucco` |
| **Living Room West Wall** | West perimeter enclosure | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Living_WestWall` | $[0.4, 3.4, 12.0]$ | `MAT_Facade_Stucco` |
| **Living Room Base Reveal** | Wall-to-floor negative joint | Medium | Yes | High | Yes | Secondary | `HOUSE_GroundFloor_Living_BaseReveal` | $[0.05, 0.06, 12.0]$ | `MAT_Metal_Charcoal` |
| **Living Room Header Beam** | Pocket sliding door head | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Living_HeaderBeam` | $[12.4, 0.4, 0.4]$ | `MAT_Facade_Stucco` |
| **Living Room Pocket Jamb** | Recessed sliding door pocket | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Living_PocketJamb` | $[0.4, 3.4, 0.6]$ | `MAT_Facade_Stucco` |
| **Entrance Structural Column W**| Foyer portal left column | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Foyer_Column_West` | $[0.6, 3.4, 0.6]$ | `MAT_Facade_Stucco` |
| **Entrance Structural Column E**| Foyer portal right column | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Foyer_Column_East` | $[0.6, 3.4, 0.6]$ | `MAT_Facade_Stucco` |
| **Entrance Canopy Soffit** | Overhang entrance canopy | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Foyer_Soffit` | $[4.2, 0.4, 1.4]$ | `MAT_Facade_Stucco` |
| **Canopy Soffit Reveal** | Shadow groove on canopy | Medium | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Foyer_Soffit_Reveal`| $[4.2, 0.03, 0.04]$ | `MAT_Metal_Charcoal` |
| **Canopy Downlights** | Flush architectural apertures| High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Foyer_Downlight_01/02`| $[0.18, 0.02, 0.18]$ | `MAT_Metal_Charcoal` |
| **Dining Room Corner Headers**| Frames 90-deg corner glass | High | Yes | High | Yes | Hero | `HOUSE_GroundFloor_Dining_CornerHeader_Front/Side`| $[11.2, 0.4, 0.4]$ | `MAT_Facade_Stucco` |
| **West Cantilever Side Wall** | West upper outer shell | High | Yes | High | Yes | Hero | `HOUSE_Upper_West_SideWall` | $[0.4, 3.6, 15.8]$ | `MAT_Facade_Stucco` |
| **West Cantilever Header Beam**| Signature front overhang | High | Yes | High | Yes | Hero | `HOUSE_Upper_West_HeaderBeam` | $[12.5, 0.6, 0.8]$ | `MAT_Facade_Stucco` |
| **West Cantilever Soffit** | Cantilever underside panel | High | Yes | High | Yes | Hero | `HOUSE_Upper_West_BottomSoffit` | $[12.5, 0.4, 3.8]$ | `MAT_Facade_Stucco` |
| **West Balcony Travertine Floor**| Inset terrace finished floor | Medium | Yes | High | Yes | Secondary | `HOUSE_Upper_West_Balcony_Floor` | $[12.1, 0.05, 2.7]$ | `MAT_Travertine_Floor` |
| **East Cantilever Solid Face** | White cubic focal mass | High | Yes | High | Yes | Hero | `HOUSE_Upper_East_FrontSolidFace` | $[6.0, 3.6, 0.5]$ | `MAT_Facade_Stucco` |
| **East Façade Panel Reveals** | Horizontal panel joints | High | Yes | High | Yes | Hero | `HOUSE_Upper_East_Facade_Reveal_01/02` | $[6.02, 0.02, 0.52]$ | `MAT_Metal_Charcoal` |
| **East Covered Terrace Floor** | Covered alcove finished floor| Medium | Yes | High | Yes | Secondary | `HOUSE_Upper_East_Terrace_Floor` | $[6.0, 0.05, 2.7]$ | `MAT_Travertine_Floor` |
| **Roof Main Slab** | Master roof slab | High | Yes | High | Yes | Hero | `HOUSE_Roof_Main_Slab` | $[32.4, 0.4, 26.4]$ | `MAT_Facade_Stucco` |
| **Roof Parapets (4 Sides)** | Silhouette enclosure | High | Yes | High | Yes | Hero | `HOUSE_Roof_Parapet_Front/Rear/W/E`| Perimeter $0.45\text{m}$ | `MAT_Facade_Stucco` |
| **Roof Coping Cappings** | Continuous metal drip coping | High | Yes | High | Yes | Hero | `HOUSE_Roof_Coping_Front/Rear/W/E` | Perimeter $0.38\text{m}$ | `MAT_Metal_Charcoal` |
| **Roof Gravel Ballast Bed** | River pebble ballast deck | Medium | Yes | Medium | Yes | Secondary | `HOUSE_Roof_Gravel_Bed` | $[31.8, 0.05, 25.8]$ | `MAT_Roof_Gravel` |
| **Roof Skylight Curb & Mullions**| Frames atrium skylight | High | Yes | High | Yes | Secondary | `HOUSE_Roof_Skylight_Curb/Mullions` | $[6.4, 0.35, 2.2]$ | `MAT_Metal_Charcoal` |
| **Roof Skylight Glazing** | 4-tier laminated glass panes | Medium | Yes | High | Yes | Secondary | `HOUSE_Roof_Skylight_Glazing` | $[6.0, 0.04, 1.8]$ | `MAT_Glass_Frameless` |
| **Stair Penthouse Bulkhead** | Roof utility structure | High | Yes | High | Yes | Hero | `HOUSE_Roof_Penthouse_Bulkhead` | $[4.5, 1.8, 5.0]$ | `MAT_Facade_Stucco` |
| **Entrance Pivot Door Planks** | 9 horizontal walnut planks | High | Yes | High | Yes | Hero | `GEO_Door_Plank_01..09` | $[1.80, 0.34, 0.10]$ | `MAT_Walnut_Door` |
| **Pivot Door Hardware Plates**| Top/bottom pivot hinge caps | High | Yes | High | Yes | Hero | `GEO_Door_Pivot_Hardware_Top/Bottom`| $[0.14, 0.04, 0.14]$ | `MAT_Steel_Brushed` |
| **Entrance Door Pull Handle** | Full-height stainless handle | High | Yes | High | Yes | Hero | `GEO_Door_Pull_Handle` | $[0.06, 2.10, 0.08]$ | `MAT_Steel_Brushed` |
| **Door Handle LED Channel** | Cyan accent night light strip| High | Yes | High | Yes | Hero | `GEO_Door_Handle_LED_Channel` | $[0.02, 2.06, 0.02]$ | `MAT_LED_Cyan` |
| **Entrance Sidelites & Frames**| Flanking clear glass bays | High | Yes | High | Yes | Hero | `EXT_Entrance_Sidelite_W/E` | $[0.56, 3.12, 0.04]$ | `MAT_Glass_Frameless` |
| **Living Sliding Glass System**| 3 pocket sliding glass leaves| High | Yes | High | Yes | Hero | `EXT_Glazing_Living_Panel_01..03` | $[4.12, 3.26, 0.04]$ | `MAT_Glass_Frameless` |
| **Living Sliding Track & Head**| Triple floor & head rails | High | Yes | High | Yes | Hero | `EXT_Glazing_Living_Floor/HeadTrack` | $[12.4, 0.04, 0.16]$ | `MAT_Metal_Charcoal` |
| **Dining Corner Curtain Glass**| Frameless 90-deg corner glass| High | Yes | High | Yes | Hero | `EXT_Glazing_Dining_Corner_Front/Side`| $[11.16, 3.32, 0.04]$ | `MAT_Glass_Frameless` |
| **Dining Glass Corner Joint** | Minimalist silicone corner | High | Yes | High | Yes | Hero | `EXT_Glazing_Dining_Corner_Joint` | $[0.04, 3.32, 0.04]$ | `MAT_Metal_Charcoal` |
| **Rear Atrium Curtain Wall** | 5x3 monumental vista grid | High | Yes | High | Yes | Hero | `EXT_Glazing_Rear_Atrium_Curtain` | $[12.0, 6.80, 0.05]$ | `MAT_Glass_Frameless` |
| **Rear Curtain Grid Mullions** | 4 vertical & 2 transoms | High | Yes | High | Yes | Hero | `EXT_Glazing_Rear_Atrium_Mullion/Transom`| $[0.10, 6.80, 0.14]$ | `MAT_Metal_Charcoal` |
| **Terrace Paving Deck** | Honed travertine pool deck | High | Yes | High | Yes | Hero | `EXT_Terrace_Pool_Deck` | $[34.0, 0.20, 17.0]$ | `MAT_Travertine_Floor` |
| **Terrace Drip Edge** | Perimeter water drip profile | Medium | Yes | High | Yes | Hero | `EXT_Terrace_Drip_Edge_South` | $[34.1, 0.04, 0.08]$ | `MAT_Metal_Charcoal` |
| **East Raised Plinth & Step** | Elevated sun lounger deck | High | Yes | High | Yes | Hero | `EXT_Terrace_East_Plinth/Step` | $[8.0, 0.40, 8.0]$ | `MAT_Travertine_Floor` |
| **Infinity Pool Basin Walls** | Monolithic swimming basin | High | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Basin_Wall_*` | $[14.0, 1.50, 0.25]$ | `MAT_Travertine_Floor` |
| **Pool Coping Overhang Nosing**| 50mm architectural overhang | High | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Coping_North/W/E` | $[14.3, 0.08, 0.35]$ | `MAT_Travertine_Floor` |
| **Pool Vanishing Edge Weir** | South vanishing water crest | High | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Vanishing_Edge` | $[14.0, 0.15, 0.30]$ | `MAT_Travertine_Floor` |
| **Pool Overflow Gutter** | Drainage trough catch basin | Medium | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Overflow_Gutter` | $[14.0, 0.30, 0.30]$ | `MAT_Concrete_Foundation` |
| **Pool Internal Entry Steps** | 3 submerged travertine steps | High | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Step_01..03` | $[1.2, 0.25, 0.40]$ | `MAT_Travertine_Floor` |
| **Pool Water Plane** | Crystalline water surface | High | Yes | High | Yes | Hero | `EXT_Infinity_Pool_Water_Plane` | $[13.7, 0.02, 3.95]$ | `MAT_Pool_Water` |
| **Glass Balustrades & Shoes** | Perimeter terrace guardrails | High | Yes | High | Yes | Hero | `EXT_Balustrade_Glass/Shoe/Cap_*` | Varying spans | `MAT_Glass_Frameless` |
| **Teak Sun Loungers (4 units)**| Minimalist loungers & pads | High | Yes | High | Yes | Hero | `EXT_Sun_Lounger_West/East_*` | $[0.85, 0.35, 2.0]$ | `MAT_Walnut_Wood` |
| **Entrance Approach Steps** | Travertine floating plinths | High | Yes | High | Yes | Hero | `EXT_Stairs_Entrance_Step_01/02` | $[4.5, 0.10, 1.2]$ | `MAT_Travertine_Floor` |
| **Fluted Walnut Batten Wall** | 24 vertical walnut slats | High | Yes | High | Yes | Hero | `INT_Walnut_Slat_01..24` | $[0.05, 3.34, 0.05]$ | `MAT_Walnut_Wood` |
| **Signage Plinth & 3D Text** | "THE PORTFOLIO HOUSE" mount | High | Yes | High | Yes | Hero | `INT_Feature_Walnut_Typography_*` | $[0.04, 0.60, 3.2]$ | `MAT_Travertine_Floor` |
| **Corridor Ceiling Reveal** | Linear lighting channel | High | Yes | High | Yes | Hero | `INT_Corridor_Ceiling_Reveal/LED` | $[0.12, 0.06, 12.0]$ | `MAT_Metal_Charcoal` |
| **Floating Staircase Treads** | 14 cantilevered stone treads | High | Yes | High | Yes | Hero | `INT_Floating_Step_01..14` | $[1.2, 0.10, 0.32]$ | `MAT_Travertine_Floor` |
| **Staircase Wall Slot & Pins** | Structural wall anchor system| Medium | Yes | High | Yes | Secondary | `INT_Floating_Stair_Wall_Slot/Pins` | $[0.04, 3.20, 5.2]$ | `MAT_Steel_Brushed` |
| **Workspace Glass Enclosure** | Frameless corridor partitions| High | Yes | High | Yes | Hero | `INT_Workspace_Glass_*` | Varying spans | `MAT_Glass_Frameless` |
| **Executive Walnut Desk** | Desk with modesty panel | High | Yes | High | Yes | Hero | `INT_Workspace_Executive_Desk_*` | $[2.4, 0.75, 1.0]$ | `MAT_Walnut_Wood` |
| **Dual Monitors & Stands** | 27-inch displays with stands| High | Yes | High | Yes | Hero | `INT_Workspace_Monitor_01/02_*` | $[0.65, 0.45, 0.08]$ | `MAT_Metal_Charcoal` |
| **Atrium Mezzanine Walkways** | Upper gallery circulation | High | Yes | High | Yes | Hero | `INT_Atrium_Mezzanine_Walkway_W/E`| $[2.8, 0.35, 10.0]$ | `MAT_Facade_Stucco` |
| **Atrium Mezzanine Fascia** | Edge beams facing void | High | Yes | High | Yes | Hero | `INT_Atrium_Mezzanine_Fascia_W/E` | $[0.12, 0.35, 10.0]$ | `MAT_Metal_Charcoal` |
| **Monolithic Master Plinth** | Central exhibition pedestal | High | Yes | High | Yes | Hero | `INT_Atrium_Central_Plinth/ToeKick`| $[2.4, 0.65, 1.4]$ | `MAT_Travertine_Floor` |
| **Secondary Plinths** | Flanking gallery pedestals | High | Yes | High | Yes | Hero | `INT_Atrium_Secondary_Plinth_W/E` | $[1.2, 0.70, 0.8]$ | `MAT_Travertine_Floor` |
| **Atrium Ceiling Cove Troughs**| Indirect linear light coves | Medium | Yes | High | Yes | Secondary | `INT_Atrium_Linear_Cove_West/East`| $[0.35, 0.20, 10.0]$ | `MAT_Facade_Stucco` |
| **Board-Formed Retaining Wall**| Cast concrete terrace base | High | Yes | High | Yes | Hero | `ENV_Retaining_Wall_Concrete` | $[18.0, 3.2, 0.8]$ | `MAT_Concrete_Foundation` |
| **Retaining Formwork Grooves**| 3 horizontal formwork lines | High | Yes | High | Yes | Hero | `ENV_Retaining_Wall_Groove_01..03`| $[18.02, 0.02, 0.82]$ | `MAT_Metal_Charcoal` |
| **Agave Clusters (8 sets)** | Arid landscape succulents | Medium | Yes | Medium | Yes | Secondary | `ENV_Agave_Cluster_01..08` | $[1.2, 0.7, 1.2]$ | `MAT_Vegetation_Green` |
| **Chaparral Bushes (8 sets)** | Desert scrub masses | Medium | Yes | Medium | Yes | Secondary | `ENV_Chaparral_Bush_01..08` | $[2.4, 1.2, 2.4]$ | `MAT_Vegetation_Green` |
| **Rear Mountain Horizon** | Distant valley ridge line | High | Yes | Low | Yes | Hero | `ENV_Rear_Mountain_Horizon` | $[120.0, 12.0, 8.0]$ | `MAT_Landscape_Arid` |
