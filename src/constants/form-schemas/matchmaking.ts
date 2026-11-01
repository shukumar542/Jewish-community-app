import { extendedFamilySection, shadchenSection } from './shared-sections';
import { EventFormSchema } from './types';

export const matchmakingSchema: EventFormSchema = {
  category: 'matchmaking',
  title: 'Shidduch',
  sections: [
    // coverImageSection,
    extendedFamilySection('Choson '),
    extendedFamilySection('Kallah'),
    // matchmakerDateSection,
     shadchenSection,
  ],
};