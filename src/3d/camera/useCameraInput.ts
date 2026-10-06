'use client';

import { useEffect, useRef, useCallback } from 'react';
import { CAMERA_CONFIG } from './CameraConfig';
import { useHouseStore } from '@/3d/state/useHouseStore';

interface UseCameraInputOptions {
  enabled?: boolean;
}

/**
 * Hook managing normalized, multi-device virtual scroll input for the exterior camera journey.
 *
 * Translates mouse wheel, trackpad swipes, mobile touch drags, and keyboard navigation
 * into a single normalized progress parameter [0.0, 1.0].
 *
 * Implements physics damping with momentum preservation and strict boundary limits.
 */
export function useCameraInput({ enabled = true }: UseCameraInputOptions = {}) {
  const targetProgressRef = useRef<number>(0.0);
  const touchStartYRef = useRef<number | null>(null);
  const isReducedMotionRef = useRef<boolean>(false);

  // Sync with store target progress
  const setTargetProgress = useHouseStore((state) => state.setTargetProgress);
  const cameraMode = useHouseStore((state) => state.cameraMode);

  // Check for prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = mediaQuery.matches;

    const handler = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const addProgressDelta = useCallback(
    (delta: number) => {
      if (!enabled || cameraMode === 'inspect') return;

      const store = useHouseStore.getState();
      const current = store.targetProgress;
      const step = isReducedMotionRef.current ? delta * 0.5 : delta;
      const next = Math.max(0.0, Math.min(1.0, current + step));

      targetProgressRef.current = next;
      setTargetProgress(next);

      if (store.activeValidationShotId !== null) {
        store.setActiveValidationShotId(null);
      }
    },
    [enabled, cameraMode, setTargetProgress]
  );

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    // 1. Mouse Wheel & Trackpad Listener
    const handleWheel = (e: WheelEvent) => {
      // Allow HUD elements to handle their own scrolling
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, input, select, textarea, [data-prevent-scroll]')) {
        return;
      }

      e.preventDefault();

      // Normalize delta across line vs pixel modes
      let deltaY = e.deltaY;
      if (e.deltaMode === 1) deltaY *= 24; // Line mode
      if (e.deltaMode === 2) deltaY *= 600; // Page mode

      const deltaProgress = deltaY * CAMERA_CONFIG.input.wheelMultiplier;
      addProgressDelta(deltaProgress);
    };

    // 2. Mobile Touch Swipe Listeners
    const handleTouchStart = (e: TouchEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest('button, input, select, textarea, [data-prevent-scroll]')) {
        touchStartYRef.current = null;
        return;
      }
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || e.touches.length !== 1) return;

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY;
      touchStartYRef.current = currentY;

      const deltaProgress = deltaY * CAMERA_CONFIG.input.touchMultiplier;
      addProgressDelta(deltaProgress);
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    // 3. Keyboard Arrow & Page Navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (cameraMode === 'inspect') return;
      const step = CAMERA_CONFIG.input.keyboardStep;

      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          e.preventDefault();
          addProgressDelta(step);
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          addProgressDelta(-step);
          break;
        case ' ':
          e.preventDefault();
          addProgressDelta(e.shiftKey ? -step * 2 : step * 2);
          break;
        case 'Home':
          e.preventDefault();
          setTargetProgress(0.0);
          break;
        case 'End':
          e.preventDefault();
          setTargetProgress(1.0);
          break;
        default:
          break;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, cameraMode, addProgressDelta, setTargetProgress]);

  return {
    targetProgressRef,
  };
}
