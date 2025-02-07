'use client';

import { redirect } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Routes } from '@/constants/routes';
import { auth } from '@/firebase';

import Loader from './loading';

export default function Home() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        redirect(Routes.AUTH);
    } else {
        redirect(Routes.APP);
    }
}
