import { DialogHTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

import styles from './Dialog.module.scss';

export interface DialogProps extends DialogHTMLAttributes<HTMLDialogElement> {
    onClose: () => void;
}

export default function Dialog({ open, onClose, ...props }: DialogProps) {
    return createPortal(
        <>
            <div
                className={styles.overlay}
                data-opened={open}
                onClick={onClose}
            ></div>
            <dialog className={styles.dialog} open={open} {...props} />
        </>,
        document.body
    );
}
