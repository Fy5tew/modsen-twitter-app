import { ReactNode } from 'react';

import Link from '@/components/Link';
import PageLoader from '@/components/PageLoader';
import { Routes } from '@/constants/routes';
import { useSearchUsers } from '@/hooks/user';

import { MAX_SEARCH_TWEETS } from './config';
import UserPreview from './UserPreview';

export interface UsersSearchProps {
    searchQuery: string;
}

export default function UsersSearch({ searchQuery }: UsersSearchProps) {
    const {
        data: users,
        isLoading,
        error,
    } = useSearchUsers(searchQuery, MAX_SEARCH_TWEETS);

    let result: ReactNode;
    if (!searchQuery) {
        return null;
    } else if (isLoading) {
        result = <PageLoader />;
    } else if (error) {
        console.error(error);
        result = 'Something went wrong...';
    } else if (searchQuery && !users?.length) {
        result = 'No users found';
    } else {
        result = users!.map((user) => (
            <Link key={user.uid} href={`${Routes.PROFILE}/${user.uid}`}>
                <UserPreview user={user} />
            </Link>
        ));
    }

    return (
        <>
            <h1>Users</h1>
            {result}
        </>
    );
}
