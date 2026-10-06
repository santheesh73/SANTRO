import { PortfolioProject } from './types';

/**
 * SANTRO M8 — Centralized Verified Portfolio Projects
 *
 * Strict 7 projects matching M8 Specification Sections 11 & 15.
 * Visual hierarchy:
 * - Primary / Featured: ORION
 * - Selected / Standard: HEARTTUNE, NISF, AHAL AI
 * - Supporting / Compact: PRYSM, BHOOMI, MINCHAL
 */
export const projectsData: PortfolioProject[] = [
  {
    id: 'orion',
    name: 'ORION',
    subtitle: 'On-Device Privacy-First AI Agent Platform',
    shortDescription:
      'On-device AI cognitive workspace executing local model inference directly in the browser via WebGPU with zero server data egress and full offline resilience.',
    category: 'On-Device AI & Privacy',
    year: '2025',
    role: 'Lead Architect',
    technologies: ['Next.js 15', 'WebGPU', 'ONNX Runtime', 'PyTorch', 'TypeScript'],
    highlights: [
      'Zero server egress: 100% client-side token generation and model execution',
      'Local inference fallback using quantized ONNX WebGPU runtime',
      'Spatial graph-based prompt canvas with 60fps hardware acceleration',
      'Sub-50ms token stream latency with custom WebSockets multiplexer',
    ],
    metrics: [
      { label: 'Egress Data', value: '0 Bytes' },
      { label: 'Token Latency', value: '< 42ms' },
      { label: 'Spatial Nodes', value: '10,000+' },
    ],
    variant: 'featured',
    accentColor: '#00F0FF',
    githubUrl: 'https://github.com/santheesh73/orion',
    liveUrl: 'https://orion.santheesh.dev',
  },
  {
    id: 'hearttune',
    name: 'HEARTTUNE',
    subtitle: 'Emotion-Responsive Music Streaming PWA',
    shortDescription:
      'Premium progressive web app combining biometric and audio mood analysis with low-latency streaming, playlist orchestration, and offline playback support.',
    category: 'Audio ML & Streaming PWA',
    year: '2024',
    role: 'Core Systems Engineer',
    technologies: ['React', 'Web Audio API', 'Python', 'Librosa', 'PyTorch'],
    highlights: [
      'Full offline playback and PWA background synchronization caching',
      'Real-time affective acoustic feature extraction running at 128Hz',
      'Zero-latency Web Audio API synthesis engine with adaptive soundscapes',
      'Biometric heart-rate and audio synchronization pipeline',
    ],
    metrics: [
      { label: 'Classification', value: '94.8%' },
      { label: 'Audio Buffer', value: '64 samples' },
      { label: 'Offline Sync', value: '100% PWA' },
    ],
    variant: 'standard',
    accentColor: '#EC4899',
    githubUrl: 'https://github.com/santheesh73/hearttune',
  },
  {
    id: 'nisf',
    name: 'NISF',
    subtitle: 'Generative Variant & Content Optimization Platform',
    shortDescription:
      'Multimodal AI content evaluation and marketing variant generation platform featuring automated heuristic scoring, critique loops, and vector retrieval.',
    category: 'Generative AI & Optimization',
    year: '2024',
    role: 'Backend Architect',
    technologies: ['FastAPI', 'Pinecone', 'LangChain', 'PostgreSQL', 'Docker'],
    highlights: [
      'Automated multimodal variant scoring and criticism engine',
      'Hierarchical navigable small-world (HNSW) vector indexing with hybrid BM25',
      'Asynchronous document ingestion queue processing 500+ assets/min',
      'Sub-20ms p99 query latency across 5M+ vector embeddings',
    ],
    metrics: [
      { label: 'Query P99', value: '16ms' },
      { label: 'Variant Throughput', value: '1,200 QPS' },
      { label: 'MRR Boost', value: '+34%' },
    ],
    variant: 'standard',
    accentColor: '#10B981',
    githubUrl: 'https://github.com/santheesh73/nisf',
  },
  {
    id: 'ahal-ai',
    name: 'AHAL AI',
    subtitle: 'Repository & Document Intelligence Platform',
    shortDescription:
      'Codebase intelligence engine performing abstract syntax tree parsing, dependency graph embedding, architectural analysis, and AI-assisted technical reporting.',
    category: 'Code & Document Intelligence',
    year: '2024',
    role: 'AI Engineer',
    technologies: ['LangGraph', 'Python', 'FastAPI', 'Redis', 'Next.js'],
    highlights: [
      'AST-based deep codebase dependency analysis and graph indexing',
      'Multi-agent planner-critic-worker feedback loops preventing hallucinations',
      'Deterministic state transitions with replayable event sourcing',
      'Automated architectural insights and executive technical reports',
    ],
    metrics: [
      { label: 'Task Success', value: '92.4%' },
      { label: 'Recovery Latency', value: '120ms' },
      { label: 'Parallel Agents', value: '32' },
    ],
    variant: 'standard',
    accentColor: '#8B5CF6',
    githubUrl: 'https://github.com/santheesh73/ahal-ai',
  },
  {
    id: 'prysm',
    name: 'PRYSM',
    subtitle: 'Real-Time GPU Shader Sandbox & Visualizer',
    shortDescription:
      'Hardware-accelerated visual spatial computing environment and shader sandbox rendering millions of dynamic particles with audio-reactive GPU compute.',
    category: 'Graphics & WebGL',
    year: '2024',
    role: 'Creative Developer',
    technologies: ['Three.js', 'WebGL 2.0', 'GLSL', 'TypeScript', 'WebAudio'],
    highlights: [
      'GPGPU particle simulation computing 2,000,000 active particles at locked 60fps',
      'Custom post-processing pipeline with cinematic bokeh and chromatic aberration',
      'Fast Fourier Transform (FFT) real-time audio-reactive spectrum modulation',
    ],
    metrics: [
      { label: 'Active Particles', value: '2.0 Million' },
      { label: 'Framerate', value: '60 fps' },
      { label: 'Draw Calls', value: '14' },
    ],
    variant: 'compact',
    accentColor: '#F59E0B',
    githubUrl: 'https://github.com/santheesh73/prysm',
  },
  {
    id: 'bhoomi',
    name: 'BHOOMI',
    subtitle: 'SIH Satellite Crop Intelligence Command Center',
    shortDescription:
      'Smart India Hackathon (SIH) agricultural satellite intelligence platform combining multispectral soil analysis, vegetation health indices, and yield forecasting.',
    category: 'Geospatial ML & Agriculture',
    year: '2023',
    role: 'Computer Vision Engineer',
    technologies: ['PyTorch', 'GeoTIFF', 'Rasterio', 'FastAPI', 'MapLibre GL'],
    highlights: [
      'Multispectral Sentinel-2 satellite imagery processing for NDVI & soil spectral indices',
      'U-Net semantic segmentation for regional crop boundary and stress detection',
      'Interactive raster tile visualization serving nationwide agricultural coverage',
    ],
    metrics: [
      { label: 'mIoU Score', value: '88.3%' },
      { label: 'Coverage Area', value: '120,000 km²' },
      { label: 'Tile Latency', value: '< 65ms' },
    ],
    variant: 'compact',
    accentColor: '#14B8A6',
    githubUrl: 'https://github.com/santheesh73/bhoomi',
  },
  {
    id: 'minchal',
    name: 'MINCHAL',
    subtitle: 'Accessible OCR Electricity Consumption Optimizer',
    shortDescription:
      'Electricity-use analysis and OCR experience providing appliance-level breakdown and rupee-level estimates from paper bill photos in Tamil and English without smart meters.',
    category: 'Energy Analytics & Accessibility',
    year: '2023',
    role: 'Systems Programmer',
    technologies: ['Python', 'Tesseract OCR', 'FastAPI', 'React', 'Docker'],
    highlights: [
      'Mobile camera bill image input with robust optical character recognition',
      'Appliance energy breakdown algorithms without requiring smart meter hardware',
      'Bilingual Tamil & English interface designed for broad public accessibility',
      'Rupee-level tariff tier optimization and actionable savings estimates',
    ],
    metrics: [
      { label: 'OCR Accuracy', value: '96.2%' },
      { label: 'Processing Time', value: '< 850ms' },
      { label: 'Hardware Req', value: 'Zero (No Meter)' },
    ],
    variant: 'compact',
    accentColor: '#EF4444',
    githubUrl: 'https://github.com/santheesh73/minchal',
  },
];
