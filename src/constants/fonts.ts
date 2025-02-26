import { Roboto, Roboto_Serif } from 'next/font/google';

export const roboto = Roboto({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '700', '900'],
    variable: '--font-roboto',
});

export const robotoSerif = Roboto_Serif({
    subsets: ['cyrillic', 'latin'],
    variable: '--font-roboto-serif',
});
