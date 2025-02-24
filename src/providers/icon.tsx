'use client';

import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    DARK_ICON_SOURCES,
    DEFAULT_ICON_SOURCES,
    LIGHT_ICON_SOURCES,
} from '@/constants/icon';
import { useTheme } from '@/providers/theme';
import { IconSources } from '@/types/icon';

export interface IconProviderProps {
    children: ReactNode;
}

export const IconContext = createContext<IconSources>(DEFAULT_ICON_SOURCES);

export default function IconProvider({ children }: IconProviderProps) {
    const { theme } = useTheme();
    const [iconSources, setIconSources] = useState(DEFAULT_ICON_SOURCES);

    useEffect(() => {
        switch (theme) {
            case 'light':
                setIconSources(DARK_ICON_SOURCES);
                break;
            case 'dark':
                setIconSources(LIGHT_ICON_SOURCES);
                break;
            default:
                setIconSources(DEFAULT_ICON_SOURCES);
                break;
        }
    }, [theme]);

    return (
        <IconContext.Provider value={iconSources}>
            {children}
        </IconContext.Provider>
    );
}

export function useIcons() {
    return useContext(IconContext);
}
