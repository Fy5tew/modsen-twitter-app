'use client';

import { useParams } from 'next/navigation';

import Tweet, { TweetRefType } from '@/components/Tweet';
import useTweet from '@/hooks/useTweet';

export default function TweetPage() {
    const { id } = useParams();
    const tweet = useTweet(id as string);

    if (!tweet) {
        return null;
    }

    return <Tweet tweet={tweet} refType={TweetRefType.AUTHOR} />;
}
