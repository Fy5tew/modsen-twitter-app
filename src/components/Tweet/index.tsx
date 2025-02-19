import Link from 'next/link';

import Icon from '@/components/Icon';
import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/auth';
import {
    useAddTweetLike,
    useDeleteTweet,
    useRemoveTweetLike,
} from '@/hooks/tweet';
import { useUser } from '@/hooks/user';
import { Tweet as ITweet } from '@/types/tweet';

import Loader from '../Loader';
import styles from './Tweet.module.scss';

export enum TweetRefType {
    TWEET = 'tweet',
    AUTHOR = 'author',
}

export interface TweetProps {
    tweet: ITweet;
    refType?: TweetRefType;
}

export default function Tweet({
    tweet,
    refType = TweetRefType.TWEET,
}: TweetProps) {
    const [currentUser] = useAuth();
    const { data: user, isLoading, error } = useUser(tweet.userUid);
    const { mutate: deleteTweet, isPending: isDeletionPending } =
        useDeleteTweet();
    const { mutate: addTweetLike, isPending: isAddLikePending } =
        useAddTweetLike();
    const { mutate: removeTweetLike, isPending: isRemoveLikePending } =
        useRemoveTweetLike();
    const isOwner = currentUser?.uid === user?.uid;
    const isLiked = tweet.likedBy.includes(currentUser?.uid ?? '');

    const handleLikeClick = async () => {
        if (isLiked) {
            removeTweetLike({
                tweetId: tweet.id,
                userUid: currentUser?.uid || '',
            });
        } else {
            addTweetLike({
                tweetId: tweet.id,
                userUid: currentUser?.uid || '',
            });
        }
    };

    const handleDeleteClick = async () => {
        deleteTweet({ tweetId: tweet.id });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    let href: string;
    switch (refType) {
        case TweetRefType.TWEET:
            href = `${Routes.TWEET}/${tweet.id}`;
            break;
        case TweetRefType.AUTHOR:
            href = `${Routes.PROFILE}/${tweet.userUid}`;
    }

    return (
        <div className={styles.wrapper}>
            <Icon className={styles.photo} src={user?.photo ?? ''} alt="" />
            <div>
                <Link href={href} className={styles.info}>
                    <span className={styles.name}>
                        {user?.name ?? 'Deleted Acount'}
                    </span>
                    <span className={styles.username}>{user?.email}</span>
                    <span className={styles.date}>
                        {new Date(tweet.date).toDateString()}
                    </span>
                </Link>
                <p className={styles.content}>{tweet.text}</p>
                <div className={styles.controls}>
                    <button
                        className={styles.iconButton}
                        onClick={handleLikeClick}
                        disabled={isAddLikePending || isRemoveLikePending}
                    >
                        <Icon
                            src={isLiked ? '/likeFilled.svg' : '/likeEmpty.svg'}
                            alt=""
                        />
                        <span>{tweet.likedBy.length}</span>
                    </button>
                    {isOwner && (
                        <button
                            className={styles.iconButton}
                            onClick={handleDeleteClick}
                            disabled={isDeletionPending}
                        >
                            <Icon src="/trashbin.svg" alt="" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
