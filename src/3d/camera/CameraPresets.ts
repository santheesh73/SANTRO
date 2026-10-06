/**
 * SANTRO M6 — Centralized Camera Presets Registry
 *
 * Implements M6 Section 5 modular camera architecture:
 * Unifies the 5 Calibrated Exterior Validation Shots (Section 32)
 * with the Baseline Reference Cameras (M0–M2).
 */
import {
  CAMERA_VALIDATION_SHOTS,
  VALIDATION_SHOT_LIST,
} from './CameraValidationShots';
import {
  REFERENCE_CAMERAS,
  REFERENCE_CAMERA_LIST,
} from './referenceCameras';

export const CAMERA_PRESETS = {
  validationShots: CAMERA_VALIDATION_SHOTS,
  validationShotList: VALIDATION_SHOT_LIST,
  referenceViews: REFERENCE_CAMERAS,
  referenceViewList: REFERENCE_CAMERA_LIST,
} as const;

export {
  CAMERA_VALIDATION_SHOTS,
  VALIDATION_SHOT_LIST,
  REFERENCE_CAMERAS,
  REFERENCE_CAMERA_LIST,
};
