'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import PageLoader from '@/components/PageLoader';
import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/auth';

export default function ProfilePage() {
    const router = useRouter();
    const [user, loading] = useAuth();

    useEffect(() => {
        if (user) {
            router.replace(`${Routes.PROFILE}/${user.uid}`);
        }
    }, [router, user]);

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return <PageLoader />;
}
