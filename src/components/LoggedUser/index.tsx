'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import { logout } from '@/firebase/utils';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';

import styles from './LoggedUser.module.scss';

export default function LoggedUser() {
    const [user, loading] = useAuth();
    const userInfo = useUser(user?.uid ?? '');

    if (loading) {
        return <Loader />;
    }

    if (!user || !userInfo) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <Icon
                className={styles.photo}
                src={userInfo.photo || '/profile.svg'}
                alt=""
            />
            <div className={styles.info}>
                <span className={styles.name}>{userInfo.name}</span>
                <span className={styles.nickname}>{userInfo.email}</span>
            </div>
            <Button className={styles.button} onClick={logout}>
                Log out
            </Button>
        </div>
    );
}
