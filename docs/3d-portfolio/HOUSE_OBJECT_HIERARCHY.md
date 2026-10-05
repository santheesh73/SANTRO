# HOUSE OBJECT HIERARCHY: "THE PORTFOLIO HOUSE"

**Milestone:** M2 — House Blockout & Architectural Reconstruction  
**Asset:** `public/3d/models/the_portfolio_house.glb`  
**Root Collection:** `THE_PORTFOLIO_HOUSE_SCENE`  
**Master Node:** `HOUSE_Master_Root`

---

## 1. Hierarchy Tree Overview

The scene graph is strictly structured into 5 standardized architectural collections. There are zero unparented floating meshes or arbitrary `Cube.001` default names.

```text
THE_PORTFOLIO_HOUSE_SCENE
└── HOUSE_Master_Root
    ├── 01_ARCHITECTURE
    │   ├── HOUSE_Plinth_Foundation
    │   ├── HOUSE_Plinth_Retaining_Step
    │   ├── HOUSE_FloorSlab_Ground
    │   ├── HOUSE_FloorSlab_Upper_West
    │   ├── HOUSE_FloorSlab_Upper_East
    │   ├── HOUSE_FloorSlab_Upper_Bridge
    │   ├── HOUSE_FloorSlab_Rear_Terrace
    │   ├── HOUSE_GroundFloor_Living_WestWall
    │   ├── HOUSE_GroundFloor_Living_BackWall
    │   ├── HOUSE_GroundFloor_Foyer_Column_West
    │   ├── HOUSE_GroundFloor_Foyer_Column_East
    │   ├── HOUSE_GroundFloor_Foyer_Soffit
    │   ├── HOUSE_GroundFloor_Dining_EastWall
    │   ├── HOUSE_GroundFloor_Dining_BackWall
    │   ├── HOUSE_Upper_West_SideWall
    │   ├── HOUSE_Upper_West_InnerWall
    │   ├── HOUSE_Upper_West_HeaderBeam
    │   ├── HOUSE_Upper_West_BottomSoffit
    │   ├── HOUSE_Upper_West_InsetWall
    │   ├── HOUSE_Upper_East_InnerWall
    │   ├── HOUSE_Upper_East_OuterWall
    │   ├── HOUSE_Upper_East_FrontSolidFace
    │   ├── HOUSE_Upper_East_HeaderBeam
    │   ├── HOUSE_Upper_East_BottomSoffit
    │   ├── HOUSE_Upper_Bridge_Header
    │   ├── HOUSE_Upper_Bridge_BackWall
    │   ├── HOUSE_Roof_Main_Slab
    │   ├── HOUSE_Roof_Parapet_Front
    │   ├── HOUSE_Roof_Parapet_Rear
    │   ├── HOUSE_Roof_Parapet_West
    │   ├── HOUSE_Roof_Parapet_East
    │   ├── HOUSE_Roof_Gravel_Bed
    │   ├── HOUSE_Roof_Skylight_Curb
    │   ├── HOUSE_Roof_Skylight_Glazing
    │   ├── HOUSE_Roof_Penthouse_Bulkhead
    │   ├── HOUSE_Atrium_OuterWall_West
    │   ├── HOUSE_Atrium_OuterWall_East
    │   ├── HOUSE_Atrium_Rear_HeaderBeam
    │   └── HOUSE_East_Boundary_Wall
    │
    ├── 02_INTERIOR_JOINERY
    │   ├── INT_Foyer_Vestibule_Floor
    │   ├── INT_Corridor_Floor
    │   ├── INT_DoubleHeight_Atrium_Floor
    │   ├── INT_Feature_Walnut_Wall
    │   ├── INT_Feature_Walnut_Typography_Plinth
    │   ├── INT_Corridor_Ceiling_Reveal
    │   ├── INT_Floating_Staircase_Group
    │   │   ├── INT_Floating_Step_01
    │   │   ├── INT_Floating_Step_02
    │   │   ├── ...
    │   │   └── INT_Floating_Step_14
    │   ├── INT_Workspace_Glass_CorridorWall
    │   ├── INT_Workspace_Glass_FrontWall
    │   ├── INT_Workspace_Glass_RearWall
    │   ├── INT_Workspace_Executive_Desk
    │   ├── INT_Workspace_Credenza
    │   ├── INT_Workspace_Monitor_01
    │   ├── INT_Workspace_Monitor_02
    │   ├── INT_Atrium_Mezzanine_Walkway_West
    │   ├── INT_Atrium_Mezzanine_Balustrade_West
    │   ├── INT_Atrium_Mezzanine_Walkway_East
    │   ├── INT_Atrium_Mezzanine_Balustrade_East
    │   ├── INT_Atrium_Central_Plinth
    │   ├── INT_Atrium_Central_Plinth_Base
    │   ├── INT_Atrium_Secondary_Plinth_West
    │   ├── INT_Atrium_Secondary_Plinth_East
    │   ├── INT_Atrium_Linear_Cove_West
    │   └── INT_Atrium_Linear_Cove_East
    │
    ├── 03_EXTERIOR_ELEMENTS
    │   ├── EXT_Entrance_Pivot_Door_Group
    │   │   └── GEO_Door_Pivot_Leaf (Pivot Origin at X = -0.65m)
    │   │       ├── GEO_Door_Plank_01
    │   │       ├── GEO_Door_Plank_02
    │   │       ├── ...
    │   │       ├── GEO_Door_Plank_09
    │   │       ├── GEO_Door_Pull_Handle
    │   │       └── GEO_Door_Handle_LED_Channel
    │   ├── EXT_Entrance_Sidelite_West
    │   ├── EXT_Entrance_Sidelite_East
    │   ├── EXT_Entrance_Frame_West
    │   ├── EXT_Entrance_Frame_East
    │   ├── EXT_Glazing_Living_Sliding_Glass
    │   ├── EXT_Glazing_Living_Sliding_Mullions
    │   ├── EXT_Glazing_Dining_Corner_Front
    │   ├── EXT_Glazing_Dining_Corner_Side
    │   ├── EXT_Glazing_Upper_West_Balcony_Wall
    │   ├── EXT_Glazing_Upper_West_Balustrade
    │   ├── EXT_Glazing_Upper_Bridge_Window
    │   ├── EXT_Glazing_Upper_Bridge_Balustrade
    │   ├── EXT_Glazing_Upper_East_Terrace_Glass
    │   ├── EXT_Upper_East_Wood_AccentWall
    │   ├── EXT_Glazing_Rear_Atrium_Curtain
    │   ├── EXT_Glazing_Rear_Atrium_Grid_Mullions
    │   ├── EXT_Terrace_Pool_Deck
    │   ├── EXT_Terrace_East_Plinth
    │   ├── EXT_Terrace_West_Lounge_Deck
    │   ├── EXT_Infinity_Pool_Basin_Floor
    │   ├── EXT_Infinity_Pool_Basin_Wall_Back
    │   ├── EXT_Infinity_Pool_Basin_Wall_West
    │   ├── EXT_Infinity_Pool_Basin_Wall_East
    │   ├── EXT_Infinity_Pool_Vanishing_Edge
    │   ├── EXT_Infinity_Pool_Water_Plane
    │   ├── EXT_Balustrade_Glass_Pool_Front
    │   ├── EXT_Balustrade_Glass_East_Plinth
    │   ├── EXT_Balustrade_Glass_West_Terrace
    │   ├── EXT_Sun_Lounger_West_01
    │   ├── EXT_Sun_Lounger_West_02
    │   ├── EXT_Sun_Lounger_East_01
    │   ├── EXT_Sun_Lounger_East_02
    │   ├── EXT_Stairs_Entrance_Step_01
    │   └── EXT_Stairs_Entrance_Step_02
    │
    ├── 04_ENVIRONMENT
    │   ├── ENV_Terrain_Slope_Upper_North
    │   ├── ENV_Terrain_Slope_Mid_East
    │   ├── ENV_Terrain_Slope_Mid_West
    │   ├── ENV_Terrain_Slope_Fore_South
    │   ├── ENV_Retaining_Wall_Concrete
    │   ├── ENV_Landscape_Agave_Clusters
    │   │   ├── ENV_Agave_Cluster_01
    │   │   ├── ...
    │   │   └── ENV_Agave_Cluster_08
    │   ├── ENV_Landscape_Chaparral_Bushes
    │   │   ├── ENV_Chaparral_Bush_01
    │   │   ├── ...
    │   │   └── ENV_Chaparral_Bush_08
    │   └── ENV_Rear_Mountain_Horizon
    │
    └── 05_SYSTEM_ANCHORS
        ├── ANCHOR_House_Origin
        ├── ANCHOR_Door_Hinge_Pivot
        ├── WAYPOINT_Shot01_Exterior
        ├── WAYPOINT_Shot02_Approach
        ├── WAYPOINT_Shot02_DoorThreshold
        ├── WAYPOINT_Shot02_Foyer
        ├── WAYPOINT_Shot03_Workspace
        ├── WAYPOINT_Shot04_Atrium
        ├── WAYPOINT_Shot04_RearVista
        └── WAYPOINT_Shot04_SunsetFinale
```

