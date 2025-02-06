import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

export enum ButtonVariant {
    DEFAULT = 'default',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
}

export default function Button({
    variant = ButtonVariant.DEFAULT,
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(styles.button, className)}
            {...props}
            data-variant={variant}
        />
    );
}
