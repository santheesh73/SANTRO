import { SkillCategory } from '@/types';
import { skillsData as verifiedDomains } from '@/content/skills';

/**
 * Adapter mapping domain-based skills into legacy SkillCategory format
 */
export const skillsData: SkillCategory[] = verifiedDomains.map((domain) => ({
  id: domain.id,
  name: domain.name,
  description: domain.description,
  skills: domain.skills.map((s) => ({
    name: s,
    level: 'Expert' as const,
  })),
}));
