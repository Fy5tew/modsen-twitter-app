'use client';

import { ChangeEvent, ReactNode, useState } from 'react';

import PageLoader from '@/components/PageLoader';
import Search from '@/components/Search';
import Tweet from '@/components/Tweet';
import { useSearchTweets } from '@/hooks/tweet';
import useDebounce from '@/hooks/useDebounce';

const MAX_SEARCH_TWEETS = 5;

export default function TweetsSearch() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const {
        data: tweets,
        isLoading,
        error,
    } = useSearchTweets(debouncedSearch, MAX_SEARCH_TWEETS);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    let result: ReactNode;
    if (isLoading) {
        result = debouncedSearch ? <PageLoader /> : null;
    } else if (error) {
        console.error(error);
        result = 'Something went wrong...';
    } else if (debouncedSearch && !tweets?.length) {
        result = 'No tweets found';
    } else {
        result = tweets!.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />);
    }

    return (
        <Search
            value={search}
            onChange={handleInput}
            placeholder="Search Twitter"
            result={result}
        />
    );
}
