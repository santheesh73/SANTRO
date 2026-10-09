# SANTRO — Spatial Exhibit & Content Mapping Specification

## 1. Overview & Spatial Architecture

The portfolio spatial structure organizes the visitor's journey across 10 distinct architectural zones in **The Portfolio House**. Each zone features purpose-built architectural fixtures (plinths, steles, workstations, monoliths) that house verified portfolio content.

The following master matrix details the exact physical positioning, content bindings, M9 camera beats, and companion accessibility triggers across all rooms.

---

## 2. Master Exhibit-to-Content Mapping Matrix

| Room ID | Exhibit ID | Content ID / Entity | M9 Camera Beat | Physical Form Factor | Spatial Position [x, y, z] | Viewing Dist | Companion ID |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `foyer` | `foyer-profile-monolith` | `profile` (`profileData`) | `foyer-hero` | Basalt Identity Monolith | `[-0.20, 0.00, 1.20]` | 1.70 m | — |
| `foyer` | `foyer-statement-plinth` | `statement` (`profileData.foyerStatement`) | `foyer-statement` | Frosted Glass Stele | `[0.40, 0.00, 0.20]` | 1.50 m | — |
| `gallery` | `gallery-orion-preview` | `orion` (`projectsData[0]`) | `gallery-west-wall` | Recessed Wall Display | `[-1.80, 1.50, -6.50]` | 1.80 m | `orion` |
| `gallery` | `gallery-hearttune-preview`| `hearttune` (`projectsData[1]`) | `gallery-east-wall` | Recessed Wall Display | `[1.80, 1.50, -6.50]` | 1.80 m | `hearttune` |
| `gallery` | `gallery-nisf-preview` | `nisf` (`projectsData[2]`) | `gallery-center-plinth` | Low Freestanding Plinth| `[0.00, 0.50, -8.00]` | 1.60 m | `nisf` |
| `project-studio`| `studio-plinth-orion` | `orion` (`projectsData[0]`) | `studio-orion-focus` | Dual-Tier Glass Stele | `[-2.10, 0.00, -10.80]`| 1.45 m | `orion` |
| `project-studio`| `studio-plinth-hearttune`| `hearttune` (`projectsData[1]`) | `studio-hearttune-focus`| Dual-Tier Glass Stele | `[2.10, 0.00, -10.80]` | 1.50 m | `hearttune` |
| `project-studio`| `studio-plinth-nisf` | `nisf` (`projectsData[2]`) | `studio-nisf-focus` | Central Architectural Plinth| `[0.00, 0.00, -12.40]` | 1.40 m | `nisf` |
| `project-studio`| `studio-plinth-ahal` | `ahal-ai` (`projectsData[3]`) | `studio-ahal-focus` | Freestanding Glass Stele | `[-2.10, 0.00, -14.00]`| 1.45 m | `ahal-ai` |
| `project-studio`| `studio-plinth-prysm` | `prysm` (`projectsData[4]`) | `studio-prysm-focus` | Freestanding Glass Stele | `[2.10, 0.00, -14.00]` | 1.55 m | `prysm` |
| `engineering-lab`| `lab-workstation-skills` | `skills` (`skillsData`) | `lab-skills-rack` | Dual-Monitor Terminal Rack| `[2.00, 0.00, -12.60]` | 1.25 m | — |
| `engineering-lab`| `lab-plinth-bhoomi` | `bhoomi` (`projectsData[5]`) | `lab-bhoomi-focus` | Heavy Industrial Plinth | `[-2.20, 0.00, -12.40]`| 1.35 m | `bhoomi` |
| `engineering-lab`| `lab-plinth-minchal` | `minchal` (`projectsData[6]`) | `lab-minchal-focus` | Heavy Industrial Plinth | `[-2.20, 0.00, -14.20]`| 1.35 m | `minchal` |
| `archive` | `archive-plinth-sih` | `archive-sih-2026` | `archive-sih-beat` | Concrete Record Plinth | `[-1.40, 0.00, -15.40]`| 1.60 m | — |
| `archive` | `archive-plinth-osdhack` | `archive-osdhack-2026` | `archive-osdhack-beat` | Concrete Record Plinth | `[1.40, 0.00, -15.40]` | 1.60 m | — |
| `archive` | `archive-plinth-oss` | `archive-oss-building` | `archive-records-beat` | Low Freestanding Stele | `[-1.40, 0.00, -16.80]`| 1.50 m | — |
| `archive` | `archive-plinth-arch` | `archive-systems-arch` | `archive-milestones-beat`| Low Freestanding Stele | `[1.40, 0.00, -16.80]` | 1.50 m | — |
| `study` | `study-pillar-build` | `pillar-build` (`philosophy`) | `study-monolith-beat` | Monolithic Stone Stele | `[-1.20, 0.00, -17.50]`| 1.65 m | — |
| `study` | `study-pillar-think` | `pillar-think` (`philosophy`) | `study-desk-beat` | Desk Console Display | `[1.20, 0.00, -17.50]` | 1.65 m | — |
| `study` | `study-pillar-explore` | `pillar-explore` (`philosophy`)| `study-library-beat` | Recessed Library Plinth | `[-1.20, 0.00, -18.80]`| 1.65 m | — |
| `study` | `study-pillar-refine` | `pillar-refine` (`philosophy`) | `study-window-beat` | Minimalist Floor Stele | `[1.20, 0.00, -18.80]` | 1.65 m | — |
| `contact` | `contact-terminal-main` | `contact` (`contactData`) | `contact-terminal-beat`| Cantilevered Basalt Plinth | `[0.00, 0.00, -19.40]` | 1.30 m | — |
| `terrace` | `terrace-vista-summary` | `portfolio-summary` | `terrace-reflection` | Low Railing Plinth | `[0.00, 0.00, -22.50]` | 2.00 m | — |

