# ROOM REGISTRY SPECIFICATION

**Module:** `src/3d/rooms/RoomRegistry.ts`  
**Purpose:** Central Source of Truth for Room Ordering, Purposes & State Mappings  

---

## 1. Master Portfolio Room Registry Table

| Order | Room ID | Display Name | Portfolio Purpose | Spatial Zone | Camera State | Lighting Preset | Dominant Accent |
| :---: | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `exterior` | Exterior Grounds | Identity & Prelude | `EXTERIOR` | `EXTERIOR_ESTABLISHING` | `golden_hour` | Natural stone & pool reflections |
| **02** | `entrance` | Entrance Portal | Portal & Threshold | `ENTRANCE` | `DOOR_TRANSITION` | `golden_hour` | Walnut pivot door & cyan blade |
| **03** | `foyer` | Foyer Vestibule | About & Identity | `FOYER` | `FOYER_HOLD` | `interior` | Fluted walnut wall & plinth |
| **04** | `gallery` | Gallery Corridor | Selected Work Intro | `GALLERY` | `CORRIDOR_TRAVEL` | `interior` | Ceiling linear reveal & downlights |
| **05** | `project-studio` | Project Studio | Projects Exhibition | `STUDIO` | `GALLERY_ENTRY` | `interior` | Double-height atrium volume |
| **06** | `engineering-lab`| Engineering Lab | Technical Stack | `LAB` | `GALLERY_REVEAL` | `interior` | Frameless acoustic glass & monitors |
| **07** | `archive` | Archive | Proof & Milestones | `ARCHIVE` | `INTERIOR_ROOM_APPROACH`| `interior` | Muted documentary bronze tablets |
| **08** | `study` | Study | Philosophy & Process | `STUDIO` | `INTERIOR_ROOM_APPROACH`| `interior` | Calm walnut desk & sketches |
| **09** | `contact` | Contact Pavilion | Direct Dialogue | `CONTACT` | `INTERIOR_ROOM_APPROACH`| `interior` | Monolithic plinth & rear vista |
| **10** | `terrace` | Rear Terrace & Vista| Final Reflection | `TERRACE` | `INTERIOR_ROOM_APPROACH`| `dusk` | Cantilever slab & mountain horizon |

---

## 2. Progress-to-Room Mapping Intervals

Across the normalized continuous journey $p \in [0.0, 1.0]$, room progression is strictly monotonic and follows the numbered sequence 01 to 10:

```text
Interval             Active Room          Primary Architectural Event
[0.00, 0.40)   -->   01 Exterior          Drone establishing & pool descent
[0.40, 0.50)   -->   02 Entrance          Approach to pivot door portal
[0.50, 0.62)   -->   03 Foyer             Walnut batten wall & identity plinth
[0.62, 0.74)   -->   04 Gallery           Circulation corridor & project previews
[0.74, 0.84)   -->   05 Project Studio    Emergence into double-height atrium
[0.84, 0.90)   -->   06 Engineering Lab   Lateral glance into glass workspace
[0.90, 0.94)   -->   07 Archive           East wing hackathon & proof records
[0.94, 0.97)   -->   08 Study             West wing engineering principles
[0.97, 0.995)  -->   09 Contact           Central plinth & dialogue coordinates
[0.995, 1.00]  -->   10 Terrace           Rear vista observation & twilight pause
```

---

## 3. Query APIs

The registry provides deterministic utility functions:
- `getRoomById(id: RoomId): PortfolioRoomConfig`
- `getRoomByOrder(order: number): PortfolioRoomConfig | undefined`
- `getRoomForJourneyProgress(progress: number): PortfolioRoomConfig`
- `getRoomForCameraState(state: CameraJourneyState): PortfolioRoomConfig`
