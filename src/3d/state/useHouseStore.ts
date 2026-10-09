import { create } from 'zustand';
import { QualityTier, SpatialZone } from '@/types';
import { detectDefaultQualityTier } from '@/3d/utils/quality';
import { ReferenceCameraId } from '@/3d/camera/referenceCameras';
import { MaterialDisplayMode } from '@/3d/materials/types';
import { TimeOfDayPreset, LightingDebugSolo } from '@/3d/lighting/types';
import { CameraJourneyState } from '@/3d/camera/types';
import { RoomId } from '@/3d/rooms/types';
import { RoomExperienceState } from '@/3d/rooms/experience/types';

export type CameraMode = 'cinematic' | 'inspect' | 'free' | 'spline';

export interface HouseState {
  // Spatial Journey Progress (0.0 to 1.0)
  scrollProgress: number;
  targetProgress: number;
  cinematicProgress: number;
  exteriorCameraState: CameraJourneyState;
  interiorFactor: number; // 0.0 (exterior) to 1.0 (interior iris adaptation)
  activeValidationShotId: string | null;
  showCameraSplineDebug: boolean;
  currentZone: SpatialZone;
  currentRoomId: RoomId;

  // M9 Room Experience State
  roomExperienceState: RoomExperienceState;
  activeBeatId: string | null;
  activeBeatLabel: string | null;
  localRoomProgress: number; // 0.0 to 1.0 within active room
  isInsideRoomExperience: boolean;
  showRoomExperienceDebug: boolean;

  // Camera & Interaction
  cameraMode: CameraMode;
  activeRefCamera: ReferenceCameraId | null;
  cameraTransitionNonce: number;
  inspectTargetId: string | null;
  isDoorOpen: boolean;
  doorAngle: number; // in radians: 0.0 to -1.48 (~ -85 deg)

  // M4 Material System State
  materialMode: MaterialDisplayMode;
  showMaterialPreview: boolean;

  // M5 Lighting & Atmosphere State
  timeOfDay: TimeOfDayPreset;
  lightingDebugSolo: LightingDebugSolo;

  // Interactive Project Modal
  activeProjectId: string | null;
  isModalOpen: boolean;

  // Performance & System
  qualityTier: QualityTier;
  isAudioMuted: boolean;
  isLoading: boolean;
  loadingProgress: number; // 0 to 100
  modelLoaded: boolean;
  modelError: string | null;

  // Actions
  setScrollProgress: (progress: number) => void;
  setCinematicProgress: (progress: number) => void;
  setTargetProgress: (progress: number) => void;
  setExteriorCameraState: (state: CameraJourneyState) => void;
  setInteriorFactor: (factor: number) => void;
  setActiveValidationShotId: (id: string | null) => void;
  setShowCameraSplineDebug: (show: boolean) => void;
  setCameraMode: (mode: CameraMode) => void;
  navigateToZone: (zone: SpatialZone) => void;
  setCurrentRoom: (roomId: RoomId) => void;
  setRoomExperienceState: (state: RoomExperienceState) => void;
  setActiveBeatId: (beatId: string | null, label?: string | null) => void;
  setLocalRoomProgress: (progress: number) => void;
  setIsInsideRoomExperience: (inside: boolean) => void;
  setShowRoomExperienceDebug: (show: boolean) => void;
  setActiveRefCamera: (camId: ReferenceCameraId | null) => void;
  enterInspectMode: (targetId: string) => void;
  exitInspectMode: () => void;
  setMaterialMode: (mode: MaterialDisplayMode) => void;
  setShowMaterialPreview: (show: boolean) => void;
  setTimeOfDay: (tod: TimeOfDayPreset) => void;
  setLightingDebugSolo: (mode: LightingDebugSolo) => void;
  openProjectModal: (projectId: string) => void;
  closeProjectModal: () => void;
  setDoorAngle: (angle: number) => void;
  setQualityTier: (tier: QualityTier) => void;
  toggleAudio: () => void;
  setLoading: (loading: boolean) => void;
  setLoadingProgress: (progress: number) => void;
  setModelLoaded: (loaded: boolean) => void;
  setModelError: (error: string | null) => void;
}

