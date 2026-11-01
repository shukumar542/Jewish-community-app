import { parentInLawSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const sevenBlessingsSchema: EventFormSchema = {
  category: 'seven-blessings',
  title: 'Sheva Broches',
  sections: [
    parentInLawSection(1), 
    parentInLawSection(2), 
    venueDateSection()
  ],
};