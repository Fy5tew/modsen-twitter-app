'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button, { ButtonVariant } from '@/components/Button';
import Icon from '@/components/Icon';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { Routes } from '@/constants/routes';
import { loginByGoogle } from '@/firebase/utils';

import styles from './page.module.scss';

export default function AuthPage() {
    const router = useRouter();

    const handleGoogleAuth = () => {
        loginByGoogle();
    };

    const handleEmailSugnUp = () => {
        router.push(Routes.SIGNUP);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.poster}>
                <Image
                    src="/welcome.png"
                    alt="Welcome to twitter"
                    layout=""
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={styles.content}>
                <Logo className={styles.logo} />
                <h1 className={styles.header}>Happening now</h1>
                <h2 className={styles.subHeader}>Join Twitter today</h2>
                <div className={styles.controls}>
                    <Button
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleGoogleAuth}
                    >
                        <Icon src="/google.png" alt="" /> Sign up with Google
                    </Button>
                    <Button
                        variant={ButtonVariant.DEFAULT}
                        onClick={handleEmailSugnUp}
                    >
                        Sign up with email
                    </Button>
                    <p className={styles.agreement}>
                        By singing up you agree to the{' '}
                        <Link href="">Terms of Service</Link> and{' '}
                        <Link href="">Privacy Policy</Link>, including{' '}
                        <Link href="">Cookie Use</Link>.
                    </p>
                    <p>
                        Already have an account?{' '}
                        <Link href={Routes.LOGIN}>Log in</Link>
                    </p>
                </div>
            </div>
            <footer className={styles.footer}>
                <Link className={styles.link} href="">
                    About
                </Link>
                <Link className={styles.link} href="">
                    Help Center
                </Link>
                <Link className={styles.link} href="">
                    Terms of Service
                </Link>
                <Link className={styles.link} href="">
                    Privacy Policy
                </Link>
                <Link className={styles.link} href="">
                    Cookie Policy
                </Link>
                <Link className={styles.link} href="">
                    Ads info
                </Link>
                <Link className={styles.link} href="">
                    Blog
                </Link>
                <Link className={styles.link} href="">
                    Status
                </Link>
                <Link className={styles.link} href="">
                    Carrres
                </Link>
                <Link className={styles.link} href="">
                    Brand Resources
                </Link>
                <Link className={styles.link} href="">
                    Advertsing
                </Link>
                <Link className={styles.link} href="">
                    Marketing
                </Link>
                <Link className={styles.link} href="">
                    Twitter for Business
                </Link>
                <Link className={styles.link} href="">
                    Developers
                </Link>
                <Link className={styles.link} href="">
                    Directory
                </Link>
                <Link className={styles.link} href="">
                    Settings
                </Link>
                <p>© 2021 Twitter, Inc.</p>
            </footer>
        </div>
    );
}
