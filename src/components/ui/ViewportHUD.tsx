'use client';

import React from 'react';
import { QualitySelector } from './QualitySelector';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { REFERENCE_CAMERA_LIST } from '@/3d/camera/referenceCameras';
import { VALIDATION_SHOT_LIST } from '@/3d/camera/CameraValidationShots';
import { MaterialDisplayMode } from '@/3d/materials/types';
import { TimeOfDayPreset, LightingDebugSolo } from '@/3d/lighting/types';
import { LIGHTING_PRESETS } from '@/3d/lighting/LightingPresets';
import { ROOM_REGISTRY } from '@/3d/rooms/RoomRegistry';
import {
  Camera,
  Layers,
  Palette,
  Sun,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

const MATERIAL_MODES: { id: MaterialDisplayMode; label: string }[] = [
  { id: 'pbr', label: 'PBR' },
  { id: 'clay', label: 'CLAY' },
  { id: 'normals', label: 'NORMALS' },
  { id: 'roughness', label: 'ROUGH' },
  { id: 'metalness', label: 'METAL' },
  { id: 'ids', label: 'MAT IDs' },
];

const TOD_PRESETS: { id: TimeOfDayPreset; label: string; shotLabel: string }[] = [
  { id: 'day', label: 'DAY', shotLabel: '12:00 PM' },
  { id: 'golden_hour', label: 'GOLDEN', shotLabel: '05:30 PM' },
  { id: 'dusk', label: 'DUSK', shotLabel: '07:45 PM' },
  { id: 'interior', label: 'INTERIOR', shotLabel: 'GALLERY' },
];

const LIGHTING_SOLOS: { id: LightingDebugSolo; label: string }[] = [
  { id: 'all', label: 'ALL' },
  { id: 'sun_only', label: 'SUN' },
  { id: 'env_only', label: 'ENV' },
  { id: 'interior_only', label: 'INT' },
];

/**
 * Restrained architectural HUD overlay for M6 exterior cinematic camera journey.
 * Features hairline borders, real-time trajectory scrubber, validation shot selector,
 * camera mode toggler, 3D spline visualizer, quality management, material inspection,
 * and time-of-day lighting controls.
 */
export function ViewportHUD() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const currentZone = useHouseStore((state) => state.currentZone);
  const currentRoomId = useHouseStore((state) => state.currentRoomId);
  const activeRoom = ROOM_REGISTRY[currentRoomId] ?? ROOM_REGISTRY['exterior'];
  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const setActiveRefCamera = useHouseStore((state) => state.setActiveRefCamera);

  // M6 Camera States & Actions
  const cinematicProgress = useHouseStore((state) => state.cinematicProgress);
  const targetProgress = useHouseStore((state) => state.targetProgress);
  const setTargetProgress = useHouseStore((state) => state.setTargetProgress);
  const exteriorCameraState = useHouseStore((state) => state.exteriorCameraState);
  const activeValidationShotId = useHouseStore((state) => state.activeValidationShotId);
  const setActiveValidationShotId = useHouseStore((state) => state.setActiveValidationShotId);
  const cameraMode = useHouseStore((state) => state.cameraMode);
  const setCameraMode = useHouseStore((state) => state.setCameraMode);
  const showCameraSplineDebug = useHouseStore((state) => state.showCameraSplineDebug);
  const setShowCameraSplineDebug = useHouseStore((state) => state.setShowCameraSplineDebug);
  const isDoorOpen = useHouseStore((state) => state.isDoorOpen);
  const doorAngle = useHouseStore((state) => state.doorAngle);

  // M4 Material System
  const materialMode = useHouseStore((state) => state.materialMode);
  const setMaterialMode = useHouseStore((state) => state.setMaterialMode);
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);
  const setShowMaterialPreview = useHouseStore((state) => state.setShowMaterialPreview);

  // M5 Lighting System
  const timeOfDay = useHouseStore((state) => state.timeOfDay);
  const setTimeOfDay = useHouseStore((state) => state.setTimeOfDay);
  const lightingDebugSolo = useHouseStore((state) => state.lightingDebugSolo);
  const setLightingDebugSolo = useHouseStore((state) => state.setLightingDebugSolo);

  const activePreset = LIGHTING_PRESETS[timeOfDay] ?? LIGHTING_PRESETS.golden_hour;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 md:p-8 select-none font-mono">
      {/* Top Header Row */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANTRO</span>
            <span className="text-neutral-500 font-normal">|</span>
            <span className="text-neutral-300 font-normal">M8 PORTFOLIO ROOMS & SPATIAL EXHIBITIONS</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
            THE PORTFOLIO HOUSE • 10 SEQUENCED ARCHITECTURAL ROOMS & SPATIAL EXHIBITS
          </span>
        </div>

        {/* Quality Tier Selector */}
        <div className="flex items-center gap-3">
          <QualitySelector />
        </div>
      </div>

      {/* Middle Validation Indicator & Control Bars */}
      <div
        data-prevent-scroll
        className="flex flex-col gap-2.5 self-start pointer-events-auto max-h-[82vh] overflow-y-auto pr-2"
      >
        {/* M6/M7 Continuous Cinematic Camera Scrubber & Validation Toolbar */}
        <div className="flex flex-col gap-2 bg-black/60 backdrop-blur-md border border-cyan-500/30 p-3 rounded shadow-xl max-w-sm md:max-w-lg">
          <div className="flex items-center justify-between text-[10px] text-neutral-300 font-semibold tracking-wider uppercase">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <Play size={12} className="fill-cyan-400" />
              <span>CONTINUOUS ARCHITECTURAL JOURNEY</span>
            </div>
            <span className="text-cyan-300 font-bold">
              {(cinematicProgress * 100).toFixed(1)}%
            </span>
          </div>

          {/* Active Portfolio Room Badge */}
          <div className="flex items-center justify-between text-[9px] bg-cyan-950/40 px-2 py-1 rounded border border-cyan-500/30">
            <span className="text-cyan-400 font-bold">ROOM {String(activeRoom.order).padStart(2, '0')}:</span>
            <span className="text-white font-semibold tracking-wider truncate max-w-[260px]">
              {activeRoom.name.toUpperCase()} • {activeRoom.purpose.toUpperCase()}
            </span>
          </div>

          {/* Current Camera State Badge */}
          <div className="flex items-center justify-between text-[9px] bg-white/5 px-2 py-1 rounded border border-white/5">
            <span className="text-neutral-400">STATE:</span>
            <span className="text-cyan-200 font-semibold tracking-wider">
              {exteriorCameraState}
            </span>
          </div>

          {/* Interactive Progress Scrubber Slider */}
          <div className="flex flex-col gap-1">
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={targetProgress}
              onChange={(e) => {
                if (cameraMode !== 'cinematic') setCameraMode('cinematic');
                setActiveRefCamera(null);
                setActiveValidationShotId(null);
                setTargetProgress(parseFloat(e.target.value));
              }}
              className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[8px] text-neutral-500">
              <span>0% ESTABLISHING</span>
              <span>50% THRESHOLD</span>
              <span>100% ATRIUM</span>
            </div>
          </div>

          {/* 9 Calibrated Validation Shots Selector */}
          <div className="flex flex-col gap-1 mt-1">
            <span className="text-[8px] text-neutral-400 tracking-wider uppercase font-semibold">
              CALIBRATED VALIDATION SHOTS (M6 §32 & M7 §41)
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1">
              {VALIDATION_SHOT_LIST.map((shot) => {
                const isActive =
                  Math.abs(cinematicProgress - shot.progress) < 0.04 ||
                  (activeValidationShotId === shot.id &&
                    Math.abs(cinematicProgress - shot.progress) < 0.08);
                return (
                  <button
                    key={shot.id}
                    onClick={() => {
                      if (cameraMode !== 'cinematic') setCameraMode('cinematic');
                      setActiveRefCamera(null);
                      setActiveValidationShotId(shot.id);
                      setTargetProgress(shot.progress);
                    }}
                    title={`${shot.name} (${shot.frameRef}) — ${shot.description}`}
                    className={`py-1 px-0.5 text-[8px] font-semibold rounded border transition-colors flex flex-col items-center ${
                      isActive
                        ? 'bg-cyan-950/80 text-cyan-200 border-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                        : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-neutral-200'
                    }`}
                  >
                    <span>SHOT 0{shot.shotNumber}</span>
                    <span className="text-[6.5px] font-normal text-neutral-400 truncate max-w-[44px]">
                      {shot.name.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode & Debug Toggles */}
          <div className="flex items-center gap-1.5 mt-1 pt-1.5 border-t border-white/10 text-[9px]">
            <button
              onClick={() => {
                setCameraMode(cameraMode === 'cinematic' ? 'inspect' : 'cinematic');
                setActiveRefCamera(null);
              }}
              className={`flex-1 py-1 rounded border transition-colors flex items-center justify-center gap-1 ${
                cameraMode === 'cinematic'
                  ? 'bg-cyan-900/60 text-cyan-200 border-cyan-400/60'
                  : 'bg-amber-900/60 text-amber-200 border-amber-400/60'
              }`}
            >
              <Sliders size={10} />
              <span>{cameraMode === 'cinematic' ? 'MODE: CINEMATIC' : 'MODE: ORBIT INSPECT'}</span>
            </button>

            <button
              onClick={() => setShowCameraSplineDebug(!showCameraSplineDebug)}
              className={`px-2 py-1 rounded border transition-colors flex items-center gap-1 ${
                showCameraSplineDebug
                  ? 'bg-emerald-950/80 text-emerald-200 border-emerald-400/80'
                  : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10'
              }`}
            >
              <Sparkles size={10} />
              <span>3D SPLINE</span>
            </button>

            <button
              onClick={() => {
                setTargetProgress(0.0);
                setActiveValidationShotId('shot_01');
                setActiveRefCamera(null);
              }}
              title="Reset to Shot 01 Establishing"
              className="p-1 rounded bg-white/5 text-neutral-400 hover:text-white border border-white/5 hover:bg-white/10"
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>

        {/* M5 Time-of-Day Lighting & Atmosphere Toolbar */}
        <div className="flex flex-col gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded shadow-lg">
          <div className="flex items-center justify-between text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">
            <div className="flex items-center gap-1.5">
              <Sun size={11} className="text-amber-400" />
              <span>TIME OF DAY & ATMOSPHERE</span>
            </div>
            <span className="text-[8px] text-amber-300 font-normal">
              {activePreset.shotLabel} ({activePreset.name})
            </span>
          </div>
          <div className="flex flex-wrap gap-1 max-w-xs md:max-w-md">
            {TOD_PRESETS.map((tod) => {
              const isActive = timeOfDay === tod.id;
              return (
                <button
                  key={tod.id}
                  onClick={() => setTimeOfDay(tod.id)}
                  title={LIGHTING_PRESETS[tod.id].description}
                  className={`px-2 py-1 text-[9px] rounded border transition-colors ${
                    isActive
                      ? 'bg-amber-950/80 text-amber-200 border-amber-400/80 shadow-[0_0_8px_rgba(251,191,36,0.3)]'
                      : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-neutral-200'
                  }`}
                >
                  {tod.label}
                </button>
              );
            })}

            {/* Solo / Isolate Filter */}
            <div className="h-4 w-px bg-white/10 mx-0.5 self-center" />
            {LIGHTING_SOLOS.map((solo) => {
              const isActive = lightingDebugSolo === solo.id;
              return (
                <button
                  key={solo.id}
                  onClick={() => setLightingDebugSolo(solo.id)}
                  title={`Isolate ${solo.label} lighting`}
                  className={`px-1.5 py-1 text-[8px] rounded border transition-colors ${
                    isActive
                      ? 'bg-neutral-200 text-black border-white shadow-[0_0_6px_rgba(255,255,255,0.3)]'
                      : 'bg-white/5 text-neutral-500 border-white/5 hover:bg-white/10 hover:text-neutral-300'
                  }`}
                >
                  {solo.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Reference Camera Switcher Toolbar */}
        <div className="flex flex-col gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded shadow-lg">
          <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">
            <Camera size={11} className="text-cyan-400" />
            <span>REFERENCE VIEW VALIDATION</span>
          </div>
          <div className="flex flex-wrap gap-1 max-w-xs md:max-w-md">
            {REFERENCE_CAMERA_LIST.map((cam) => {
              const isActive = activeRefCamera === cam.id;
              return (
                <button
                  key={cam.id}
                  onClick={() => {
                    if (showMaterialPreview) setShowMaterialPreview(false);
                    setActiveRefCamera(cam.id);
                  }}
                  title={`${cam.name} (${cam.frameRef})`}
                  className={`px-2 py-1 text-[9px] rounded border transition-colors ${
                    isActive && !showMaterialPreview
                      ? 'bg-cyan-950/80 text-cyan-200 border-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-neutral-200'
                  }`}
                >
                  {cam.shotLabel}: {cam.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>

        {/* M4 Material Display & Debug Toolbar */}
        <div className="flex flex-col gap-1.5 bg-black/50 backdrop-blur-md border border-white/10 p-2.5 rounded shadow-lg">
          <div className="flex items-center justify-between text-[9px] text-neutral-400 uppercase tracking-wider font-semibold">
            <div className="flex items-center gap-1.5">
              <Palette size={11} className="text-cyan-400" />
              <span>MATERIAL INSPECTION & MODES</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 max-w-xs md:max-w-md">
            {MATERIAL_MODES.map((mode) => {
              const isActive = materialMode === mode.id && !showMaterialPreview;
              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    if (showMaterialPreview) setShowMaterialPreview(false);
                    setMaterialMode(mode.id);
                  }}
                  className={`px-2 py-1 text-[9px] rounded border transition-colors ${
                    isActive
                      ? 'bg-cyan-950/80 text-cyan-200 border-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.3)]'
                      : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-neutral-200'
                  }`}
                >
                  {mode.label}
                </button>
              );
            })}

            {/* Studio Swatch Preview Toggle */}
            <button
              onClick={() => setShowMaterialPreview(!showMaterialPreview)}
              className={`px-2 py-1 text-[9px] rounded border transition-colors flex items-center gap-1 ${
                showMaterialPreview
                  ? 'bg-emerald-950/80 text-emerald-200 border-emerald-400/80 shadow-[0_0_8px_rgba(52,211,153,0.3)]'
                  : 'bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:text-neutral-200'
              }`}
            >
              <Layers size={10} />
              <span>STUDIO SWATCHES</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-end justify-between w-full pointer-events-auto pt-2">
        <div className="text-[10px] tracking-wider text-neutral-400 uppercase flex flex-wrap items-center gap-2">
          <span className="text-neutral-500">ZONE:</span>
          <span className="text-neutral-200 font-medium">{currentZone}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">STATE:</span>
          <span className="text-cyan-300 font-semibold">{exteriorCameraState}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">DOOR:</span>
          <span className={isDoorOpen ? 'text-emerald-400 font-semibold' : 'text-neutral-400'}>
            {isDoorOpen ? `OPEN (${((doorAngle / -1.484) * 100).toFixed(0)}%)` : 'CLOSED'}
          </span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">TIER:</span>
          <span className="text-neutral-200 uppercase">{qualityTier}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">LIGHT:</span>
          <span className="text-amber-300 font-semibold">{timeOfDay.toUpperCase()}</span>
        </div>

        <div className="hidden md:block text-[10px] tracking-wider text-neutral-400 uppercase text-right">
          <span>SCROLL / KEYS TO PROGRESS JOURNEY • DRAG TO ORBIT IN INSPECT MODE</span>
        </div>
      </div>
    </div>
  );
}
