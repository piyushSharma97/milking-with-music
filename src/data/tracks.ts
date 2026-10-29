import AfterTheRain from './After-the-Rain-Inspiring-Atmospheric-Music.mp3';
import MoonWaltz from './Moon-Waltz.mp3';
import ScottBucley from './scott-buckley-moonlight.mp3';
import AdriftAmongInfinty from './sb_adriftamonginfinitestars.mp3';
import CowLogo from '../images/cowLogo.jpg';
import type { Track } from '../types';

/** The music tracks offered by the player. */
export const tracks: Track[] = [
  { title: 'After the Rain Inspring Atmospheric', src: AfterTheRain, thumbnail: CowLogo },
  { title: 'Moon Waltz', src: MoonWaltz, thumbnail: CowLogo },
  { title: 'Scott Bucley', src: ScottBucley, thumbnail: CowLogo },
  { title: 'A drift Among Infinty', src: AdriftAmongInfinty, thumbnail: CowLogo },
];
