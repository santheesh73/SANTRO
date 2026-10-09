/**
 * SANTRO M10 — Centralized Portfolio Content Model Types
 *
 * Strict type contracts separating raw verified portfolio content from 3D scene presentation.
 * Adheres to M10 Content Accuracy & Readability Guidelines.
 */

export type ProjectVariant = 'featured' | 'standard' | 'compact';

export type ProjectStatus = 'implemented' | 'in-progress' | 'planned' | 'prototype' | 'concept';

export interface ProjectAttribute {
  label: string;
  value: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  subtitle: string;
  tagline?: string;
  shortDescription: string;
  problem: string;
  solution: string;
  keyCapabilities: string[];
  category: string;
  year: string;
  role: string;
  technologies: string[];
  status: ProjectStatus;
  statusDetail: string;
  variant: ProjectVariant;
  accentColor: string;
  room?: string;
  attributes: ProjectAttribute[];
  metrics: ProjectAttribute[]; // Backward compatibility with display surfaces
  highlights?: string[];
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
  category: 'hackathon' | 'milestone' | 'open-source' | 'systems';
  description: string;
  verificationNote?: string;
  award?: string;
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

export interface EducationData {
  degree: string;
  institution: string;
  expectedGraduation: string;
}

export interface ProfileData {
  name: string;
  title: string;
  role: string;
  disciplines: string[];
  tagline: string;
  bio: string;
  education?: EducationData;
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
