# PORTFOLIO CONTENT MODEL SPECIFICATION

**Module:** `src/content/`  
**Purpose:** Typed, Content-Separated Architecture for Portfolio Data  

---

## 1. Content Separation Principle

The portfolio content is completely decoupled from React Three Fiber rendering and Three.js scene graphs. Content models are plain TypeScript data objects residing in `src/content/`, enabling rapid editing and future headless CMS / markdown migration without touching 3D coordinates or rendering logic.

---

## 2. Content Domains & Schemas

### 2.1 Profile (`src/content/profile.ts`)
- **Name:** SANTHEESH S
- **Role:** AI Software Engineer
- **Disciplines:** AI Software Engineer • Full-Stack Developer • Generative AI Enthusiast
- **Foyer Statement:** Designing high-performance intelligent systems, on-device AI inference pipelines, and real-time spatial computing environments.

### 2.2 Projects (`src/content/projects.ts`)
Seven verified production projects:
1. `orion`: On-device AI workspace (WebGPU, Next.js 15, ONNX Runtime).
2. `hearttune`: Emotion-responsive music streaming PWA (React, Web Audio API, Python).
3. `nisf`: Multimodal generative variant scoring & vector critique (FastAPI, Pinecone, LangChain).
4. `ahal-ai`: Codebase & document intelligence engine (LangGraph, Python, FastAPI).
5. `prysm`: GPU shader sandbox & 2M-particle visualizer (Three.js, WebGL 2.0, GLSL).
6. `bhoomi`: SIH agricultural satellite intelligence platform (PyTorch, GeoTIFF, Rasterio).
7. `minchal`: Accessible OCR electricity bill optimizer in Tamil & English (Python, Tesseract, FastAPI).

### 2.3 Skills (`src/content/skills.ts`)
Six structured engineering domains:
- `LANGUAGES`: Python, TypeScript, JavaScript, SQL
- `FRONTEND`: React, Next.js
- `BACKEND`: FastAPI, REST APIs
- `DATA`: PostgreSQL, Supabase, Redis
- `AI & MACHINE LEARNING`: Generative AI, LLMs, RAG, NLP
- `INFRASTRUCTURE`: Docker

### 2.4 Archive (`src/content/archive.ts`)
Verified awards and open-source contributions:
- Smart India Hackathon (SIH) National Finalist & Winner (BHOOMI)
- National AI Hackathon Finalist (Multimodal Emergency Triage)
- Open Source Vector Framework Contributor (SIMD Quantization Kernels)
- High-Performance Computing Excellence Award (Distributed Raymarching Visualizer)

### 2.5 Philosophy (`src/content/philosophy.ts`)
Four engineering principles:
- **BUILD**: Turn ideas into working products.
- **THINK**: Understand the problem before choosing the technology.
- **EXPLORE**: Experiment with new tools, AI systems and approaches.
- **REFINE**: Iterate until experience and implementation are both strong.

### 2.6 Contact (`src/content/contact.ts`)
- **Headline:** LET'S BUILD SOMETHING MEANINGFUL.
- **Verified Email:** `santheesh073@gmail.com`
- **Verified GitHub:** `https://github.com/santheesh73`
- **Verified LinkedIn:** `https://linkedin.com/in/santheesh73`
- **Location:** Bengaluru, India
