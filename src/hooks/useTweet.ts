import { useEffect, useState } from 'react';

import { getTweetById } from '@/firebase/api';
import { Tweet, TweetID } from '@/types/tweet';

export default function useTweet(id: TweetID): Tweet | null {
    const [tweet, setTweet] = useState<Tweet | null>(null);

    useEffect(() => {
        (async () => {
            setTweet(await getTweetById(id));
        })();
    }, [id]);

    return tweet;
}
