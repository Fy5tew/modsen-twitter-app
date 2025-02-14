'use client';

import { ChangeEvent, useEffect, useState } from 'react';

import Search from '@/components/Search';
import Tweet from '@/components/Tweet';
import { searchTweets } from '@/firebase/utils';
import useDebounce from '@/hooks/useDebounce';
import { Tweet as ITweet } from '@/types/tweet';

const MAX_SEARCH_TWEETS = 5;

export default function TweetsSearch() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);
    const [tweets, setTweets] = useState<ITweet[]>([]);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        (async () => {
            const response = await searchTweets(
                debouncedSearch,
                MAX_SEARCH_TWEETS
            );
            if (response.success) {
                setTweets(response.data);
            } else {
                setTweets([]);
            }
        })();
    }, [debouncedSearch]);

    const result =
        debouncedSearch && !tweets.length
            ? 'No tweets found'
            : tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />);

    return (
        <Search
            value={search}
            onChange={handleInput}
            placeholder="Search Twitter"
            result={result}
        />
    );
}
