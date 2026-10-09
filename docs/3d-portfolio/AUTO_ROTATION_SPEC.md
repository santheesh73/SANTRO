# AUTO ROTATION & PANORAMIC INSPECTION SPECIFICATION

**System:** SANTRO 3D Architectural Portfolio  
**Milestone:** M9 — 360° Room Experience & Immersive Spatial Presentation  
**Status:** COMPLETE & ARCHITECTURALLY CONSTRAINED  
**Philosophy:** *Measured Panoramas, Never Rapid Spins.*

---

## 1. Cinematic Philosophy: Why Continuous 360° Spins Are Prohibited

In real-world architectural cinematography and exhibition curation:
1. **Human Beings Do Not Spin in Place:** When an architect or museum visitor enters a grand gallery, they do not twirl in full circles. They pause, orient themselves, look slightly to the left, look ahead, glance to the right, and walk with intention.
2. **Vestibular Comfort:** High angular velocity rotation without physical bodily feedback causes severe cognitive disorientation, nausea, and motion sickness (vestibulo-ocular conflict).
3. **Loss of Composition:** Rapid spinning turns carefully authored architecture into an unreadable visual blur.
4. **Cheap Virtual-Tour Effect:** Full automated 360° spins resemble low-end real estate spherical cameras rather than architectural high art.

Therefore, SANTRO strictly enforces **authored panoramic inspections with hard angular constraints**.

---

## 2. Hard Mathematical Constraints

| Parameter | Calibrated Limit | Rationale |
| :--- | :--- | :--- |
| **Maximum Yaw Swing ($\Delta\theta_{\text{yaw}}$)** | $\le 42^\circ$ total arc | Prevents camera from looking backwards into corridor walls. |
| **Maximum Angular Rate** | $\le 12.0^\circ$ per 1% progress | Prevents sudden whipping or angular acceleration spikes. |
| **Camera Roll ($\theta_{\text{roll}}$)** | Strictly $0.0^\circ$ | Level-horizon stabilization; eliminates vertigo. |
| **Camera Height Variation ($\Delta Y$)** | $\le 0.05\text{m}$ | Eliminates unnatural crane bobbing; locks to human eye level ($1.60\text{m}$). |
| **Minimum Exhibit Clearance** | $\ge 1.30\text{m}$ | Eliminates near-plane clipping through 3D meshes. |

---

## 3. Room-Specific Motion Intensity Architecture

Panoramic movement intensity is calibrated per room:

```text
High Intensity (Project Studio)
    → Controlled lateral dolly: [-1.4m to +0.8m]
    → Yaw swing: -24° (West Wing) to +28° (East Wing)
    → Slow, deliberate 7-beat rhythm

Medium-High Intensity (Engineering Lab)
    → Focused glancing through glass partition
    → Lateral dolly: [-0.5m to -0.35m]
    → Look target pans: [-4.4m to -2.4m]

Medium Intensity (Archive)
    → Gentle East-wing glance under mezzanine
    → Yaw swing: +20° toward travertine tablets

Low Intensity (Study & Contact)
    → Stable, nearly stationary holding positions
    → Minimal camera translation; subtle framing adjustments

Minimal Intensity (Terrace)
    → Zero rotation; pure axial perspective looking out toward mountain horizon
```

---

## 4. Controlled Yaw Movement Language

When an authored room requires panoramic coverage of two flanking bays (such as Project Studio):
- The camera moves from **Center-Arrival** $\to$ **Left Exhibition (West)** $\to$ **Center Axis Glance** $\to$ **Right Exhibition (East)** $\to$ **Central Symmetrical Finale**.
- At each transition, the look-target moves continuously along a smooth centripetal Catmull-Rom curve.
- Cubic Hermite smoothstep easing dampens the start and end of every glance.

---

## 5. Reduced-Motion Mode Fallback

When a user enables `prefers-reduced-motion` or sets reduced motion mode:
1. Panoramic yaw swings are dampened by $65\%$ (`blendFactor *= 0.35`).
2. Lateral dolly movement is constrained to the central corridor axis ($X = 0.0\text{m}$).
3. Micro-movement camera breathing is completely disabled.
4. Transitions become pure linear axial forward pushes, preserving content visibility while eliminating all rotational stimuli.
