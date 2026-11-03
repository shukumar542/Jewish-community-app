import {
  dateTimeSection,
  fatherSection,
  locationDetailsSection
} from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharBrisSchema: EventFormSchema = {
  category: 'shalom-zachar-bris',
  title: 'Shulem Zucher',
  sections: [
    // coverImageSection,
    fatherSection,
    locationDetailsSection(),
    dateTimeSection({ title: 'Date & Time', timeLabel: 'Morning Prayer Time' }),
  ],
};