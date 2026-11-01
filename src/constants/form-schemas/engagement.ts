import { groomSection, parentInLawSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const engagementSchema: EventFormSchema = {
    category: 'engagement',
    title: 'Tenoyim',
    sections: [
        groomSection,
        parentInLawSection(1),
        parentInLawSection(2),
        venueDateSection(),
    ],
};