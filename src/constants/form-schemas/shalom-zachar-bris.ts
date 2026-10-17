import {
  coverImageSection,
  dateTimeSection,
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharBrisSchema: EventFormSchema = {
  category: 'shalom-zachar-bris',
  title: 'Shalom Zachar',
  sections: [
    coverImageSection,
    fatherSection,
    locationDetailsSection({ includeBrisAddress: true }),
    dateTimeSection({ title: 'Date & Time', timeLabel: 'Morning Prayer Time' }),
  ],
};