import * as THREE from 'three';

/**
 * SANTRO M6 — Architectural Camera Look Targets
 *
 * Defines the intentional architectural focal targets throughout the exterior sequence.
 * In architectural cinematography, the look target interpolates independently
 * from camera position to achieve deliberate framing and reframing of architectural elements.
 */

export const ARCHITECTURAL_TARGETS = {
  // Establishing Overview: Geometric centroid of upper cantilevers and central negative space
  houseCenter: new THREE.Vector3(0.0, 3.8, 2.0),

  // Mid Descent: Framing the relationship between the south living façade and pool plinth
  facadePlinth: new THREE.Vector3(0.0, 3.0, 1.8),

  // Pool Approach: Framing entrance portal centered between structural columns
  entrancePortal: new THREE.Vector3(0.0, 1.6, 0.0),

  // Entrance Approach: Tight focus on walnut pivot door leaf and vertical illuminated handle
  doorLeaf: new THREE.Vector3(0.0, 1.6, -1.5),

  // Threshold Transition: Vanishing point extending straight down the gallery corridor axis (for M7)
  galleryAxis: new THREE.Vector3(0.0, 1.6, -6.0),

  // Foyer Settle: Framing 24-batten fluted walnut wall, typography plinth, and floating stair
  foyerWalnutWall: new THREE.Vector3(1.60, 1.60, -4.2),

  // Corridor Circulation: Longitudinal vanishing point down central corridor axis
  corridorAxis: new THREE.Vector3(0.0, 1.60, -10.0),

  // Workspace Lab Reveal: Framing executive walnut desk, credenza, and monitors through frameless glass
  workspaceLab: new THREE.Vector3(-3.20, 1.40, -8.5),

  // Double-Height Atrium Emergence: Expansive volume framing mezzanine walkways
  atriumVolume: new THREE.Vector3(0.0, 1.50, -15.0),

  // Exhibition Core Finale: Framing monolithic travertine plinth toe-kick and rear curtain wall mountain panorama
  atriumPlinthVista: new THREE.Vector3(0.0, 1.30, -19.5),
} as const;

export type ArchitecturalTargetKey = keyof typeof ARCHITECTURAL_TARGETS;

/**
 * Returns a clone of the specified architectural look target
 */
export function getArchitecturalTarget(key: ArchitecturalTargetKey): THREE.Vector3 {
  return ARCHITECTURAL_TARGETS[key].clone();
}
