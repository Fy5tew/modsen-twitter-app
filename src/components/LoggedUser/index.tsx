'use client';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import { DEFAULT_USER_PHOTO } from '@/constants/defaults';
import { useLogout } from '@/hooks/auth';
import { useCurrentUser } from '@/hooks/user';

import styles from './LoggedUser.module.scss';

export default function LoggedUser() {
    const { data: user, isLoading, error } = useCurrentUser();
    const { mutate: logout } = useLogout();

    const handleLogout = () => {
        logout();
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <Icon
                className={styles.photo}
                src={user.photo || DEFAULT_USER_PHOTO}
                alt=""
            />
            <div className={styles.info}>
                <span className={styles.name}>{user.name}</span>
                <span className={styles.nickname}>{user.email}</span>
            </div>
            <Button className={styles.button} onClick={handleLogout}>
                Log out
            </Button>
        </div>
    );
}
