import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
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
    setDoc,
    startAfter,
    startAt,
    updateDoc,
    where,
} from 'firebase/firestore';

import { FIRESTORE_TWEETS, FIRESTORE_USER_INFO } from '@/constants/firebase';
import { ExtendedTweet, Tweet, TweetBase, TweetID } from '@/types/tweet';
import {
    BaseUserInfo,
    CreateUserInfo,
    LoginUserInfo,
    User,
    UserInfo,
    UserUID,
} from '@/types/user';

import { auth, db } from '.';

export async function createUser({ password, ...info }: CreateUserInfo) {
    const credentials = await createUserWithEmailAndPassword(
        auth,
        info.email,
        password
    );
    await createUserInfo(credentials.user.uid, info);
    return credentials;
}

export async function createUserInfo(uid: UserUID, info: UserInfo) {
    return await setDoc(doc(db, FIRESTORE_USER_INFO, uid), info);
}

export async function updateUserInfo(
    uid: UserUID,
    info: Partial<BaseUserInfo>
) {
    return await setDoc(doc(db, FIRESTORE_USER_INFO, uid), info, {
        merge: true,
    });
}

export async function getUser(uid: UserUID): Promise<User | null> {
    const docRef = doc(db, FIRESTORE_USER_INFO, uid);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
        return null;
    }
    const info = docSnapshot.data() as UserInfo;
    return {
        uid,
        ...info,
    };
}

export async function loginByEmail({ email, password }: LoginUserInfo) {
    return await signInWithEmailAndPassword(auth, email, password);
}

export async function loginByGoogle() {
    const credentials = await signInWithPopup(auth, new GoogleAuthProvider());
    const { user } = credentials;
    const isNew = user.metadata.creationTime === user.metadata.lastSignInTime;
    if (isNew) {
        const { displayName, email, phoneNumber, photoURL } = user;
        await createUserInfo(user.uid, {
            name: displayName ?? '',
            email: email ?? '',
            phone: phoneNumber ?? '',
            photo: photoURL ?? '',
            bio: '',
            birthDate: 0,
        });
    }
    return credentials;
}

export async function logout() {
    return await signOut(auth);
}

export async function postTweet(uid: UserUID, tweet: TweetBase) {
    return await addDoc(collection(db, FIRESTORE_TWEETS), {
        userUid: uid,
        date: Date.now(),
        likedBy: [],
        ...tweet,
    } as ExtendedTweet);
}

export async function deleteTweet(id: TweetID) {
    return await deleteDoc(doc(db, FIRESTORE_TWEETS, id));
}

export async function getTweetById(id: TweetID): Promise<Tweet | null> {
    const docRef = doc(db, FIRESTORE_TWEETS, id);
    const docSnapshot = await getDoc(docRef);
    if (!docSnapshot.exists()) {
        return null;
    }
    const info = docSnapshot.data() as ExtendedTweet;
    return {
        id,
        ...info,
    };
}

export async function getUserTweets(uid: UserUID) {
    const userTweetsSnapshot = await getDocs(
        query(
            collection(db, FIRESTORE_TWEETS),
            where('userUid', '==', uid),
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
}

export async function addTweetLike(tweetId: string, userUid: string) {
    await updateDoc(doc(db, FIRESTORE_TWEETS, tweetId), {
        likedBy: arrayUnion(userUid),
    });
}

export async function removeTweetLike(tweetId: string, userUid: string) {
    await updateDoc(doc(db, FIRESTORE_TWEETS, tweetId), {
        likedBy: arrayRemove(userUid),
    });
}

export async function searchTweets(searchQuery: string, limitCount: number) {
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
}

export async function getFeed(
    userUid: string,
    limitCount: number,
    offset: number
) {
    const baseQuery = query(
        collection(db, FIRESTORE_TWEETS),
        where('userUid', '!=', userUid),
        orderBy('userUid'),
        orderBy('date', 'desc')
    );

    let lastDoc = null;

    if (offset > 0) {
        const offsetSnapshot = await getDocs(query(baseQuery, limit(offset)));
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
}
