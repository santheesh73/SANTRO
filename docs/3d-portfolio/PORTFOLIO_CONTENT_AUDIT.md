# SANTRO — Portfolio Content Audit

## 1. Audit Methodology & Scope
This audit documents every piece of portfolio content published in SANTRO Milestone M10. Each claim is cross-referenced against authoritative sources from the predecessor repository (`D:\Projects\Portfolio\src\data\`), verified competition submissions, and repository context.

In accordance with M10 accuracy guidelines, any claim that could not be independently substantiated was **intentionally omitted** or marked with its verified status.

---

## 2. Personal Identity & Profile Audit

| Field | Published Claim | Verification Source | Status |
| :--- | :--- | :--- | :--- |
| **Name** | SANTRO / SANTHEESH S | Predecessor profile (`src/data/profile.ts`) | **VERIFIED** |
| **Primary Headline** | AI Software Engineer \| Full-Stack Developer \| Generative AI Enthusiast | Predecessor profile roles | **VERIFIED** |
| **Tagline** | Building calm, precise, production-quality software with modern AI engineering. | Predecessor profile tagline | **VERIFIED** |
| **Education** | B.Tech — Artificial Intelligence and Data Science, Sri Shakthi Institute of Engineering and Technology (2029) | Predecessor profile education | **VERIFIED** |
| **Location** | Bengaluru / Coimbatore, India | Predecessor contact data | **VERIFIED** |
| **Foyer Headline** | SANTHEESH S | Room 03 Spatial Exhibition Design | **VERIFIED** |
| **Foyer Statement** | Designing intelligent software systems, on-device inference architectures, and high-performance full-stack web applications. | Predecessor technical focus | **VERIFIED** |

---

## 3. Projects Audit (7 Approved Projects)

### 3.1 ORION
- **Name**: ORION
- **Claim**: On-device AI assistant created for OSDHack 2026. Runs AI inference locally on the user's device — offline and privacy-first — rather than relying on cloud AI APIs.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 01).
- **Status**: `prototype` (OSDHack 2026).
- **Verified Technologies**: On-Device AI, Local Inference, Offline-First, Privacy-First, TypeScript.
- **Omitted Claims**:
  - *Omitted*: Speculative token latency (`< 42ms`), node count (`10,000+ nodes`), and fake live URL (`https://orion.santheesh.dev`).
  - *Retained*: Verified technical execution model (Local / On-Device), privacy model (Zero Server Egress).

### 3.2 HEARTTUNE
- **Name**: HEARTTUNE
- **Claim**: Premium music streaming PWA with authentication and Spotify-like listening experience powered by JioSaavn API on Supabase, PostgreSQL, and Redis caching.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 02).
- **Status**: `in-progress`.
- **Verified Technologies**: React, Supabase, PostgreSQL, JioSaavn API, Redis, TypeScript.
- **Omitted Claims**:
  - *Omitted*: Speculative classification percentage (`94.8%`) and buffer claims.
  - *Retained*: Verified architectural tiers (PWA, JioSaavn API proxy, Redis caching).

### 3.3 NISF
- **Name**: NISF
- **Claim**: AI creative intelligence platform for generating and optimizing content across text, image, audio, and video, pairing Next.js with a FastAPI inference backend, Celery background jobs, and Docker deployment.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 03).
- **Status**: `in-progress`.
- **Verified Technologies**: Next.js, FastAPI, Groq, PostgreSQL, Redis, Docker, Celery.
- **Omitted Claims**:
  - *Omitted*: Speculative query latency (`16ms`), QPS (`1,200 QPS`), and metric gain (`+34% MRR`).
  - *Retained*: Verified multimodal scopes (Text, Image, Audio, Video) and backend worker pipeline.

### 3.4 AHAL AI
- **Name**: AHAL AI
- **Claim**: Software intelligence platform for repository and document analysis, intended to help developers understand codebases, inspect architecture, and generate technical insights using Gemma.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 04).
- **Status**: `in-progress`.
- **Verified Technologies**: Gemma, Python, LLMs, Repository Analysis, Document Analysis.
- **Omitted Claims**:
  - *Omitted*: Speculative recovery latency (`120ms`) and agent counts (`32 agents`).
  - *Retained*: Core codebase structural parsing and document intelligence using foundation models.

