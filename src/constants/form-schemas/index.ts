import { aufrufSchema } from './aufruf';
import { barMitzvahSchema } from './bar-mitzvah';
import { brisRedemptionSchema } from './bris-redemption';
import { comfortingMournersSchema } from './comforting-mourners';
import { kiddushSchema } from './kiddush';
import { matchmakingSchema } from './matchmaking';
import { nightBeforeBrisSchema } from './night-before-bris';
import { sabbathSevenBlessingsSchema } from './sabbath-seven-blessings';
import { sevenBlessingsSchema } from './seven-blessings';
import { shalomZacharSchema } from './shalom-zachar';
import { shalomZacharBrisSchema } from './shalom-zachar-bris';
import { tenoyimSchema } from './tenoyim';
import { EventFormSchema } from './types';
import { weddingSchema } from './wedding';


export const formSchemas: Record<string, EventFormSchema> = {
    wedding: weddingSchema,
    'seven-blessings': sevenBlessingsSchema,
    "tenoyim": tenoyimSchema,
    "bar-mitzvah": barMitzvahSchema,
    'night-before-bris': nightBeforeBrisSchema,
    'bris': brisRedemptionSchema,
    'bris-redemption': brisRedemptionSchema,
    'matchmaking': matchmakingSchema,
    'comforting-mourners': comfortingMournersSchema,
    'sabbath-seven-blessings': sabbathSevenBlessingsSchema,
    'aufruf': aufrufSchema,
    'shalom-zachar-bris': shalomZacharBrisSchema,
    'kiddush': kiddushSchema,
    'shalom-zachar': shalomZacharSchema,
}; 