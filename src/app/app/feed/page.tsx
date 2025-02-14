'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import Button from '@/components/Button';
import PageLoader from '@/components/PageLoader';
import Tweet from '@/components/Tweet';
import { getFeed } from '@/firebase/utils';
import useAuth from '@/hooks/useAuth';
import { Tweet as ITweet } from '@/types/tweet';

const FEED_TWEETS_LIMIT = 5;

export default function Feed() {
    const [user, loading] = useAuth();
    const [tweets, setTweets] = useState<ITweet[]>([]);
    const [isLoadedAll, setLoadedAll] = useState(false);
    const offsetRef = useRef(0);

    const loadTweets = useCallback(async () => {
        if (!user || isLoadedAll) {
            return;
        }
        const response = await getFeed(
            user.uid,
            FEED_TWEETS_LIMIT,
            offsetRef.current
        );
        if (response.success) {
            if (response.data.length < FEED_TWEETS_LIMIT) {
                setLoadedAll(true);
            }
            setTweets((prev) => [...prev, ...response.data]);
            offsetRef.current += response.data.length;
        }
    }, [user, isLoadedAll]);

    useEffect(() => {
        loadTweets();
    }, [loadTweets]);

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <h1>Feed</h1>
            {tweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
            {!isLoadedAll && <Button onClick={loadTweets}>Load more...</Button>}
        </>
    );
}