---

## 2. Dynamic Pivot Door Structure

The front entrance pivot door is engineered with an isolated pivot axis to enable dynamic kinematic rotation without center-point skewing:

```text
EXT_Entrance_Pivot_Door_Group [Position: (0.0, 0.0, 0.0)]
└── GEO_Door_Pivot_Leaf [Position: (-0.65, 0.0, 0.0) — HINGE ROTATION AXIS]
    ├── GEO_Door_Plank_01..09 [Offset: (+0.65, Y, 0.0)]
    ├── GEO_Door_Pull_Handle [Offset: (-0.10, 1.55, 0.07)]
    └── GEO_Door_Handle_LED_Channel [Offset: (-0.10, 1.55, 0.11)]
```

- When `GEO_Door_Pivot_Leaf` rotates around its local $Y$ axis ($0.0 \to -1.48\text{ rad} \approx -85^\circ$), the door swings inward into the foyer with true offset pivot physics, leaving a narrow counter-swing clearance on the left, exactly matching keyframe 108.

---

## 3. System Anchors & glTF Extras Metadata

The nodes in `05_SYSTEM_ANCHORS` contain custom metadata exported into glTF `node.extras`:

| Node Name | Position $[X, Y, Z]$ | Extras Properties | Usage |
| :--- | :--- | :--- | :--- |
| `ANCHOR_House_Origin` | $[0.0, 0.0, 0.0]$ | `{ type: 'ORIGIN', level: 'GROUND' }` | Universal coordinate reference |
| `ANCHOR_Door_Hinge_Pivot` | $[-0.65, 1.60, 0.0]$ | `{ door_trigger: true, pivot_axis: 'Y', max_rotation_deg: -85.0 }` | Door proximity controller trigger |
| `WAYPOINT_Shot01_Exterior` | $[4.2, 12.5, 26.0]$ | `{ shot: '01', target: [0, 3.8, 2], fov: 48 }` | Shot 01 establishing crane validation |
| `WAYPOINT_Shot02_Approach` | $[-1.2, 1.65, 14.8]$ | `{ shot: '02_APPROACH', target: [0, 1.6, 0], fov: 54 }` | Shot 02 terrace walkthrough |
| `WAYPOINT_Shot02_DoorThreshold`| $[0.0, 1.60, 2.2]$ | `{ shot: '02_THRESHOLD', target: [0, 1.6, -6], fov: 56 }` | Door entry threshold |
| `WAYPOINT_Shot02_Foyer` | $[0.2, 1.60, -1.8]$ | `{ shot: '02_FOYER', target: [1.8, 1.6, -4.5], fov: 58 }` | Foyer directory wall framing |
| `WAYPOINT_Shot03_Workspace` | $[-0.4, 1.60, -7.5]$ | `{ shot: '03_WORKSPACE', target: [-3.2, 1.4, -8], fov: 60 }` | Glass workspace tracking |
| `WAYPOINT_Shot04_Atrium` | $[0.0, 1.60, -11.5]$ | `{ shot: '04_ATRIUM', target: [0, 1.2, -14], fov: 54 }` | Double-height atrium overview |
| `WAYPOINT_Shot04_RearVista` | $[0.0, 1.65, -20.5]$ | `{ shot: '04_VISTA', target: [0, 2, -35], fov: 50 }` | Rear mountain vista framing |
| `WAYPOINT_Shot04_SunsetFinale`| `[-24.0, 16.0, 36.0]` | `{ shot: '04_FINALE', target: [2.0, 3.5, -4.0], fov: 42 }` | Southwest twilight dusk panorama |
