import { ChangeEvent, ReactNode, useId } from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

import { MAX_IMAGE_SIZE } from '@/constants/constrains';
import { showError } from '@/utils/notifications';

import styles from './FileInput.module.scss';

interface FileInputProps<T extends FieldValues> {
    name: Path<T>;
    setValue: UseFormSetValue<T>;
    children: ReactNode;
}

export default function FileInput<T extends FieldValues>({
    name,
    setValue,
    children,
}: FileInputProps<T>) {
    const inputId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_IMAGE_SIZE) {
            showError('Image size is too large!');
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setValue(name, reader.result as PathValue<T, Path<T>>, {
                shouldValidate: true,
            });
        };
    };

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.input}
                type="file"
                accept="image/*"
                id={inputId}
                onChange={handleChange}
            />
            <label className={styles.label} htmlFor={inputId}>
                {children}
            </label>
        </div>
    );
}
