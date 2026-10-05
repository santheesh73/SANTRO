'use client';

import React from 'react';
import { LightingSystem } from './LightingSystem';

/**
 * SceneLighting acts as the main entry point for architectural lighting,
 * delegating to the centralized LightingSystem component.
 * Retains backwards compatibility with all scene mounts.
 */
export function SceneLighting() {
  return <LightingSystem />;
}
