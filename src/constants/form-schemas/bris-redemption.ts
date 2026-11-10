import {
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export { brisSchema } from './bris';

export const brisRedemptionSchema: EventFormSchema = {
  category: 'pidyonHaben',
  title: 'Pidyon Haben',
  sections: [
    fatherSection,
    locationDetailsSection({
      title: 'Venue',
      includeDateTime: true,
      timeKey: 'zmanShachris',
      timeLabel: 'Zman Shachris',
      locationDescriptionPlaceholder: 'e.g. Private Residence',
    }),
  ],
};