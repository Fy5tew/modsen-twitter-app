import ContentInput from '@/components/ContentInput';
import { IContentForm } from '@/components/ContentInput/shema';
import PageLoader from '@/components/PageLoader';
import { usePostTweet } from '@/hooks/tweet';
import { useCurrentUser } from '@/hooks/user';

export default function TweetInput() {
    const { data: user, isLoading } = useCurrentUser();
    const { mutate: postTweet } = usePostTweet();

    const onPostTweet: (content: IContentForm) => void = async (content) => {
        if (user) {
            postTweet({ authorUid: user.uid, tweet: content });
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return (
        <ContentInput
            placeholder="What’s happening"
            buttonContent="Tweet"
            onSubmit={onPostTweet}
        />
    );
}