### 3.5 PRYSM
- **Name**: PRYSM
- **Claim**: Visual computing and graphics engineering exploration. Detailed project specifications and capability documentation are currently being finalized.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 05, recorded with empty placeholder fields).
- **Status**: `concept` (Specification in progress).
- **Verified Technologies**: WebGL, Three.js, GLSL, Graphics.
- **Omitted Claims**:
  - *Omitted*: Fabricated "2,000,000 particle compute simulation" or locked 60fps benchmark claims.
  - *Action*: Documented honestly as an exploratory graphics concept with technical specifications in progress.

### 3.6 BHOOMI
- **Name**: BHOOMI
- **Claim**: Agricultural intelligence platform and farmer advisory ecosystem developed in association with Smart India Hackathon (SIH 2026), combining an agronomist portal, official dashboard, Leaflet hotspot maps, and outbreak confirmation queue.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 06).
- **Status**: `prototype` (SIH 2026).
- **Verified Technologies**: React, Leaflet, Geo Visualization, Outbreak Tracking, FastAPI.
- **Omitted Claims**:
  - *Omitted*: Fabricated satellite coverage (`120,000 km²`) and mIoU score (`88.3%`).
  - *Retained*: SIH 2026 challenge context, geospatial mapping, and agronomist verification portal.

### 3.7 MINCHAL
- **Name**: MINCHAL
- **Claim**: Electricity bill analysis experience estimating appliance-level usage in rupees from bill photographs without requiring smart meters or IoT sensors, with support for Tamil and English.
- **Source**: `D:\Projects\Portfolio\src\data\projects.ts` (Project 07).
- **Status**: `concept` / `prototype`.
- **Verified Technologies**: OCR, Bill Analysis, Appliance Insights, Python, React.
- **Omitted Claims**:
  - *Omitted*: Fabricated OCR accuracy (`96.2%`) and processing time (`< 850ms`).
  - *Retained*: Non-hardware bill disaggregation workflow and bilingual accessibility.

---

## 4. Technical Skills Audit

| Domain | Verified Technologies | Excluded Speculations |
| :--- | :--- | :--- |
| **Programming** | Python, JavaScript, TypeScript, SQL | Zero fabricated years of experience or proficiency percentages |
| **Frontend** | React, Next.js | Zero unverified styling library claims |
| **Backend & Data** | FastAPI, PostgreSQL, Supabase, Redis | Zero unverified enterprise database certifications |
| **AI & Intelligent Applications** | Generative AI, Large Language Models (LLMs), RAG, NLP | Zero fabricated model pre-training claims |
| **Development & Deployment** | Docker | Zero unverified multi-cloud Kubernetes cluster claims |

---

## 5. Archive & Proof Audit

| Item ID | Published Record | Verification Note | Omitted Fabrication |
| :--- | :--- | :--- | :--- |
| `proof-sih` | Smart India Hackathon 2026 (BHOOMI) | Hackathon project submission | Excluded unverified "National Winner" / "1st Prize" rankings |
| `proof-osdhack` | OSDHack 2026 (ORION) | Hackathon prototype development | Excluded unverified prize claims |
| `proof-opensource` | Building in Public (GitHub Ecosystem) | Public repositories (`github.com/santheesh73`) | Excluded fabricated contributor titles |
| `proof-milestones` | Systems Architecture Milestones | Verified codebases in ORION, HEARTTUNE, NISF | Excluded speculative client contracts |

---

## 6. Contact Destinations Audit

| Channel | Published Value | URL Scheme | Status |
| :--- | :--- | :--- | :--- |
| **Email** | `santheesh073@gmail.com` | `mailto:santheesh073@gmail.com` | **VERIFIED** |
| **GitHub** | `github.com/santheesh73` | `https://github.com/santheesh73` | **VERIFIED** |
| **LinkedIn** | `linkedin.com/in/santheesh73` | `https://linkedin.com/in/santheesh73` | **VERIFIED** |
| **Headline** | "LET'S BUILD SOMETHING MEANINGFUL." | Architectural closing statement | **VERIFIED** |

Zero dead links, placeholder URLs, or unverified phone numbers exist in the project dataset.
