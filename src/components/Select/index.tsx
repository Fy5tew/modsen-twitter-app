'use client';

import cn from 'classnames';
import { SelectHTMLAttributes } from 'react';

import Icon from '@/components/Icon';
import { useFlag } from '@/hooks/useFlag';
import { useInternalValue } from '@/hooks/useInternalValue';

import styles from './Select.module.scss';

export interface Option {
    title: string;
    value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options?: Option[];
    placeholder?: string;
}

export default function Select({
    className,
    options = [],
    placeholder = '',
    value: externalValue,
    onChange: externalOnChange,
    onMouseDown,
    onBlur,
    ...props
}: SelectProps) {
    const [value, onChange] = useInternalValue(
        placeholder,
        externalValue,
        externalOnChange
    );
    const { flag: isOpened, disable, toggle } = useFlag(false);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        disable();
        onChange?.(e);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLSelectElement>) => {
        toggle();
        onMouseDown?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
        disable();
        onBlur?.(e);
    };

    return (
        <div className={styles.wrapper} data-opened={isOpened}>
            <select
                className={cn(styles.select, className, {
                    [styles.placeholder]: value === placeholder,
                })}
                defaultValue={placeholder}
                onChange={handleChange}
                onMouseDown={handleMouseDown}
                onBlur={handleBlur}
                {...props}
            >
                <option
                    className={cn(styles.option, styles.placeholder)}
                    value={placeholder}
                    disabled
                >
                    {placeholder}
                </option>
                {options.map(({ value, title }) => (
                    <option
                        className={cn(styles.option)}
                        key={value}
                        value={value}
                    >
                        {title}
                    </option>
                ))}
            </select>
            <Icon className={styles.icon} src="/chevron.svg" alt="" />
        </div>
    );
}
