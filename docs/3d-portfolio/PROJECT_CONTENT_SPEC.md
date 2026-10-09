# SANTRO — Project Content Specification

## 1. Overview
This document specifies the exact content schema, verified project copy, problem/solution statements, capabilities, and presentation parameters for all seven verified projects exhibited in **The Portfolio House**.

---

## 2. Project Specifications

### 2.1 ORION
* **ID**: `orion`
* **Exhibition Room**: Project Studio (`Room 05`, Central West Plinth at `[-2.6, 0.0, -12.2]`)
* **Exhibition Variant**: `featured` (Primary Monolith, 2.4m plinth)
* **Accent Color**: `#00F0FF` (Cyan)
* **Category**: On-Device AI
* **Year**: 2026
* **Role**: AI Systems Developer
* **Tagline**: On-device assistant — offline-first and private by design.
* **Short Description**: On-device AI assistant created for OSDHack 2026. Runs AI inference locally on the user's device — offline and privacy-first — rather than relying on cloud AI APIs.
* **Problem**: Cloud AI APIs require continuous network connectivity, introduce request latency, and expose sensitive user prompts and personal data to third-party cloud infrastructure.
* **Solution**: Client-side inference architecture executing model operations directly on local hardware, ensuring prompts and tokens stay strictly on-device without cloud round-trips.
* **Key Capabilities**:
  - Client-side local inference without external API dependencies.
  - Offline-first execution model resilient to network disconnection.
  - Zero server data egress preserving strict user privacy.
  - Direct local memory and compute utilization on user hardware.
* **Technologies**: `['On-Device AI', 'Local Inference', 'Offline-First', 'Privacy-First', 'TypeScript']`
* **Status**: `prototype`
* **Status Detail**: Prototype created for OSDHack 2026 exploring private local model inference.
* **Technical Attributes**:
  - `Execution`: Local / On-Device
  - `Privacy Model`: Zero Server Egress
  - `Context`: OSDHack 2026
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.2 HEARTTUNE
* **ID**: `hearttune`
* **Exhibition Room**: Project Studio (`Room 05`, West Mid Plinth at `[-2.6, 0.0, -14.2]`)
* **Exhibition Variant**: `standard` (1.7m plinth)
* **Accent Color**: `#EC4899` (Magenta/Pink)
* **Category**: Music / Media PWA
* **Year**: 2024
* **Role**: Full-Stack Engineer
* **Tagline**: A premium, Spotify-like music streaming experience.
* **Short Description**: HeartTune is a premium music streaming PWA with authentication and a Spotify-like listening experience. Streaming is powered by the JioSaavn API on a Supabase and PostgreSQL backend with Redis caching.
* **Problem**: Delivering a responsive, native-feeling media streaming application on the web requires resilient caching, background sync, and efficient audio buffer orchestration.
* **Solution**: Progressive web application pairing a clean streaming surface with an asynchronous API proxy, Redis memory caching, and Supabase relational persistence.
* **Key Capabilities**:
  - Responsive music discovery and playlist management.
  - JioSaavn API media streaming integration.
  - Supabase authentication and relational data storage.
  - Upstash Redis caching layer for low-latency query handling.
  - PWA client architecture with offline listening capability.
