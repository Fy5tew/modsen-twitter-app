'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

import useAuthRedirect from '@/hooks/useAuthRedirect';

import Loader from './loading';

interface ClientLayoutProps {
    children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
    useAuthRedirect();
    const pathname = usePathname();

    return (
        <Suspense key={pathname} fallback={<Loader />}>
            {children}
        </Suspense>
    );
}
