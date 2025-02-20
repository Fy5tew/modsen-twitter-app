'use client';

import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    DEFAULT_THEME,
    THEME_ATTRIBUTE,
    THEME_STORAGE_KEY,
} from '@/constants/theme';
import { Theme } from '@/types/theme';

export interface IThemeContext {
    theme: Theme;
    setTheme: Dispatch<SetStateAction<Theme>>;
}

export interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: DEFAULT_THEME,
    setTheme: () => DEFAULT_THEME,
});

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME);

    useEffect(() => {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme;
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        document.documentElement.setAttribute(THEME_ATTRIBUTE, theme);
    }, [theme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}

export default ThemeProvider;
