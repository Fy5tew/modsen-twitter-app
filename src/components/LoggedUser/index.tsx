'use client';

import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import { auth } from '@/firebase';
import { signOut } from '@/firebase/utils/auth';

import styles from './LoggedUser.module.scss';

export default function LoggedUser() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <Icon
                className={styles.photo}
                src={user.photoURL || '/profile.svg'}
                alt=""
            />
            <div className={styles.info}>
                <span className={styles.name}>{user.displayName}</span>
                <span className={styles.nickname}>{user.email}</span>
            </div>
            <Button className={styles.button} onClick={signOut}>
                Log out
            </Button>
        </div>
    );
}
