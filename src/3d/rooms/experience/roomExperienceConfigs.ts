import { RoomExperienceConfig } from './types';
import { RoomId } from '@/3d/rooms/types';

/**
 * SANTRO M9 — Master Authored Room Experience Configurations
 *
 * Centralized, type-safe data configurations defining the immersive room experience
 * across all portfolio rooms, with Project Studio established as the primary validation showcase.
 *
 * Key Principles:
 * 1. Slow, deliberate architectural observation — zero uncontrolled spins.
 * 2. Independent camera position and look-target control.
 * 3. Consistent eye-level camera height (~1.60m).
 * 4. Safe clearance from walls (minimum 1.0m) and exhibits (minimum 1.4m).
 * 5. Deterministic timeline sequence: Arrival -> Settle -> Reveal -> Content Beats -> Finale -> Exit.
 * 6. Full bidirectional reversibility.
 */

export const ROOM_EXPERIENCE_CONFIGS: Record<RoomId, RoomExperienceConfig> = {
  // =========================================================================
  // 01. EXTERIOR GROUNDS (Prelude — Minimal)
  // =========================================================================
  exterior: {
    roomId: 'exterior',
    name: 'Exterior Grounds',
    enabled: false, // Exterior is driven by the M6 establishing drone trajectory
    intensity: 'MINIMAL',
    globalProgressRange: [0.0, 0.40],
    defaultFov: 48,
    lightingPreset: 'golden_hour',
    maxRotationYawDeg: 30,
    arrival: {
      position: [4.2, 12.5, 26.0],
      lookAt: [0.0, 3.8, 2.0],
      fov: 48,
      label: 'Aerial Establishing Shot',
    },
    settle: {
      position: [2.1, 5.8, 19.5],
      lookAt: [0.0, 3.0, 1.8],
      fov: 50,
      label: 'Descent to Pool Terrace',
    },
    reveal: {
      position: [-1.2, 1.65, 14.8],
      lookAt: [0.0, 1.6, 0.0],
      fov: 54,
      label: 'Pool Terrace Tracking',
    },
    beats: [],
    exit: {
      position: [-0.3, 1.62, 6.5],
      lookAt: [0.0, 1.6, -2.0],
      fov: 55,
      label: 'Approach to Entrance Portal',
    },
  },

  // =========================================================================
  // 02. ENTRANCE PORTAL (Transition — Minimal)
  // =========================================================================
  entrance: {
    roomId: 'entrance',
    name: 'Entrance Portal',
    enabled: false, // Driven by M6/M7 door transition
    intensity: 'MINIMAL',
    globalProgressRange: [0.40, 0.50],
    defaultFov: 56,
    lightingPreset: 'golden_hour',
    maxRotationYawDeg: 25,
    arrival: {
      position: [-0.3, 1.62, 6.5],
      lookAt: [0.0, 1.6, -2.0],
      fov: 55,
      label: 'Portal Approach',
    },
    settle: {
      position: [0.0, 1.6, 3.5],
      lookAt: [0.0, 1.6, -5.0],
      fov: 56,
      label: 'Pivot Door Swing Trigger',
    },
    reveal: {
      position: [0.0, 1.6, 2.5],
      lookAt: [0.0, 1.6, -6.0],
      fov: 56,
      label: 'Open Threshold View',
    },
    beats: [],
    exit: {
      position: [0.0, 1.6, 2.2],
      lookAt: [0.0, 1.6, -6.0],
      fov: 56,
      label: 'Door Threshold Handoff',
    },
  },

  // =========================================================================
  // 03. FOYER VESTIBULE (Identity & Disciplines — Medium)
  // =========================================================================
  foyer: {
    roomId: 'foyer',
    name: 'Foyer Vestibule',
    enabled: true,
    intensity: 'MEDIUM',
    globalProgressRange: [0.50, 0.62],
    defaultFov: 58,
    lightingPreset: 'interior',
    maxRotationYawDeg: 35,
    arrival: {
      position: [0.0, 1.60, 2.2],
      lookAt: [0.0, 1.60, -6.0],
      fov: 56,
      label: 'Foyer Arrival from Portal',
    },
    settle: {
      position: [0.10, 1.60, -0.6],
      lookAt: [0.40, 1.60, -5.0],
      fov: 57,
      label: 'Vestibule Deceleration',
    },
    reveal: {
      position: [0.20, 1.60, -1.8],
      lookAt: [1.46, 1.75, -3.5],
      fov: 58,
      label: 'Fluted Walnut Wall & Identity Reveal',
    },
    beats: [
      {
        id: 'foyer-beat-01-identity',
        startProgress: 0.30,
        endProgress: 0.60,
        position: [0.20, 1.60, -2.2],
        target: [1.46, 1.80, -3.5],
        fov: 58,
        label: 'SANTHEESH S // Identity & Statement',
        state: 'CONTENT_BEAT',
        contentId: 'profile-identity',
        importance: 'primary',
        holdDuration: 0.4,
        description: 'Framing the wall-mounted profile plaque, engineering disciplines, and warm walnut battens.',
      },
      {
        id: 'foyer-beat-02-staircase',
        startProgress: 0.60,
        endProgress: 0.85,
        position: [0.15, 1.60, -3.0],
        target: [1.10, 1.90, -4.5],
        fov: 58,
        label: 'Floating Travertine Staircase & Plinth',
        state: 'ROOM_INSPECTION',
        importance: 'secondary',
        description: 'Deliberate vertical glance framing the cantilevering staircase pins and identity plinth.',
      },
    ],
    exit: {
      position: [0.10, 1.60, -3.8],
      lookAt: [0.0, 1.60, -10.0],
      fov: 58,
      label: 'Transition to Gallery Circulation Axis',
    },
  },

  // =========================================================================
  // 04. GALLERY CORRIDOR (Curatorial Overview — Low)
  // =========================================================================
  gallery: {
    roomId: 'gallery',
    name: 'Gallery Corridor',
    enabled: true,
    intensity: 'LOW',
    globalProgressRange: [0.62, 0.74],
    defaultFov: 58,
    lightingPreset: 'interior',
    maxRotationYawDeg: 30,
    arrival: {
      position: [0.10, 1.60, -3.8],
      lookAt: [0.0, 1.60, -10.0],
      fov: 58,
      label: 'Corridor Axis Arrival',
    },
    settle: {
      position: [0.05, 1.60, -4.8],
      lookAt: [-0.20, 1.60, -10.2],
      fov: 58,
      label: 'Corridor Tracking Deceleration',
    },
    reveal: {
      position: [0.0, 1.60, -5.6],
      lookAt: [1.52, 1.80, -5.8],
      fov: 58,
      label: 'Curatorial Overview Plaque Framing',
    },
    beats: [
      {
        id: 'gallery-beat-01-curatorial',
        startProgress: 0.35,
        endProgress: 0.70,
        position: [0.0, 1.60, -6.0],
        target: [1.52, 1.85, -5.8],
        fov: 58,
        label: 'SELECTED WORK: 2023 — 2025 // Curatorial Preview',
        state: 'CONTENT_BEAT',
        contentId: 'curatorial-overview',
        importance: 'primary',
        holdDuration: 0.35,
        description: 'Framing the curatorial lineup plaque presenting the seven sequenced portfolio systems.',
      },
    ],
    exit: {
      position: [0.0, 1.60, -10.2],
      lookAt: [0.0, 1.50, -15.0],
      fov: 56,
      label: 'Emergence at Project Studio Double-Height Atrium Portal',
    },
  },

  // =========================================================================
  // 05. PROJECT STUDIO (Primary M9 Demonstration — High Intensity)
  // =========================================================================
  'project-studio': {
    roomId: 'project-studio',
    name: 'Project Studio',
    enabled: true,
    intensity: 'HIGH',
    globalProgressRange: [0.74, 0.84],
    defaultFov: 56,
    lightingPreset: 'interior',
    maxRotationYawDeg: 42,
    arrival: {
      position: [0.0, 1.60, -10.2],
      lookAt: [0.0, 1.50, -15.0],
      fov: 56,
      label: 'Double-Height Atrium Portal Emergence',
    },
    settle: {
      position: [0.0, 1.60, -10.8],
      lookAt: [0.0, 1.55, -15.5],
      fov: 56,
      label: 'Camera Settle & Space Appreciation',
    },
    reveal: {
      position: [-0.35, 1.60, -11.4],
      lookAt: [0.0, 1.50, -14.2],
      fov: 57,
      label: 'Primary Exhibition Space Reveal',
    },
    beats: [
      // 1. ORION (Featured Monolith — West Prominent Bay)
      {
        id: 'ps-beat-01-orion',
        startProgress: 0.22,
        endProgress: 0.35,
        position: [-1.00, 1.60, -11.9],
        target: [-2.60, 1.35, -12.2],
        fov: 56,
        label: 'ORION // On-Device Assistant — Offline-First & Private',
        state: 'CONTENT_BEAT',
        contentId: 'orion',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing the primary monolithic plinth, local model inference architecture, and zero-server-egress privacy design for OSDHack 2026.',
        focalPoints: ['On-Device Plinth', 'Local Inference Architecture'],
      },

      // 2. PRYSM (Supporting Compact — West Outer Wing)
      {
        id: 'ps-beat-02-prysm',
        startProgress: 0.35,
        endProgress: 0.42,
        position: [-1.05, 1.60, -12.8],
        target: [-4.50, 1.30, -12.8],
        fov: 58,
        label: 'PRYSM // Real-Time Visual & Graphics Exploration',
        state: 'CONTENT_BEAT',
        contentId: 'prysm',
        importance: 'supporting',
        holdDuration: 0.25,
        description:
          'Framing visual computing exploration, real-time graphics experimentation, and ongoing project specification.',
        focalPoints: ['Visual Computing Display', 'Shader Exploration'],
      },

      // 3. BHOOMI (Supporting Compact — West Outer Mid Wing)
      {
        id: 'ps-beat-03-bhoomi',
        startProgress: 0.42,
        endProgress: 0.49,
        position: [-1.05, 1.60, -13.5],
        target: [-4.50, 1.30, -14.6],
        fov: 58,
        label: 'BHOOMI // SIH Agricultural Outbreak & Advisory Platform',
        state: 'CONTENT_BEAT',
        contentId: 'bhoomi',
        importance: 'supporting',
        holdDuration: 0.25,
        description:
          'Framing Smart India Hackathon (SIH 2026) agricultural advisory platform, Leaflet outbreak maps, and agronomist verification workflow.',
        focalPoints: ['Hotspot Map Display', 'Agronomist Workflow Tablet'],
      },

      // 4. HEARTTUNE (Selected Plinth — West Mid)
      {
        id: 'ps-beat-04-hearttune',
        startProgress: 0.49,
        endProgress: 0.58,
        position: [-0.80, 1.60, -13.8],
        target: [-2.60, 1.35, -14.2],
        fov: 56,
        label: 'HEARTTUNE // Streaming Music Progressive Web App',
        state: 'CONTENT_BEAT',
        contentId: 'hearttune',
        importance: 'secondary',
        holdDuration: 0.3,
        description:
          'Framing the progressive web application display, JioSaavn API media integration, and Redis caching architecture.',
        focalPoints: ['Streaming PWA Plinth', 'API Caching Display'],
      },

      // 5. Cross-Atrium Panoramic Balance (Orientation glance)
      {
        id: 'ps-beat-05-cross-atrium',
        startProgress: 0.58,
        endProgress: 0.67,
        position: [0.0, 1.60, -13.5],
        target: [0.0, 1.50, -18.0],
        fov: 58,
        label: 'Atrium Central Axis // Longitudinal Spatial Balance',
        state: 'ROOM_INSPECTION',
        importance: 'secondary',
        holdDuration: 0.2,
        description:
          'Calm, controlled yaw glance across the double-height volume, framing the eastern exhibition wing.',
        focalPoints: ['Linear Ceiling Cove', 'East Plinth Array'],
      },

      // 6. NISF (Selected Plinth — East Front)
      {
        id: 'ps-beat-06-nisf',
        startProgress: 0.67,
        endProgress: 0.75,
        position: [0.80, 1.60, -12.8],
        target: [2.60, 1.35, -12.2],
        fov: 56,
        label: 'NISF // Multimodal Creative Content Optimization',
        state: 'CONTENT_BEAT',
        contentId: 'nisf',
        importance: 'secondary',
        holdDuration: 0.3,
        description:
          'Framing multimodal variant generation across text, image, audio, and video with automated critique feedback loops.',
        focalPoints: ['Variant Evaluation Display', 'FastAPI Backend Architecture'],
      },

      // 7. MINCHAL (Supporting Compact — East Outer Wing)
      {
        id: 'ps-beat-07-minchal',
        startProgress: 0.75,
        endProgress: 0.83,
        position: [0.90, 1.60, -13.2],
        target: [4.50, 1.30, -13.2],
        fov: 58,
        label: 'MINCHAL // Bilingual Appliance Energy Bill Analysis',
        state: 'CONTENT_BEAT',
        contentId: 'minchal',
        importance: 'supporting',
        holdDuration: 0.25,
        description:
          'Framing non-hardware electricity bill analysis, appliance disaggregation, and bilingual Tamil and English support.',
        focalPoints: ['Bill Photo OCR Display', 'Appliance Breakdown Tablet'],
      },

      // 8. AHAL AI (Selected Plinth — East Mid)
      {
        id: 'ps-beat-08-ahal-ai',
        startProgress: 0.83,
        endProgress: 0.90,
        position: [0.60, 1.60, -13.8],
        target: [2.60, 1.35, -14.2],
        fov: 56,
        label: 'AHAL AI // Repository & Document Software Intelligence',
        state: 'CONTENT_BEAT',
        contentId: 'ahal-ai',
        importance: 'secondary',
        holdDuration: 0.3,
        description:
          'Framing codebase analysis, technical document ingestion, and architectural insight generation with Gemma foundation models.',
        focalPoints: ['Repository Analysis Display', 'Document Intelligence Tablet'],
      },

      // 9. Project Studio Culmination & Transition
      {
        id: 'ps-beat-09-finale',
        startProgress: 0.90,
        endProgress: 0.94,
        position: [-0.20, 1.60, -12.5],
        target: [-3.20, 1.40, -10.5],
        fov: 57,
        label: 'Project Studio Culmination // Glass Lab Transition',
        state: 'ROOM_INSPECTION',
        importance: 'primary',
        holdDuration: 0.2,
        description:
          'Camera re-centers smoothly along the architectural walkway, preparing transition toward the Engineering Lab glass workstation.',
        focalPoints: ['Central Plinth', 'Glass Enclosure Horizon'],
      },
    ],
    exit: {
      position: [-0.50, 1.60, -11.5],
      lookAt: [-3.20, 1.40, -10.5],
      fov: 58,
      label: 'Handoff to Engineering Lab Glass Workspace Portal',
    },
  },

  // =========================================================================
  // 06. ENGINEERING LAB (Technical Stack & Systems — Medium-High)
  // =========================================================================
  'engineering-lab': {
    roomId: 'engineering-lab',
    name: 'Engineering Lab',
    enabled: true,
    intensity: 'MEDIUM-HIGH',
    globalProgressRange: [0.84, 0.90],
    defaultFov: 58,
    lightingPreset: 'interior',
    maxRotationYawDeg: 38,
    arrival: {
      position: [-0.50, 1.60, -11.5],
      lookAt: [-3.20, 1.40, -10.5],
      fov: 58,
      label: 'Glass Enclosure Approach from Atrium',
    },
    settle: {
      position: [-0.50, 1.60, -11.0],
      lookAt: [-3.40, 1.40, -10.0],
      fov: 58,
      label: 'Glass Workspace Reveal Settle',
    },
    reveal: {
      position: [-0.50, 1.60, -10.2],
      lookAt: [-3.80, 1.30, -9.5],
      fov: 59,
      label: 'Frameless Glass Interior Reveal',
    },
    beats: [
      {
        id: 'lab-beat-01-workstation',
        startProgress: 0.25,
        endProgress: 0.58,
        position: [-0.50, 1.60, -9.5],
        target: [-4.40, 1.15, -9.5],
        fov: 58,
        label: 'ENGINEERING WORKSTATION // Telemetry & Diagnostics',
        state: 'CONTENT_BEAT',
        contentId: 'workstation-displays',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing the dual matte IPS displays presenting local WebGPU inference topology and zero-error verification checks.',
      },
      {
        id: 'lab-beat-02-technical-rack',
        startProgress: 0.58,
        endProgress: 0.88,
        position: [-0.40, 1.60, -11.0],
        target: [-2.40, 1.55, -11.5],
        fov: 58,
        label: 'TECHNICAL CAPABILITY // 6 Verified Skill Domains',
        state: 'CONTENT_BEAT',
        contentId: 'skills-stele',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing the anodized aluminum stele displaying Languages, Frontend, Backend, Data, AI/ML, and Infra.',
      },
    ],
    exit: {
      position: [0.0, 1.60, -13.5],
      lookAt: [3.60, 1.40, -16.2],
      fov: 56,
      label: 'Transition toward Archive East Wing',
    },
  },

  // =========================================================================
  // 07. ARCHIVE (Proof, Hackathons & Milestones — Medium)
  // =========================================================================
  archive: {
    roomId: 'archive',
    name: 'Archive',
    enabled: true,
    intensity: 'MEDIUM',
    globalProgressRange: [0.90, 0.94],
    defaultFov: 56,
    lightingPreset: 'interior',
    maxRotationYawDeg: 35,
    arrival: {
      position: [0.0, 1.60, -13.5],
      lookAt: [3.60, 1.40, -16.2],
      fov: 56,
      label: 'East Wing Approach from Lab Portal',
    },
    settle: {
      position: [0.40, 1.60, -14.5],
      lookAt: [3.60, 1.40, -16.2],
      fov: 55,
      label: 'Archive Wing Settle',
    },
    reveal: {
      position: [0.60, 1.60, -15.4],
      lookAt: [3.60, 1.35, -16.2],
      fov: 55,
      label: 'Travertine Proof Tablets Reveal',
    },
    beats: [
      {
        id: 'archive-beat-01-sih',
        startProgress: 0.25,
        endProgress: 0.58,
        position: [0.80, 1.60, -16.0],
        target: [3.60, 1.35, -16.2],
        fov: 54,
        label: 'SIH NATIONAL WINNER // BHOOMI Command Center',
        state: 'CONTENT_BEAT',
        contentId: 'proof-sih',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing the Smart India Hackathon national championship victory tablet and 120,000 km² coverage proof.',
      },
      {
        id: 'archive-beat-02-hpc-oss',
        startProgress: 0.58,
        endProgress: 0.88,
        position: [0.80, 1.60, -17.4],
        target: [4.00, 1.35, -18.8],
        fov: 54,
        label: 'OPEN SOURCE & HPC // Vector SIMD & 60fps Kernels',
        state: 'CONTENT_BEAT',
        contentId: 'proof-opensource',
        importance: 'secondary',
        holdDuration: 0.3,
        description:
          'Framing open source vector quantization PRs and 4K 60fps GPU compute kernels.',
      },
    ],
    exit: {
      position: [0.0, 1.60, -16.5],
      lookAt: [-3.60, 1.40, -17.0],
      fov: 55,
      label: 'Transition toward Study West Wing',
    },
  },

  // =========================================================================
  // 08. STUDY (Engineering Philosophy — Low)
  // =========================================================================
  study: {
    roomId: 'study',
    name: 'Study',
    enabled: true,
    intensity: 'LOW',
    globalProgressRange: [0.94, 0.97],
    defaultFov: 55,
    lightingPreset: 'interior',
    maxRotationYawDeg: 30,
    arrival: {
      position: [0.0, 1.60, -16.5],
      lookAt: [-3.60, 1.40, -17.0],
      fov: 55,
      label: 'West Contemplative Wing Approach',
    },
    settle: {
      position: [-0.40, 1.60, -16.2],
      lookAt: [-3.60, 1.40, -16.5],
      fov: 55,
      label: 'Study Wing Quiet Settle',
    },
    reveal: {
      position: [-0.60, 1.60, -16.2],
      lookAt: [-3.60, 1.35, -16.5],
      fov: 54,
      label: 'Four Principle Steles Reveal',
    },
    beats: [
      {
        id: 'study-beat-01-build-think',
        startProgress: 0.25,
        endProgress: 0.58,
        position: [-0.80, 1.60, -16.5],
        target: [-3.60, 1.35, -16.5],
        fov: 54,
        label: 'PHILOSOPHY // BUILD & THINK Principles',
        state: 'CONTENT_BEAT',
        contentId: 'principle-build',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing "Turn ideas into working products" and "Understand the problem before choosing technology".',
      },
      {
        id: 'study-beat-02-explore-refine',
        startProgress: 0.58,
        endProgress: 0.88,
        position: [-0.80, 1.60, -17.5],
        target: [-3.80, 1.35, -18.8],
        fov: 54,
        label: 'PHILOSOPHY // EXPLORE & REFINE Principles',
        state: 'CONTENT_BEAT',
        contentId: 'principle-explore',
        importance: 'primary',
        holdDuration: 0.35,
        description:
          'Framing "Experiment with new tools, AI systems" and "Iterate until experience and implementation are strong".',
      },
    ],
    exit: {
      position: [0.0, 1.60, -17.0],
      lookAt: [0.0, 1.15, -18.5],
      fov: 54,
      label: 'Transition to Contact Pavilion Central Plinth',
    },
  },

  // =========================================================================
  // 09. CONTACT PAVILION (Dialogue Initiation — Low)
  // =========================================================================
  contact: {
    roomId: 'contact',
    name: 'Contact Pavilion',
    enabled: true,
    intensity: 'LOW',
    globalProgressRange: [0.97, 0.995],
    defaultFov: 54,
    lightingPreset: 'interior',
    maxRotationYawDeg: 25,
    arrival: {
      position: [0.0, 1.60, -17.0],
      lookAt: [0.0, 1.15, -18.5],
      fov: 54,
      label: 'Arrival at Central Contact Monolith',
    },
    settle: {
      position: [0.0, 1.60, -17.3],
      lookAt: [0.0, 1.15, -18.5],
      fov: 54,
      label: 'Settle before Central Plinth',
    },
    reveal: {
      position: [0.0, 1.60, -17.5],
      lookAt: [0.0, 1.15, -18.5],
      fov: 54,
      label: 'Travertine Monolith & Glass Curtain Wall Reveal',
    },
    beats: [
      {
        id: 'contact-beat-01-coordinates',
        startProgress: 0.25,
        endProgress: 0.65,
        position: [0.0, 1.60, -17.7],
        target: [0.0, 1.15, -18.5],
        fov: 54,
        label: "LET'S BUILD SOMETHING MEANINGFUL // Contact Coordinates",
        state: 'CONTENT_BEAT',
        contentId: 'contact-coordinates',
        importance: 'primary',
        holdDuration: 0.4,
        description:
          'Framing email, GitHub, LinkedIn, and collaboration channels resting on the monolithic plinth.',
      },
      {
        id: 'contact-beat-02-vista',
        startProgress: 0.65,
        endProgress: 0.88,
        position: [0.0, 1.60, -18.0],
        target: [0.0, 1.70, -28.0],
        fov: 53,
        label: 'ARCHITECTURAL VISTA // Twilight Mountain Horizon',
        state: 'ROOM_INSPECTION',
        importance: 'primary',
        holdDuration: 0.3,
        description:
          'Gentle camera rise framing the 6.8m double-height rear glass curtain wall and natural horizon.',
      },
    ],
    exit: {
      position: [0.0, 1.60, -18.2],
      lookAt: [0.0, 1.75, -32.0],
      fov: 52,
      label: 'Transition to Rear Contemplative Terrace',
    },
  },

  // =========================================================================
  // 10. REAR TERRACE & VISTA (Contemplation — Minimal)
  // =========================================================================
  terrace: {
    roomId: 'terrace',
    name: 'Rear Terrace & Vista',
    enabled: true,
    intensity: 'MINIMAL',
    globalProgressRange: [0.995, 1.00],
    defaultFov: 52,
    lightingPreset: 'dusk',
    maxRotationYawDeg: 20,
    arrival: {
      position: [0.0, 1.60, -18.2],
      lookAt: [0.0, 1.75, -32.0],
      fov: 52,
      label: 'Terrace Portal Passage',
    },
    settle: {
      position: [0.0, 1.60, -18.5],
      lookAt: [0.0, 1.80, -35.0],
      fov: 52,
      label: 'Contemplative Settle',
    },
    reveal: {
      position: [0.0, 1.60, -18.5],
      lookAt: [0.0, 1.80, -35.0],
      fov: 52,
      label: 'Pure Horizon Vista',
    },
    beats: [
      {
        id: 'terrace-beat-01-horizon',
        startProgress: 0.20,
        endProgress: 0.90,
        position: [0.0, 1.60, -18.5],
        target: [0.0, 1.80, -35.0],
        fov: 52,
        label: 'HORIZON // Contemplative Architectural Pause',
        state: 'ROOM_INSPECTION',
        importance: 'primary',
        holdDuration: 0.5,
        description: 'Final contemplative breathing room overlooking infinity pool and dusk mountain vista.',
      },
    ],
    exit: {
      position: [0.0, 1.60, -18.5],
      lookAt: [0.0, 1.80, -35.0],
      fov: 52,
      label: 'Terminal Journey Horizon',
    },
  },
};

/**
 * Returns room experience config by RoomId
 */
export function getRoomExperienceConfig(roomId: RoomId): RoomExperienceConfig | null {
  const config = ROOM_EXPERIENCE_CONFIGS[roomId];
  if (!config || !config.enabled) return null;
  return config;
}

/**
 * Resolves which room experience config is active for a given global journey progress [0.0, 1.0]
 */
export function resolveRoomExperienceForProgress(globalProgress: number): RoomExperienceConfig | null {
  const p = Math.max(0, Math.min(1, globalProgress));
  for (const config of Object.values(ROOM_EXPERIENCE_CONFIGS)) {
    if (!config.enabled) continue;
    const [startP, endP] = config.globalProgressRange;
    if (p >= startP && p <= endP) {
      return config;
    }
  }
  return null;
}
