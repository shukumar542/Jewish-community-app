import { groomSection, parentInLawSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const weddingSchema: EventFormSchema = {
    category: 'wedding',
    title: 'Chasunah',
    sections: [
        // coverImageSection,
        groomSection,
        parentInLawSection(1),
        parentInLawSection(2),
        venueDateSection()
    ],
};