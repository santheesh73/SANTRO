export type QualityTier = 'high' | 'medium' | 'low';

export type SpatialZone =
  | 'EXTERIOR'
  | 'ENTRANCE'
  | 'FOYER'
  | 'GALLERY'
  | 'STUDIO'
  | 'LAB'
  | 'ARCHIVE'
  | 'STUDY'
  | 'CONTACT'
  | 'TERRACE';

export interface QualityConfig {
  dpr: [number, number];
  shadows: boolean;
  shadowMapSize: number;
  antialias: boolean;
  postprocessing: boolean;
  maxLights: number;
}

export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    icon?: string;
    focus?: string;
  }[];
}

export interface ProofItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description: string;
  award?: string;
}

export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
}
