# CENTRALIZED 3D ASSET MANIFEST

**Project:** "THE PORTFOLIO HOUSE" — SANTRO  
**Milestone:** M1 — 3D Asset Pipeline & Web Foundation  
**Updated:** October 2026  

---

## 1. Asset Registry Overview

This manifest documents every 3D asset, texture, environment map, and placeholder within the SANTRO asset pipeline. It reflects the exact runtime registry in `src/3d/assets/manifest.ts`.

Status definitions:
- **`AVAILABLE`**: Asset is present in repository / runtime engine and verified functional.
- **`OPTIMIZED`**: Asset has been processed through the `@gltf-transform` web optimization pipeline.
- **`IN_PROGRESS`**: Asset is actively being modeled or authored in current work.
- **`PLANNED`**: Asset is specified but scheduled for modeling in a future milestone.

---

## 2. Complete Asset Catalog

| Asset ID | Path | Type | Purpose | Status | Optimization | Milestone | Triangle Budget |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `house_placeholder` | `procedural:placeholder` | PROCEDURAL | Metric architectural massing for camera & lighting validation | **AVAILABLE** | UNCOMPRESSED | M1 | $24$ |
| `the_portfolio_house` | `/3d/models/the_portfolio_house.glb` | GLB | Master modernist architectural residence model | **PLANNED** | PENDING | M2 | $140,000$ |
| `entrance_pivot_door` | `/3d/models/entrance_door.glb` | GLB | Walnut planked pivot door with offset vertical hinge node | **PLANNED** | PENDING | M3 | $4,500$ |
| `foyer_walnut_wall` | `/3d/models/foyer_walnut_wall.glb` | GLB | Vertical fluted batten feature wall with mounted typography | **PLANNED** | PENDING | M3 | $12,000$ |
| `workstation_setup` | `/3d/models/workstation_desk.glb` | GLB | Dual iMac workstations, executive walnut desk, task chairs | **PLANNED** | PENDING | M3 | $18,000$ |
| `exhibition_plinths` | `/3d/models/exhibition_plinths.glb` | GLB | Travertine pedestals with illuminated reveal coves | **PLANNED** | PENDING | M8 | $10,000$ |
| `terrain_hillside` | `/3d/models/terrain_hillside.glb` | GLB | Arid mountain topography grounding foundation plinth | **PLANNED** | PENDING | M2 | $15,000$ |
| `agave_vegetation` | `/3d/models/vegetation_agave.glb` | GLB | Instanced landscape vegetation surrounding pool terrace | **PLANNED** | PENDING | M3 | $20,000$ |
| `sky_atmosphere` | `procedural:atmosphere` | PROCEDURAL | Dynamic sky gradient and ground horizon disc at Y = -1.8m | **AVAILABLE** | UNCOMPRESSED | M1 | $128$ |
| `tex_facade_stucco` | `/3d/textures/stucco_orm.ktx2` | KTX2 | Micro-plaster normal and roughness map for exterior walls | **PLANNED** | KTX2 | M4 | N/A |
| `tex_travertine_floor`| `/3d/textures/travertine_orm.ktx2` | KTX2 | Honed travertine joint and roughness map | **PLANNED** | KTX2 | M4 | N/A |
| `tex_walnut_wood` | `/3d/textures/walnut_orm.ktx2` | KTX2 | American walnut grain and fluted batten normal map | **PLANNED** | KTX2 | M4 | N/A |

---

## 3. Directory Mapping

Assets map to standard public paths defined in `src/3d/assets/config.ts`:

```text
public/3d/
├── models/                     # Production GLB meshes (the_portfolio_house.glb)
├── textures/                   # KTX2 Basis Universal texture maps
├── environment/                # HDR environment skylights
└── placeholders/               # Metric validation models
```

---

## 4. Verification & Validation Rules

1. Every newly authored asset must be registered in `src/3d/assets/manifest.ts`.
2. File paths must use absolute public web paths starting with `/3d/` or `procedural:` protocol identifiers.
3. Assets marked `PLANNED` automatically fall back to procedural massing via `resolveAssetUrl()`.
4. Automated verification via `node scripts/verify-assets.mjs` ensures directory integrity and budget compliance.
