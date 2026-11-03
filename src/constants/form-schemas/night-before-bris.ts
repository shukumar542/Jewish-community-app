import {
  fatherSection,
  locationDetailsSection
} from './shared-sections';
import { EventFormSchema } from './types';

export const nightBeforeBrisSchema: EventFormSchema = {
  category: 'night-before-bris',
  title: 'Vach Nacht',
  sections: [
    fatherSection,
    locationDetailsSection({ title : "Vach Nacht Venue" , includeDateTime : true }),
    locationDetailsSection({ title : "Bris Venue" , includeTime : true , timeLabel : 'Zman Shachris'}),
    // dateTimeSection({ timeLabel: 'Morning Prayer Time' }),
  ],
};