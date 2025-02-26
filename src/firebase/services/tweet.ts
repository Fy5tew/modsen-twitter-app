import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    endAt,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    startAfter,
    startAt,
    updateDoc,
    where,
} from 'firebase/firestore';

import { FIRESTORE_TWEETS } from '@/constants/firebase';
import { ExtendedTweet, Tweet, TweetBase, TweetID } from '@/types/tweet';
import { UserUID } from '@/types/user';

import { db } from '..';

const tweetService = {
    async post({ authorUid, tweet }: { authorUid: UserUID; tweet: TweetBase }) {
        return await addDoc(collection(db, FIRESTORE_TWEETS), {
            userUid: authorUid,
            date: Date.now(),
            likedBy: [],
            ...tweet,
        } as ExtendedTweet);
    },

    async delete({ tweetId }: { tweetId: TweetID }) {
        return await deleteDoc(doc(db, FIRESTORE_TWEETS, tweetId));
    },

    async getTweetById({
        tweetId,
    }: {
        tweetId: TweetID;
    }): Promise<Tweet | null> {
        const docRef = doc(db, FIRESTORE_TWEETS, tweetId);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            return null;
        }
        const info = docSnapshot.data() as ExtendedTweet;
        return {
            id: tweetId,
            ...info,
        };
    },

    async getTweetsByUserUid({ userUid }: { userUid: UserUID }) {
        const userTweetsSnapshot = await getDocs(
            query(
                collection(db, FIRESTORE_TWEETS),
                where('userUid', '==', userUid),
                orderBy('date', 'desc')
            )
        );
        return userTweetsSnapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                }) as Tweet
        );
    },

    async addLike({
        tweetId,
        userUid,
    }: {
        tweetId: TweetID;
        userUid: UserUID;
    }) {
        await updateDoc(doc(db, FIRESTORE_TWEETS, tweetId), {
            likedBy: arrayUnion(userUid),
        });
    },

    async removeLike({
        tweetId,
        userUid,
    }: {
        tweetId: TweetID;
        userUid: UserUID;
    }) {
        await updateDoc(doc(db, FIRESTORE_TWEETS, tweetId), {
            likedBy: arrayRemove(userUid),
        });
    },

    async search({
        searchQuery,
        limitCount,
    }: {
        searchQuery: string;
        limitCount: number;
    }) {
        if (!searchQuery.trim()) return [];

        const tweetsQuery = query(
            collection(db, FIRESTORE_TWEETS),
            orderBy('text'),
            startAt(searchQuery),
            endAt(searchQuery + '\uf8ff'),
            limit(limitCount)
        );

        const snapshot = await getDocs(tweetsQuery);

        return snapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                }) as Tweet
        );
    },

    async getFeed({
        userUid,
        limitCount,
        offset,
    }: {
        userUid: UserUID;
        limitCount: number;
        offset: number;
    }) {
        const baseQuery = query(
            collection(db, FIRESTORE_TWEETS),
            where('userUid', '!=', userUid),
            orderBy('userUid'),
            orderBy('date', 'desc')
        );

        let lastDoc = null;

        if (offset > 0) {
            const offsetSnapshot = await getDocs(
                query(baseQuery, limit(offset))
            );
            lastDoc =
                offsetSnapshot.docs.length > 0
                    ? offsetSnapshot.docs[offsetSnapshot.docs.length - 1]
                    : null;
        }

        const tweetsQuery = lastDoc
            ? query(baseQuery, startAfter(lastDoc), limit(limitCount))
            : query(baseQuery, limit(limitCount));

        const feedSnapshot = await getDocs(tweetsQuery);

        return feedSnapshot.docs.map(
            (doc) =>
                ({
                    id: doc.id,
                    ...doc.data(),
                }) as Tweet
        );
    },
};

export default tweetService;
