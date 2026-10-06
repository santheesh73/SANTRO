# ROOM SYSTEM SPECIFICATION

**Module:** `src/3d/rooms/RoomSystem.tsx`  
**Purpose:** Reusable, Data-Driven Architectural Room Abstraction & Coordinator  
**Integration:** React Three Fiber, Three.js, Zustand  

---

## 1. Overview

The Room System governs the physical existence and exhibition presentation of the portfolio rooms inside the architectural house. Rooms are not isolated web pages or virtual scenes; they are contiguous physical zones within the single continuous house coordinate space.

---

## 2. Room Data Model Contract

Every room in the portfolio implements the `PortfolioRoomConfig` interface:

```typescript
export interface PortfolioRoomConfig {
  id: RoomId;
  order: number;
  name: string;
  purpose: string;
  spatialZone: SpatialZone;
  bounds: RoomSpatialBounds;
  cameraState: CameraJourneyState;
  cameraWaypointId: string;
  cameraFocusPosition: [number, number, number];
  cameraFocusTarget: [number, number, number];
  cameraFov: number;
  lightingPreset: TimeOfDayPreset;
  accent: string;
  exhibitionStyle: string;
  description: string;
}
```

---

## 3. Room Lifecycle & Progression

1. **Camera Position Tracking**:
   As the visitor scrolls or scrubs progress $p \in [0.0, 1.0]$, `getRoomForJourneyProgress(p)` resolves the active room.
2. **Store Synchronization**:
   When the resolved room changes, `useHouseStore.getState().setCurrentRoom(activeRoom.id)` updates the HUD label and active room state.
3. **Responsive Quality Tiers**:
   - `high`: Full architectural plinths, display steles, active canvas monitors, and toe-kick accent lines.
   - `medium`: Streamlined exhibit meshes, shared textures.
   - `low`: Core exhibits preserved with reduced auxiliary detail to guarantee 60fps on mobile.

---

## 4. Room Spatial Boundaries

| Room ID | Min Coordinate $[X, Y, Z]$ | Max Coordinate $[X, Y, Z]$ | Center Point $[X, Y, Z]$ |
| :--- | :--- | :--- | :--- |
| `exterior` | $[-20.0, -5.0, 4.0]$ | $[20.0, 15.0, 32.0]$ | $[0.0, 4.0, 18.0]$ |
| `entrance` | $[-3.0, 0.0, 0.0]$ | $[3.0, 4.0, 4.5]$ | $[0.0, 1.7, 2.2]$ |
| `foyer` | $[-2.5, 0.0, -3.8]$ | $[2.5, 3.5, 0.0]$ | $[0.0, 1.7, -1.9]$ |
| `gallery` | $[-2.0, 0.0, -8.0]$ | $[2.0, 3.5, -3.8]$ | $[0.0, 1.7, -5.9]$ |
| `project-studio` | $[-6.0, 0.0, -18.5]$ | $[6.0, 7.0, -10.2]$ | $[0.0, 3.0, -14.5]$ |
| `engineering-lab` | $[-7.8, 0.0, -14.0]$ | $[-1.5, 3.5, -6.0]$ | $[-4.65, 1.7, -10.0]$ |
| `archive` | $[1.6, 0.0, -21.0]$ | $[6.0, 3.5, -13.0]$ | $[3.8, 1.7, -17.0]$ |
| `study` | $[-6.0, 0.0, -21.0]$ | $[-1.6, 3.5, -14.0]$ | $[-3.8, 1.7, -17.5]$ |
| `contact` | $[-3.0, 0.0, -22.0]$ | $[3.0, 4.0, -17.0]$ | $[0.0, 1.7, -19.5]$ |
| `terrace` | $[-14.0, -2.0, -36.0]$ | $[14.0, 4.0, -21.5]$ | $[0.0, 0.5, -28.0]$ |

---

## 5. Architectural Camera Integration

Each room directly links to the M7 authored camera path:
- Arrival framing points to the primary exhibit.
- Settle points allow natural viewing without camera obstruction.
- All exhibits respect the camera's near-clipping plane ($0.1\text{m}$) and visual cone ($54^\circ$ to $60^\circ$ FOV).
