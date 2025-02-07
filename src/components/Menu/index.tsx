import Button, { ButtonVariant } from '@/components/Button';
import Logo from '@/components/Logo';
import Navigation from '@/components/Navigation';

import LoggedUser from '../LoggedUser';
import styles from './Menu.module.scss';

export default function Menu() {
    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <Navigation />
            <Button variant={ButtonVariant.PRIMARY}>Tweet</Button>
            <LoggedUser />
        </div>
    );
}
