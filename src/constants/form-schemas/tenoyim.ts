import { groomSection, parentInLawSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const tenoyimSchema: EventFormSchema = {
    category: 'tenoyim',
    title: 'Tenoyim',
    sections: [
        groomSection,
        parentInLawSection(1),
        parentInLawSection(2),
        venueDateSection({
            venuePlaceholder: 'e.g. Ateres Chaim',
        }),
    ],
};