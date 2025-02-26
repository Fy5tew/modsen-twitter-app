'use client';

import { useParams } from 'next/navigation';

import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import Tweet, { TweetRefType } from '@/components/Tweet';
import { useTweet } from '@/hooks/tweet';

export default function TweetPage() {
    const { id } = useParams();
    const { data: tweet, isLoading, error } = useTweet(id as string);

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!tweet) {
        return null;
    }

    return (
        <>
            <PageHeader>
                <h1>Tweet</h1>
            </PageHeader>
            <Tweet tweet={tweet} refType={TweetRefType.AUTHOR} />
        </>
    );
}
