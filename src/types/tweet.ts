import { UserUID } from './user';

export type TweetID = string;

export interface TweetBase {
    text: string;
    image: string | null;
}

export interface ExtendedTweet extends TweetBase {
    userUid: UserUID;
    date: number;
    likedBy: UserUID[];
}

export interface Tweet extends ExtendedTweet {
    id: TweetID;
}
