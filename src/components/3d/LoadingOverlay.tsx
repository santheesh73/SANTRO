'use client';

import React, { useEffect, useState } from 'react';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface LoadingOverlayProps {
  initialDurationMs?: number;
}

/**
 * Minimal, elegant architectural loading indicator.
 * Reacts to 3D asset loading state and fades smoothly into the live 3D Canvas.
 */
export function LoadingOverlay({ initialDurationMs = 700 }: LoadingOverlayProps) {
  const isLoading = useHouseStore((state) => state.isLoading);
  const loadingProgress = useHouseStore((state) => state.loadingProgress);
  const setLoading = useHouseStore((state) => state.setLoading);
  const [visible, setVisible] = useState(true);
  const [fade, setFade] = useState(false);

  // When isLoading becomes false, trigger fade out
  useEffect(() => {
    if (!isLoading) {
      setFade(true);
      const timer = setTimeout(() => {
        setVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  // Fallback timer ensuring procedural scenes always unveil even without asset loads
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (useHouseStore.getState().isLoading) {
        setLoading(false);
      }
    }, Math.max(initialDurationMs, 800));

    return () => clearTimeout(fallbackTimer);
  }, [initialDurationMs, setLoading]);

  if (!visible) return null;

  return (
    <div
      className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0d0d0f] transition-opacity duration-500 pointer-events-none select-none ${
        fade || !isLoading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-4 max-w-xs w-full px-6">
        <div className="flex items-center justify-between w-full text-[10px] tracking-[0.25em] font-mono text-neutral-400 uppercase">
          <span>THE PORTFOLIO HOUSE</span>
          <span>{loadingProgress > 0 ? `${loadingProgress}%` : 'M1 FOUNDATION'}</span>
        </div>

        {/* Minimal Hairline Progress Bar */}
        <div className="w-full h-[1px] bg-white/10 overflow-hidden relative">
          <div
            className="h-full bg-neutral-200 transition-all duration-300"
            style={{ width: `${Math.max(loadingProgress, 85)}%` }}
          />
        </div>

        <span className="text-[9px] tracking-[0.3em] font-mono text-neutral-600 uppercase">
          INITIALIZING WEBGL 2.0 ENGINE
        </span>
      </div>
    </div>
  );
}
