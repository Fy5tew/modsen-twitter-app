import cn from 'classnames';

import Icon from '@/components/Icon';
import Link from '@/components/Link';
import { Routes } from '@/constants/routes';

import styles from './Logo.module.scss';

export interface LogoProps {
    className?: string;
}

export default function Logo({ className }: LogoProps) {
    return (
        <div className={cn(styles.wrapper, className)}>
            <Link href={Routes.HOME}>
                <Icon className={styles.logo} src="/logo.svg" alt="twitter" />
            </Link>
        </div>
    );
}
