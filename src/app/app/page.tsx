import { redirect } from 'next/navigation';

import { Routes } from '@/constants/routes';

export default function App() {
    redirect(Routes.PROFILE);
}
