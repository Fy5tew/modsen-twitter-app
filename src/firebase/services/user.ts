import { doc, getDoc, setDoc } from 'firebase/firestore';

import { FIRESTORE_USER_INFO } from '@/constants/firebase';
import { BaseUserInfo, User, UserInfo, UserUID } from '@/types/user';

import { db } from '..';

const userService = {
    async createInfo({ uid, info }: { uid: UserUID; info: UserInfo }) {
        return await setDoc(doc(db, FIRESTORE_USER_INFO, uid), info);
    },

    async updateInfo({
        uid,
        info,
    }: {
        uid: UserUID;
        info: Partial<BaseUserInfo>;
    }) {
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
};

export default userService;
