import { SkillDomain } from './types';

/**
 * SANTRO M8 — Centralized Verified Engineering Skills
 *
 * Strictly grouped by domain matching M8 Specification Section 19:
 * LANGUAGES, FRONTEND, BACKEND, DATA, AI, INFRASTRUCTURE.
 */
export const skillsData: SkillDomain[] = [
  {
    id: 'languages',
    name: 'LANGUAGES',
    description: 'Core programming languages for distributed systems, web architectures, and data engineering.',
    skills: ['Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  {
    id: 'frontend',
    name: 'FRONTEND',
    description: 'Component architecture, reactive client rendering, and high-performance user interfaces.',
    skills: ['React', 'Next.js'],
  },
  {
    id: 'backend',
    name: 'BACKEND',
    description: 'Asynchronous API servers, microservices, and high-throughput networking contracts.',
    skills: ['FastAPI', 'REST APIs'],
  },
  {
    id: 'data',
    name: 'DATA',
    description: 'Relational data modeling, vector embeddings, and ultra-low-latency in-memory caches.',
    skills: ['PostgreSQL', 'Supabase', 'Redis'],
  },
  {
    id: 'ai',
    name: 'AI & MACHINE LEARNING',
    description: 'Foundation models, retrieval-augmented generation, agent loops, and language processing.',
    skills: ['Generative AI', 'LLMs', 'RAG', 'NLP'],
  },
  {
    id: 'infrastructure',
    name: 'INFRASTRUCTURE',
    description: 'Reproducible containerization, edge deployment, and cloud developer operations.',
    skills: ['Docker'],
  },
];
