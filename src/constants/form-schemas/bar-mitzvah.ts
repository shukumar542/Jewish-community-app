import { barMitzvahBoySection, fatherSection, venueDateSection } from './shared-sections';
import { EventFormSchema } from './types';

export const barMitzvahSchema: EventFormSchema = {
    category: 'bar-mitzvah',
    title: 'Bar Mitzvah',
    sections: [
        barMitzvahBoySection,
        fatherSection,
        venueDateSection({
            venuePlaceholder: 'e.g. Kiryas Joel Hall',
        })
    ],
};