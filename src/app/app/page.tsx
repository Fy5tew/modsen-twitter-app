'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import PageLoader from '@/components/PageLoader';
import { Routes } from '@/constants/routes';

export default function App() {
    const router = useRouter();

    useEffect(() => {
        router.replace(Routes.PROFILE);
    }, [router]);

    return <PageLoader />;
}
