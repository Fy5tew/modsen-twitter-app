import { createPortal } from 'react-dom';

import LoggedUser from '@/components/LoggedUser';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import ThemeSwitch from '@/components/ThemeSwitch';
import TwitterSearch from '@/components/TwitterSearch';
import { useMenu } from '@/providers/menu';

import MenuButton from '../MenuButton';
import styles from './MobileMenu.module.scss';

export default function MobileMenu() {
    const { isOpen, close } = useMenu();

    return createPortal(
        <>
            <div
                className={styles.overlay}
                data-opened={isOpen}
                onClick={close}
            ></div>
            <div className={styles.wrapper} data-opened={isOpen}>
                <div className={styles.header}>
                    <Logo className={styles.logo} />
                    <ThemeSwitch />
                    <MenuButton />
                </div>
                <TwitterSearch />
                <Navigation />
                <LoggedUser />
            </div>
        </>,
        document.body
    );
}
