import { SkillDomain } from './types';

/**
 * SANTRO M10 — Centralized Verified Engineering Skills
 *
 * Strictly grouped by domain matching M10 Specification Section 11:
 * - Programming
 * - Frontend
 * - Backend and data
 * - AI and intelligent applications
 * - Development and deployment
 *
 * Zero fabricated proficiency scores or percentage bars.
 */
export const skillsData: SkillDomain[] = [
  {
    id: 'programming',
    name: 'PROGRAMMING',
    description: 'Core languages for systems development, data processing, and application engineering.',
    skills: ['Python', 'JavaScript', 'TypeScript', 'SQL'],
  },
  {
    id: 'frontend',
    name: 'FRONTEND',
    description: 'Modern component-driven web user interfaces and interactive client-side architectures.',
    skills: ['React', 'Next.js'],
  },
  {
    id: 'backend-data',
    name: 'BACKEND AND DATA',
    description: 'High-throughput APIs, relational storage, caching layers, and database management.',
    skills: ['FastAPI', 'PostgreSQL', 'Supabase', 'Redis'],
  },
  {
    id: 'ai-intelligent',
    name: 'AI & INTELLIGENT APPLICATIONS',
    description: 'Generative models, retrieval augmentation, reasoning pipelines, and language understanding.',
    skills: ['Generative AI', 'Large Language Models (LLMs)', 'Retrieval-Augmented Generation (RAG)', 'Natural Language Processing (NLP)'],
  },
  {
    id: 'dev-deployment',
    name: 'DEVELOPMENT & DEPLOYMENT',
    description: 'Containerization, reproducible deployment, and developer workflow tooling.',
    skills: ['Docker'],
  },
];
