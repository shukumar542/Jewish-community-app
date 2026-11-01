import { familiesSection, groomSection, locationScheduleSection } from './shared-sections';
import { EventFormSchema } from './types';

export const aufrufSchema: EventFormSchema = {
  category: 'aufruf',
  title: 'Aufruf',
  sections: [
    // coverImageSection, 
    groomSection, 
    familiesSection, 
    locationScheduleSection],
};