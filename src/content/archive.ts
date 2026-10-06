import { ArchiveRecord } from './types';

/**
 * SANTRO M8 — Centralized Verified Archive & Proof Records
 *
 * Matching M8 Specification Section 20 & verified hackathon/open-source milestones.
 */
export const archiveData: ArchiveRecord[] = [
  {
    id: 'proof-sih',
    title: 'Smart India Hackathon (SIH) National Finalist & Winner',
    organization: 'Ministry of Agriculture & SIH Organization',
    year: '2023',
    award: 'National Winner / Finalist',
    description:
      'Engineered BHOOMI: Multispectral satellite agricultural intelligence command center analyzing regional crop stress, soil moisture, and yield indices.',
    metric: '120,000 km² Coverage',
  },
  {
    id: 'proof-ai-summit',
    title: 'National AI Hackathon Finalist',
    organization: 'AI Innovation Summit',
    year: '2024',
    award: 'Top 5 Finalist (1,200+ Teams)',
    description:
      'Engineered an autonomous multimodal emergency response triage agent using local edge models and real-time computer vision streaming.',
    metric: 'Sub-80ms Decision Loop',
  },
  {
    id: 'proof-opensource',
    title: 'Open Source Vector Framework Contributor',
    organization: 'Vector Search Ecosystem',
    year: '2024',
    award: 'Core Contributor',
    description:
      'Authored SIMD-optimized distance metric routines and product quantization kernels improving memory bandwidth and query throughput.',
    metric: '+28% Memory Bandwidth',
  },
  {
    id: 'proof-hpc',
    title: 'High-Performance Computing Excellence Award',
    organization: 'University Engineering Consortium',
    year: '2023',
    award: 'First Place',
    description:
      'Designed a GPU-accelerated distributed raymarching visualizer achieving 60fps at 4K resolution with custom HLSL/GLSL compute kernels.',
    metric: 'Locked 60fps @ 4K',
  },
];
