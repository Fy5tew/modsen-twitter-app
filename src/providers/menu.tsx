'use client';

import { createContext, ReactNode, useContext, useEffect } from 'react';

import { useFlag } from '@/hooks/useFlag';

export interface IMenuContext {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

export interface MenuProviderProps {
    children: ReactNode;
}

const DEFAULT_MENU_CONTEXT: IMenuContext = {
    isOpen: false,
    open: () => {},
    close: () => {},
    toggle: () => {},
};

export const MenuContext = createContext<IMenuContext>(DEFAULT_MENU_CONTEXT);

export default function MenuProvider({ children }: MenuProviderProps) {
    const {
        flag: isOpen,
        enable: open,
        disable: close,
        toggle,
    } = useFlag(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-noscroll', `${isOpen}`);
    }, [isOpen]);

    return (
        <MenuContext.Provider
            value={{
                isOpen,
                open,
                close,
                toggle,
            }}
        >
            {children}
        </MenuContext.Provider>
    );
}

export function useMenu() {
    return useContext(MenuContext);
}