export const useHouseStore = create<HouseState>((set) => ({
  scrollProgress: 0.0,
  targetProgress: 0.0,
  cinematicProgress: 0.0,
  exteriorCameraState: 'EXTERIOR_ESTABLISHING',
  interiorFactor: 0.0,
  activeValidationShotId: 'shot_01',
  showCameraSplineDebug: false,
  currentZone: 'EXTERIOR',
  currentRoomId: 'exterior',

  // M9 Room Experience Initial State
  roomExperienceState: 'IDLE',
  activeBeatId: null,
  activeBeatLabel: null,
  localRoomProgress: 0.0,
  isInsideRoomExperience: false,
  showRoomExperienceDebug: false,

  cameraMode: 'cinematic',
  activeRefCamera: null,
  cameraTransitionNonce: 0,
  inspectTargetId: null,
  isDoorOpen: false,
  doorAngle: 0.0,

  materialMode: 'pbr',
  showMaterialPreview: false,

  timeOfDay: 'golden_hour',
  lightingDebugSolo: 'all',

  activeProjectId: null,
  isModalOpen: false,

  qualityTier: detectDefaultQualityTier(),
  isAudioMuted: true,
  isLoading: true,
  loadingProgress: 0,
  modelLoaded: false,
  modelError: null,

  setScrollProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    set({
      scrollProgress: clamped,
      cinematicProgress: clamped,
    });
  },

  setCinematicProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    set({
      scrollProgress: clamped,
      cinematicProgress: clamped,
    });
  },

  setTargetProgress: (progress) => {
    const clamped = Math.max(0, Math.min(1, progress));
    set({
      targetProgress: clamped,
    });
  },

  setExteriorCameraState: (state) =>
    set({
      exteriorCameraState: state,
    }),

  setInteriorFactor: (factor) =>
    set({
      interiorFactor: Math.max(0, Math.min(1, factor)),
    }),

  setActiveValidationShotId: (id) =>
    set({
      activeValidationShotId: id,
    }),

  setShowCameraSplineDebug: (show) =>
    set({
      showCameraSplineDebug: show,
    }),

  setCameraMode: (mode) =>
    set({
      cameraMode: mode,
    }),

  navigateToZone: (zone) =>
    set({
      currentZone: zone,
    }),

   setCurrentRoom: (roomId) =>
    set({
      currentRoomId: roomId,
    }),

  setRoomExperienceState: (state) =>
    set({
      roomExperienceState: state,
    }),

  setActiveBeatId: (beatId, label = null) =>
    set({
      activeBeatId: beatId,
      activeBeatLabel: label,
    }),

  setLocalRoomProgress: (progress) =>
    set({
      localRoomProgress: Math.max(0, Math.min(1, progress)),
    }),

  setIsInsideRoomExperience: (inside) =>
    set({
      isInsideRoomExperience: inside,
    }),

  setShowRoomExperienceDebug: (show) =>
    set({
      showRoomExperienceDebug: show,
    }),

  setActiveRefCamera: (camId) =>
    set((state) => ({
      activeRefCamera: camId,
      cameraTransitionNonce: state.cameraTransitionNonce + 1,
    })),

  enterInspectMode: (targetId) =>
    set({
      cameraMode: 'inspect',
      inspectTargetId: targetId,
    }),

  exitInspectMode: () =>
    set({
      cameraMode: 'free',
      inspectTargetId: null,
    }),

  setMaterialMode: (mode) =>
    set({
      materialMode: mode,
    }),

  setShowMaterialPreview: (show) =>
    set({
      showMaterialPreview: show,
    }),

  setTimeOfDay: (tod) =>
    set({
      timeOfDay: tod,
    }),

  setLightingDebugSolo: (mode) =>
    set({
      lightingDebugSolo: mode,
    }),

  openProjectModal: (projectId) =>
    set({
      activeProjectId: projectId,
      isModalOpen: true,
    }),

  closeProjectModal: () =>
    set({
      activeProjectId: null,
      isModalOpen: false,
    }),

  setDoorAngle: (angle) =>
    set({
      doorAngle: angle,
      isDoorOpen: Math.abs(angle) > 0.05,
    }),

  setQualityTier: (tier) =>
    set({
      qualityTier: tier,
    }),

  toggleAudio: () =>
    set((state) => ({
      isAudioMuted: !state.isAudioMuted,
    })),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  setLoadingProgress: (progress) =>
    set({
      loadingProgress: Math.min(100, Math.max(0, progress)),
    }),

  setModelLoaded: (loaded) =>
    set({
      modelLoaded: loaded,
      isLoading: !loaded,
    }),

  setModelError: (error) =>
    set({
      modelError: error,
      isLoading: false,
    }),
}));
