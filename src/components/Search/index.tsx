'use client';

import cn from 'classnames';
import { InputHTMLAttributes, ReactNode } from 'react';

import Icon from '@/components/Icon';
import Input from '@/components/Input';
import { useIcons } from '@/providers/icon';

import styles from './Search.module.scss';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    result?: ReactNode;
}

export default function Search({ result, className, ...props }: SearchProps) {
    const icons = useIcons();

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputWrapper}>
                <Icon className={styles.icon} src={icons.search} alt="" />
                <Input className={cn(styles.input, className)} {...props} />
            </div>
            <div className={styles.resultWrapper}>{result}</div>
        </div>
    );
}
