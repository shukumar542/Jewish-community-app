import BarMitzvah from '@/assets/images/BarMitzvah.png';
import BavarfenShtreimel from '@/assets/images/BavarfenShtreimel.png';
import Bris from '@/assets/images/Bris.png';
import Chasunah from '@/assets/images/Chasunnah.png';
import Kiddish from '@/assets/images/Kiddish.png';
import NichumAveilim from '@/assets/images/NichumAveilim.png';
import PidyonHaben from '@/assets/images/PidyonHaben.png';
import ShabbosShevaBerachos from '@/assets/images/ShabbosShevaBerachos.png';
import ShevaBerachos from '@/assets/images/ShevaBerachos.png';
import Shidduch from '@/assets/images/Shidduch.png';
import Tenoyim from '@/assets/images/Tenoyim.png';
import Vochnocht from '@/assets/images/Vochnocht.png';
import Zucher from '@/assets/images/Zucher.png';
import ZucherVochnocht from '@/assets/images/ZucherVochnocht.png';
import type { ImageSourcePropType } from 'react-native';

export interface EventCategory {
  key: string;
  label: string;
  icon: ImageSourcePropType;
}

export const eventCategories: EventCategory[] = [
  { key: 'wedding', label: 'Chasunah', icon: Chasunah },
  { key: 'seven-blessings', label: 'Sheva Broches', icon: ShevaBerachos },
  { key: 'tenoyim', label: 'Tenoyim', icon: Tenoyim },
  { key: 'bar-mitzvah', label: 'Bar Mitzvah', icon: BarMitzvah },
  { key: 'night-before-bris', label: 'Vach Nacht', icon: Vochnocht },
  { key: 'bris', label: 'Bris', icon: Bris },
  { key: 'bris-redemption', label: 'Bris / Pidyon Haben', icon: PidyonHaben },
  { key: 'matchmaking', label: 'Shidduch', icon: Shidduch },
  { key: 'comforting-mourners', label: 'Nichum Aveilim', icon: NichumAveilim },
  { key: 'shalom-zachar', label: 'Shulem Zucher', icon: Zucher },
  { key: 'kiddush', label: ' Kiddish', icon: Kiddish },
  { key: 'shalom-zachar-bris',label: 'Zucher Vach Nacht ',icon: ZucherVochnocht},
  { key: 'aufruf', label: 'Bavarfen', icon: BavarfenShtreimel },
  { key: 'sabbath-seven-blessings', label: 'Shabbos Sheva Broches', icon: ShabbosShevaBerachos,},
];