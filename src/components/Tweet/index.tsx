import Link from 'next/link';

import Icon from '@/components/Icon';
import { Routes } from '@/constants/routes';
import { addTweetLike, deleteTweet } from '@/firebase/utils';
import { removeTweetLike } from '@/firebase/utils';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
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
    const user = useUser(tweet.userUid);
    const isOwner = currentUser?.uid === user?.uid;
    const isLiked = tweet.likedBy.includes(currentUser?.uid ?? '');

    const handleLikeClick = async () => {
        if (isLiked) {
            await removeTweetLike(tweet.id, currentUser?.uid || '');
        } else {
            await addTweetLike(tweet.id, currentUser?.uid || '');
        }
    };

    const handleDeleteClick = async () => {
        await deleteTweet(tweet.id);
    };

    if (!user) {
        return <Loader />;
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
            <Icon className={styles.photo} src={user.photo} alt="" />
            <div>
                <Link href={href} className={styles.info}>
                    <span className={styles.name}>{user.name}</span>
                    <span className={styles.username}>{user.email}</span>
                    <span className={styles.date}>
                        {new Date(tweet.date).toDateString()}
                    </span>
                </Link>
                <p className={styles.content}>{tweet.text}</p>
                <div className={styles.controls}>
                    <button
                        className={styles.iconButton}
                        onClick={handleLikeClick}
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
                        >
                            <Icon src="/trashbin.svg" alt="" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
