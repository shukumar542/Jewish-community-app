import {
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export const brisSchema: EventFormSchema = {
  category: 'bris',
  title: 'Bris',
  sections: [
    fatherSection,
    locationDetailsSection({
      title: 'Venue',
      includeDateTime: true,
      timeKey: 'zmanShachris',
      timeLabel: 'Zman Shachris',
      locationDescriptionPlaceholder: 'e.g. Beis Medrash basement',
    }),
  ],
};
