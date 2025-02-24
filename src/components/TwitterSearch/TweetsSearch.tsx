import { ReactNode } from 'react';

import Link from '@/components/Link';
import PageLoader from '@/components/PageLoader';
import { Routes } from '@/constants/routes';
import { useSearchTweets } from '@/hooks/tweet';

import { MAX_SEARCH_TWEETS } from './config';
import TweetPreview from './TweetPreview';

export interface TweetsSearchProps {
    searchQuery: string;
}

export default function TweetsSearch({ searchQuery }: TweetsSearchProps) {
    const {
        data: tweets,
        isLoading,
        error,
    } = useSearchTweets(searchQuery, MAX_SEARCH_TWEETS);

    let result: ReactNode;
    if (!searchQuery) {
        return null;
    } else if (isLoading) {
        result = <PageLoader />;
    } else if (error) {
        console.error(error);
        result = 'Something went wrong...';
    } else if (searchQuery && !tweets?.length) {
        result = 'No tweets found';
    } else {
        result = tweets!.map((tweet) => (
            <Link key={tweet.id} href={`${Routes.TWEET}/${tweet.id}`}>
                <TweetPreview tweet={tweet} />
            </Link>
        ));
    }

    return (
        <>
            <h1>Tweets</h1>
            {result}
        </>
    );
}
