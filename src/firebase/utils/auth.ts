import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signOut as _signOut,
    updateProfile,
    User,
} from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { FIRESTORE_USER_INFO } from '@/constants/firebase';
import { showSuccess } from '@/utils/notifications';

import { auth, db } from '..';
import { APIRequest } from './APIRequest';

export const createUser = APIRequest(
    async ({
        name,
        phone,
        email,
        password,
        dateOfBirth,
    }: {
        name: string;
        phone: string;
        email: string;
        password: string;
        dateOfBirth: Date;
    }) => {
        const user = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        await updateProfile(auth.currentUser as User, {
            displayName: name,
            photoURL: '',
        });
        await setDoc(doc(db, FIRESTORE_USER_INFO, user.user.uid), {
            phone,
            dateOfBirth,
        });
        showSuccess('You’ve signed up!');
        return user;
    }
);

export const authByEmail = APIRequest(
    async (email: string, password: string) => {
        const r = await signInWithEmailAndPassword(auth, email, password);
        showSuccess('You’ve logged in!');
        return r;
    }
);

export const authByGoogle = APIRequest(async () => {
    const r = await signInWithPopup(auth, new GoogleAuthProvider());
    showSuccess('You’ve logged in with Google!');
    return r;
});

export const signOut = APIRequest(async () => {
    const r = await _signOut(auth);
    showSuccess('You’ve signed out!');
    return r;
});
