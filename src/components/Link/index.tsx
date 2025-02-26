import cn from 'classnames';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

import styles from './Link.module.scss';

export type LinkProps = ComponentProps<typeof NextLink>;

export default function Link({ className, ...props }: LinkProps) {
    return <NextLink className={cn(styles.link, className)} {...props} />;
}
