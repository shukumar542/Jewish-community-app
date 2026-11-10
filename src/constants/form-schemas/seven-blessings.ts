import { parentInLawSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const sevenBlessingsSchema: EventFormSchema = {
  category: 'shevaBroches',
  title: 'Sheva Brachos',
  sections: [
    parentInLawSection(1),
    parentInLawSection(2),
    venueDateSection({
      venuePlaceholder: 'e.g. Kiryas Joel Dining Room',
    }),
  ],
};