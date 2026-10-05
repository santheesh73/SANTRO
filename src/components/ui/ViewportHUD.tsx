'use client';

import React from 'react';
import { QualitySelector } from './QualitySelector';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { REFERENCE_CAMERA_LIST, REFERENCE_CAMERAS } from '@/3d/camera/referenceCameras';
import { MaterialDisplayMode } from '@/3d/materials/types';
import { TimeOfDayPreset, LightingDebugSolo } from '@/3d/lighting/types';
import { LIGHTING_PRESETS } from '@/3d/lighting/LightingPresets';
import { Compass, Box, Video, Camera, Layers, Palette, Sun } from 'lucide-react';

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
 * Restrained architectural HUD overlay for M5 lighting & atmosphere validation.
 * Features hairline borders, coordinate readouts, quality tier management,
 * reference camera switcher, material mode toggles, and time-of-day lighting controls.
 */
export function ViewportHUD() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const currentZone = useHouseStore((state) => state.currentZone);
  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const setActiveRefCamera = useHouseStore((state) => state.setActiveRefCamera);

  const materialMode = useHouseStore((state) => state.materialMode);
  const setMaterialMode = useHouseStore((state) => state.setMaterialMode);
  const showMaterialPreview = useHouseStore((state) => state.showMaterialPreview);
  const setShowMaterialPreview = useHouseStore((state) => state.setShowMaterialPreview);

  const timeOfDay = useHouseStore((state) => state.timeOfDay);
  const setTimeOfDay = useHouseStore((state) => state.setTimeOfDay);
  const lightingDebugSolo = useHouseStore((state) => state.lightingDebugSolo);
  const setLightingDebugSolo = useHouseStore((state) => state.setLightingDebugSolo);

  const activeConfig = activeRefCamera ? REFERENCE_CAMERAS[activeRefCamera] : null;
  const activePreset = LIGHTING_PRESETS[timeOfDay] ?? LIGHTING_PRESETS.golden_hour;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-8 select-none font-mono">
      {/* Top Header Row */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANTRO</span>
            <span className="text-neutral-500 font-normal">|</span>
            <span className="text-neutral-300 font-normal">M5 ARCHITECTURAL LIGHTING & ATMOSPHERE</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
            THE PORTFOLIO HOUSE • CINEMATIC DAYLIGHT, GOLDEN HOUR, DUSK & SPATIAL ATMOSPHERE
          </span>
        </div>

        {/* Quality Tier Selector */}
        <div className="flex items-center gap-3">
          <QualitySelector />
        </div>
      </div>

      {/* Middle Validation Indicator & Control Bars */}
      <div className="flex flex-col gap-3 self-start pointer-events-auto">
        {/* Geometric Validation Status */}
        <div className="hidden md:flex flex-col gap-1.5 text-[10px] text-neutral-400 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded shadow-lg max-w-sm">
          <div className="flex items-center gap-2 text-neutral-200">
            <Box size={12} className="text-cyan-400" />
            <span>SURFACE REALISM: PBR CALIBRATED</span>
          </div>
          <div className="flex items-center gap-2 text-[9px] text-neutral-400">
            <Compass size={12} />
            <span>COORDINATES: [+X EAST, +Y UP, +Z SOUTH]</span>
          </div>
          <div className="text-[9px] text-neutral-500">
            ORIGIN: [0.0, 0.0, 0.0] @ MAIN ENTRANCE THRESHOLD
          </div>
          {activeConfig && (
            <div className="mt-1 pt-1.5 border-t border-white/10 flex flex-col gap-0.5 text-[9px]">
              <div className="text-cyan-300 font-semibold flex items-center gap-1.5">
                <Video size={10} />
                <span>{activeConfig.shotLabel} — {activeConfig.name}</span>
              </div>
              <div className="text-neutral-400">
                Ref: {activeConfig.frameRef} | FOV: {activeConfig.fov}°
              </div>
              <div className="text-neutral-500 text-[8px] truncate">
                Pos: [{activeConfig.position.join(', ')}] | Target: [{activeConfig.target.join(', ')}]
              </div>
            </div>
          )}
        </div>

        {/* M5 Time-of-Day Lighting & Atmosphere Toolbar (Section 5, 8, 26) */}
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
      <div className="flex items-end justify-between w-full pointer-events-auto">
        <div className="text-[10px] tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-neutral-500">ZONE:</span>
          <span className="text-neutral-200 font-medium">{currentZone}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">TIER:</span>
          <span className="text-neutral-200 uppercase">{qualityTier}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">LIGHT:</span>
          <span className="text-amber-300 font-semibold">{timeOfDay.toUpperCase()}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">EXP:</span>
          <span className="text-neutral-300">{activePreset.exposure.toFixed(2)}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">MAT:</span>
          <span className="text-cyan-300 uppercase">{showMaterialPreview ? 'STUDIO SWATCHES' : materialMode}</span>
        </div>

        <div className="text-[10px] tracking-wider text-neutral-400 uppercase text-right">
          <span>DRAG TO ORBIT • SCROLL TO ZOOM</span>
        </div>
      </div>
    </div>
  );
}
