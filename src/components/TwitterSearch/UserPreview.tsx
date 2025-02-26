import Icon from '@/components/Icon';
import { DEFAULT_USER_PHOTO } from '@/constants/defaults';
import { User } from '@/types/user';

import styles from './TwitterSearch.module.scss';

export interface UserPreviewProps {
    user: User;
}

export default function UserPreview({
    user: { name, email, photo },
}: UserPreviewProps) {
    return (
        <div className={styles.userPreview}>
            <Icon
                className={styles.photo}
                src={photo || DEFAULT_USER_PHOTO}
                alt=""
            />
            <div className={styles.info}>
                <span className={styles.name}>{name}</span>
                <span className={styles.email}>{email}</span>
            </div>
        </div>
    );
}
