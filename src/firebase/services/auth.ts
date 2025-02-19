import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

import { CreateUserInfo, LoginUserInfo } from '@/types/user';

import { auth } from '..';
import userService from './user';

const authService = {
    async createUser({ password, ...info }: CreateUserInfo) {
        const credentials = await createUserWithEmailAndPassword(
            auth,
            info.email,
            password
        );
        await userService.createInfo({ uid: credentials.user.uid, info });
        return credentials;
    },

    async loginByEmail({ email, password }: LoginUserInfo) {
        return await signInWithEmailAndPassword(auth, email, password);
    },

    async loginByGoogle() {
        const credentials = await signInWithPopup(
            auth,
            new GoogleAuthProvider()
        );
        const { user } = credentials;
        const isNew =
            user.metadata.creationTime === user.metadata.lastSignInTime;
        if (isNew) {
            const { displayName, email, phoneNumber, photoURL } = user;
            await userService.createInfo({
                uid: user.uid,
                info: {
                    name: displayName ?? '',
                    email: email ?? '',
                    phone: phoneNumber ?? '',
                    photo: photoURL ?? '',
                    bio: '',
                    birthDate: 0,
                },
            });
        }
        return credentials;
    },

    async logout() {
        return await signOut(auth);
    },
};

export default authService;
