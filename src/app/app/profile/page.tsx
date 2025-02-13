'use client';

import { redirect } from 'next/navigation';

import PageLoader from '@/components/PageLoader';
import { Routes } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';

export default function ProfilePage() {
    const [user, loading] = useAuth();

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    redirect(`${Routes.PROFILE}/${user.uid}`);
}
