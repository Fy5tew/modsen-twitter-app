import Icon from '@/components/Icon';
import Link from '@/components/Link';

import styles from './Navigation.module.scss';

export interface NavItemProps {
    title: string;
    href: string;
    iconSrc: string;
}

export default function NavItem({ title, href, iconSrc }: NavItemProps) {
    return (
        <Link className={styles.item} href={href}>
            <Icon className={styles.icon} src={iconSrc} alt="" />
            {title}
        </Link>
    );
}
