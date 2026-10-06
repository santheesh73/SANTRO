import { ProofItem } from '@/types';
import { archiveData as verifiedArchive } from '@/content/archive';

export const proofData: ProofItem[] = verifiedArchive.map((item) => ({
  id: item.id,
  title: item.title,
  organization: item.organization,
  year: item.year,
  award: item.award,
  description: item.description,
}));
