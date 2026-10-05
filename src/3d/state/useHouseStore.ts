import { create } from 'zustand';
import { QualityTier, SpatialZone } from '@/types';
import { detectDefaultQualityTier } from '@/3d/utils/quality';

export type CameraMode = 'spline' | 'inspect' | 'free';

export interface HouseState {
  // Spatial Journey Progress (0.0 to 1.0)
  scrollProgress: number;
  targetProgress: number;
  currentZone: SpatialZone;

  // Camera & Interaction
  cameraMode: CameraMode;
  inspectTargetId: string | null;
  isDoorOpen: boolean;
  doorAngle: number; // in radians: 0.0 to -1.48 (~ -85 deg)

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
  navigateToZone: (zone: SpatialZone) => void;
  enterInspectMode: (targetId: string) => void;
  exitInspectMode: () => void;
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
  currentZone: 'EXTERIOR',

  cameraMode: 'free',
  inspectTargetId: null,
  isDoorOpen: false,
  doorAngle: 0.0,

  activeProjectId: null,
  isModalOpen: false,

  qualityTier: detectDefaultQualityTier(),
  isAudioMuted: true,
  isLoading: true,
  loadingProgress: 0,
  modelLoaded: false,
  modelError: null,

  setScrollProgress: (progress) =>
    set({
      scrollProgress: Math.max(0, Math.min(1, progress)),
    }),

  navigateToZone: (zone) =>
    set({
      currentZone: zone,
    }),

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
