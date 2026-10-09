import { ProjectData } from '@/types';
import { projectsData as verifiedProjects } from '@/content/projects';

/**
 * Adapter re-exporting verified projects adhering to ProjectData type contract
 */
export const projectsData: ProjectData[] = verifiedProjects.map((p) => ({
  id: p.id,
  title: p.name,
  subtitle: p.subtitle,
  category: p.category,
  year: p.year,
  role: p.role,
  technologies: p.technologies,
  summary: p.shortDescription,
  highlights: p.highlights ?? p.keyCapabilities ?? [],
  metrics: p.metrics,
  accentColor: p.accentColor,
  githubUrl: p.githubUrl,
  liveUrl: p.liveUrl,
}));
