'use client';

import { Fragment } from 'react';

import Button from '@/components/Button';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import Tweet from '@/components/Tweet';
import { useAuth } from '@/hooks/auth';
import { useFeed } from '@/hooks/tweet';

const FEED_TWEETS_LIMIT = 5;

export default function Feed() {
    const [user, loading] = useAuth();
    const {
        data: tweetsFeed,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useFeed(user?.uid ?? '', FEED_TWEETS_LIMIT);

    const handleLoadTweets = () => {
        fetchNextPage();
    };

    if (loading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return (
        <>
            <PageHeader>
                <h1>Feed</h1>
            </PageHeader>
            {tweetsFeed?.pages.map((page, pageIndex) => (
                <Fragment key={pageIndex}>
                    {page.map((tweet) => (
                        <Tweet key={tweet.id} tweet={tweet} />
                    ))}
                </Fragment>
            ))}
            {hasNextPage && (
                <Button onClick={handleLoadTweets}>
                    {isFetchingNextPage ? 'Loading...' : 'Load more...'}
                </Button>
            )}
        </>
    );
}
