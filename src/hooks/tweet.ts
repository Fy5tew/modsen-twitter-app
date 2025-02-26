import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';

import {
    FEED_QUERY_KEY,
    SEARCH_TWEETS_QUERY_KEY,
    TWEET_QUERY_KEY,
    USER_TWEETS_QUERY_KEY,
} from '@/constants/queryKeys';
import tweetService from '@/firebase/services/tweet';
import { TweetID } from '@/types/tweet';
import { UserUID } from '@/types/user';
import { showError, showSuccess } from '@/utils/notifications';

import { useAuth } from './auth';

export function useTweet(tweetId: TweetID) {
    return useQuery({
        queryKey: [TWEET_QUERY_KEY, tweetId],
        queryFn: () => tweetService.getTweetById({ tweetId }),
    });
}

export function useUserTweets(userUid: UserUID) {
    return useQuery({
        queryKey: [USER_TWEETS_QUERY_KEY, userUid],
        queryFn: () => tweetService.getTweetsByUserUid({ userUid }),
    });
}

export function useSearchTweets(searchQuery: string, limitCount: number) {
    return useQuery({
        queryKey: [SEARCH_TWEETS_QUERY_KEY, searchQuery, limitCount],
        queryFn: () => tweetService.search({ searchQuery, limitCount }),
    });
}

export function useFeed(userUid: UserUID, tweetsPerPage: number = 1) {
    return useInfiniteQuery({
        queryKey: [FEED_QUERY_KEY, userUid, tweetsPerPage],
        initialPageParam: 0,
        queryFn: async ({ pageParam = 0 }) =>
            tweetService.getFeed({
                userUid,
                limitCount: tweetsPerPage,
                offset: pageParam,
            }),
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length >= tweetsPerPage
                ? allPages.length * tweetsPerPage
                : undefined;
        },
    });
}

export function usePostTweet() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tweetService.post,
        onSuccess: (_, { authorUid }) => {
            showSuccess("You've posted tweet!");
            queryClient.invalidateQueries({
                queryKey: [USER_TWEETS_QUERY_KEY, authorUid],
            });
        },
        onError: (error) => showError(error.message),
    });
}

export function useDeleteTweet() {
    const [authUser] = useAuth();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tweetService.delete,
        onSuccess: () => {
            showSuccess("You've deleted tweet!");
            queryClient.invalidateQueries({
                queryKey: [USER_TWEETS_QUERY_KEY, authUser!.uid],
            });
        },
        onError: (error) => showError(error.message),
    });
}

export function useAddTweetLike() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tweetService.addLike,
        onSuccess: (_, { tweetId, userUid }) => {
            showSuccess("You've liked tweet!");
            queryClient.invalidateQueries({
                queryKey: [TWEET_QUERY_KEY, tweetId],
            });
            queryClient.invalidateQueries({
                queryKey: [USER_TWEETS_QUERY_KEY, userUid],
            });
            queryClient.invalidateQueries({
                queryKey: [FEED_QUERY_KEY, userUid],
            });
        },
        onError: (error) => showError(error.message),
        gcTime: 0,
    });
}

export function useRemoveTweetLike() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: tweetService.removeLike,
        onSuccess: (_, { tweetId, userUid }) => {
            showSuccess("You've unliked tweet!");
            queryClient.invalidateQueries({
                queryKey: [TWEET_QUERY_KEY, tweetId],
            });
            queryClient.invalidateQueries({
                queryKey: [USER_TWEETS_QUERY_KEY, userUid],
            });
            queryClient.invalidateQueries({
                queryKey: [FEED_QUERY_KEY, userUid],
            });
        },
        onError: (error) => showError(error.message),
        gcTime: 0,
    });
}
