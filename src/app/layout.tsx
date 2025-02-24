import '@/styles/reset.scss';
import '@/styles/global.scss';

import cn from 'classnames';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

import ToastContainer from '@/components/ToastContainer';
import { roboto, robotoSerif } from '@/constants/fonts';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import ThemeProvider from '@/providers/theme';

import ClientLayout from './ClientLayout';

export const metadata: Metadata = {
    title: 'Modsen Twitter App',
    description: 'Twitter clone',
};

interface RootLayoutProps {
    children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" className={cn(roboto.variable, robotoSerif.variable)}>
            <body>
                <ReactQueryProvider>
                    <ThemeProvider>
                        <ClientLayout>{children}</ClientLayout>
                        <ToastContainer />
                    </ThemeProvider>
                </ReactQueryProvider>
            </body>
        </html>
    );
}
