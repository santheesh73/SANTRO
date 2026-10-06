import { PhilosophyPillar } from './types';

/**
 * SANTRO M8 — Centralized Engineering Philosophy & Build Process
 *
 * Matching M8 Specification Section 21:
 * BUILD, THINK, EXPLORE, REFINE.
 */
export const philosophyData: PhilosophyPillar[] = [
  {
    id: 'principle-build',
    keyword: 'BUILD',
    title: 'Turn Ideas into Working Products',
    principle: 'Turn ideas into working products.',
    rationale:
      'Architecture exists only when executed. Working prototypes and shipping software validate assumptions faster than theoretical specifications.',
  },
  {
    id: 'principle-think',
    keyword: 'THINK',
    title: 'Understand the Problem Before the Technology',
    principle: 'Understand the problem before choosing the technology.',
    rationale:
      'Tools are subordinate to system intent. Resist premature complexity by interrogating constraints, failure modes, and user friction first.',
  },
  {
    id: 'principle-explore',
    keyword: 'EXPLORE',
    title: 'Experiment with New Tools, AI Systems and Approaches',
    principle: 'Experiment with new tools, AI systems and approaches.',
    rationale:
      'Breakthrough capabilities emerge at intersections: combining local edge intelligence, spatial computing, and low-latency systems.',
  },
  {
    id: 'principle-refine',
    keyword: 'REFINE',
    title: 'Iterate Until Experience and Implementation Are Both Strong',
    principle: 'Iterate until the experience and implementation are both strong.',
    rationale:
      'Elegance is the absence of unnecessary friction. Polish until performance, tactile precision, and architectural cohesion are seamless.',
  },
];
