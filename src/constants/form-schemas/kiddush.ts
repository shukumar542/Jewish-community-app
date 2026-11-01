import { fatherSection, locationDateCombinedSection } from './shared-sections';
import { EventFormSchema } from './types';

export const kiddushSchema: EventFormSchema = {
  category: 'kiddish',
  title: 'Kiddish',
  sections: [
    fatherSection,
    locationDateCombinedSection({ timeLabel: 'Zman Shachris' }),
  ],
};