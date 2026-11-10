import { groomSection } from './shared-sections';
import { EventFormSchema } from './types';

export const aufrufSchema: EventFormSchema = {
  category: 'bavarfen',
  title: 'Bavarfen',
  sections: [
    groomSection,
    {
      title: 'Mechitunim',
      fields: [
        {
          key: 'chosonsFather',
          label: "Choson's Father",
          type: 'text',
          placeholder: 'e.g. Rabbi Boruch Lefkowitz',
        },
        {
          key: 'kallahsFather',
          label: "Kallah's Father",
          type: 'text',
          placeholder: 'e.g. Rabbi Alter Schwartz',
        },
      ],
    },
    {
      title: 'Venue',
      fields: [
        {
          key: 'address',
          label: 'Address',
          type: 'location',
          placeholder: 'Synagogue / house address',
          required: true,
        },
        {
          key: 'locationDescription',
          label: 'Location Description',
          type: 'text',
          placeholder: "e.g. Father-in-law's house",
        },
        {
          key: 'date',
          label: 'Date',
          type: 'date',
          required: true,
        },
        {
          key: 'zmanShachris',
          label: 'Zman Shachris',
          type: 'time',
        },
        {
          key: 'ladiesKiddush',
          label: "Ladies' Kiddush (optional)",
          type: 'text',
          placeholder: 'e.g. Schwartz residence, 12:00 PM',
        },
      ],
    },
  ],
};
