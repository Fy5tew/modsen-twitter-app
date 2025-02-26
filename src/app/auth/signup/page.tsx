import Logo from '@/components/Logo';
import SignupForm from '@/components/SignupForm';

import styles from './page.module.scss';

export default function SignupPage() {
    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <h1 className={styles.header}>Create an account</h1>
            <SignupForm />
        </div>
    );
}
