# SHADOW SPECIFICATION — SANTRO M5

**Project:** SANTRO — The Portfolio House  
**Milestone:** M5 Architectural Lighting & Environmental Atmosphere  
**Status:** Approved Specification  

---

## 1. Architectural Shadow Philosophy

In modernist architecture, shadows are as critical as solid surfaces. Cantilevered box volumes, deep recessed window reveals, roof parapets, and horizontal timber planks rely on crisp, directional shadows to communicate **mass, scale, depth, and structural overhangs**.

### Goals:
1. **Readable Cantilever Overhangs:** Clean shadow projection beneath the 3.8m West cantilever and 4.2m East cantilever onto the ground living zones and pool terrace.
2. **Sharp Grounding:** No light leakage or "peter-panning" (floating architecture) where foundation plinths and retaining walls meet the terrain.
3. **Smooth Shadow Terminations:** Soft shadow penumbras without stair-stepping pixelation or jagged shadow edge artifacts.
4. **Zero Shadow Acne:** No self-shadowing noise or moiré patterns across smooth planar stucco walls.

---

## 2. Shadow Map Configuration

- **Shadow Map Type:** `THREE.PCFSoftShadowMap` (Percentage-Closer Filtering with soft Poisson-disk sample distribution)
- **Shadow Camera Projection:** `THREE.OrthographicCamera`
- **Frustum Bounds:**
  - `left`: `-28.0m`
  - `right`: `+28.0m`
  - `top`: `+26.0m`
  - `bottom`: `-26.0m`
  - `near`: `1.0m`
  - `far`: `95.0m`
- **Frustum Volume Coverage:** 56m width × 52m height × 94m depth. Tightly bounds the entire 36m × 38m villa plinth, 16m pool terrace, and adjacent retaining steps with zero wasted shadow texel space.

---

## 3. Shadow Biasing Strategy

Shadow map artifacts are mitigated through a combination of constant depth bias and slope-scaled normal bias:

```ts
shadow.bias = -0.00025;
shadow.normalBias = 0.022;
```

### Technical Rationale:
- **`shadow.bias (-0.00025)`:** Offsets shadow comparison slightly along the light ray, preventing surface self-shadowing on flat stucco walls oriented perpendicular to the sun.
- **`shadow.normalBias (0.022)`:** Pushes shadow geometry inward along vertex normals during the shadow depth pass. This provides significant protection against shadow acne on steeply angled surfaces (such as the 35° raking angle during Golden Hour) without causing contact detachment at base plinth edges.

---

## 4. Quality Tier Allocation

Shadow map resource allocation scales with the user's hardware tier:

| Tier | Shadows Enabled | Map Resolution | Texel Density (World Units) | Memory Impact (VRAM) |
| :--- | :--- | :--- | :--- | :--- |
| **HIGH** | `true` | `2048 × 2048` | ~36.5 texels / meter | ~16 MB depth texture |
| **MEDIUM** | `true` | `1024 × 1024` | ~18.2 texels / meter | ~4 MB depth texture |
| **LOW** | `false` | `0` (Off) | N/A (Hemisphere diffuse fill) | 0 MB |

---

## 5. Contact Shadow Strategy & Surface Grounding

1. **Plinth Foundation (`HOUSE_Plinth_Foundation`):** Fully casts and receives shadows onto the site terrain, grounding the house into the hillside.
2. **Retaining Step (`HOUSE_Plinth_Retaining_Step`):** Casts clean horizontal shadow lines across lower terrace steps.
3. **Walnut Pivot Door:** Casts sharp shadows into the recessed entrance portal, revealing the 0.65m offset pivot swing.
4. **Internal Stairs:** Each of the 14 floating stone treads casts a distinct shadow onto the fluted walnut wall and adjacent floor, emphasizing the cantilevered structural pins.
5. **Sun Loungers:** Cast crisp contact shadows onto the honed travertine deck, grounding the furniture in space.
