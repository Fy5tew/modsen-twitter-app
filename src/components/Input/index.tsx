import cn from 'classnames';
import { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input({ className, ...props }: InputProps) {
    return <input className={cn(styles.input, className)} {...props} />;
}
