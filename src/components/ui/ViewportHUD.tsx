'use client';

import React from 'react';
import { QualitySelector } from './QualitySelector';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { Compass, Box } from 'lucide-react';

/**
 * Restrained architectural HUD overlay for M1 validation.
 * Features hairline borders, coordinate readouts, and tier management.
 */
export function ViewportHUD() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const currentZone = useHouseStore((state) => state.currentZone);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-6 md:p-8 select-none font-mono">
      {/* Top Header Row */}
      <div className="flex items-start justify-between w-full pointer-events-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-white uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SANTRO</span>
            <span className="text-neutral-500 font-normal">|</span>
            <span className="text-neutral-300 font-normal">M1 FOUNDATION</span>
          </div>
          <span className="text-[10px] tracking-[0.15em] text-neutral-400 uppercase">
            THE PORTFOLIO HOUSE • ARCHITECTURAL PIPELINE
          </span>
        </div>

        {/* Quality Tier Selector */}
        <div className="flex items-center gap-3">
          <QualitySelector />
        </div>
      </div>

      {/* Middle Validation Indicator (Optional/Subtle) */}
      <div className="hidden md:flex flex-col gap-1.5 self-start text-[10px] text-neutral-400 bg-black/30 backdrop-blur-sm border border-white/5 p-3 rounded">
        <div className="flex items-center gap-2 text-neutral-200">
          <Box size={12} />
          <span>GEOMETRIC VALIDATION: ACTIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <Compass size={12} />
          <span>COORDINATES: [+X EAST, +Y UP, +Z SOUTH]</span>
        </div>
        <div className="text-[9px] text-neutral-500">
          ORIGIN: [0.0, 0.0, 0.0] @ ENTRANCE THRESHOLD
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
