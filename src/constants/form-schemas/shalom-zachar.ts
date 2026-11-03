import { fatherSection, locationDateCombinedSection } from './shared-sections';
import { EventFormSchema } from './types';

export const shalomZacharSchema: EventFormSchema = {
  category: 'shalom-zachar',
  title: 'Shulem Zucher',
  sections: [
    // coverImageSection,
    fatherSection,
    locationDateCombinedSection({ addressPlaceholder: 'Shiva house address'  ,  includeTime: false}),
  ],
};