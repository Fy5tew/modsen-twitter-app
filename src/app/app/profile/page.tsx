'use client';

import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '@/components/Button';
import Icon from '@/components/Icon';
import PageLoader from '@/components/PageLoader';
import { auth } from '@/firebase';

import styles from './page.module.scss';

export default function Profile() {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>{user.displayName}</h1>
                <p className={styles.text}>0 Tweets</p>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Icon
                        className={styles.photo}
                        src={user.photoURL || '/profile.svg'}
                        alt=""
                    />
                    <h1 className={styles.title}>{user.displayName}</h1>
                    <p className={styles.text}>{user.email}</p>
                    <p className={styles.bio}>Some bio</p>
                    <div className={styles.followInfo}>
                        <p className={styles.text}>0 Following</p>
                        <p className={styles.text}>0 Followers</p>
                    </div>
                </div>
                <div>
                    <Button>Edit profile</Button>
                </div>
            </div>
        </div>
    );
}
