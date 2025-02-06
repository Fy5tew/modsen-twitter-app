'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

import Loader from './loading';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    const pathname = usePathname();

    return (
        <Suspense key={pathname} fallback={<Loader />}>
            {children}
        </Suspense>
    );
}
