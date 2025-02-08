'use client';

import {
    ChangeEventHandler as ReactChangeEventHandler,
    useCallback,
    useEffect,
    useState,
} from 'react';

type ChangeEventHandler<T> = ReactChangeEventHandler<{ value: T }>;

export function useInternalValue<T>(
    defaultValue: T,
    externalValue?: T,
    externalOnChange?: ChangeEventHandler<T>
): [T, ChangeEventHandler<T>] {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const currentValue =
        externalValue !== undefined ? externalValue : internalValue;

    useEffect(() => {
        if (externalValue !== undefined) {
            setInternalValue(externalValue);
        }
    }, [externalValue]);

    const onChange: ChangeEventHandler<T> = useCallback(
        (e) => {
            if (externalValue === undefined) {
                setInternalValue(e.target.value);
            }
            externalOnChange?.(e);
        },
        [externalValue, externalOnChange]
    );

    return [currentValue, onChange];
}
