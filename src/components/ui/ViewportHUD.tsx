'use client';

import React from 'react';
import { QualitySelector } from './QualitySelector';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { REFERENCE_CAMERA_LIST, REFERENCE_CAMERAS } from '@/3d/camera/referenceCameras';
import { Compass, Box, Video, Camera } from 'lucide-react';

/**
 * Restrained architectural HUD overlay for M2 validation.
 * Features hairline borders, coordinate readouts, quality tier management,
 * and an interactive reference camera switcher for instant keyframe verification.
 */
export function ViewportHUD() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const currentZone = useHouseStore((state) => state.currentZone);
  const activeRefCamera = useHouseStore((state) => state.activeRefCamera);
  const setActiveRefCamera = useHouseStore((state) => state.setActiveRefCamera);

  const activeConfig = activeRefCamera ? REFERENCE_CAMERAS[activeRefCamera] : null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-8 select-none font-mono">
      {/* Top Header Row */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANTRO</span>
            <span className="text-neutral-500 font-normal">|</span>
            <span className="text-neutral-300 font-normal">M2 ARCHITECTURAL BLOCKOUT</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
            THE PORTFOLIO HOUSE • CINEMATIC REFERENCE RECONSTRUCTION
          </span>
        </div>

        {/* Quality Tier Selector */}
        <div className="flex items-center gap-3">
          <QualitySelector />
        </div>
      </div>

      {/* Middle Validation Indicator & Reference Camera Bar */}
      <div className="flex flex-col gap-3 self-start pointer-events-auto">
        {/* Geometric Validation Status */}
        <div className="hidden md:flex flex-col gap-1.5 text-[10px] text-neutral-400 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded shadow-lg max-w-sm">
          <div className="flex items-center gap-2 text-neutral-200">
            <Box size={12} className="text-cyan-400" />
            <span>ARCHITECTURAL BLOCKOUT: VERIFIED</span>
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
                  onClick={() => setActiveRefCamera(cam.id)}
                  title={`${cam.name} (${cam.frameRef})`}
                  className={`px-2 py-1 text-[9px] rounded border transition-colors ${
                    isActive
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
      </div>

      {/* Bottom Footer Row */}
      <div className="flex items-end justify-between w-full pointer-events-auto">
        <div className="text-[10px] tracking-wider text-neutral-400 uppercase flex items-center gap-2">
          <span className="text-neutral-500">ZONE:</span>
          <span className="text-neutral-200 font-medium">{currentZone}</span>
          <span className="text-neutral-600">•</span>
          <span className="text-neutral-500">TIER:</span>
          <span className="text-neutral-200 uppercase">{qualityTier}</span>
        </div>

        <div className="text-[10px] tracking-wider text-neutral-400 uppercase text-right">
          <span>DRAG TO ORBIT • SCROLL TO ZOOM</span>
        </div>
      </div>
    </div>
  );
}
