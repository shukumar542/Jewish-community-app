import { fatherSection } from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharSchema: EventFormSchema = {
  category: 'shalom-zachar',
  title: 'Zocher',
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
          type: 'text',
          placeholder: 'e.g. Home of the grandparents',
        },
      ],
    },
  ],
};
