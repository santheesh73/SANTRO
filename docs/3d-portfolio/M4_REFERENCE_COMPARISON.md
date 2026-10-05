# M4 — REFERENCE MATERIAL COMPARISON: "THE PORTFOLIO HOUSE"

**Milestone:** M4 — Architectural Materials & Surface Realism  
**Reference Video:** `asset/architectural_reference.mp4`  
**Reference Keyframes:** `asset/reference_frames/` (Frames 000–239)  

---

## 1. View 01: Hero Exterior Architecture (Frame 000 / Shot 01)

```text
VIEW: Shot 01 — Elevated Southwest Perspective
Reference Keyframe: frame_000.png
Camera: Pos [4.2, 12.5, 26.0], Target [0.0, 3.8, 2.0], FOV 48°
```

### Material Evaluation
- **Architecture:** Stepped two-story cantilever massing, recessed bridge, continuous parapet coping, and west lap pool.
- **Walls (`MAT_Wall_Main` / `MAT_Wall_Secondary`):** Warm off-white stucco plaster (`#ECEBE4`, roughness 0.82) with subtle micro-stucco normal relief; cantilever soffit underside is slightly softer off-white (`#F2F1EA`).
- **Wood (`MAT_Wood_Deck`):** Weathered architectural teak sun loungers (`#7A5332`) on west and east terrace plinths.
- **Glass (`MAT_Glass_Clear` / `MAT_Glass_Dark`):** Ultra-clear frameless balustrades with low roughness ($0.02$) and high transmission ($0.96$); dark bronze-tinted glass on rooftop skylight.
- **Metal (`MAT_Metal_Dark` / `MAT_Metal_Brushed`):** Dark charcoal anodized aluminum on coping capping profiles, base shadow reveals, and window frames; brushed stainless steel top u-channels on glass balustrades.
- **Ground (`MAT_Terrace` / `MAT_Ground`):** Honed travertine pool deck (`#D8D1C2`, roughness 0.38) with soft elongated specular highlights; arid desert earth terrain slope (`#7D6E58`).
- **Pool (`MAT_Water`):** Clean chlorinated turquoise pool water (`#38A3A5`, transmission 0.95, IOR 1.333) with calm capillary wave normal ripples and vanishing weir overflow edge.
- **Vegetation (`MAT_Vegetation`):** Muted desert agaves along pool retaining wall and chaparral shrubs on hillside slopes.

### Match Level: **EXCELLENT**

### Material Differences & Corrections
- *Prior State (M3):* All surfaces rendered in flat neutral gray/ivory clay shaders with uniform Lambertian scatter.
- *M4 Correction:* Applied micro-stucco grain to walls, honed travertine tile joints to deck, physical transmission and calm ripples to water, and board-formed formwork texture to retaining wall.

---

## 2. View 02: Pedestrian Entrance Approach (Frame 070 / Shot 02)

```text
VIEW: Shot 02 — Pedestrian Approach & Entrance Portal
Reference Keyframe: frame_070.png
Camera: Pos [-1.2, 1.65, 14.8], Target [0.0, 1.60, 0.0], FOV 54°
```

### Material Evaluation
- **Architecture:** Pedestrian perspective moving past the infinity pool toward the recessed entrance portal flanked by columns and canopy soffit.
- **Walls (`MAT_Wall_Main` / `MAT_Wall_Secondary`):** Vertical portal columns in clean stucco plaster; canopy soffit underside in plaster with recessed circular downlight apertures and perimeter shadow reveal.
- **Wood (`MAT_Wood_Entrance`):** 9 horizontal American walnut door planks (`#6B4423`, roughness 0.38, clearcoat 0.20) with horizontal grain normal map and bevel shadow reveals.
- **Glass (`MAT_Glass_Clear`):** Symmetrical entrance sidelites flanking the pivot door, offering crystal transmission into the interior foyer.
- **Metal (`MAT_Metal_Dark` / `MAT_Metal_Brushed` / `MAT_LED_Cyan`):** Dark aluminum door frame stiles; full-height brushed stainless steel pull handle with illuminated cyan LED nightlight channel (`#00F0FF`, emissive 2.5); top and bottom circular pivot hinge hardware plates.
- **Ground (`MAT_Terrace`):** Honed travertine terrace approach steps leading to the entrance threshold.
- **Pool (`MAT_Water`):** Clean pool water surface reflecting the sky on the left of the walkway.
- **Vegetation (`MAT_Vegetation`):** Succulent agave clusters framing the retaining wall base.

### Match Level: **EXCELLENT**

### Material Differences & Corrections
- *Prior State (M3):* Door planks were flat brown blocks; handle was plain steel without illuminated nightlight channel.
- *M4 Correction:* Calibrated rich walnut amber undertone with satin oil clearcoat reflection; added active glowing cyan LED indicator strip; travertine steps feature soft light grazing.

---

