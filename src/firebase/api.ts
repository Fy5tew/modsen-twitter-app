import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { FIRESTORE_USER_INFO } from '@/constants/firebase';
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
