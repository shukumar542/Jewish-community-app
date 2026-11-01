import {
  dateTimeSection,
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export const nightBeforeBrisSchema: EventFormSchema = {
  category: 'night-before-bris',
  title: 'Vach Nacht',
  sections: [
    fatherSection,
    locationDetailsSection({ includeBrisAddress: true }),
    dateTimeSection({ timeLabel: 'Morning Prayer Time' }),
  ],
};