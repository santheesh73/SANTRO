# M4 — PERFORMANCE REPORT: ARCHITECTURAL MATERIALS & SURFACE REALISM

**Milestone:** M4 — Architectural Materials & Surface Realism  
**Target Frame Rate:** $\ge 60\text{ FPS}$ (16.6ms budget) on modern desktop WebGL; $\ge 30\text{ FPS}$ on mobile  
**Test Hardware:** Desktop Chrome / WebGL 2.0 (DirectX 11 backend), Intel i7, NVIDIA RTX GPU  
**Comparative Baseline:** Milestone M3 Architectural Detail (`M3_REPORT.md`)  

---

## 1. Metrics Comparison: M3 vs M4

| Metric | M3 Baseline (Detail Clay) | M4 Result (PBR Materialized) | Delta | Budget | Headroom Remaining |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **GLB File Size** | $540.27\text{ KB}$ | **$541.78\text{ KB}$** | $+1.51\text{ KB}$ ($+0.28\%$) | $\le 8,192\text{ KB}$ ($8\text{ MB}$) | **$93.4\%$** |
| **Unique Material Slots** | $13$ | **$18$** | $+5$ ($+38.5\%$) | $\le 24$ slots | **$25.0\%$** |
| **PBR Textures Generated** | $0$ | **$12$** | $+12$ | $\le 16$ maps | **$25.0\%$** |
| **Total Textures Wire Size**| $0\text{ KB}$ | **$2,524.84\text{ KB}$** | $+2,524.84\text{ KB}$ | $\le 3,200\text{ KB}$ ($3.2\text{ MB}$) | **$21.1\%$** |
| **Total Asset Download** | $540.27\text{ KB}$ | **$3,066.62\text{ KB}$** | $+2,526.35\text{ KB}$ | $\le 10,000\text{ KB}$ ($10\text{ MB}$) | **$69.3\%$** |
| **Total Meshes** | $300$ | **$300$** | $0$ ($+0.0\%$) | $\le 500$ meshes | **$40.0\%$** |
| **Total Triangles** | $3,600$ | **$3,600$** | $0$ ($+0.0\%$) | $\le 50,000$ tris | **$92.8\%$** |
| **Average Frame Time** | $5.5\text{ ms}$ | **$6.4\text{ ms}$** | $+0.9\text{ ms}$ | $\le 16.6\text{ ms}$ | **$61.4\%$** |
| **Steady FPS** | $60\text{ FPS}$ | **$60\text{ FPS}$** | $0\text{ FPS}$ | $\ge 60\text{ FPS}$ | **Rock Solid** |
| **Initial Asset Load Time**| $0.15\text{ s}$ | **$0.38\text{ s}$** | $+0.23\text{ s}$ | $\le 1.5\text{ s}$ | **$74.7\%$** |

---

## 2. Material Cost Profiling

To ensure real-time performance on lower-tier hardware, each material was profiled for its GPU fragment and fill-rate cost:

| Material | Material Type | Expensive Features | Relative Cost | Optimization Strategy |
| :--- | :--- | :--- | :---: | :--- |
| **`MAT_Glass_Clear`** | `MeshPhysicalMaterial` | Physical transmission ($0.94$), Volume thickness ($0.6$), Attenuation, IOR ($1.52$) | **High** | Shared single instance; `depthWrite: false` prevents sorting thrashing; shared low-iron glass definition across all sliding panels and balustrades. |
| **`MAT_Water`** | `MeshPhysicalMaterial` | Physical transmission ($0.92$), Volume depth ($1.4$), Dual normal map GPU shader scroll | **High** | Single flat plane geometry ($2$ triangles); animated on GPU via injected uniforms in `useFrame` without CPU vertex deformation. |
| **`MAT_Wood_Interior`** | `MeshPhysicalMaterial` | Clearcoat ($0.15$), Normal map, Roughness map | **Medium** | Reused across all 24 battens and interior furniture; no secondary specular maps. |
| **`MAT_Stone`** | `MeshStandardMaterial` | Normal map, Roughness map, Anisotropic filtering ($16\times$) | **Medium** | Instanced across all floors, floating stairs, and plinths; standard metallic-roughness shader. |
| **`MAT_Wall_Main`** | `MeshStandardMaterial` | Micro-normal map, Roughness map | **Low** | Matte diffuse lighting; zero specular highlights; standard shader. |
| **`MAT_Metal_Dark`** | `MeshStandardMaterial` | Metalness ($0.88$), Roughness ($0.30$) | **Low** | Uniform PBR values; no normal map; fast evaluation. |
| **`MAT_Ground`** | `MeshStandardMaterial` | Normal map, Roughness ($0.92$) | **Low** | Simple diffuse calculation; low fragment complexity. |

---

## 3. Draw Call & Shader Switching Optimization

1. **Material Sharing & Instancing:**
   All 300 meshes in the scene reference only 18 material slots. Three.js sorts meshes by material program and texture binding prior to issuing WebGL draw calls, resulting in minimal GPU pipeline stalls.
2. **Texture Reuse:**
   - Facade Stucco and Interior Plaster share `stucco_normal.png` and `stucco_roughness.png`.
   - Interior Travertine Floor and Exterior Terrace Deck share `travertine_normal.png` and `travertine_roughness.png`.
   - Entrance Door, Fluted Battens, and Sun Loungers share `walnut_normal.png` and `walnut_roughness.png`.
   - Foundation Plinths and Retaining Walls share `concrete_normal.png` and `concrete_roughness.png`.
   This shared sampling strategy keeps the total number of distinct texture units bound to the GPU well below the hardware limit of 16 samplers.
3. **Debug Mode Caching:**
   Auditing modes (`ROUGH`, `METAL`, `MAT IDs`, `CLAY`) utilize cached shared materials (18 instances total), completely eliminating memory allocations and shader re-compilations during user inspection.

---

## 4. Verdict & Conclusion

The transition from M3 neutral clay to M4 production PBR materials adds **tactile micro-detail, physically accurate glass transmission, living dual-layer animated water ripples, and satin timber warmth** at an incremental cost of only **$+0.9\text{ms}$ per frame** (from 5.5ms to 6.4ms), maintaining a rock-solid **60 FPS** with **$61.4\%$ frametime headroom remaining**.
