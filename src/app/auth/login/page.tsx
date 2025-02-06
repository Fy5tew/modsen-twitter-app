import Button, { ButtonVariant } from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { Routes } from '@/constants/routes';

import styles from './page.module.scss';

export default function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <h1 className={styles.header}>Log in to Twitter</h1>
            <Input placeholder="Phone number, email address" />
            <Input placeholder="Password" />
            <Button variant={ButtonVariant.PRIMARY}>Log In</Button>
            <Link className={styles.link} href={Routes.SIGNUP}>
                Sign up to Twitter
            </Link>
        </div>
    );
}
