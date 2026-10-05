'use client';

import React from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';
import { QualityTier } from '@/types';

const TIERS: QualityTier[] = ['high', 'medium', 'low'];

/**
 * Restrained UI component allowing quality tier toggling.
 */
export function QualitySelector() {
  const qualityTier = useHouseStore((state) => state.qualityTier);
  const setQualityTier = useHouseStore((state) => state.setQualityTier);

  return (
    <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-2 py-1 text-xs font-mono">
      <span className="text-[10px] text-neutral-400 px-1 uppercase tracking-wider">TIER:</span>
      {TIERS.map((tier) => (
        <button
          key={tier}
          onClick={() => setQualityTier(tier)}
          className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider transition-colors ${
            qualityTier === tier
              ? 'bg-white/20 text-white font-medium'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          {tier}
        </button>
      ))}
    </div>
  );
}
