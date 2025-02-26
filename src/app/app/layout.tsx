'use client';

import cn from 'classnames';
import { ReactNode } from 'react';

import Menu from '@/components/Menu';
import MobileMenu from '@/components/MobileMenu';
import Sidebar from '@/components/Sidebar';
import { MOBILE_WIDTH } from '@/constants/constrains';
import useWindowSize from '@/hooks/useWindowSize';

import styles from './Layout.module.scss';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    const { width } = useWindowSize();

    if (width <= MOBILE_WIDTH) {
        return (
            <div className={styles.wrapper}>
                <div className={styles.content}>{children}</div>
                <MobileMenu />
            </div>
        );
    }

    return (
        <div className={cn(styles.wrapper, styles.desktopWrapper)}>
            <Menu />
            <div className={styles.content}>{children}</div>
            <Sidebar />
        </div>
    );
}
