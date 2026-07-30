import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'], 
  variable: '--font-roboto',
});

export const thirstyScript = localFont({
  src: '../public/fonts/ThirstyScriptExtraBold.otf',
  weight: '800',
  variable: '--font-display',
});