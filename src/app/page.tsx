'use client';

import { redirect } from 'next/navigation';

import { Routes } from '@/constants/routes';
import useAuth from '@/hooks/useAuth';

import Loader from './loading';

export default function Home() {
    const [user, loading] = useAuth();

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        redirect(Routes.AUTH);
    } else {
        redirect(Routes.APP);
    }
}
