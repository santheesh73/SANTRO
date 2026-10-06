import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('='.repeat(75));
console.log(' SANTRO M8 — PORTFOLIO ROOMS & SPATIAL EXHIBITION SYSTEM VERIFICATION');
console.log('='.repeat(75));

let failures = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`[FAIL] ${message}`);
    failures++;
  } else {
    console.log(`[PASS] ${message}`);
  }
}

// =========================================================================
// 1. Authored Canonical Portfolio Rooms Specification
// =========================================================================
const PORTFOLIO_ROOMS = [
  {
    id: 'exterior',
    order: 1,
    name: 'Exterior Grounds',
    purpose: 'Identity & Architectural Prelude',
    spatialZone: 'EXTERIOR',
    bounds: {
      min: [-20.0, -5.0, 4.0],
      max: [20.0, 15.0, 32.0],
      center: [0.0, 4.0, 18.0],
    },
    cameraState: 'EXTERIOR_ESTABLISHING',
    cameraWaypointId: 'ext-wp-01',
    cameraFocusPosition: [4.2, 12.5, 26.0],
    cameraFocusTarget: [0.0, 3.8, 2.0],
    cameraFov: 48,
    lightingPreset: 'golden_hour',
    accent: 'Golden hour sunlight, water reflections, exposed board-formed concrete',
    exhibitionStyle: 'Architectural landscape & identity portal',
    description: 'Establishing panoramic arrival across the cantilevered modernist villa and infinity pool.',
  },
  {
    id: 'entrance',
    order: 2,
    name: 'Entrance Portal',
    purpose: 'Portal & Spatial Threshold',
    spatialZone: 'ENTRANCE',
    bounds: {
      min: [-3.0, 0.0, 0.0],
      max: [3.0, 4.0, 4.5],
      center: [0.0, 1.7, 2.2],
    },
    cameraState: 'DOOR_TRANSITION',
    cameraWaypointId: 'ext-wp-07',
    cameraFocusPosition: [0.0, 1.6, 2.2],
    cameraFocusTarget: [0.0, 1.6, -6.0],
    cameraFov: 56,
    lightingPreset: 'golden_hour',
    accent: '9-plank fluted walnut pivot door, cyan LED blade handle, stone threshold',
    exhibitionStyle: 'Minimalist architectural transition portal',
    description: 'Physical portal bridging the outdoor terrace with the interior travertine vestibule.',
  },
  {
    id: 'foyer',
    order: 3,
    name: 'Foyer Vestibule',
    purpose: 'About & Personal Identity',
    spatialZone: 'FOYER',
    bounds: {
      min: [-2.5, 0.0, -3.8],
      max: [2.5, 3.5, 0.0],
      center: [0.0, 1.7, -1.9],
    },
    cameraState: 'FOYER_HOLD',
    cameraWaypointId: 'int-wp-03',
    cameraFocusPosition: [0.2, 1.6, -1.8],
    cameraFocusTarget: [1.6, 1.6, -4.2],
    cameraFov: 58,
    lightingPreset: 'interior',
    accent: '24-batten fluted walnut wall, stone typography plinth, floating staircase pins',
    exhibitionStyle: 'Monolithic stone typography & architectural identity totem',
    description: 'Intimate reception space presenting the engineer, disciplines, and design philosophy.',
  },
  {
    id: 'gallery',
    order: 4,
    name: 'Gallery Corridor',
    purpose: 'Selected Work Introduction',
    spatialZone: 'GALLERY',
    bounds: {
      min: [-2.0, 0.0, -8.0],
      max: [2.0, 3.5, -3.8],
      center: [0.0, 1.7, -5.9],
    },
    cameraState: 'CORRIDOR_TRAVEL',
    cameraWaypointId: 'int-wp-05',
    cameraFocusPosition: [0.0, 1.6, -6.0],
    cameraFocusTarget: [-0.6, 1.55, -10.5],
    cameraFov: 58,
    lightingPreset: 'interior',
    accent: 'Linear ceiling reveal, recessed warm downlights, honed travertine floor',
    exhibitionStyle: 'Curatorial gallery bay overview',
    description: 'Circulation corridor guiding the visitor from personal identity into technical exhibits.',
  },
  {
    id: 'project-studio',
    order: 5,
    name: 'Project Studio',
    purpose: 'Projects Exhibition',
    spatialZone: 'STUDIO',
    bounds: {
      min: [-6.0, 0.0, -18.5],
      max: [6.0, 7.0, -10.2],
      center: [0.0, 3.0, -14.5],
    },
    cameraState: 'GALLERY_ENTRY',
    cameraWaypointId: 'int-wp-07',
    cameraFocusPosition: [0.0, 1.6, -10.2],
    cameraFocusTarget: [0.0, 1.5, -15.0],
    cameraFov: 56,
    lightingPreset: 'interior',
    accent: 'Double-height volume, central travertine plinth, mezzanine walkways',
    exhibitionStyle: 'Architectural exhibition plinths with visual hierarchy',
    description: 'Central exhibition space hosting the 7 verified portfolio projects across spatial tiers.',
  },
  {
    id: 'engineering-lab',
    order: 6,
    name: 'Engineering Lab',
    purpose: 'Technical Stack & Systems',
    spatialZone: 'LAB',
    bounds: {
      min: [-7.8, 0.0, -14.0],
      max: [-1.5, 3.5, -6.0],
      center: [-4.65, 1.7, -10.0],
    },
    cameraState: 'GALLERY_REVEAL',
    cameraWaypointId: 'int-wp-06',
    cameraFocusPosition: [-0.35, 1.6, -7.8],
    cameraFocusTarget: [-3.2, 1.4, -8.5],
    cameraFov: 60,
    lightingPreset: 'interior',
    accent: 'Frameless glass enclosure, dual matte IPS monitors, anodized server rack',
    exhibitionStyle: 'Architectural workstation & domain skill steles',
    description: 'Dedicated glass-enclosed engineering space detailing languages, frontend, backend, data, AI, and infra.',
  },
  {
    id: 'archive',
    order: 7,
    name: 'Archive',
    purpose: 'Proof, Hackathons & Milestones',
    spatialZone: 'ARCHIVE',
    bounds: {
      min: [1.6, 0.0, -21.0],
      max: [6.0, 3.5, -13.0],
      center: [3.8, 1.7, -17.0],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [1.0, 1.6, -15.0],
    cameraFocusTarget: [3.4, 1.4, -18.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Muted bronze, travertine proof tablets, under-mezzanine floating stair flank',
    exhibitionStyle: 'Documentary proof steles & milestone tablets',
    description: 'Verified competition awards, SIH national hackathon victory, and open source contributions.',
  },
  {
    id: 'study',
    order: 8,
    name: 'Study',
    purpose: 'Philosophy & Build Process',
    spatialZone: 'STUDIO',
    bounds: {
      min: [-6.0, 0.0, -21.0],
      max: [-1.6, 3.5, -14.0],
      center: [-3.8, 1.7, -17.5],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [-1.0, 1.6, -15.0],
    cameraFocusTarget: [-3.4, 1.4, -18.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Walnut desk, architectural sketches, warm grazing light, restrained calm',
    exhibitionStyle: 'Four monolithic principle steles: BUILD, THINK, EXPLORE, REFINE',
    description: 'Contemplative study communicating principles of problem solving and engineering rigor.',
  },
  {
    id: 'contact',
    order: 9,
    name: 'Contact Pavilion',
    purpose: 'Contact & Collaboration',
    spatialZone: 'CONTACT',
    bounds: {
      min: [-3.0, 0.0, -22.0],
      max: [3.0, 4.0, -17.0],
      center: [0.0, 1.7, -19.5],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [0.0, 1.6, -14.5],
    cameraFocusTarget: [0.0, 1.3, -19.5],
    cameraFov: 54,
    lightingPreset: 'interior',
    accent: 'Central travertine plinth, toe-kick underglow, 6.8m double-height rear glass panorama',
    exhibitionStyle: 'Architectural plinth with verified contact coordinates',
    description: 'Final interior destination inviting dialogue with a backdrop of the mountain vista.',
  },
  {
    id: 'terrace',
    order: 10,
    name: 'Rear Terrace & Vista',
    purpose: 'Final Reflection & Horizon',
    spatialZone: 'TERRACE',
    bounds: {
      min: [-14.0, -2.0, -36.0],
      max: [14.0, 4.0, -21.5],
      center: [0.0, 0.5, -28.0],
    },
    cameraState: 'INTERIOR_ROOM_APPROACH',
    cameraWaypointId: 'int-wp-08',
    cameraFocusPosition: [0.0, 1.6, -18.5],
    cameraFocusTarget: [0.0, 1.8, -35.0],
    cameraFov: 52,
    lightingPreset: 'dusk',
    accent: 'Cantilever terrace slab, glass balustrade, twilight mountain silhouette',
    exhibitionStyle: 'Pure architectural contemplative observation space',
    description: 'Visual breathing room providing a cinematic pause overlooking the natural horizon.',
  },
];

const ROOM_REGISTRY = PORTFOLIO_ROOMS.reduce((acc, room) => {
  acc[room.id] = room;
  return acc;
}, {});

function getRoomById(id) {
  const room = ROOM_REGISTRY[id];
  if (!room) {
    throw new Error(`[RoomRegistry] Room with id "${id}" does not exist in registry.`);
  }
  return room;
}

function getRoomForJourneyProgress(progress) {
  const p = Math.max(0, Math.min(1, progress));
  if (p < 0.40) return ROOM_REGISTRY['exterior'];
  if (p < 0.50) return ROOM_REGISTRY['entrance'];
  if (p < 0.62) return ROOM_REGISTRY['foyer'];
  if (p < 0.74) return ROOM_REGISTRY['gallery'];
  if (p < 0.84) return ROOM_REGISTRY['project-studio'];
  if (p < 0.90) return ROOM_REGISTRY['engineering-lab'];
  if (p < 0.94) return ROOM_REGISTRY['archive'];
  if (p < 0.97) return ROOM_REGISTRY['study'];
  if (p < 0.995) return ROOM_REGISTRY['contact'];
  return ROOM_REGISTRY['terrace'];
}

// =========================================================================
// 2. Authored Canonical Content Specifications
// =========================================================================
const projectsData = [
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

const skillsData = [
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

const archiveData = [
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

const philosophyData = [
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

const contactData = {
  headline: "LET'S BUILD SOMETHING MEANINGFUL.",
  closingStatement:
    'The architectural journey culminates here, but the conversation begins. Available for engineering leadership, AI systems architecture, and spatial computing collaborations.',
  location: 'Bengaluru, India',
  email: 'santheesh073@gmail.com',
  github: 'https://github.com/santheesh73',
  linkedin: 'https://linkedin.com/in/santheesh73',
  channels: [
    {
      id: 'email',
      label: 'EMAIL',
      value: 'santheesh073@gmail.com',
      url: 'mailto:santheesh073@gmail.com',
      isPrimary: true,
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'github.com/santheesh73',
      url: 'https://github.com/santheesh73',
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: 'linkedin.com/in/santheesh73',
      url: 'https://linkedin.com/in/santheesh73',
    },
  ],
};

const profileData = {
  name: 'SANTHEESH S',
  title: 'AI Software Engineer & Full-Stack Developer',
  role: 'AI Software Engineer',
  disciplines: [
    'AI Software Engineer',
    'Full-Stack Developer',
    'Generative AI Enthusiast',
  ],
  tagline: 'Designing high-performance intelligent systems and immersive spatial computing experiences.',
  bio: 'Specializing in generative AI architectures, distributed low-latency inference pipelines, and real-time WebGL/3D spatial environments. Bridging complex machine learning systems with uncompromising aesthetic interaction.',
  location: 'Bengaluru, India',
  foyerHeadline: 'SANTHEESH S',
  foyerSubheadline: 'AI Software Engineer • Full-Stack Developer • Generative AI Enthusiast',
  foyerStatement:
    'Designing high-performance intelligent systems, on-device AI inference pipelines, and real-time spatial computing environments.',
};

// =========================================================================
// 3. Execution & Verification Suites
// =========================================================================
function runVerification() {
  console.log('\n--- 1. ROOM SYSTEM & REGISTRY INTEGRITY ---');
  assert(PORTFOLIO_ROOMS.length === 10, `Portfolio rooms count is exactly 10 (found ${PORTFOLIO_ROOMS.length})`);

  const expectedRoomIds = [
    'exterior',
    'entrance',
    'foyer',
    'gallery',
    'project-studio',
    'engineering-lab',
    'archive',
    'study',
    'contact',
    'terrace',
  ];

  expectedRoomIds.forEach((id, idx) => {
    const room = PORTFOLIO_ROOMS[idx];
    assert(room && room.id === id, `Room 0${idx + 1} has expected id "${id}"`);
    assert(room && room.order === idx + 1, `Room "${id}" has correct order ${idx + 1}`);
    assert(room && room.name.length > 0, `Room "${id}" has display name: ${room?.name}`);
    assert(room && room.purpose.length > 0, `Room "${id}" has portfolio purpose: ${room?.purpose}`);
    assert(room && room.cameraState.length > 0, `Room "${id}" references camera state: ${room?.cameraState}`);
    assert(room && room.lightingPreset.length > 0, `Room "${id}" references lighting preset: ${room?.lightingPreset}`);
    assert(room && room.bounds && room.bounds.min.length === 3, `Room "${id}" has 3D spatial bounding volume`);
  });

  // O(1) Lookup test
  assert(getRoomById('foyer').order === 3, 'getRoomById("foyer") returns Room 03');
  assert(getRoomById('project-studio').order === 5, 'getRoomById("project-studio") returns Room 05');

  // Progress mapping test (strictly monotonic sequence order 01 -> 10)
  assert(getRoomForJourneyProgress(0.1).id === 'exterior', 'Progress 0.10 maps to Exterior (Room 01)');
  assert(getRoomForJourneyProgress(0.48).id === 'entrance', 'Progress 0.48 maps to Entrance (Room 02)');
  assert(getRoomForJourneyProgress(0.55).id === 'foyer', 'Progress 0.55 maps to Foyer (Room 03)');
  assert(getRoomForJourneyProgress(0.68).id === 'gallery', 'Progress 0.68 maps to Gallery (Room 04)');
  assert(getRoomForJourneyProgress(0.80).id === 'project-studio', 'Progress 0.80 maps to Project Studio (Room 05)');
  assert(getRoomForJourneyProgress(0.88).id === 'engineering-lab', 'Progress 0.88 maps to Engineering Lab (Room 06)');
  assert(getRoomForJourneyProgress(0.92).id === 'archive', 'Progress 0.92 maps to Archive (Room 07)');
  assert(getRoomForJourneyProgress(0.95).id === 'study', 'Progress 0.95 maps to Study (Room 08)');
  assert(getRoomForJourneyProgress(0.98).id === 'contact', 'Progress 0.98 maps to Contact (Room 09)');
  assert(getRoomForJourneyProgress(1.00).id === 'terrace', 'Progress 1.00 maps to Terrace (Room 10)');

  console.log('\n--- 2. PROJECT STUDIO VERIFICATION ---');
  assert(projectsData.length === 7, `Project Studio has exactly 7 approved projects (found ${projectsData.length})`);

  const expectedProjectIds = ['orion', 'hearttune', 'nisf', 'ahal-ai', 'prysm', 'bhoomi', 'minchal'];
  expectedProjectIds.forEach((pid) => {
    const proj = projectsData.find((p) => p.id === pid);
    assert(!!proj, `Approved project "${pid}" is registered in projectsData`);
    assert(proj && proj.technologies.length > 0, `Project "${pid}" defines verified technology stack`);
    assert(proj && proj.metrics.length > 0, `Project "${pid}" defines impact metrics`);
    assert(proj && proj.highlights.length > 0, `Project "${pid}" defines technical highlights`);
  });

  // Hierarchy check
  const orion = projectsData.find((p) => p.id === 'orion');
  assert(orion?.variant === 'featured', 'ORION is assigned primary "featured" exhibition variant');
  assert(orion?.technologies.includes('WebGPU'), 'ORION tech stack includes WebGPU');

  const hearttune = projectsData.find((p) => p.id === 'hearttune');
  assert(hearttune?.variant === 'standard', 'HEARTTUNE is assigned selected "standard" exhibition variant');

  const nisf = projectsData.find((p) => p.id === 'nisf');
  assert(nisf?.variant === 'standard', 'NISF is assigned selected "standard" exhibition variant');

  const ahalAi = projectsData.find((p) => p.id === 'ahal-ai');
  assert(ahalAi?.variant === 'standard', 'AHAL AI is assigned selected "standard" exhibition variant');

  const prysm = projectsData.find((p) => p.id === 'prysm');
  assert(prysm?.variant === 'compact', 'PRYSM is assigned supporting "compact" exhibition variant');

  const bhoomi = projectsData.find((p) => p.id === 'bhoomi');
  assert(bhoomi?.variant === 'compact', 'BHOOMI is assigned supporting "compact" exhibition variant');

  const minchal = projectsData.find((p) => p.id === 'minchal');
  assert(minchal?.variant === 'compact', 'MINCHAL is assigned supporting "compact" exhibition variant');
  assert(minchal?.shortDescription.toLowerCase().includes('ocr'), 'MINCHAL verified description reflects OCR bill analysis');

  console.log('\n--- 3. ENGINEERING LAB VERIFICATION ---');
  assert(skillsData.length === 6, `Skills grouped into exactly 6 technical domains (found ${skillsData.length})`);
  const domainNames = skillsData.map((d) => d.name);
  assert(domainNames.includes('LANGUAGES'), 'Domain LANGUAGES exists');
  assert(domainNames.includes('FRONTEND'), 'Domain FRONTEND exists');
  assert(domainNames.includes('BACKEND'), 'Domain BACKEND exists');
  assert(domainNames.includes('DATA'), 'Domain DATA exists');
  assert(domainNames.includes('AI & MACHINE LEARNING'), 'Domain AI & MACHINE LEARNING exists');
  assert(domainNames.includes('INFRASTRUCTURE'), 'Domain INFRASTRUCTURE exists');

  const allSkills = skillsData.flatMap((d) => d.skills);
  const requiredSkills = [
    'Python',
    'TypeScript',
    'JavaScript',
    'SQL',
    'React',
    'Next.js',
    'FastAPI',
    'PostgreSQL',
    'Supabase',
    'Redis',
    'Generative AI',
    'LLMs',
    'RAG',
    'NLP',
    'Docker',
  ];
  requiredSkills.forEach((skill) => {
    assert(allSkills.includes(skill), `Required skill "${skill}" is present in verified skill matrix`);
  });

  console.log('\n--- 4. ARCHIVE (PROOF & MILESTONES) VERIFICATION ---');
  assert(archiveData.length >= 4, `Archive contains at least 4 proof records (found ${archiveData.length})`);
  const sihRecord = archiveData.find((a) => a.id === 'proof-sih');
  assert(!!sihRecord, 'Smart India Hackathon (SIH) winner record exists');

  console.log('\n--- 5. STUDY (ENGINEERING PRINCIPLES) VERIFICATION ---');
  assert(philosophyData.length === 4, `Study contains exactly 4 principles (found ${philosophyData.length})`);
  const keywords = philosophyData.map((p) => p.keyword);
  assert(keywords.includes('BUILD'), 'BUILD principle exists');
  assert(keywords.includes('THINK'), 'THINK principle exists');
  assert(keywords.includes('EXPLORE'), 'EXPLORE principle exists');
  assert(keywords.includes('REFINE'), 'REFINE principle exists');

  console.log('\n--- 6. CONTACT & FOYER PROFILE VERIFICATION ---');
  assert(contactData.email === 'santheesh073@gmail.com', 'Verified email matches santheesh073@gmail.com');
  assert(contactData.github === 'https://github.com/santheesh73', 'Verified GitHub matches github.com/santheesh73');
  assert(contactData.linkedin === 'https://linkedin.com/in/santheesh73', 'Verified LinkedIn matches linkedin.com/in/santheesh73');
  assert(contactData.headline === "LET'S BUILD SOMETHING MEANINGFUL.", 'Closing message is "LET\'S BUILD SOMETHING MEANINGFUL."');

  assert(profileData.name === 'SANTHEESH S', 'Profile name is SANTHEESH S');
  assert(profileData.disciplines.includes('AI Software Engineer'), 'Disciplines include AI Software Engineer');
  assert(profileData.disciplines.includes('Full-Stack Developer'), 'Disciplines include Full-Stack Developer');
  assert(profileData.disciplines.includes('Generative AI Enthusiast'), 'Disciplines include Generative AI Enthusiast');

  console.log('\n--- 7. CAMERA PATH CLEARANCE & COLLISION VALIDATION ---');
  const exhibitsPositions = [
    // Project Studio (7 Projects in front atrium zone Z: -12.0 to -14.8m)
    { name: 'ORION (Featured)', pos: [-2.6, 0.0, -12.2] },
    { name: 'HEARTTUNE (Standard)', pos: [-2.6, 0.0, -14.2] },
    { name: 'NISF (Standard)', pos: [2.6, 0.0, -12.2] },
    { name: 'AHAL AI (Standard)', pos: [2.6, 0.0, -14.2] },
    { name: 'PRYSM (Compact)', pos: [-4.5, 0.0, -12.8] },
    { name: 'BHOOMI (Compact)', pos: [-4.5, 0.0, -14.6] },
    { name: 'MINCHAL (Compact)', pos: [4.5, 0.0, -13.2] },

    // Archive (East Under-Mezzanine Wing Z: -16.2 to -19.4m)
    { name: 'ARCHIVE_SIH', pos: [3.6, 0.0, -16.2] },
    { name: 'ARCHIVE_AI_SUMMIT', pos: [4.5, 0.0, -17.2] },
    { name: 'ARCHIVE_OPEN_SOURCE', pos: [3.6, 0.0, -18.4] },
    { name: 'ARCHIVE_HPC', pos: [4.5, 0.0, -19.4] },

    // Study (West Under-Mezzanine Wing Z: -16.2 to -19.4m)
    { name: 'STUDY_BUILD', pos: [-3.6, 0.0, -16.2] },
    { name: 'STUDY_THINK', pos: [-4.5, 0.0, -17.2] },
    { name: 'STUDY_EXPLORE', pos: [-3.6, 0.0, -18.4] },
    { name: 'STUDY_REFINE', pos: [-4.5, 0.0, -19.4] },

    // Contact (Central Monolithic Plinth at Rear Vista)
    { name: 'CONTACT_PLINTH', pos: [0.0, 0.69, -18.5] },
  ];

  // 7.1 Camera travel segment clearance (X: [-0.8, 0.8], Z: [-10.2, -14.5])
  exhibitsPositions.forEach((ex) => {
    const [x, , z] = ex.pos;
    if (z >= -14.5 && z <= -10.2) {
      const lateralDist = Math.abs(x);
      assert(
        lateralDist >= 1.5,
        `Exhibit ${ex.name} at X=${x}, Z=${z} maintains lateral clearance (${lateralDist.toFixed(2)}m >= 1.5m)`
      );
    }
  });

  // 7.2 Terminal sightline clearance: no obstacles along center corridor (X in [-1.2, 1.2], Z in [-10.2, -18.0])
  const blockingCenterExhibits = exhibitsPositions.filter((ex) => {
    const [x, , z] = ex.pos;
    return Math.abs(x) < 1.2 && z >= -18.0 && z <= -10.2;
  });
  assert(
    blockingCenterExhibits.length === 0,
    `Center axis sightline to Contact & rear vista is 100% unblocked (found ${blockingCenterExhibits.length} blockers)`
  );

  // 7.3 Pairwise exhibit collision detection (minimum separation >= 1.0m)
  console.log('\n--- 8. SPATIAL EXHIBIT PAIRWISE COLLISION DETECTION ---');
  let collisions = 0;
  for (let i = 0; i < exhibitsPositions.length; i++) {
    for (let j = i + 1; j < exhibitsPositions.length; j++) {
      const exA = exhibitsPositions[i];
      const exB = exhibitsPositions[j];
      const dx = exA.pos[0] - exB.pos[0];
      const dz = exA.pos[2] - exB.pos[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < 1.0) {
        console.error(
          `[FAIL] Collision detected between ${exA.name} and ${exB.name}: distance ${dist.toFixed(2)}m < 1.0m`
        );
        failures++;
        collisions++;
      }
    }
  }
  assert(collisions === 0, `Zero exhibit collisions detected across all ${exhibitsPositions.length} spatial installations`);

  // 7.4 Source File Integrity & Existence Validation
  console.log('\n--- 9. SOURCE FILE & CONTRACT INTEGRITY ---');
  const requiredFiles = [
    'src/3d/rooms/RoomRegistry.ts',
    'src/3d/rooms/RoomSystem.tsx',
    'src/3d/rooms/types.ts',
    'src/3d/rooms/exhibits/ArchitecturalPlinth.tsx',
    'src/3d/rooms/exhibits/ProjectExhibit.tsx',
    'src/3d/rooms/exhibits/SkillWorkstation.tsx',
    'src/3d/rooms/exhibits/ArchiveExhibit.tsx',
    'src/3d/rooms/exhibits/PhilosophyStele.tsx',
    'src/3d/rooms/exhibits/ContactPlinth.tsx',
    'src/3d/rooms/textures/createExhibitionTexture.ts',
    'src/3d/rooms/rooms/ExteriorRoom.tsx',
    'src/3d/rooms/rooms/EntranceRoom.tsx',
    'src/3d/rooms/rooms/FoyerRoom.tsx',
    'src/3d/rooms/rooms/GalleryRoom.tsx',
    'src/3d/rooms/rooms/ProjectStudioRoom.tsx',
    'src/3d/rooms/rooms/EngineeringLabRoom.tsx',
    'src/3d/rooms/rooms/ArchiveRoom.tsx',
    'src/3d/rooms/rooms/StudyRoom.tsx',
    'src/3d/rooms/rooms/ContactRoom.tsx',
    'src/3d/rooms/rooms/TerraceRoom.tsx',
    'src/content/projects.ts',
    'src/content/skills.ts',
    'src/content/archive.ts',
    'src/content/philosophy.ts',
    'src/content/contact.ts',
    'src/content/profile.ts',
    'src/content/types.ts',
  ];

  requiredFiles.forEach((relPath) => {
    const fullPath = path.join(rootDir, relPath);
    assert(fs.existsSync(fullPath), `Source file exists: ${relPath}`);
  });

  // Verify key export strings in RoomRegistry.ts
  const roomRegistrySrc = fs.readFileSync(path.join(rootDir, 'src/3d/rooms/RoomRegistry.ts'), 'utf-8');
  assert(roomRegistrySrc.includes('PORTFOLIO_ROOMS'), 'RoomRegistry.ts exports PORTFOLIO_ROOMS');
  assert(roomRegistrySrc.includes('getRoomForJourneyProgress'), 'RoomRegistry.ts exports getRoomForJourneyProgress');

  console.log('\n' + '='.repeat(75));
  if (failures > 0) {
    console.error(`FAILED: ${failures} verification checks failed.`);
    process.exit(1);
  } else {
    console.log('SUCCESS: All M8 Portfolio Rooms & Spatial Content checks passed (0 errors).');
    process.exit(0);
  }
}

runVerification();
