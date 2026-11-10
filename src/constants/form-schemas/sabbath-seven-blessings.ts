import { parentInLawSection } from './shared-sections';
import { EventFormSchema } from './types';

export const sabbathSevenBlessingsSchema: EventFormSchema = {
  category: 'shabbosShevaBroches',
  title: 'Shabbos Sheva Brachos',
  sections: [
    parentInLawSection(1, { simple: true }),
    parentInLawSection(2, { simple: true }),
    {
      title: 'Venue',
      fields: [
        {
          key: 'address',
          label: 'Address',
          type: 'location',
          placeholder: 'Full address',
          required: true,
        },
        {
          key: 'locationDescription',
          label: 'Location Description',
          type: 'text',
          placeholder: 'e.g. Dining Room / Basement',
        },
        {
          key: 'date',
          label: 'Date',
          type: 'date',
          required: true,
        },
      ],
    },
  ],
};