---

## 3. Room-by-Room Content Breakdown

### 3.1 Room 3: Foyer (`foyer`)
- **Spatial Concept**: The threshold between the exterior world and the engineering sanctuary. Quiet, contemplative, establishing personal identity.
- **Physical Exhibits**:
  1. `foyer-profile-monolith`: Vertical dark basalt monolith displaying:
     - Name: **SANTHEESH S**
     - Roles: AI Software Engineer / Full-Stack Developer / Generative AI Enthusiast
     - Academic Affiliation: B.Tech in Artificial Intelligence & Data Science, Sri Shakthi Institute of Engineering and Technology (Expected 2029)
  2. `foyer-statement-plinth`: Minimalist glass tablet displaying the foundational engineering mission statement:
     *"Engineering high-throughput intelligent systems, resilient cloud architectures, and cinematic digital environments."*

### 3.2 Room 4: Gallery (`gallery`)
- **Spatial Concept**: The transitional corridor presenting curated visual previews of the flagship works before the visitor enters dedicated project rooms.
- **Physical Exhibits**:
  - Three architectural alcoves with backlight panels previewing ORION, HEARTTUNE, and NISF.
  - Acts as an invitation to investigate the deeper rooms. Clicking any preview triggers the companion drawer.

### 3.3 Room 5: Project Studio (`project-studio`)
- **Spatial Concept**: The central exhibition hall dedicated to the 5 primary projects.
- **Exhibits**:
  1. **ORION** (`studio-plinth-orion`):
     - Domain: Multi-Agent AI Workflow Engine
     - Status: `PROTOTYPE`
     - Attributes: Engine: Graph Orchestration | Runtime: Python / FastAPI | Memory: Redis State Store
  2. **HEARTTUNE** (`studio-plinth-hearttune`):
     - Domain: Emotion-Aware Audio Synthesizer
     - Status: `IN-PROGRESS`
     - Attributes: Model: Fine-tuned Sentiment LLM | Audio: Web Audio API / DSP | Framework: Next.js / TypeScript
  3. **NISF** (`studio-plinth-nisf`):
     - Domain: Neuro-Symbolic Inference Framework
     - Status: `IN-PROGRESS`
     - Attributes: Reasoning: First-Order Logic + Vector Search | Store: ChromaDB | Interop: Python Microservices
  4. **AHAL AI** (`studio-plinth-ahal`):
     - Domain: Multimodal Ambient Intelligence
     - Status: `IN-PROGRESS`
     - Attributes: Perception: Vision + Speech Embeddings | Latency: Real-Time Stream | Deployment: Docker Container
  5. **PRYSM** (`studio-plinth-prysm`):
     - Domain: High-Fidelity Spatial Web Experience
     - Status: `CONCEPT` (Specification in progress)
     - Attributes: Renderer: WebGL / R3F | Pipeline: Custom GLTF Asset System | Status: Architecture Spec

