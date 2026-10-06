# PROJECT EXHIBITION SPECIFICATION

**Module:** `src/3d/rooms/exhibits/ProjectExhibit.tsx`  
**Location:** Double-Height Exhibition Atrium ($Z: -10.2\text{m}$ to $-15.0\text{m}$)  
**Component:** `<ProjectExhibit project={project} variant="featured" | "standard" | "compact" />`  

---

## 1. Visual Hierarchy & Spatial Composition

The Project Studio rejects flat web card grids. Exhibits are composed across three architectural tiers flanking the central atrium promenade, keeping the central axis unblocked for the Contact plinth and rear vista:

```text
               [ DOUBLE-HEIGHT REAR GLASS & VISTA ]
                                 │
                   [CONTACT PLINTH: Z: -18.5m]
                                 │
           ┌─────────────────────┴─────────────────────┐
           │                                           │
       [BHOOMI] (Compact)                          [AHAL AI] (Standard)
       X: -4.5m, Z: -14.6m                         X: +2.6m, Z: -14.2m
           │                                           │
      [HEARTTUNE] (Standard)                      [MINCHAL] (Compact)
       X: -2.6m, Z: -14.2m                         X: +4.5m, Z: -13.2m
           │                                           │
        [PRYSM] (Compact)                           [NISF] (Standard)
       X: -4.5m, Z: -12.8m                         X: +2.6m, Z: -12.2m
           │                                           │
   ★ [ORION] (FEATURED) ★                              │
     X: -2.6m, Z: -12.2m                               │
           │                                           │
           └─────────────────────┬─────────────────────┘
                                 │
                 [UNBLOCKED CENTER CORRIDOR X: 0.0m]
                                 │
                  [CAMERA SETTLE POINT: Z: -14.5m]
                                 ▲
                   [CORRIDOR WALKWAY: Z: -10.2m]
```

---

## 2. Exhibit Variants & Dimensions

### 2.1 Featured Variant (`featured`)
- **Assigned Project:** `ORION` (On-Device WebGPU Agent Platform)
- **Position:** West Primary Bay ($X: -2.6\text{m}$, $Z: -12.2\text{m}$)
- **Plinth Dimension:** $2.4\text{m} \times 0.55\text{m} \times 1.0\text{m}$ (Travertine with cyan LED toe-kick)
- **Display Stele:** $2.1\text{m} \times 1.45\text{m} \times 0.06\text{m}$ (Dark anodized aluminum body)
- **Information Density:** Large title, subtitle, 3-metric comparison cards, full tech stack chips, and interactive inspection prompt.

### 2.2 Standard Variant (`standard`)
- **Assigned Projects:** `HEARTTUNE` ($X: -2.6\text{m}$, $Z: -14.2\text{m}$), `NISF` ($X: +2.6\text{m}$, $Z: -12.2\text{m}$), `AHAL AI` ($X: +2.6\text{m}$, $Z: -14.2\text{m}$)
- **Plinth Dimension:** $1.7\text{m} \times 0.55\text{m} \times 0.8\text{m}$
- **Display Stele:** $1.55\text{m} \times 1.15\text{m} \times 0.05\text{m}$
- **Information Density:** Title, subtitle, concise purpose, verified metrics, technology badges.

### 2.3 Compact Variant (`compact`)
- **Assigned Projects:** `PRYSM` ($X: -4.5\text{m}$, $Z: -12.8\text{m}$), `BHOOMI` ($X: -4.5\text{m}$, $Z: -14.6\text{m}$), `MINCHAL` ($X: +4.5\text{m}$, $Z: -13.2\text{m}$)
- **Plinth Dimension:** $1.3\text{m} \times 0.50\text{m} \times 0.7\text{m}$
- **Display Stele:** $1.15\text{m} \times 0.95\text{m} \times 0.04\text{m}$
- **Information Density:** Title, year, domain badge, primary performance metric.

---

## 3. Camera Clearance & Vista Preservation Verification

The central corridor trajectory follows $X: 0.0\text{m}$ from $Z: -10.2\text{m}$ to $Z: -14.5\text{m}$.
- Lateral clearance to closest exhibits (Orion, HeartTune, Nisf, Ahal AI): $|X| = 2.6\text{m} \ge 1.5\text{m}$ minimum requirement.
- Central corridor sightline ($X \in [-1.2, 1.2]$, $Z \in [-10.2, -18.0]$): Exactly 0 blockers, preserving a direct, unhindered architectural vista from the camera stop to the Contact plinth and the rear mountain panorama.
- Pairwise separation: Minimum separation between any two exhibits is $\ge 1.4\text{m}$ (zero collision).
