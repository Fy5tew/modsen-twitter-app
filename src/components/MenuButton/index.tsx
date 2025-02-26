'use client';

import { useMenu } from '@/providers/menu';

import styles from './MenuButton.module.scss';

export default function MenuButton() {
    const { isOpen, toggle } = useMenu();

    return (
        <button className={styles.button} data-opened={isOpen} onClick={toggle}>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
        </button>
    );
}
