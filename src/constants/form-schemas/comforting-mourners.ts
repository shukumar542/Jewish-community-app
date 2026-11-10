import { EventFormSchema } from './types';

export const comfortingMournersSchema: EventFormSchema = {
  category: 'nichumAveilim',
  title: 'Nichum Aveilim',
  sections: [
    {
      title: 'Nifter',
      fields: [
        {
          key: 'nifterName',
          label: 'Name',
          type: 'text',
          placeholder: 'e.g. Reb Yisroel ben Moshe',
          required: true,
        },
        {
          key: 'wifeOf',
          label: 'Wife of',
          type: 'text',
          placeholder: 'e.g. Mrs. Greenfeld',
        },
        {
          key: 'sonOf',
          label: 'Son of',
          type: 'text',
          placeholder: 'e.g. Rabbi Moshe Greenfeld',
        },
        {
          key: 'daughterOf',
          label: 'Daughter of',
          type: 'text',
          placeholder: 'e.g. Rabbi Chaim Friedman',
        },
      ],
    },
    {
      title: 'Aveilim',
      fields: [
        {
          key: 'aveilim',
          label: 'Aveilim',
          type: 'textarea',
          placeholder: 'e.g. Sons: Moshe, Avrum. Daughters: Gitty, Chayala',
        },
      ],
    },
    {
      title: 'Location',
      fields: [
        {
          key: 'address',
          label: 'Address',
          type: 'location',
          placeholder: 'Shiva house address',
          required: true,
        },
        {
          key: 'sittingUntil',
          label: 'Sitting Until',
          type: 'date',
          placeholder: 'Select date',
        },
      ],
    },
  ],
};
  