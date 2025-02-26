import Link from '@/components/Link';
import LoginForm from '@/components/LoginForm';
import Logo from '@/components/Logo';
import { Routes } from '@/constants/routes';

import styles from './page.module.scss';

export default function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <h1 className={styles.header}>Log in to Twitter</h1>
            <LoginForm />
            <Link className={styles.link} href={Routes.SIGNUP}>
                Sign up to Twitter
            </Link>
        </div>
    );
}
