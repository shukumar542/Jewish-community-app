import { locationDateSection, parentInLawSection } from './shared-sections';
import { EventFormSchema } from './types';

export const sabbathSevenBlessingsSchema: EventFormSchema = {
  category: 'sabbath-seven-blessings',
  title: 'Shabbos Sheva Broches',
  sections: [
    // coverImageSection,
    parentInLawSection(1, { simple: true }),
    parentInLawSection(2, { simple: true }),
    locationDateSection,
  ],
};