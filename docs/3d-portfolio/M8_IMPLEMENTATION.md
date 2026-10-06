# M8 IMPLEMENTATION SPECIFICATION — PORTFOLIO ROOMS & SPATIAL CONTENT SYSTEM

**Milestone:** M8 — Portfolio Rooms & Spatial Content System  
**Author:** Senior Product Designer & Creative Technologist  
**Status:** COMPLETE & VALIDATED  
**Architecture Principle:** *The Architecture Presents the Content.*

---

## 1. Executive Summary

Milestone M8 establishes the spatial information architecture of the cinematic 3D architectural portfolio. Rather than superimposing 2D HTML web cards onto arbitrary 3D surfaces, the physical house itself is transformed into a curated, sequenced sequence of ten architectural exhibition spaces.

Each room possesses an intentional architectural purpose, calibrated spatial boundaries, dedicated lighting ambiance from M5, precise camera framing from M7, and bespoke physical exhibits presenting verified production work.

---

## 2. Core Architectural Spatial Sequence

The portfolio follows an authored 10-stage physical journey through the villa:

```text
01 EXTERIOR GROUNDS
        ↓
02 ENTRANCE PORTAL
        ↓
03 FOYER VESTIBULE
        ↓
04 GALLERY CORRIDOR
        ↓
05 PROJECT STUDIO
        ↓
06 ENGINEERING LAB
        ↓
07 ARCHIVE
        ↓
08 STUDY
        ↓
09 CONTACT PAVILION
        ↓
10 REAR TERRACE & VISTA
```

---

## 3. Spatial System Architecture

The implementation strictly separates spatial geometry, content data, exhibition presentation, and camera navigation:

```text
src/
├── content/                     # Data Layer (Zero 3D/Scene Coupling)
│   ├── types.ts                 # Strict TypeScript content interfaces
│   ├── profile.ts               # Profile, disciplines & Foyer statement
│   ├── projects.ts              # 7 verified projects with metrics & hierarchy
│   ├── skills.ts                # 6 technical domains & production skills
│   ├── archive.ts               # SIH, hackathon & open-source milestones
│   ├── philosophy.ts            # BUILD, THINK, EXPLORE, REFINE pillars
│   ├── contact.ts               # Direct channels & closing statement
│   └── index.ts                 # Unified content dataset
│
├── 3d/
│   ├── rooms/                   # Spatial Exhibition Layer
│   │   ├── types.ts             # RoomId, PortfolioRoomConfig, ExhibitVariant
│   │   ├── RoomRegistry.ts      # Centralized 10-room registry & progress mapping
│   │   ├── RoomSystem.tsx       # Master R3F coordinator & store synchronizer
│   │   ├── textures/
│   │   │   └── createExhibitionTexture.ts # High-DPI procedural canvas typography
│   │   ├── exhibits/
│   │   │   ├── ArchitecturalPlinth.tsx    # Travertine plinths with toe-kicks
│   │   │   ├── ProjectExhibit.tsx         # Featured, standard & compact exhibits
│   │   │   ├── SkillWorkstation.tsx       # Dual monitors & skill domain rack
│   │   │   ├── ArchiveExhibit.tsx         # Documentary proof tablets
│   │   │   ├── PhilosophyStele.tsx        # Honed stone principle steles
│   │   │   └── ContactPlinth.tsx          # Contact plinth with underglow
│   │   └── rooms/
│   │       ├── ExteriorRoom.tsx           # Identity prelude plinth
│   │       ├── EntranceRoom.tsx           # Threshold transition datum
│   │       ├── FoyerRoom.tsx              # Walnut fluted wall typography
│   │       ├── GalleryRoom.tsx            # Corridor curatorial bay
│   │       ├── ProjectStudioRoom.tsx      # 7 projects in atrium hierarchy
│   │       ├── EngineeringLabRoom.tsx     # Glass office telemetry & stack
│   │       ├── ArchiveRoom.tsx            # East wing proof & milestone steles
│   │       ├── StudyRoom.tsx              # West wing quiet study & principles
│   │       ├── ContactRoom.tsx            # Central plinth & rear vista framing
│   │       └── TerraceRoom.tsx            # Contemplative observation space
│   │
│   └── scene/
│       └── ArchitecturalScene.tsx # Renders <RoomSystem /> alongside house
```

---

## 4. Key Architectural Engineering Highlights

1. **Zero External Font Network Dependency**:
   Display panels render via high-DPI HTML5 `CanvasTexture` utilizing native monospace and sans-serif typography, preventing render blocking and offline failures.
2. **Strict Camera Path Clearance**:
   All new exhibition plinths and steles maintain a minimum $1.5\text{m}$ lateral clearance from the central corridor walking trajectory ($X: 0.0\text{m}$, $Z: -10.2\text{m}$ to $-14.5\text{m}$), preventing near-plane clipping during cinematic tracking.
3. **PBR Material Consistency**:
   All exhibition structures reuse authentic materials (`MAT_Stone`, `MAT_Metal_Dark`, `MAT_Wood_Interior`) established in M4, ensuring unified reflection and shadow response.
4. **Zustand Throttled Synchronization**:
   Active room detection runs during progress updates without triggering per-frame React re-render cascades.
