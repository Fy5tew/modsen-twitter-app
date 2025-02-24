import Image from 'next/image';

import Loader from '@/components/Loader';
import { useUser } from '@/hooks/user';
import { Tweet } from '@/types/tweet';

import UserPreview from './UserPreview';

export interface TweetPreviewProps {
    tweet: Tweet;
}

export default function TweetPreview({
    tweet: { userUid, text, image },
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
        <div>
            <UserPreview
                user={
                    user ?? {
                        uid: userUid,
                        name: 'Unknown User',
                        phone: '',
                        email: '',
                        bio: '',
                        birthDate: 0,
                        photo: '/account.svg',
                    }
                }
            />
            <p>{text}</p>
            {image && (
                <div style={{ position: 'relative' }}>
                    <Image src={image} alt="" fill />
                </div>
            )}
        </div>
    );
}
