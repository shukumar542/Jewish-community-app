import {
  fatherSection,
  locationDetailsSection,
} from './shared-sections';
import { EventFormSchema } from './types';

export const nightBeforeBrisSchema: EventFormSchema = {
  category: 'vachNacht',
  title: 'Vach Nacht',
  sections: [
    fatherSection,
    locationDetailsSection({
      title: 'Vach Nacht Venue',
      includeDateTime: true,
      addressKey: 'address',
      locationDescriptionKey: 'locationDescription',
      dateKey: 'date',
      timeKey: 'time',
      latKey: 'lat',
      longKey: 'long',
    }),
    locationDetailsSection({
      title: 'Bris Venue',
      includeTime: true,
      timeLabel: 'Zman Shachris',
      timeKey: 'zmanShachris',
      addressKey: 'brisAddress',
      locationDescriptionKey: 'brisLocationDescription',
      latKey: 'brisLat',
      longKey: 'brisLong',
      locationDescriptionPlaceholder: 'e.g. Main Shul',
    }),
  ],
};