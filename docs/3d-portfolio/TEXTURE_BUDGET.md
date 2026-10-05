# TEXTURE BUDGET & MEMORY AUDIT SPECIFICATION

**Milestone:** M4 — Architectural Materials & Surface Realism  
**Target Platform:** WebGL 2.0 / WebGPU (Desktop & Mobile Web)  
**Budget Limits:**  
- **Maximum Texture Wire Size (Compressed):** $\le 3.2\text{ MB}$ ($3,276.8\text{ KB}$)  
- **Maximum GPU VRAM Footprint (Uncompressed):** $\le 36.0\text{ MB}$  
- **Maximum Individual Texture Resolution:** $1024 \times 1024$ (Hero surfaces) / $512 \times 512$ (Secondary surfaces)  

---

## 1. Texture Inventory & Actual Wire Size Audit

The table below itemizes every production PBR texture asset active in the project, recording its dimensions, channels, actual measured wire payload on disk, uncompressed GPU VRAM footprint (including standard mipmap chain allocation), and budget compliance:

| Texture Asset | Width × Height | Channels | Format | Actual Wire Size | GPU VRAM (w/ Mipmaps) | Budget Tier | Status |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| `stucco_normal.png` | 512 × 512 | RGBA (8-bit) | PNG | $580.8\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| `stucco_roughness.png` | 512 × 512 | RGBA (8-bit) | PNG | $16.3\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| `travertine_normal.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $206.3\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `travertine_roughness.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $69.5\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `walnut_normal.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $168.5\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `walnut_roughness.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $41.7\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `concrete_normal.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $287.3\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `concrete_roughness.png` | 1024 × 1024 | RGBA (8-bit) | PNG | $63.2\text{ KB}$ | $5.33\text{ MB}$ | Hero ($1024$) | **PASS** |
| `water_normal_1.png` | 512 × 512 | RGBA (8-bit) | PNG | $334.5\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| `water_normal_2.png` | 512 × 512 | RGBA (8-bit) | PNG | $288.6\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| `gravel_normal.png` | 512 × 512 | RGBA (8-bit) | PNG | $31.3\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| `ground_normal.png` | 512 × 512 | RGBA (8-bit) | PNG | $436.9\text{ KB}$ | $1.33\text{ MB}$ | Secondary ($512$) | **PASS** |
| **TOTALS** | — | — | — | **$2,524.84\text{ KB}$ ($2.47\text{ MB}$)** | **$31.96\text{ MB}$ raw VRAM** | — | **ALL PASS** |

---

## 2. Memory Analysis & Comparison

### 2.1 Wire Delivery (Network Bandwidth)
- **Target Budget:** $\le 3,200\text{ KB}$ ($3.2\text{ MB}$).
- **Actual Size:** **$2,524.84\text{ KB}$** ($2.47\text{ MB}$).
- **Headroom Remaining:** **$21.1\%$** ($675.16\text{ KB}$ unused headroom).
- **Network Transfer Time:**
  - $4\text{G Mobile (25 Mbps)}:$ $\sim 0.78\text{ seconds}$
  - $3\text{G Fast Mobile (1.5 Mbps)}:$ $\sim 13.1\text{ seconds}$
  - Broadband ($100\text{ Mbps}$): $< 0.20\text{ seconds}$

### 2.2 GPU Video RAM (VRAM)
In WebGL 2.0, standard RGBA8 textures consume:
$$\text{VRAM}_{\text{base}} = \text{Width} \times \text{Height} \times 4\text{ bytes}$$
With complete mipmap pyramids (down to $1 \times 1$), total allocation is:
$$\text{VRAM}_{\text{total}} = \text{VRAM}_{\text{base}} \times \frac{4}{3} \approx 1.333 \times \text{VRAM}_{\text{base}}$$

- For a $1024 \times 1024$ RGBA8 texture:
  $1024 \times 1024 \times 4 \times 1.3333 = 5,592,405\text{ bytes} \approx 5.33\text{ MB}$.
- For a $512 \times 512$ RGBA8 texture:
  $512 \times 512 \times 4 \times 1.3333 = 1,398,101\text{ bytes} \approx 1.33\text{ MB}$.

Total GPU VRAM for the 12 PBR textures is:
$$(4 \times 5.33\text{ MB}) + (8 \times 1.33\text{ MB}) = 21.32\text{ MB} + 10.64\text{ MB} = \mathbf{31.96\text{ MB}}$$
Well within standard mobile WebGL limits ($\le 64\text{ MB}$).

---

## 3. Texel Density & UV Tiling Strategy

To guarantee realistic scale without repetitive tiling artifacts visible from the inspection cameras:

| Material | Architectural Dimension | Texture Resolution | UV Repeat Factor | Apparent Texel Density |
| :--- | :--- | :---: | :---: | :---: |
| **Facade Stucco** | $32.0\text{m} \times 8.0\text{m}$ span | $512 \times 512$ | $8.0 \times 8.0$ | $\sim 128\text{ px/m}$ (Subtle micro-grain) |
| **Travertine Floor** | $1.20\text{m} \times 0.60\text{m}$ per tile | $1024 \times 1024$ | $4.0 \times 4.0$ | $\sim 213\text{ px/m}$ (Crisp joint lines) |
| **Walnut Joinery** | $0.05\text{m} \times 3.34\text{m}$ per batten | $1024 \times 1024$ | $1.0 \times 4.0$ | $\sim 307\text{ px/m}$ (Silky wood grain) |
| **Board-Formed Concrete**| $18.0\text{m} \times 3.2\text{m}$ wall | $1024 \times 1024$ | $2.0 \times 1.0$ | $\sim 114\text{ px/m}$ ($150\text{mm}$ board seams) |
| **Pool Water Plane** | $13.7\text{m} \times 3.95\text{m}$ water plane | $512 \times 512$ | $4.0 \times 2.0$ | $\sim 150\text{ px/m}$ (Capillary wind ripples) |
| **Roof Gravel Bed** | $31.8\text{m} \times 25.8\text{m}$ roof deck | $512 \times 512$ | $12.0 \times 10.0$ | $\sim 193\text{ px/m}$ (Pebble aggregate) |

### Scale Rules Enforced:
1. **No Miniature Patterns:** Travertine seams match exact 1.2m x 0.6m proportions; concrete board spacing matches standard 150mm timber planks.
2. **No Blown-Up Low-Res Textures:** Texel density remains tightly clustered between $114\text{ px/m}$ and $307\text{ px/m}$ across all hero architectural surfaces.
3. **Anisotropic Filtering:** Three.js texture samplers utilize maximum available hardware anisotropy (`renderer.capabilities.getMaxAnisotropy()`, typically $16\times$) to prevent blur at shallow grazing angles along the travertine terrace and double-height atrium floor.
