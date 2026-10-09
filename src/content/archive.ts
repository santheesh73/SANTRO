import { ArchiveRecord } from './types';

/**
 * SANTRO M10 — Centralized Verified Archive & Proof Records
 *
 * Matching M10 Specification Section 12.
 * Only verified hackathons, project developments, and open-source contributions.
 * Zero fabricated awards, rankings, certificates, or unverified claims.
 */
export const archiveData: ArchiveRecord[] = [
  {
    id: 'proof-sih',
    title: 'Smart India Hackathon 2026',
    organization: 'Ministry of Agriculture & SIH Organization',
    year: '2026',
    category: 'hackathon',
    description:
      'Engineered BHOOMI: Agricultural advisory ecosystem combining Leaflet outbreak hotspot mapping, regional crop filters, and an agronomist verification queue.',
    verificationNote: 'Hackathon project participation and prototype development (SIH 2026).',
    award: 'Hackathon Project Submission',
    metric: 'Spatial Hotspot Portal',
  },
  {
    id: 'proof-osdhack',
    title: 'OSDHack 2026',
    organization: 'Open Source Community',
    year: '2026',
    category: 'hackathon',
    description:
      'Engineered ORION: On-device AI assistant architecture running local model inference directly on user hardware, offline and private by design.',
    verificationNote: 'Hackathon prototype development (OSDHack 2026).',
    award: 'Hackathon Prototype',
    metric: 'Local Offline Inference',
  },
  {
    id: 'proof-opensource',
    title: 'Building in Public',
    organization: 'GitHub Ecosystem',
    year: '2024 — Present',
    category: 'open-source',
    description:
      'Software architectures, intelligent applications, and prototypes maintained in open public repositories with transparent documentation.',
    verificationNote: 'Public repositories active at github.com/santheesh73.',
    award: 'Public Code Repositories',
    metric: 'Open Source Code',
  },
  {
    id: 'proof-milestones',
    title: 'Systems Architecture Milestones',
    organization: 'Independent Project Development',
    year: '2024 — 2026',
    category: 'milestone',
    description:
      'Shipped core architectural foundations across on-device privacy inference, streaming media caching, and containerized multimodal generation.',
    verificationNote: 'Verified architectures in ORION, HEARTTUNE, and NISF.',
    award: 'Verified Architectures',
    metric: 'Production Patterns',
  },
];
