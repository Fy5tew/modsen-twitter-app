import '@/styles/reset.scss';
import '@/styles/global.scss';

import cn from 'classnames';
import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';

import { roboto, robotoSerif } from '@/constants/fonts';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

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
                    <ClientLayout>{children}</ClientLayout>
                    <ToastContainer />
                </ReactQueryProvider>
            </body>
        </html>
    );
}
