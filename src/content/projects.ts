import { PortfolioProject } from './types';

/**
 * SANTRO M10 — Centralized Verified Portfolio Projects
 *
 * Exactly 7 verified projects matching M10 Specification Section 8.
 * All project descriptions, capabilities, and statuses are cross-referenced with
 * repository records and verified predecessor data.
 * Zero unverified performance percentages or fabricated URLs are included.
 */
export const projectsData: PortfolioProject[] = [
  {
    id: 'orion',
    name: 'ORION',
    subtitle: 'On-Device Assistant — Offline-First & Private',
    tagline: 'On-device assistant — offline-first and private by design.',
    shortDescription:
      'On-device AI assistant created for OSDHack 2026. Runs AI inference locally on the user’s device — offline and privacy-first — rather than relying on cloud AI APIs.',
    problem:
      'Cloud AI APIs require continuous network connectivity, introduce request latency, and expose sensitive user prompts and personal data to third-party cloud infrastructure.',
    solution:
      'Client-side inference architecture executing model operations directly on local hardware, ensuring prompts and tokens stay strictly on-device without cloud round-trips.',
    keyCapabilities: [
      'Client-side local inference without external API dependencies',
      'Offline-first execution model resilient to network disconnection',
      'Zero server data egress preserving strict user privacy',
      'Direct local memory and compute utilization on user hardware',
    ],
    category: 'On-Device AI',
    year: '2026',
    role: 'AI Systems Developer',
    technologies: ['On-Device AI', 'Local Inference', 'Offline-First', 'Privacy-First', 'TypeScript'],
    status: 'prototype',
    statusDetail: 'Prototype created for OSDHack 2026 exploring private local model inference.',
    variant: 'featured',
    accentColor: '#00F0FF',
    room: 'project-studio',
    attributes: [
      { label: 'Execution', value: 'Local / On-Device' },
      { label: 'Privacy Model', value: 'Zero Server Egress' },
      { label: 'Context', value: 'OSDHack 2026' },
    ],
    metrics: [
      { label: 'Execution', value: 'Local / On-Device' },
      { label: 'Privacy Model', value: 'Zero Server Egress' },
      { label: 'Context', value: 'OSDHack 2026' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'hearttune',
    name: 'HEARTTUNE',
    subtitle: 'Streaming Music Progressive Web App',
    tagline: 'A premium, Spotify-like music streaming experience.',
    shortDescription:
      'HeartTune is a premium music streaming PWA with authentication and a Spotify-like listening experience. Streaming is powered by the JioSaavn API on a Supabase and PostgreSQL backend with Redis caching.',
    problem:
      'Delivering a responsive, native-feeling media streaming application on the web requires resilient caching, background sync, and efficient audio buffer orchestration.',
    solution:
      'Progressive web application pairing a clean streaming surface with an asynchronous API proxy, Redis memory caching, and Supabase relational persistence.',
    keyCapabilities: [
      'Responsive music discovery and playlist management',
      'JioSaavn API media streaming integration',
      'Supabase authentication and relational data storage',
      'Upstash Redis caching layer for low-latency query handling',
      'PWA client architecture with offline listening capability',
    ],
    category: 'Music / Media PWA',
    year: '2024',
    role: 'Full-Stack Engineer',
    technologies: ['React', 'Supabase', 'PostgreSQL', 'JioSaavn API', 'Redis', 'TypeScript'],
    status: 'in-progress',
    statusDetail: 'Core streaming client, API proxy, and Redis caching implemented; PWA offline cache refinement in progress.',
    variant: 'standard',
    accentColor: '#EC4899',
    room: 'project-studio',
    attributes: [
      { label: 'Platform', value: 'Progressive Web App' },
      { label: 'Media Engine', value: 'JioSaavn API Proxy' },
      { label: 'Cache Tier', value: 'Upstash Redis' },
    ],
    metrics: [
      { label: 'Platform', value: 'Progressive Web App' },
      { label: 'Media Engine', value: 'JioSaavn API Proxy' },
      { label: 'Cache Tier', value: 'Upstash Redis' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'nisf',
    name: 'NISF',
    subtitle: 'AI Creative Content Optimization Platform',
    tagline: 'Generate and optimize content across every modality.',
    shortDescription:
      'NISF is an AI creative intelligence platform for generating and optimizing content across text, image, audio, and video. It pairs a Next.js product surface with a FastAPI inference backend, background job processing, and containerized deployment.',
    problem:
      'Iterating on creative content requires disparate tools for text, visuals, and audio, lacking systematic automated evaluation and critique to identify the strongest variants.',
    solution:
      'Unified multimodal workflow connecting generative APIs with automated scoring heuristics, variant comparison, and critique feedback loops.',
    keyCapabilities: [
      'Multimodal generation support for text, images, audio, and video',
      'Automated variant scoring and comparative critique pipeline',
      'Asynchronous job queue processing using Celery and Redis',
      'FastAPI inference backend serving a Next.js product interface',
      'Docker containerized deployment architecture',
    ],
    category: 'Creative AI & Optimization',
    year: '2024',
    role: 'Backend & Systems Architect',
    technologies: ['Next.js', 'FastAPI', 'Groq', 'PostgreSQL', 'Redis', 'Docker', 'Celery'],
    status: 'in-progress',
    statusDetail: 'Product UI surface and FastAPI backend service in development; multimodal critique loops in testing.',
    variant: 'standard',
    accentColor: '#10B981',
    room: 'project-studio',
    attributes: [
      { label: 'Modalities', value: 'Text, Image, Audio, Video' },
      { label: 'Backend API', value: 'FastAPI + Celery' },
      { label: 'Deployment', value: 'Docker Containerized' },
    ],
    metrics: [
      { label: 'Modalities', value: 'Text, Image, Audio, Video' },
      { label: 'Backend API', value: 'FastAPI + Celery' },
      { label: 'Deployment', value: 'Docker Containerized' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'ahal-ai',
    name: 'AHAL AI',
    subtitle: 'Repository & Document Software Intelligence',
    tagline: 'Repository and document analysis with software intelligence.',
    shortDescription:
      'AHAL AI is a software intelligence platform for repository and document analysis, intended to help developers understand codebases, inspect architecture, and generate interactive technical insights.',
    problem:
      'Developers spending substantial onboarding time navigating undocumented codebases and cross-referencing technical documentation manually.',
    solution:
      'Structured repository analysis and document ingestion system pairing LLM reasoning with code structure extraction to surface architectural insights.',
    keyCapabilities: [
      'Codebase structural and dependency analysis',
      'Technical document ingestion and semantic parsing',
      'Gemma foundation model integration for technical Q&A',
      'Interactive architectural summaries and technical reporting',
    ],
    category: 'Software Intelligence',
    year: '2024',
    role: 'AI Engineer',
    technologies: ['Gemma', 'Python', 'LLMs', 'Repository Analysis', 'Document Analysis'],
    status: 'in-progress',
    statusDetail: 'Core repository parser and document analysis pipeline in active development.',
    variant: 'standard',
    accentColor: '#8B5CF6',
    room: 'project-studio',
    attributes: [
      { label: 'Focus', value: 'Codebase Analysis' },
      { label: 'Model Tier', value: 'Gemma / LLM' },
      { label: 'Output', value: 'Architectural Insights' },
    ],
    metrics: [
      { label: 'Focus', value: 'Codebase Analysis' },
      { label: 'Model Tier', value: 'Gemma / LLM' },
      { label: 'Output', value: 'Architectural Insights' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'prysm',
    name: 'PRYSM',
    subtitle: 'Visual Computing & Graphics Exploration',
    tagline: 'Exploration in real-time visual computing and graphics.',
    shortDescription:
      'PRYSM is a visual computing and graphics engineering exploration. Detailed project specifications and capability documentation are currently being finalized.',
    problem:
      'Consolidating hardware-accelerated real-time visual techniques into an established project specification.',
    solution:
      'Exploratory graphics and shader research sandbox investigating real-time rendering capabilities.',
    keyCapabilities: [
      'Real-time visual rendering experimentation',
      'Shader and WebGL graphics exploratory tests',
      'Project technical specification consolidation in progress',
    ],
    category: 'Visual Computing',
    year: '2024',
    role: 'Graphics Developer',
    technologies: ['WebGL', 'Three.js', 'GLSL', 'Graphics'],
    status: 'concept',
    statusDetail: 'Project specification in progress. Scope and capabilities documented as concept exploration.',
    variant: 'compact',
    accentColor: '#F59E0B',
    room: 'project-studio',
    attributes: [
      { label: 'Discipline', value: 'Visual Computing' },
      { label: 'Foundation', value: 'WebGL / GLSL' },
      { label: 'Status', value: 'Specification In Progress' },
    ],
    metrics: [
      { label: 'Discipline', value: 'Visual Computing' },
      { label: 'Foundation', value: 'WebGL / GLSL' },
      { label: 'Status', value: 'Specification In Progress' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'bhoomi',
    name: 'BHOOMI',
    subtitle: 'Agricultural Advisory & Outbreak Intelligence',
    tagline: 'Farmer advisory ecosystem with outbreak and crop intelligence.',
    shortDescription:
      'BHOOMI is an agricultural intelligence platform and farmer advisory ecosystem developed in association with Smart India Hackathon (SIH 2026). It combines an agronomist portal and official dashboard with hotspot maps, outbreak counts, region/crop visualization, and a confirmation queue.',
    problem:
      'Rural farmers lack timely spatial visibility into regional crop disease outbreaks, while agricultural authorities lack verified reporting pipelines.',
    solution:
      'Centralized spatial dashboard uniting interactive hotspot maps, crop telemetry, and an agronomist verification queue.',
    keyCapabilities: [
      'Geospatial hotspot map visualization using Leaflet',
      'Regional crop outbreak tracking and telemetry counters',
      'Agronomist case verification and confirmation queue',
      'Official dashboard interface for regional agricultural authorities',
    ],
    category: 'Agricultural Technology',
    year: '2026',
    role: 'Frontend & Geospatial Developer',
    technologies: ['React', 'Leaflet', 'Geo Visualization', 'Outbreak Tracking', 'FastAPI'],
    status: 'prototype',
    statusDetail: 'Prototype developed for Smart India Hackathon (SIH 2026) agricultural advisory challenge.',
    variant: 'compact',
    accentColor: '#14B8A6',
    room: 'project-studio',
    attributes: [
      { label: 'Initiative', value: 'SIH 2026 Project' },
      { label: 'Mapping', value: 'React + Leaflet' },
      { label: 'Workflow', value: 'Agronomist Portal' },
    ],
    metrics: [
      { label: 'Initiative', value: 'SIH 2026 Project' },
      { label: 'Mapping', value: 'React + Leaflet' },
      { label: 'Workflow', value: 'Agronomist Portal' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
  {
    id: 'minchal',
    name: 'MINCHAL',
    subtitle: 'Appliance-Level Electricity Bill Intelligence',
    tagline: 'Understand your electricity bill — down to the appliance.',
    shortDescription:
      'MINCHAL helps households understand electricity bill increases by analyzing bill photographs and appliance information to estimate appliance-level electricity usage in rupees without requiring smart meters or IoT hardware. Designed with support for Tamil and English.',
    problem:
      'Consumers experience unexpected bill increases without understanding which specific household appliances are responsible, while dedicated smart meters are costly.',
    solution:
      'Accessible software workflow extracting bill billing data via OCR and disaggregating consumption per appliance based on household usage profiles.',
    keyCapabilities: [
      'Bill photograph input with optical character recognition',
      'Appliance-level consumption estimation in rupees',
      'Zero hardware dependencies (no smart meters or IoT sensors required)',
      'Bilingual user interface supporting Tamil and English',
    ],
    category: 'Energy Intelligence',
    year: '2023',
    role: 'Systems Developer',
    technologies: ['OCR', 'Bill Analysis', 'Appliance Insights', 'Python', 'React'],
    status: 'concept',
    statusDetail: 'Concept and prototype workflow focusing on non-hardware bill disaggregation in Tamil and English.',
    variant: 'compact',
    accentColor: '#EF4444',
    room: 'project-studio',
    attributes: [
      { label: 'Input Mode', value: 'Bill Photo (OCR)' },
      { label: 'Hardware Req', value: 'Zero (No Smart Meter)' },
      { label: 'Languages', value: 'Tamil & English' },
    ],
    metrics: [
      { label: 'Input Mode', value: 'Bill Photo (OCR)' },
      { label: 'Hardware Req', value: 'Zero (No Smart Meter)' },
      { label: 'Languages', value: 'Tamil & English' },
    ],
    githubUrl: 'https://github.com/santheesh73',
  },
];
