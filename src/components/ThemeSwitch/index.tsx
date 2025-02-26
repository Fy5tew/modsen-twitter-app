'use client';

import ToggleSwitch from '@/components/ToggleSwitch';
import { useTheme } from '@/providers/theme';

export default function ThemeSwitch() {
    const { theme, setTheme } = useTheme();

    const handleThemeChange = () => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    return (
        <ToggleSwitch
            checked={theme === 'light'}
            onChange={handleThemeChange}
        />
    );
}
