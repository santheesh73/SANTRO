'use client';

import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface WebGLFallbackProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

/**
 * Elegant architectural fallback screen when WebGL is unsupported or encounters an error.
 */
export function WebGLFallback({
  title = 'WebGL Acceleration Unavailable',
  description = 'Your browser or graphics hardware does not currently support WebGL 2.0. Please enable hardware acceleration in browser settings or try another modern browser.',
  onRetry,
}: WebGLFallbackProps) {
  return (
    <div className="relative w-full h-full min-h-[500px] flex items-center justify-center bg-[#121214] text-[#ecebe4] p-8 select-none">
      <div className="max-w-md w-full border border-white/10 bg-[#18181b]/80 backdrop-blur-md p-8 rounded-lg shadow-2xl flex flex-col items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
          <AlertCircle size={20} />
        </div>

        <div className="space-y-2">
          <h2 className="text-lg font-medium tracking-tight text-white">{title}</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">{description}</p>
        </div>

        <div className="pt-2 flex items-center gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono tracking-wider uppercase bg-white/10 hover:bg-white/20 active:bg-white/30 text-white rounded transition-colors"
            >
              <RotateCcw size={14} />
              Retry Canvas
            </button>
          )}
          <a
            href="https://get.webgl.org/webgl2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-neutral-500 hover:text-neutral-300 underline underline-offset-4 transition-colors font-mono"
          >
            Test WebGL Compatibility
          </a>
        </div>
      </div>
    </div>
  );
}
