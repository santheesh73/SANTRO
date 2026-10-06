/**
 * SANTRO M8 — Portfolio Spatial Content Model Types
 *
 * Strict type contracts separating raw portfolio content from 3D scene presentation.
 */

export type ProjectVariant = 'featured' | 'standard' | 'compact';

export interface PortfolioProject {
  id: string;
  name: string;
  subtitle: string;
  shortDescription: string;
  category: string;
  year: string;
  role: string;
  technologies: string[];
  highlights: string[];
  metrics: { label: string; value: string }[];
  variant: ProjectVariant;
  accentColor: string;
  githubUrl?: string;
  liveUrl?: string;
  demoUrl?: string;
}

export interface SkillDomain {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export interface ArchiveRecord {
  id: string;
  title: string;
  organization: string;
  year: string;
  award?: string;
  description: string;
  metric?: string;
}

export interface PhilosophyPillar {
  id: string;
  keyword: 'BUILD' | 'THINK' | 'EXPLORE' | 'REFINE';
  title: string;
  principle: string;
  rationale: string;
}

export interface ContactChannel {
  id: string;
  label: string;
  value: string;
  url: string;
  isPrimary?: boolean;
}

export interface ContactData {
  headline: string;
  closingStatement: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  channels: ContactChannel[];
}

export interface ProfileData {
  name: string;
  title: string;
  role: string;
  disciplines: string[];
  tagline: string;
  bio: string;
  location: string;
  foyerHeadline: string;
  foyerSubheadline: string;
  foyerStatement: string;
}

export interface PortfolioContentDataset {
  profile: ProfileData;
  projects: PortfolioProject[];
  skills: SkillDomain[];
  archive: ArchiveRecord[];
  philosophy: PhilosophyPillar[];
  contact: ContactData;
}
