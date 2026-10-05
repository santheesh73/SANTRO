import { SkillCategory } from '@/types';

export const skillsData: SkillCategory[] = [
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    description: 'Deep neural networks, generative AI orchestration, and low-latency inference systems.',
    skills: [
      { name: 'PyTorch', level: 'Expert', focus: 'Model training, fine-tuning, computer vision' },
      { name: 'Transformers', level: 'Expert', focus: 'HuggingFace, LLM architectures, attention mechanisms' },
      { name: 'LangChain & LangGraph', level: 'Expert', focus: 'Autonomous agentic workflows, memory graphs' },
      { name: 'Vector DBs (Pinecone, Chroma)', level: 'Expert', focus: 'HNSW indexing, hybrid retrieval, dense embeddings' },
      { name: 'Ollama & Local LLMs', level: 'Advanced', focus: 'Quantized GGUF inference, edge deployment' },
      { name: 'OpenCV & Computer Vision', level: 'Advanced', focus: 'Image preprocessing, feature extraction' },
    ],
  },
  {
    id: 'frontend-3d',
    name: '3D Graphics & Spatial Frontend',
    description: 'Immersive WebGL rendering, architectural visualization, and high-performance reactive interfaces.',
    skills: [
      { name: 'Three.js', level: 'Expert', focus: 'PBR shading, scene graph, custom shaders, post-processing' },
      { name: 'React Three Fiber (R3F)', level: 'Expert', focus: 'Declarative canvas orchestration, memory lifecycle' },
      { name: '@react-three/drei', level: 'Expert', focus: 'GLTF loaders, camera rigs, HTML overlays, helpers' },
      { name: 'Next.js (App Router)', level: 'Expert', focus: 'Server Components, SSR/SSG, streaming, Turbopack' },
      { name: 'React 19 & TypeScript', level: 'Expert', focus: 'Concurrent rendering, strict type contracts' },
      { name: 'Tailwind CSS v4', level: 'Expert', focus: 'Modern token systems, high-performance styling' },
    ],
  },
  {
    id: 'backend-systems',
    name: 'Backend Architecture & APIs',
    description: 'Concurrent microservices, distributed streaming, and robust relational/document databases.',
    skills: [
      { name: 'Python (FastAPI, AsyncIO)', level: 'Expert', focus: 'Asynchronous event loops, RESTful & WebSocket APIs' },
      { name: 'Node.js & TypeScript', level: 'Expert', focus: 'High-throughput microservices, streaming pipelines' },
      { name: 'PostgreSQL & Supabase', level: 'Advanced', focus: 'Relational data modeling, pgvector indexing, RLS' },
      { name: 'Redis', level: 'Advanced', focus: 'In-memory caching, pub/sub queues, rate limiting' },
      { name: 'gRPC & Protocol Buffers', level: 'Proficient', focus: 'Inter-service binary communication, low serialization latency' },
    ],
  },
  {
    id: 'devops-infra',
    name: 'Data Infrastructure & Systems',
    description: 'Containerization, reproducible deployment, and GPU infrastructure orchestration.',
    skills: [
      { name: 'Docker & Containerization', level: 'Expert', focus: 'Multi-stage builds, GPU container runtimes' },
      { name: 'Git & Version Control', level: 'Expert', focus: 'Branching strategies, CI/CD automation' },
      { name: 'Linux System Administration', level: 'Advanced', focus: 'Performance profiling, systemd, shell automation' },
      { name: 'Vercel & Cloudflare', level: 'Advanced', focus: 'Edge compute, CDN caching, global routing' },
      { name: 'WebGPU (Emerging)', level: 'Proficient', focus: 'Compute shaders, next-gen graphics pipelines' },
      { name: 'Blender DCC', level: 'Proficient', focus: 'Python automation, asset prep, PBR export' },
    ],
  },
];
