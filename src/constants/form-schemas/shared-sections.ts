import { FormSection } from './types';

export const coverImageSection: FormSection = {
  title: '',
  fields: [{ key: 'coverImage', label: 'Choose a Cover Image', type: 'image' }],
};

export const groomSection: FormSection = {
  title: 'Choson',
  fields: [
    {
      key: 'chosonName',
      label: "Choson Name",
      type: 'text',
      placeholder: 'e.g. David Cohen',
      required: true,
    },
  ],
};

export const parentInLawSection = (
  number: 1 | 2,
  options?: { simple?: boolean }
): FormSection => ({
  title: `Mechiten #${number}`,
  fields: options?.simple
    ? [
        {
          key: `mechiten${number}Name`,
          label: 'Name',
          type: 'text',
          placeholder: number === 1 ? 'e.g. Rabbi Boruch Lefkowitz' : 'e.g. Rabbi Alter Schwartz',
          required: true,
        },
      ]
    : [
        {
          key: `mechiten${number}Name`,
          label: 'Name',
          type: 'text',
          placeholder: number === 1 ? 'e.g. Rabbi Boruch Lefkowitz' : 'e.g. Rabbi Alter Schwartz',
          required: true,
        },
        {
          key: `mechiten${number}BenR`,
          label: 'Ben R’',
          type: 'text',
          placeholder: number === 1 ? 'e.g. Rabbi Yisroel Lefkowitz' : 'e.g. Rabbi Shimon Schwartz',
        },
        {
          key: `mechiten${number}ChasanR`,
          label: 'Chasan R’ ',
          type: 'text',
          placeholder: number === 1 ? 'e.g. Rabbi Chaim Weiss' : 'e.g. Rabbi Moshe Green',
        },
      ],
});


export const venueDateSection = (options?: {
  venueLabel?: string;
  venuePlaceholder?: string;
  timeLabel?: string;
}): FormSection => ({
  title: 'Venue',
  fields: [
    {
      key: 'hallName',
      label: options?.venueLabel ?? 'Hall Name',
      type: 'text',
      placeholder: options?.venuePlaceholder ?? 'e.g. The Grand Ballroom',
      required: true,
    },
    {
      key: 'address',
      label: 'Address',
      type: 'location',
      placeholder: 'Full address',
      required: true,
    },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'time', label: options?.timeLabel ?? 'Time', type: 'time' },
  ],
});

export const barMitzvahBoySection: FormSection = {
  title: 'Bucher',
  fields: [
    {
      key: 'bucherName',
      label: "Name",
      type: 'text',
      placeholder: 'e.g. Yitzchok Goldstein',
      required: true,
    },
  ],
};

export const fatherSection: FormSection = {
  title: 'Father',
  fields: [
    {
      key: 'fatherName',
      label: "Name",
      type: 'text',
      placeholder: 'e.g. Rabbi Menachem Goldstein',
      required: true,
    },
    {
      key: 'fatherBenR',
      label: 'Ben R’',
      type: 'text',
      placeholder: 'e.g. Rabbi Yisroel Goldstein',
    },
    {
      key: 'fatherChasanR',
      label: 'Chasan R’',
      type: 'text',
      placeholder: 'e.g. Rabbi Chaim Weiss',
    },
  ],
};

export const locationDetailsSection = (options?: {
  includeDateTime?: boolean;
  includeTime?: boolean;
  timeLabel?: string;
  timeKey?: string;
  title?: string;
  addressKey?: string;
  addressLabel?: string;
  locationDescriptionKey?: string;
  dateKey?: string;
  locationDescriptionPlaceholder?: string;
  latKey?: string;
  longKey?: string;
}): FormSection => ({
  title: options?.title ?? 'Venue',
  fields: [
    {
      key: options?.addressKey ?? 'address',
      label: options?.addressLabel ?? 'Address',
      type: 'location',
      placeholder: 'Full address',
      required: true,
      latKey: options?.latKey,
      longKey: options?.longKey,
    },
    {
      key: options?.locationDescriptionKey ?? 'locationDescription',
      label: 'Location Description',
      type: 'text',
      placeholder: options?.locationDescriptionPlaceholder ?? 'e.g. Father-in-law’s house',
    },
    ...(options?.includeDateTime
      ? [
          { key: options?.dateKey ?? 'date', label: 'Date', type: 'date' as const, required: true },
          { key: options?.timeKey ?? 'time', label: options?.timeLabel ?? 'Time', type: 'time' as const },
        ]
      : []),
    ...(options?.includeTime
      ? [
          { key: options?.timeKey ?? 'time', label: options?.timeLabel ?? 'Time', type: 'time' as const },
        ]
      : []),
  ],
});
export const dateTimeSection = (options?: {
  timeLabel?: string;
  title?: string;
}): FormSection => ({
  title: options?.title ?? 'Date & Time',
  fields: [
    { key: 'eventDate', label: 'Date', type: 'date', required: true },
    { key: 'eventTime', label: options?.timeLabel ?? 'Time', type: 'time' },
  ],
});

