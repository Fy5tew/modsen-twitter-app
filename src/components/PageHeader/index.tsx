'use client';

import { ReactNode } from 'react';

import MenuButton from '@/components/MenuButton';
import ThemeSwitch from '@/components/ThemeSwitch';
import { MOBILE_WIDTH } from '@/constants/constrains';
import useWindowSize from '@/hooks/useWindowSize';

import styles from './PageHeader.module.scss';

export interface PageHeaderProps {
    children: ReactNode;
}

export default function PageHeader({ children }: PageHeaderProps) {
    const { width } = useWindowSize();

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>{children}</div>
            {width > MOBILE_WIDTH ? <ThemeSwitch /> : <MenuButton />}
        </div>
    );
}
