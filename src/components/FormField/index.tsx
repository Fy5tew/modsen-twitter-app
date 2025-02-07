import { ReactNode } from 'react';

import styles from './FormField.module.scss';

export interface FormFieldProps {
    children?: ReactNode;
    error?: string;
}

export default function FormField({ children, error }: FormFieldProps) {
    return (
        <div className={styles.wrapper}>
            {children}
            <p className={styles.error}>{error || ' '}</p>
        </div>
    );
}
