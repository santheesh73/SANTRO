import { ProfileData } from '@/types';
import { profileData as verifiedProfile } from '@/content/profile';
import { contactData } from '@/content/contact';

export const profileData: ProfileData = {
  name: verifiedProfile.name,
  role: verifiedProfile.title,
  tagline: verifiedProfile.tagline,
  bio: verifiedProfile.bio,
  location: verifiedProfile.location,
  email: contactData.email,
  github: contactData.github,
  linkedin: contactData.linkedin,
};
