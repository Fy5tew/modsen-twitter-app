'use client';

import { ChangeEvent, useState } from 'react';

import Search from '@/components/Search';
import useDebounce from '@/hooks/useDebounce';

import TweetsSearch from './TweetsSearch';
import UsersSearch from './UsersSearch';

export default function TwitterSearch() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search);

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    return (
        <Search
            value={search}
            onChange={handleInput}
            placeholder="Search Twitter"
            result={
                <>
                    <UsersSearch searchQuery={debouncedSearch} />
                    <TweetsSearch searchQuery={debouncedSearch} />
                </>
            }
        />
    );
}
