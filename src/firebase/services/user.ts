import {
    collection,
    doc,
    endAt,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    setDoc,
    startAt,
} from 'firebase/firestore';

import { FIRESTORE_USER_INFO } from '@/constants/firebase';
import { BaseUserInfo, User, UserInfo, UserUID } from '@/types/user';

import { db } from '..';

const userService = {
    async createInfo({ uid, info }: { uid: UserUID; info: UserInfo }) {
        return await setDoc(doc(db, FIRESTORE_USER_INFO, uid), info);
    },

    async updateInfo({ uid, info }: { uid: UserUID; info: BaseUserInfo }) {
        return await setDoc(doc(db, FIRESTORE_USER_INFO, uid), info, {
            merge: true,
        });
    },

    async getUserByUid({
        userUid,
    }: {
        userUid: UserUID;
    }): Promise<User | null> {
        const docRef = doc(db, FIRESTORE_USER_INFO, userUid);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) {
            return null;
        }
        const info = docSnapshot.data() as UserInfo;
        return {
            uid: userUid,
            ...info,
        };
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
            collection(db, FIRESTORE_USER_INFO),
            orderBy('name'),
            startAt(searchQuery),
            endAt(searchQuery + '\uf8ff'),
            limit(limitCount)
        );

        const snapshot = await getDocs(tweetsQuery);

        return snapshot.docs.map(
            (doc) =>
                ({
                    uid: doc.id,
                    ...doc.data(),
                }) as User
        );
    },
};

export default userService;
