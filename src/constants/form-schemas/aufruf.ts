import { familiesSection, groomSection, locationScheduleSection } from './shared-sections';
import { EventFormSchema } from './types';

export const aufrufSchema: EventFormSchema = {
  category: 'aufruf',
  title: 'Bavarfen',
  sections: [
    // coverImageSection, 
    groomSection, 
    familiesSection, 
    locationScheduleSection],
};