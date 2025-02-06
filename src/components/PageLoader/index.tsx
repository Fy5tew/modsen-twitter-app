import Loader from '@/components/Loader';

import styles from './PageLoader.module.scss';

export default function PageLoader() {
    return <Loader className={styles.loader} />;
}
