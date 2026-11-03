import {
  fatherSection,
  locationDetailsSection
} from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharBrisSchema: EventFormSchema = {
  category: 'shalom-zachar-bris',
  title: 'Zucher Vach Nacht ',
  sections: [
    // coverImageSection,
    fatherSection,
    locationDetailsSection({title : "Zucher Venue"}),
    locationDetailsSection({title : "Bris Venue" , includeDateTime : true}),
    // dateTimeSection({ title: 'Date & Time', timeLabel: 'Morning Prayer Time' }),
  ],
};