export const extendedFamilySection = (role: 'Choson ' | 'Kallah'): FormSection => ({
  title: role,
  fields: [
    {
      key: `${role.toLowerCase()}Name`,
      label: `${role}'s Name`,
      type: 'text',
      placeholder: role === 'Choson ' ? 'e.g. Shimon Rosenberg' : 'e.g. Rivka Weissberg',
      required: true,
    },
    {
      key: `${role.toLowerCase()}FatherName`,
      label: "Father's Name",
      type: 'text',
      placeholder: role === 'Choson ' ? 'e.g. Rabbi Aharon Rosenberg' : 'e.g. Rabbi Mordechai Weissberg',
    },
    {
      key: `${role.toLowerCase()}SonOfRabbi`,
      label: 'Ben R’',
      type: 'text',
      placeholder: role === 'Choson ' ? 'e.g. Rabbi Yitzchak Levy' : 'e.g. Rabbi Binyamin Weissberg',
    },
    {
      key: `${role.toLowerCase()}SonInLawOfRabbi`,
      label: 'Chasan R’ ',
      type: 'text',
      placeholder: role === 'Choson ' ? 'e.g. Rabbi Avraham Klein' : 'e.g. Rabbi Yakov Engel',
    },
  ],
});

export const matchmakerDateSection: FormSection = {
  title: 'Matchmaker & Date',
  fields: [
    {
      key: 'matchmakerName',
      label: 'Matchmaker Name',
      type: 'text',
      placeholder: 'e.g. Rabbi Chaim Smelber',
    },
    { key: 'eventDate', label: 'Date', type: 'date', required: true },
    { key: 'eventTime', label: 'Time', type: 'time' },
  ],
};

export const shadchenSection: FormSection = {
  title: 'Shadchen',
  fields: [
    {
      key: 'shadchenName',
      label: 'Shadchen',
      type: 'text',
      placeholder: 'e.g. Rabbi Chaim Smelber',
    },
  ],
};
export const deceasedSection: FormSection = {
  title: 'Nifter',
  fields: [
    {
      key: 'deceasedName',
      label: 'Name',
      type: 'text',
      placeholder: 'e.g. Reb Yisroel ben Moshe',
      required: true,
    },
    {
      key: 'deceasedRelation',
      label: 'Wife of',
      type: 'text',
      placeholder: 'e.g. Son of Rabbi Moshe Greenfeld',
    },
    {
      key: 'deceasedSon',
      label: 'Son of',
      type: 'text',
      placeholder: 'e.g. Son of Rabbi Moshe Greenfeld',
    },
    {
      key: 'Daoughter',
      label: 'Daughter of',
      type: 'text',
      placeholder: 'e.g. Son of Rabbi Moshe Greenfeld',
    },
  ],
};

export const mournersSection: FormSection = {
  title: 'Aveilim',
  fields: [
    {
      key: 'mournersNames',
      label: 'Aveilim',
      type: 'textarea',
      placeholder: "Aveilim ...",
    },
  ],
};

export const shivaDetailsSection: FormSection = {
  title: 'Location',
  fields: [
    {
      key: 'shivaAddress',
      label: 'Address',
      type: 'location',
      placeholder: 'Shiva house address',
      required: true,
    },
    {
      key: 'shivaSittingUntil',
      label: 'Sitting Until',
      type: 'date',
      placeholder: 'e.g. Thursday evening',
    },
    // { key: 'shivaDate', label: 'Date', type: 'date', required: true },
  ],
};
export const locationDateSection: FormSection = {
  title: 'Venue',
  fields: [
    {
      key: 'venueAddress',
      label: 'Address',
      type: 'location',
      placeholder: 'Full address',
      required: true,
    },
    {
      key: 'whoseHouse',
      label: 'Loaction Description',
      type: 'text',
      placeholder: 'e.g. Father-in-law’s house',
    },
    { key: 'eventDate', label: 'Date', type: 'date', required: true },
  ],
};

export const familiesSection: FormSection = {
  title: 'Mechitunim',
  fields: [
    {
      key: 'parentInLaw1Name',
      label: 'Choson’s Father',
      type: 'text',
      placeholder: 'e.g. Rabbi Boruch Lefkowitz',
      required: true,
    },
    {
      key: 'parentInLaw2Name',
      label: 'Kallah’s Father',
      type: 'text',
      placeholder: 'e.g. Rabbi Alter Schwartz',
      required: true,
    },
  ],
};

export const locationScheduleSection: FormSection = {
  title: 'Venue',
  fields: [
    {
      key: 'venueAddress',
      label: 'Address',
      type: 'location',
      placeholder: 'Synagogue address',
      required: true,
    },
    {
      key: 'whoseHouse',
      label: 'Location Description',
      type: 'text',
      placeholder: "e.g. Father-in-law’s house",
    },
    { key: 'date', label: 'Date', type: 'date', required: true },
    { key: 'eventDate', label: 'Zman Shachris', type: 'time', required: true },
    {
      key: 'ladiesKiddush',
      label: "Ladies' Kiddush (optional)",
      type: 'text',
      placeholder: 'e.g. the Schwartz residence, 12:00 PM',
    },
  ],
};
export const locationDateCombinedSection = (options?: {
  includeTime?: boolean;
  timeLabel?: string;
  addressPlaceholder?: string;
}): FormSection => ({
  title: 'Venue',
  fields: [
    {
      key: 'venueAddress',
      label: 'Address',
      type: 'location',
      placeholder: options?.addressPlaceholder ?? 'Full address',
      required: true,
    },
    {
      key: 'location',
      label: 'Location Description',
      type: 'text',
      placeholder: 'Father-in-law’s house',
    },
    ...(options?.includeTime ?? true
      ? [
          {
            key: 'eventTime',
            label: options?.timeLabel ?? 'Time',
            type: 'time' as const,
          },
        ]
      : []),
  ],
});