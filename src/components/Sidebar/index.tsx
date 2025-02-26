import TwitterSearch from '@/components/TwitterSearch';

import styles from './Sidebar.module.scss';

export default function Sidebar() {
    return (
        <div className={styles.wrapper}>
            <TwitterSearch />
        </div>
    );
}
