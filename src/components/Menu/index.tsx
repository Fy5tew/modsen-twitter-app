'use client';

import Button, { ButtonVariant } from '@/components/Button';
import Dialog from '@/components/Dialog';
import LoggedUser from '@/components/LoggedUser';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';
import TweetInput from '@/components/TweetInput';
import { useFlag } from '@/hooks/useFlag';

import styles from './Menu.module.scss';

export default function Menu() {
    const { flag: isOpened, enable: open, disable: close } = useFlag();

    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <Navigation />
            <Button variant={ButtonVariant.PRIMARY} onClick={open}>
                Tweet
            </Button>
            <LoggedUser />
            <Dialog open={isOpened} onClose={close}>
                <div className={styles.modal}>
                    <h1 className={styles.header}>Post a tweet</h1>
                    <TweetInput />
                </div>
            </Dialog>
        </div>
    );
}
