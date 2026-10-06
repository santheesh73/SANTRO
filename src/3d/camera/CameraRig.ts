import * as THREE from 'three';
import { CAMERA_CONFIG } from './CameraConfig';
import {
  getDampingFactor,
  applyLevelHorizonLookAt,
  clampPositionToBounds,
} from './CameraInterpolation';

/**
 * SANTRO M6 — Master Camera Rig
 *
 * Implements M6 Section 6:
 * Controlled camera rig decoupling position, orientation, look target, and lens FOV
 * from direct component manipulation.
 *
 * Rig components:
 * - Position: 3D world position with exponential inertia damping and spatial boundaries
 * - LookTarget: Independent architectural focal target with decoupled damping
 * - Orientation: Strictly level-horizon orientation with zero roll
 * - Lens: Optical field-of-view damping and projection matrix management
 *
 * Guarantees zero garbage-collection allocations per frame.
 */
export class CameraRig {
  // Current interpolated rig state
  public readonly position: THREE.Vector3;
  public readonly target: THREE.Vector3;
  public readonly quaternion: THREE.Quaternion;
  public fov: number;

  // Scratch vectors for internal calculations — 0 GC allocations
  private readonly _microOffset: THREE.Vector3;
  private readonly _tempDesiredPos: THREE.Vector3;
  private readonly _dummyCamera: THREE.PerspectiveCamera;

  constructor(
    initialPosition: [number, number, number] = [4.2, 12.5, 26.0],
    initialTarget: [number, number, number] = [0.0, 3.8, 2.0],
    initialFov: number = CAMERA_CONFIG.defaultFov
  ) {
    this.position = new THREE.Vector3(...initialPosition);
    this.target = new THREE.Vector3(...initialTarget);
    this.quaternion = new THREE.Quaternion();
    this.fov = initialFov;

    this._microOffset = new THREE.Vector3();
    this._tempDesiredPos = new THREE.Vector3();
    this._dummyCamera = new THREE.PerspectiveCamera();

    // Initialize level horizon orientation
    this._dummyCamera.position.copy(this.position);
    applyLevelHorizonLookAt(this._dummyCamera, this.target);
    this.quaternion.copy(this._dummyCamera.quaternion);
  }

  /**
   * Resets rig immediately to given coordinates with zero damping
   */
  public reset(
    pos: THREE.Vector3 | [number, number, number],
    target: THREE.Vector3 | [number, number, number],
    fov: number = CAMERA_CONFIG.defaultFov
  ): void {
    if (Array.isArray(pos)) {
      this.position.set(pos[0], pos[1], pos[2]);
    } else {
      this.position.copy(pos);
    }

    if (Array.isArray(target)) {
      this.target.set(target[0], target[1], target[2]);
    } else {
      this.target.copy(target);
    }

    this.fov = fov;

    this._dummyCamera.position.copy(this.position);
    applyLevelHorizonLookAt(this._dummyCamera, this.target);
    this.quaternion.copy(this._dummyCamera.quaternion);
  }

  /**
   * Updates rig physics, independent target damping, boundary clamping, and level horizon orientation
   */
  public update(
    delta: number,
    desiredPosition: THREE.Vector3,
    desiredTarget: THREE.Vector3,
    desiredFov: number,
    options?: {
      applyMicroMovement?: boolean;
      clockTime?: number;
      posDampingRate?: number;
      targetDampingRate?: number;
      fovDampingRate?: number;
    }
  ): void {
    this._tempDesiredPos.copy(desiredPosition);

    // 1. Subtle Natural Micro-Movement (imperceptible camera breathing)
    if (options?.applyMicroMovement && options.clockTime !== undefined && CAMERA_CONFIG.microMovement.enabled) {
      const time = options.clockTime * CAMERA_CONFIG.microMovement.frequency * Math.PI * 2;
      const amp = CAMERA_CONFIG.microMovement.positionAmplitude;
      this._microOffset.set(
        Math.sin(time) * amp,
        Math.cos(time * 0.7) * amp * 0.5,
        Math.sin(time * 0.5) * amp
      );
      this._tempDesiredPos.add(this._microOffset);
    }

    // 2. Collision Safety Boundary Clamping
    const b = CAMERA_CONFIG.boundaries;
    clampPositionToBounds(
      this._tempDesiredPos,
      b.minX,
      b.maxX,
      b.minY,
      b.maxY,
      b.minZ,
      b.maxZ
    );

    // 3. Independent Position Damping
    const posRate = options?.posDampingRate ?? CAMERA_CONFIG.damping.position;
    const posDamp = getDampingFactor(posRate, delta);
    this.position.lerp(this._tempDesiredPos, posDamp);

    // 4. Independent Target Damping
    const targetRate = options?.targetDampingRate ?? CAMERA_CONFIG.damping.target;
    const targetDamp = getDampingFactor(targetRate, delta);
    this.target.lerp(desiredTarget, targetDamp);

    // 5. Compute Strict Level-Horizon Look-At Orientation
    this._dummyCamera.position.copy(this.position);
    applyLevelHorizonLookAt(this._dummyCamera, this.target);
    this.quaternion.copy(this._dummyCamera.quaternion);

    // 6. Independent Lens FOV Damping
    const fovRate = options?.fovDampingRate ?? CAMERA_CONFIG.damping.fov;
    const fovDamp = getDampingFactor(fovRate, delta);
    const fovDiff = desiredFov - this.fov;
    if (Math.abs(fovDiff) > 0.01) {
      this.fov += fovDiff * fovDamp;
    }
  }

  /**
   * Applies the rig's physical transform to the Three.js camera
   */
  public applyToCamera(camera: THREE.Camera): void {
    camera.position.copy(this.position);
    camera.quaternion.copy(this.quaternion);

    if ('fov' in camera) {
      const persCam = camera as THREE.PerspectiveCamera;
      if (Math.abs(persCam.fov - this.fov) > 0.01) {
        persCam.fov = this.fov;
        persCam.updateProjectionMatrix();
      }
    }
  }
}
