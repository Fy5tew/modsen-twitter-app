import { UserUID } from './user';

export type TweetID = string;

export interface TweetBase {
    text: string;
}

export interface ExtendedTweet extends TweetBase {
    userUid: UserUID;
    date: number;
    likedBy: UserUID[];
}

export interface Tweet extends ExtendedTweet {
    id: TweetID;
}
