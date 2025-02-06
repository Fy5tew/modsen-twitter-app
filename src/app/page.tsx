import { redirect } from 'next/navigation';

import { Routes } from '@/constants/routes';

export default function Home() {
    const user = null;

    if (!user) {
        redirect(Routes.AUTH);
    } else {
        redirect(Routes.HOME);
    }
}