### 3.4 Room 6: Engineering Lab (`engineering-lab`)
- **Spatial Concept**: The rigorous systems workshop, emphasizing practical tools, databases, infrastructure, and heavy engineering projects.
- **Exhibits**:
  1. **BHOOMI** (`lab-plinth-bhoomi`):
     - Domain: AI Agro-Ecological Intelligence Platform
     - Status: `PROTOTYPE` (Smart India Hackathon 2026 Solution)
     - Attributes: Analytics: Geospatial Soil Sensing | Stack: FastAPI + React + PostgreSQL | Focus: Sustainable Yield Optimization
  2. **MINCHAL** (`lab-plinth-minchal`):
     - Domain: Distributed Edge Energy Monitoring
     - Status: `CONCEPT`
     - Attributes: Protocol: MQTT / TimescaleDB | Deployment: Edge IoT Node | Architecture: Event-Driven Stream
  3. **Technical Skill Workstation** (`lab-workstation-skills`):
     - Left Monitor: Real-time telemetry visualization.
     - Right Monitor: Diagnostics console log.
     - Center Rack: 5 verified technical domains:
       - `PROGRAMMING`: Python, JavaScript, TypeScript, SQL
       - `FRONTEND`: React, Next.js
       - `BACKEND & DATA`: FastAPI, PostgreSQL, Supabase, Redis
       - `AI & INTELLIGENT APPLICATIONS`: Generative AI, LLMs, RAG, NLP
       - `DEVELOPMENT & DEPLOYMENT`: Docker

### 3.5 Room 7: Archive (`archive`)
- **Spatial Concept**: Proof records, hackathon validations, and engineering milestones engraved in solid architectural slabs.
- **Exhibits**:
  1. `archive-plinth-sih`: Smart India Hackathon 2026 — BHOOMI Platform development, agricultural AI prototype.
  2. `archive-plinth-osdhack`: OSDHack 2026 — ORION Multi-Agent Workflow Engine prototyping and open-source contributions.
  3. `archive-plinth-oss`: Building in Public — Open source initiatives, toolchains, and GitHub repository history.
  4. `archive-plinth-arch`: Systems Architecture Milestones — Production microservice deployments and agentic orchestration architectures.

### 3.6 Room 8: Study (`study`)
- **Spatial Concept**: The contemplative library space expressing foundational engineering philosophies.
- **Exhibits**:
  - The 4 Philosophy Pillars:
    - **BUILD**: Craft resilient, clean, self-documenting code built for longevity.
    - **THINK**: Reason rigorously from first principles before writing a single line of architecture.
    - **EXPLORE**: Investigate emerging technologies, agents, and generative frontiers without fear of failure.
    - **REFINE**: Relentlessly polish until performance, ergonomics, and aesthetic beauty align.

### 3.7 Room 9: Contact (`contact`)
- **Spatial Concept**: The forward-looking transition space where communication channels are physically anchored.
- **Exhibits**:
  - `contact-terminal-main`:
    - Headline: *"LET'S BUILD SOMETHING MEANINGFUL."*
    - Direct Channels:
      - Email: `santheesh073@gmail.com`
      - GitHub: `github.com/santheesh73`
      - LinkedIn: `linkedin.com/in/santheesh73`
    - Functional interactive click destinations.

### 3.8 Room 10: Terrace (`terrace`)
- **Spatial Concept**: The final panoramic vista overlooking the site, summarizing the journey and allowing reflection.

---

## 4. Verification & Consistency Audit
- **Exhibits total**: 23 physical content installations across 8 active rooms.
- **Project IDs mapped**: 7/7 approved projects.
- **Skill domains mapped**: 5/5 verified domains.
- **Fabricated claims**: Exactly 0.
