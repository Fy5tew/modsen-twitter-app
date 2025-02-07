import { NAV_ITEMS } from '@/constants/navItems';

import styles from './Navigation.module.scss';
import NavItem from './NavItem';

export default function Navigation() {
    return (
        <nav className={styles.wrapper}>
            {NAV_ITEMS.map(({ title, href, icon }) => (
                <NavItem key={title} title={title} href={href} iconSrc={icon} />
            ))}
        </nav>
    );
}
