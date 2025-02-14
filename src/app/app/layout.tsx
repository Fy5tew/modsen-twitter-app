import { ReactNode } from 'react';

import Menu from '@/components/Menu';
import Sidebar from '@/components/Sidebar';

import styles from './Layout.module.scss';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className={styles.wrapper}>
            <Menu />
            <div>{children}</div>
            <Sidebar />
        </div>
    );
}
