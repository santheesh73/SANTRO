import { ContactData } from './types';

/**
 * SANTRO M8 — Centralized Verified Contact & Collaboration Information
 *
 * Matching M8 Specification Section 23.
 */
export const contactData: ContactData = {
  headline: "LET'S BUILD SOMETHING MEANINGFUL.",
  closingStatement:
    'The architectural journey culminates here, but the conversation begins. Available for engineering leadership, AI systems architecture, and spatial computing collaborations.',
  location: 'Bengaluru, India',
  email: 'santheesh073@gmail.com',
  github: 'https://github.com/santheesh73',
  linkedin: 'https://linkedin.com/in/santheesh73',
  channels: [
    {
      id: 'email',
      label: 'EMAIL',
      value: 'santheesh073@gmail.com',
      url: 'mailto:santheesh073@gmail.com',
      isPrimary: true,
    },
    {
      id: 'github',
      label: 'GITHUB',
      value: 'github.com/santheesh73',
      url: 'https://github.com/santheesh73',
    },
    {
      id: 'linkedin',
      label: 'LINKEDIN',
      value: 'linkedin.com/in/santheesh73',
      url: 'https://linkedin.com/in/santheesh73',
    },
  ],
};
