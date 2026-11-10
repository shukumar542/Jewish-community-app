import {
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharBrisSchema: EventFormSchema = {
  category: 'zucherVachNacht',
  title: 'Zucher Vach Nacht',
  sections: [
    fatherSection,
    locationDetailsSection({
      title: 'Zucher Venue',
      addressKey: 'address',
      locationDescriptionKey: 'locationDescription',
      latKey: 'lat',
      longKey: 'long',
    }),
    locationDetailsSection({
      title: 'Bris Venue',
      includeDateTime: true,
      addressKey: 'brisAddress',
      locationDescriptionKey: 'brisLocationDescription',
      latKey: 'brisLat',
      longKey: 'brisLong',
      dateKey: 'date',
      timeKey: 'time',
    }),
  ],
};