* **Technologies**: `['React', 'Supabase', 'PostgreSQL', 'JioSaavn API', 'Redis', 'TypeScript']`
* **Status**: `in-progress`
* **Status Detail**: Core streaming client, API proxy, and Redis caching implemented; PWA offline cache refinement in progress.
* **Technical Attributes**:
  - `Platform`: Progressive Web App
  - `Media Engine`: JioSaavn API Proxy
  - `Cache Tier`: Upstash Redis
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.3 NISF
* **ID**: `nisf`
* **Exhibition Room**: Project Studio (`Room 05`, East Front Plinth at `[2.6, 0.0, -12.2]`)
* **Exhibition Variant**: `standard` (1.7m plinth)
* **Accent Color**: `#10B981` (Emerald)
* **Category**: Creative AI & Optimization
* **Year**: 2024
* **Role**: Backend & Systems Architect
* **Tagline**: Generate and optimize content across every modality.
* **Short Description**: NISF is an AI creative intelligence platform for generating and optimizing content across text, image, audio, and video. It pairs a Next.js product surface with a FastAPI inference backend, background job processing, and containerized deployment.
* **Problem**: Iterating on creative content requires disparate tools for text, visuals, and audio, lacking systematic automated evaluation and critique to identify the strongest variants.
* **Solution**: Unified multimodal workflow connecting generative APIs with automated scoring heuristics, variant comparison, and critique feedback loops.
* **Key Capabilities**:
  - Multimodal generation support for text, images, audio, and video.
  - Automated variant scoring and comparative critique pipeline.
  - Asynchronous job queue processing using Celery and Redis.
  - FastAPI inference backend serving a Next.js product interface.
  - Docker containerized deployment architecture.
* **Technologies**: `['Next.js', 'FastAPI', 'Groq', 'PostgreSQL', 'Redis', 'Docker', 'Celery']`
* **Status**: `in-progress`
* **Status Detail**: Product UI surface and FastAPI backend service in development; multimodal critique loops in testing.
* **Technical Attributes**:
  - `Modalities`: Text, Image, Audio, Video
  - `Backend API`: FastAPI + Celery
  - `Deployment`: Docker Containerized
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.4 AHAL AI
* **ID**: `ahal-ai`
* **Exhibition Room**: Project Studio (`Room 05`, East Mid Plinth at `[2.6, 0.0, -14.2]`)
* **Exhibition Variant**: `standard` (1.7m plinth)
* **Accent Color**: `#8B5CF6` (Violet)
* **Category**: Software Intelligence
* **Year**: 2024
* **Role**: AI Engineer
* **Tagline**: Repository and document analysis with software intelligence.
* **Short Description**: AHAL AI is a software intelligence platform for repository and document analysis, intended to help developers understand codebases, inspect architecture, and generate interactive technical insights.
* **Problem**: Developers spending substantial onboarding time navigating undocumented codebases and cross-referencing technical documentation manually.
* **Solution**: Structured repository analysis and document ingestion system pairing LLM reasoning with code structure extraction to surface architectural insights.
* **Key Capabilities**:
  - Codebase structural and dependency analysis.
  - Technical document ingestion and semantic parsing.
  - Gemma foundation model integration for technical Q&A.
  - Interactive architectural summaries and technical reporting.
* **Technologies**: `['Gemma', 'Python', 'LLMs', 'Repository Analysis', 'Document Analysis']`
* **Status**: `in-progress`
* **Status Detail**: Core repository parser and document analysis pipeline in active development.
* **Technical Attributes**:
  - `Focus`: Codebase Analysis
  - `Model Tier`: Gemma / LLM
  - `Output`: Architectural Insights
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.5 PRYSM
* **ID**: `prysm`
* **Exhibition Room**: Project Studio (`Room 05`, West Outer Wing at `[-4.5, 0.0, -12.8]`)
* **Exhibition Variant**: `compact` (1.3m plinth)
* **Accent Color**: `#F59E0B` (Amber)
* **Category**: Visual Computing
* **Year**: 2024
* **Role**: Graphics Developer
* **Tagline**: Exploration in real-time visual computing and graphics.
* **Short Description**: PRYSM is a visual computing and graphics engineering exploration. Detailed project specifications and capability documentation are currently being finalized.
* **Problem**: Consolidating hardware-accelerated real-time visual techniques into an established project specification.
* **Solution**: Exploratory graphics and shader research sandbox investigating real-time rendering capabilities.
* **Key Capabilities**:
  - Real-time visual rendering experimentation.
  - Shader and WebGL graphics exploratory tests.
  - Project technical specification consolidation in progress.