## 3. View 03: Interior Circulation Gallery & Workspace (Frames 120 & 133 / Shot 03)

```text
VIEW: Shot 03 — Interior Foyer, Fluted Walnut Wall & Workspace
Reference Keyframes: frame_120.png, frame_133.png
Camera: Pos [0.2, 1.60, -1.8], Target [1.8, 1.60, -4.5], FOV 58°
```

### Material Evaluation
- **Architecture:** Interior circulation axis looking east along the feature fluted walnut wall, floating staircase, and looking west into the glass engineering workspace.
- **Walls (`MAT_Wall_Secondary`):** Smooth interior plaster walls with recessed perimeter baseboard reveals.
- **Wood (`MAT_Wood_Interior`):** 24 vertical walnut battens (`#5A3825`, roughness 0.42, clearcoat 0.15) with vertical grain normal map, casting linear rhythm shadows; matching executive walnut desk and credenza in workspace.
- **Glass (`MAT_Glass_Clear`):** Frameless glass partitions enclosing the engineering workspace with zero green tint and realistic transmission.
- **Metal (`MAT_Metal_Dark` / `MAT_Metal_Brushed`):** Black ceiling linear lighting slot; brushed steel mounting pins supporting floating stone steps; dark charcoal aluminum monitor screens and desk legs; brushed steel tubular door handles and monitor stands.
- **Ground / Floor (`MAT_Stone`):** Monolithic honed travertine floor slabs (`#DDD6C8`, roughness 0.35) with crisp tile joints and soft directional downlight sheen.
- **Pool / Water:** N/A (Interior view).
- **Vegetation:** N/A.

### Match Level: **EXCELLENT**

### Material Differences & Corrections
- *Prior State (M3):* Fluted battens had identical flat brown color to exterior door; floor had uniform rough finish.
- *M4 Correction:* Differentiated rich interior American walnut from exterior planked door; calibrated honed travertine with $0.35$ roughness producing elongated specular light streaks matching reference frames 120 and 133.

---

## 4. View 04: Monumental Double-Height Atrium & Mountain Vista (Frames 185 & 239 / Shot 04)

```text
VIEW: Shot 04 — Exhibition Atrium Core & Mountain Vista
Reference Keyframes: frame_185.png, frame_239.png
Camera: Pos [0.0, 1.60, -11.5], Target [0.0, 1.20, -14.0], FOV 54°
```

### Material Evaluation
- **Architecture:** Double-height central atrium void, left and right mezzanine walkways, monolithic travertine exhibition plinth, and monumental rear curtain wall framing mountain horizon.
- **Walls (`MAT_Wall_Main` / `MAT_Wall_Secondary`):** Double-height side walls in clean stucco plaster; ceiling troughs housing indirect warm LED diffuser channels.
- **Wood:** Mezzanine joinery trims in deep American walnut.
- **Glass (`MAT_Glass_Clear`):** Mezzanine glass balustrades with brushed steel top caps; rear 5-bay curtain wall opening onto the distant ridgeline.
- **Metal (`MAT_Metal_Dark` / `MAT_Metal_Brushed`):** Dark aluminum curtain wall framing mullions and transoms; mezzanine structural fascia beams; master plinth recessed toe-kick reveal channel.
- **Ground / Floor (`MAT_Stone` / `MAT_Ground`):** Honed travertine floor slabs continuing through the atrium; master and secondary exhibition plinths in honed limestone; distant mountain terrain in arid earth tone.
- **Pool / Water:** Vanishing lap pool visible in exterior finale composition (Frame 239).
- **Vegetation (`MAT_Vegetation`):** Hillside chaparral scrub grounding the building into the hillside.

### Match Level: **EXCELLENT**

### Material Differences & Corrections
- *Prior State (M3):* Exhibition plinth looked like a floating box; ceiling coves were dark unlit slots.
- *M4 Correction:* Added dark metal toe-kick reveal under master plinth grounding it into the travertine floor; activated warm linear diffusers (`MAT_Light_Cove_Warm`, emissive 2.0); rear curtain glass renders transparent mountain panorama.

---

## 5. Summary Matrix

| Reference Shot | Overall Match | Key Material Milestone Achievements |
| :---: | :---: | :--- |
| **Shot 01 (Exterior)** | **EXCELLENT** | Stucco grain, travertine deck, pool water transmission & ripples, board-formed concrete. |
| **Shot 02 (Entrance)** | **EXCELLENT** | Horizontal walnut door with clearcoat sheen, brushed handle with cyan LED nightlight channel, sidelite glass. |
| **Shot 03 (Interior)** | **EXCELLENT** | 24 fluted walnut battens, honed floor sheen, floating stone treads with steel pins, frameless office glass. |
| **Shot 04 (Atrium)** | **EXCELLENT** | Monolithic plinth with toe-kick reveal, mezzanine balustrades, rear vista curtain wall, indirect ceiling light coves. |
