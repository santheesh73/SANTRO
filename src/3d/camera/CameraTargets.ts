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
} as const;

export type ArchitecturalTargetKey = keyof typeof ARCHITECTURAL_TARGETS;

/**
 * Returns a clone of the specified architectural look target
 */
export function getArchitecturalTarget(key: ArchitecturalTargetKey): THREE.Vector3 {
  return ARCHITECTURAL_TARGETS[key].clone();
}