* **Technologies**: `['WebGL', 'Three.js', 'GLSL', 'Graphics']`
* **Status**: `concept`
* **Status Detail**: Project specification in progress. Scope and capabilities documented as concept exploration.
* **Technical Attributes**:
  - `Discipline`: Visual Computing
  - `Foundation`: WebGL / GLSL
  - `Status`: Specification In Progress
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.6 BHOOMI
* **ID**: `bhoomi`
* **Exhibition Room**: Project Studio (`Room 05`, West Outer Mid Wing at `[-4.5, 0.0, -14.6]`)
* **Exhibition Variant**: `compact` (1.3m plinth)
* **Accent Color**: `#14B8A6` (Teal)
* **Category**: Agricultural Technology
* **Year**: 2026
* **Role**: Frontend & Geospatial Developer
* **Tagline**: Farmer advisory ecosystem with outbreak and crop intelligence.
* **Short Description**: BHOOMI is an agricultural intelligence platform and farmer advisory ecosystem developed in association with Smart India Hackathon (SIH 2026). It combines an agronomist portal and official dashboard with hotspot maps, outbreak counts, region/crop visualization, and a confirmation queue.
* **Problem**: Rural farmers lack timely spatial visibility into regional crop disease outbreaks, while agricultural authorities lack verified reporting pipelines.
* **Solution**: Centralized spatial dashboard uniting interactive hotspot maps, crop telemetry, and an agronomist verification queue.
* **Key Capabilities**:
  - Geospatial hotspot map visualization using Leaflet.
  - Regional crop outbreak tracking and telemetry counters.
  - Agronomist case verification and confirmation queue.
  - Official dashboard interface for regional agricultural authorities.
* **Technologies**: `['React', 'Leaflet', 'Geo Visualization', 'Outbreak Tracking', 'FastAPI']`
* **Status**: `prototype`
* **Status Detail**: Prototype developed for Smart India Hackathon (SIH 2026) agricultural advisory challenge.
* **Technical Attributes**:
  - `Initiative`: SIH 2026 Project
  - `Mapping`: React + Leaflet
  - `Workflow`: Agronomist Portal
* **Repository Link**: `https://github.com/santheesh73`

---

### 2.7 MINCHAL
* **ID**: `minchal`
* **Exhibition Room**: Project Studio (`Room 05`, East Outer Wing at `[4.5, 0.0, -13.2]`)
* **Exhibition Variant**: `compact` (1.3m plinth)
* **Accent Color**: `#EF4444` (Coral Red)
* **Category**: Energy Intelligence
* **Year**: 2023
* **Role**: Systems Developer
* **Tagline**: Understand your electricity bill — down to the appliance.
* **Short Description**: MINCHAL helps households understand electricity bill increases by analyzing bill photographs and appliance information to estimate appliance-level electricity usage in rupees without requiring smart meters or IoT hardware. Designed with support for Tamil and English.
* **Problem**: Consumers experience unexpected bill increases without understanding which specific household appliances are responsible, while dedicated smart meters are costly.
* **Solution**: Accessible software workflow extracting bill billing data via OCR and disaggregating consumption per appliance based on household usage profiles.
* **Key Capabilities**:
  - Bill photograph input with optical character recognition.
  - Appliance-level consumption estimation in rupees.
  - Zero hardware dependencies (no smart meters or IoT sensors required).
  - Bilingual user interface supporting Tamil and English.
* **Technologies**: `['OCR', 'Bill Analysis', 'Appliance Insights', 'Python', 'React']`
* **Status**: `concept`
* **Status Detail**: Concept and prototype workflow focusing on non-hardware bill disaggregation in Tamil and English.
* **Technical Attributes**:
  - `Input Mode`: Bill Photo (OCR)
  - `Hardware Req`: Zero (No Smart Meter)
  - `Languages`: Tamil & English
* **Repository Link**: `https://github.com/santheesh73`
