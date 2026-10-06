import * as THREE from 'three';

/**
 * SANTRO M6 — Camera Interpolation & Mathematical Utilities
 *
 * Provides high-performance, allocation-free mathematical operations for:
 * - Centripetal Catmull-Rom 3D curve sampling
 * - Independent position, target, and lens FOV interpolation
 * - Strict level-horizon camera orientation (zero roll, upright verticals)
 * - Exponential decay damping and cubic easing curves
 */

// Global reusable math primitives — 0 garbage collection pressure per frame
const _tempPos = new THREE.Vector3();
const _forward = new THREE.Vector3();
const _right = new THREE.Vector3();
const _up = new THREE.Vector3(0, 1, 0);
const _rotMatrix = new THREE.Matrix4();
const _targetQuat = new THREE.Quaternion();

/**
 * Computes standard smoothstep interpolation: S(x) = 3x^2 - 2x^3
 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/**
 * Computes cubic ease-in-out easing
 */
export function easeInOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return clamped < 0.5
    ? 4 * clamped * clamped * clamped
    : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
}

/**
 * Computes exponential decay damping factor for frame-rate independent smoothing.
 * factor = 1.0 - Math.exp(-lambda * delta)
 */
export function getDampingFactor(lambda: number, delta: number): number {
  const safeDelta = Math.min(delta, 0.1); // Guard against tab freeze / huge dt spikes
  return 1.0 - Math.exp(-lambda * safeDelta);
}

/**
 * Piecewise linear interpolation between an array of numeric keys
 */
export function interpolateKeys(
  keys: { progress: number; value: number }[],
  t: number
): number {
  if (keys.length === 0) return 0;
  if (t <= keys[0].progress) return keys[0].value;
  if (t >= keys[keys.length - 1].progress) return keys[keys.length - 1].value;

  for (let i = 0; i < keys.length - 1; i++) {
    const k0 = keys[i];
    const k1 = keys[i + 1];
    if (t >= k0.progress && t <= k1.progress) {
      const segT = (t - k0.progress) / (k1.progress - k0.progress);
      const easedT = smoothstep(0, 1, segT);
      return THREE.MathUtils.lerp(k0.value, k1.value, easedT);
    }
  }

  return keys[keys.length - 1].value;
}

/**
 * Enforces a strictly level horizon for architectural photography.
 * Rotates the camera toward the target point with zero roll (Up vector strictly [0, 1, 0]).
 */
export function applyLevelHorizonLookAt(
  camera: THREE.Camera,
  target: THREE.Vector3,
  slerpFactor = 1.0
): void {
  _forward.subVectors(target, camera.position);
  if (_forward.lengthSq() < 0.0001) return;
  _forward.normalize();

  // If looking nearly straight up or down, fallback to standard lookAt
  if (Math.abs(_forward.y) > 0.999) {
    camera.lookAt(target);
    return;
  }

  // Calculate right vector perpendicular to world Up
  _right.crossVectors(_forward, _up).normalize();

  // Recalculate true architectural camera Up
  const trueUp = _tempPos.crossVectors(_right, _forward).normalize();

  // Construct pure orientation matrix with zero roll
  _rotMatrix.makeBasis(_right, trueUp, _forward.negate());
  _targetQuat.setFromRotationMatrix(_rotMatrix);

  if (slerpFactor >= 0.999) {
    camera.quaternion.copy(_targetQuat);
  } else {
    camera.quaternion.slerp(_targetQuat, slerpFactor);
  }
}

/**
 * Clamps a 3D position vector within spatial boundary limits
 */
export function clampPositionToBounds(
  pos: THREE.Vector3,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number
): void {
  pos.x = Math.max(minX, Math.min(maxX, pos.x));
  pos.y = Math.max(minY, Math.min(maxY, pos.y));
  pos.z = Math.max(minZ, Math.min(maxZ, pos.z));
}
