import { deceasedSection, mournersSection, shivaDetailsSection } from './shared-sections';
import { EventFormSchema } from './types';

export const comfortingMournersSchema: EventFormSchema = {
  category: 'comforting-mourners',
  title: 'Nichum Aveilim',
  sections: [
    deceasedSection, 
    mournersSection, 
    shivaDetailsSection
  ],
};  