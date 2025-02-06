import { useCallback, useState } from 'react';

export function useFlag(initialValue: boolean = false) {
    const [flag, setFlag] = useState(initialValue);

    const set = useCallback((value: boolean) => setFlag(value), []);
    const enable = useCallback(() => setFlag(true), []);
    const disable = useCallback(() => setFlag(false), []);
    const toggle = useCallback(() => setFlag((prev) => !prev), []);

    return {
        flag,
        set,
        enable,
        disable,
        toggle,
    };
}
