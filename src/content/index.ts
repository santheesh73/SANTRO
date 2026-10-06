export * from './types';
export * from './profile';
export * from './projects';
export * from './skills';
export * from './archive';
export * from './philosophy';
export * from './contact';

import { profileData } from './profile';
import { projectsData } from './projects';
import { skillsData } from './skills';
import { archiveData } from './archive';
import { philosophyData } from './philosophy';
import { contactData } from './contact';
import { PortfolioContentDataset } from './types';

/**
 * Master bundled portfolio content dataset
 */
export const portfolioContent: PortfolioContentDataset = {
  profile: profileData,
  projects: projectsData,
  skills: skillsData,
  archive: archiveData,
  philosophy: philosophyData,
  contact: contactData,
};
