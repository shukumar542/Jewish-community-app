import { fatherSection, locationDateCombinedSection } from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharSchema: EventFormSchema = {
  category: 'shalom-zachar',
  title: 'Shalom Zachar',
  sections: [
    // coverImageSection,
    fatherSection,
    locationDateCombinedSection({ addressPlaceholder: 'Shiva house address'  ,  includeTime: false}),
  ],
};