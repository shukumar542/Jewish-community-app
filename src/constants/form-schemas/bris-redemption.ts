import {
  fatherSection,
  locationDetailsSection
} from './shared-sections';
import { EventFormSchema } from './types';

export const brisRedemptionSchema: EventFormSchema = {
  category: 'bris-redemption',
  title: 'Bris',
  sections: [
    fatherSection,
    locationDetailsSection({ includeDateTime: true, title: 'Venue' , timeLabel : "Zman Shachris"}),
    // dateTimeSection({ title: 'Venue & Date' }),
  ],
};