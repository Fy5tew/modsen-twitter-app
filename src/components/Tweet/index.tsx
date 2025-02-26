import Image from 'next/image';
import Link from 'next/link';

import Icon from '@/components/Icon';
import { DEFAULT_USER_NAME, DEFAULT_USER_PHOTO } from '@/constants/defaults';
import { Routes } from '@/constants/routes';
import { useAuth } from '@/hooks/auth';
import {
    useAddTweetLike,
    useDeleteTweet,
    useRemoveTweetLike,
} from '@/hooks/tweet';
import { useUser } from '@/hooks/user';
import { useIcons } from '@/providers/icon';
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
    const icons = useIcons();
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
            <Icon
                className={styles.photo}
                src={user?.photo || DEFAULT_USER_PHOTO}
                alt=""
            />
            <div className={styles.contentWrapper}>
                <Link href={href} className={styles.info}>
                    <span className={styles.name}>
                        {user?.name ?? DEFAULT_USER_NAME}
                    </span>
                    <span className={styles.username}>{user?.email}</span>
                    <span className={styles.date}>
                        {new Date(tweet.date).toDateString()}
                    </span>
                </Link>
                <p className={styles.content}>{tweet.text}</p>
                {tweet.image && (
                    <div className={styles.imageWrapper}>
                        <Image
                            className={styles.image}
                            src={tweet.image}
                            alt=""
                            width={16}
                            height={9}
                            layout="responsive"
                        />
                    </div>
                )}
                <div className={styles.controls}>
                    <button
                        className={styles.iconButton}
                        onClick={handleLikeClick}
                        disabled={isAddLikePending || isRemoveLikePending}
                    >
                        <Icon
                            src={isLiked ? icons.likeFilled : icons.likeEmpty}
                            alt={isLiked ? 'Unlike' : 'Like'}
                        />
                        <span className={styles.buttonText}>
                            {tweet.likedBy.length}
                        </span>
                    </button>
                    {isOwner && (
                        <button
                            className={styles.iconButton}
                            onClick={handleDeleteClick}
                            disabled={isDeletionPending}
                        >
                            <Icon src={icons.trashbin} alt="Delete" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
