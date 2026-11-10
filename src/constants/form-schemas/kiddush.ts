import { fatherSection } from './shared-sections';
import { EventFormSchema } from './types';

export const kiddushSchema: EventFormSchema = {
  category: 'kiddush',
  title: 'Kiddish',
  sections: [
    fatherSection,
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
          placeholder: "e.g. Father-in-law's house",
          type: 'text',
        },
        {
          key: 'zmanShachris',
          label: 'Zman Shachris',
          type: 'time',
        },
      ],
    },
  ],
};
