import { EventFormSchema } from './types';

export const matchmakingSchema: EventFormSchema = {
  category: 'shidduch',
  title: 'Shidduch',
  sections: [
    {
      title: 'Choson',
      fields: [
        {
          key: 'chosonName',
          label: "Choson's Name",
          type: 'text',
          placeholder: 'e.g. Yisroel Green',
          required: true,
        },
        {
          key: 'fatherName',
          label: "Father's Name",
          type: 'text',
          placeholder: 'e.g. Rabbi Moshe Green',
        },
        {
          key: 'chosonBenR',
          label: 'Ben R’',
          type: 'text',
          placeholder: 'e.g. Rabbi Shimon Green',
        },
        {
          key: 'chosonChasanR',
          label: 'Chasan R’',
          type: 'text',
          placeholder: 'e.g. Rabbi Yosef Friedman',
        },
      ],
    },
    {
      title: 'Kallah',
      fields: [
        {
          key: 'kallahName',
          label: "Kallah's Name",
          type: 'text',
          placeholder: 'e.g. Sara Lefkowitz',
          required: true,
        },
        {
          key: 'kallahFatherName',
          label: "Father's Name",
          type: 'text',
          placeholder: 'e.g. Rabbi Boruch Lefkowitz',
        },
        {
          key: 'kallahBenR',
          label: 'Ben R’',
          type: 'text',
          placeholder: 'e.g. Rabbi Alter Lefkowitz',
        },
        {
          key: 'kallahChasanR',
          label: 'Chasan R’',
          type: 'text',
          placeholder: 'e.g. Rabbi Chaim Weiss',
        },
      ],
    },
    {
      title: 'Shadchen',
      fields: [
        {
          key: 'shadchen',
          label: 'Shadchen',
          type: 'text',
          placeholder: 'e.g. Reb Aaron Klein',
        },
      ],
    },
  ],
};
