# ENGINEERING LAB SPECIFICATION

**Module:** `src/3d/rooms/rooms/EngineeringLabRoom.tsx`, `src/3d/rooms/exhibits/SkillWorkstation.tsx`  
**Location:** Glass-Enclosed Workspace ($X: -1.6\text{m}$ to $-7.8\text{m}$, $Z: -6.5\text{m}$ to $-13.5\text{m}$)  
**Camera Link:** Waypoint 6 (Shot 03 Lab Reveal, Position $[-0.35, 1.60, -7.80]$, Target $[-3.20, 1.40, -8.50]$)  

---

## 1. Exhibition Philosophy & Aesthetic Restraint

The Engineering Lab presents technical capability as an authentic, high-precision engineering environment rather than relying on clichés:
- **No Neon Cyberpunk Rain:** No arbitrary green matrix code rain or floating holograms.
- **Architectural Workspace Integration:** Workstation elements inhabit the existing walnut executive desk, matte dual displays, and credenza.
- **System Topologies:** Displays reflect authentic runtime architectures (WebGPU pipelines, vector graphs, AST parsing flows).

---

## 2. Spatial Exhibition Composition

```text
[ WEST EXTERIOR GLASS FACADE ]
             │
     ┌───────┴───────┐
     │  CRED Storage │
     └───────┬───────┘
             │
     ┌───────┴───────┐
     │  WORKSTATION  │
     │  EXECUTIVE    │
     │  DESK         │
     │               │
     │  [MONITOR 02] ├─► Diagnostics & Test Logs (1024x512 Canvas)
     │  [MONITOR 01] ├─► System Topology & Pipeline Telemetry
     └───────┬───────┘
             │
     ┌───────┴───────┐
     │ SKILLS RACK   │ ──► 6 Technical Domains Stele (2.0m x 1.35m)
     │ X: -2.4m      │
     │ Z: -11.5m     │
     └───────┬───────┘
             │
[ FRAMELESS GLASS CORRIDOR WALL: X: -1.6m ]
```

---

## 3. Technical Domain Hierarchy

Skills are partitioned into six production domains:

1. **LANGUAGES**: Python • TypeScript • JavaScript • SQL
2. **FRONTEND**: React • Next.js
3. **BACKEND**: FastAPI • REST APIs
4. **DATA**: PostgreSQL • Supabase • Redis
5. **AI & MACHINE LEARNING**: Generative AI • LLMs • RAG • NLP
6. **INFRASTRUCTURE**: Docker

---

## 4. Workstation Display Telemetry

- **Monitor 01 (Topology & Latency):** Sub-42ms token inference latency, zero server egress bandwidth, 1.2 GB local VRAM allocation, 60fps locked hardware acceleration.
- **Monitor 02 (Diagnostics & Verification):** Live verification logs across HNSW vector hierarchy, AST dependency embeddings, and WebGL 2.0 MSAA frame status.
