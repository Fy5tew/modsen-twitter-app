'use client';

import { ToastContainer as DefaultToastContainer } from 'react-toastify';

import { useTheme } from '@/providers/theme';

export default function ToastContainer() {
    const { theme } = useTheme();

    return <DefaultToastContainer theme={theme} />;
}
