import cn from 'classnames';
import Image from 'next/image';

import styles from './Icon.module.scss';

export interface IconProps {
    className?: string;
    src: string;
    alt: string;
}

export default function Icon({ className, src, alt }: IconProps) {
    return (
        <div className={cn(styles.wrapper, className)}>
            <Image src={src} alt={alt} fill />
        </div>
    );
}
