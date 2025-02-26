'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { Routes } from '@/constants/routes';

import { useAuth } from './auth';

export default function useAuthRedirect() {
    const [user, isLoading] = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (isLoading) return;

        const isIndexPage = pathname === Routes.HOME;
        const isAuthPage = pathname.startsWith(Routes.AUTH);
        const isAppPage = pathname.startsWith(Routes.APP);

        if (!user && (isIndexPage || isAppPage)) {
            router.replace(Routes.AUTH);
        } else if (user && (isIndexPage || isAuthPage)) {
            router.replace(Routes.APP);
        }
    }, [isLoading, pathname, router, user]);
}
