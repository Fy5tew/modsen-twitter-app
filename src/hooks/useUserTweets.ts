import { useEffect, useState } from 'react';

import { getUserTweets } from '@/firebase/api';
import { Tweet } from '@/types/tweet';
import { UserUID } from '@/types/user';

export default function useUserTweets(uid: UserUID): Tweet[] {
    const [tweets, setTweets] = useState<Tweet[]>([]);

    useEffect(() => {
        (async () => {
            setTweets(await getUserTweets(uid));
        })();
    }, [uid]);

    return tweets;
}
