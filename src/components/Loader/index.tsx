import cn from 'classnames';

import styles from './Loader.module.scss';

export interface LoaderProps {
    className?: string;
}

export default function Loader({ className }: LoaderProps) {
    return (
        <div className={cn(styles.wrapper, className)}>
            <span className={styles.loader}></span>
        </div>
    );
}
