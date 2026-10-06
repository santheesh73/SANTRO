# ARCHITECTURAL CAMERA COMPOSITION SPECIFICATION

**Milestone:** M6 — Exterior Cinematic Camera Journey  
**Cinematographic Principles:** Framing, Leading Lines, Negative Space, Depth Layering, Symmetry vs. Asymmetry  
**Reference Video:** `asset/architectural_reference.mp4` (Shot 01 & Shot 02)

---

## 1. Compositional Philosophy

The architectural composition in "The Portfolio House" follows classic modernist cinematography (inspired by Julius Shulman architectural photography and Denis Villeneuve cinematic framing):
- Architecture is never treated as a 3D gaming asset placed arbitrarily in the center of the screen.
- Every camera position reveals specific structural junctions: cantilevers, reveal joints, floor slab transitions, and reflections.
- Vertical lines remain strictly parallel to the frame edges ($0.0^\circ$ roll).

---

## 2. Five Cinematic Visual Tenets

### 2.1 Leading Lines
The camera path utilizes continuous geometric edges to guide the viewer's gaze toward destinations:
1. **Infinity Pool Weir Edge:** A crisp horizontal line running along $-X$ that converges with the entrance axis in perspective.
2. **Travertine Floor Slab Joints:** Grid joints in the honed pavers create orthogonal lines converging to the entrance threshold.
3. **Cantilever Soffit Revealing:** The dark reveal gap beneath the upper cantilever roof beams leads the eye along the upper elevation.
4. **Concrete Foundation Steps:** Horizontal formwork lines in the retaining wall draw attention to the natural topography.

```text
COMPOSITIONAL FRAME: SHOT 02 POOL TERRACE APPROACH (Frame 070)

 ┌──────────────────────────────────────────────────────────────┐
 │                      [ SKY GRADIENT ]                        │
 │                                                              │
 │   ┌─────────────────┐             ┌──────────────────────┐   │
 │   │ WEST CANTILEVER │  [VOID]     │ EAST CANTILEVER      │   │
 │   │ (INSET BALCONY) │             │ (SOLID IVORY FACE)   │   │
 │   └───────┬─────────┘             └──────────┬───────────┘   │
 │           │  [ OVERHANG SOFFIT SHADOW ]      │               │
 │           ▼                                  ▼               │
 │       [COLUMN]   [ WALNUT PIVOT DOOR ]   [COLUMN]            │
 │           │      [ CYAN LED HANDLE ]         │               │
 │           │                                  │               │
 │ [ POOL WEIR EDGE ] ──────────────────────> [ THRESHOLD ]     │
 │ [ WATER REFLECTION ]                                         │
 │ [ TRAVERTINE PAVERS ] ───────────────────>                   │
 └──────────────────────────────────────────────────────────────┘
```

---

### 2.2 Negative Space
Rather than overcrowding the frame with monolithic walls, the composition exploits structural negative space:
- **Central Air Void:** The space between the West and East upper cantilever boxes allows the viewer to see the sky, the rear skylight curb, and the mountain horizon behind the house.
- **Under-Cantilever Shaded Terrace:** The deep $3.8\text{m}$ setback under the upper boxes creates high-contrast architectural shadow, framing the glazed living room.

---

### 2.3 Symmetry vs. Asymmetry
- **Asymmetric Establishing Shot (Shot 01):**
  The house is composed off-center with the camera at $X = +4.2\text{m}$. The West volume features a hollow recessed balcony, while the East volume projects forward with a solid ivory mass. This deliberate asymmetry generates dynamic visual tension and depth.
- **Symmetric Entry Framing (Shot 02 Walkthrough):**
  As the camera reaches $s = 0.80 - 1.00$, the camera aligns on the architectural axis between the two structural columns ($X = 0.0\text{m}$), producing an authoritative, symmetrical view of the entrance portal.

---

### 2.4 Depth Layering
Every frame establishes 3 distinct spatial layers:
1. **Foreground:** Stepped concrete plinth or reflective lap pool surface and teak loungers.
2. **Midground:** The illuminated architectural house, glass pocket doors, and walnut pivot portal.
3. **Background:** Rugged mountain ridges, chaparral scrub vegetation, and golden hour / dusk sky gradients.

---

## 3. Shot-by-Shot Framing Analysis

| Stage | Keyframe | Framing Focus | Vanishing Point | Horizon Placement |
| :--- | :--- | :--- | :--- | :--- |
| **Establishing** | Frame 000 ($t=0.0\text{s}$) | High-angle three-quarter axonometric perspective | Lower third center $[0.0, 3.8, 2.0]$ | Upper third ($Y \approx 72\%$ of viewport height) |
| **Approach Glide** | Frame 034 ($t=1.4\text{s}$) | Diagonal plunge along plinth retaining wall | Centered on living room glazed sliders | Lowering toward mid-frame |
| **Pool Reveal** | Frame 070 ($t=2.9\text{s}$) | Two-point perspective with strong pool reflection | Entrance door portal $[0.0, 1.6, 0.0]$ | Exact center ($Y = 50\%$, level human perspective) |
| **Portal Framing** | Frame 095 ($t=3.9\text{s}$) | One-point axial perspective confronting door | Illuminated cyan handle trace | Exact center ($Y = 50\%$) |
| **Threshold Vista** | Frame 108 ($t=4.5\text{s}$) | Deep one-point interior gallery tunnel vista | Hallway vanishing point $[0.0, 1.6, -6.0]$ | Exact center ($Y = 50\%$) |
