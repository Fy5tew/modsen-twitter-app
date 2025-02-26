import Loader from '@/components/Loader';
import { DEFAULT_USER_NAME, DEFAULT_USER_PHOTO } from '@/constants/defaults';
import { useUser } from '@/hooks/user';
import { Tweet } from '@/types/tweet';

import styles from './TwitterSearch.module.scss';
import UserPreview from './UserPreview';

export interface TweetPreviewProps {
    tweet: Tweet;
}

export default function TweetPreview({
    tweet: { userUid, text },
}: TweetPreviewProps) {
    const { data: user, isLoading, error } = useUser(userUid);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    return (
        <div className={styles.tweetPreview}>
            <UserPreview
                user={
                    user ?? {
                        uid: userUid,
                        name: DEFAULT_USER_NAME,
                        phone: '',
                        email: '',
                        bio: '',
                        birthDate: 0,
                        photo: DEFAULT_USER_PHOTO,
                    }
                }
            />
            <p>{text}</p>
        </div>
    );
}
