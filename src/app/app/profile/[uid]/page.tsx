'use client';

import { useParams } from 'next/navigation';

import Button from '@/components/Button';
import ContentInput from '@/components/ContentInput';
import { IContentForm } from '@/components/ContentInput/shema';
import Dialog from '@/components/Dialog';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import PageHeader from '@/components/PageHeader';
import PageLoader from '@/components/PageLoader';
import Tweet from '@/components/Tweet';
import UpdateForm from '@/components/UpdateForm';
import { useAuth } from '@/hooks/auth';
import { usePostTweet, useUserTweets } from '@/hooks/tweet';
import { useFlag } from '@/hooks/useFlag';
import { useUser } from '@/hooks/user';

import styles from './page.module.scss';

export default function ProfilePage() {
    const { uid } = useParams();
    const [authUser] = useAuth();
    const { data: user, isLoading, error } = useUser(uid as string);
    const { data: tweets } = useUserTweets(user?.uid || '');
    const { flag: isOpen, enable: open, disable: close } = useFlag(false);

    const { mutate: postTweet } = usePostTweet();
    const isCurrentUser = !!user && !!authUser && user.uid === authUser.uid;

    const onPostTweet: (content: IContentForm) => void = async ({
        text,
        image,
    }) => {
        if (user) {
            postTweet({ authorUid: user.uid, tweet: { text, image } });
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <PageHeader>
                <div className={styles.header}>
                    <h1 className={styles.title}>{user.name}</h1>
                    {tweets ? (
                        <p className={styles.text}>{tweets.length} Tweets</p>
                    ) : (
                        <Loader />
                    )}
                </div>
            </PageHeader>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Icon
                        className={styles.photo}
                        src={user.photo || '/profile.svg'}
                        alt=""
                    />
                    <h1 className={styles.title}>{user.name}</h1>
                    <p className={styles.text}>{user.email}</p>
                    <p className={styles.bio}>{user.bio}</p>
                    <div className={styles.followInfo}>
                        <p className={styles.text}>0 Following</p>
                        <p className={styles.text}>0 Followers</p>
                    </div>
                </div>
                <div>
                    {isCurrentUser && (
                        <Button onClick={open}>Edit profile</Button>
                    )}
                </div>
            </div>
            {isCurrentUser && (
                <ContentInput
                    placeholder="What’s happening"
                    buttonContent="Tweet"
                    onSubmit={onPostTweet}
                />
            )}
            <h2 className={styles.title}>Tweets</h2>
            {tweets ? (
                tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)
            ) : (
                <PageLoader />
            )}
            <Dialog open={isOpen} onClose={close}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Edit profile</h1>
                    <UpdateForm />
                </div>
            </Dialog>
        </div>
    );
}
