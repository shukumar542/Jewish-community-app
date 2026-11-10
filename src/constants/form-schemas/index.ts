import { aufrufSchema } from './aufruf';
import { barMitzvahSchema } from './bar-mitzvah';
import { brisSchema } from './bris';
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
    'chasunah': weddingSchema,
    'shevaBroches': sevenBlessingsSchema,
    'tenoyim': tenoyimSchema,
    'bar-mitzvah': barMitzvahSchema,
    'vachNacht': nightBeforeBrisSchema,
    'bris': brisSchema,
    'pidyonHaben': brisRedemptionSchema,
    'shidduch': matchmakingSchema,
    'nichumAveilim': comfortingMournersSchema,
    'shalom-zachar': shalomZacharSchema,
    'kiddush': kiddushSchema,
    'zucherVachNacht': shalomZacharBrisSchema,
    'bavarfen': aufrufSchema,
    'shabbosShevaBroches': sabbathSevenBlessingsSchema,
}; 

export { aufrufSchema } from './aufruf';
export { brisSchema } from './bris';
export { comfortingMournersSchema } from './comforting-mourners';
export { kiddushSchema } from './kiddush';
export { matchmakingSchema } from './matchmaking';
export { sabbathSevenBlessingsSchema } from './sabbath-seven-blessings';
export { shalomZacharSchema } from './shalom-zachar';
export { shalomZacharBrisSchema } from './shalom-zachar-bris';

