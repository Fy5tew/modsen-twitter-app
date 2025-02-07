'use client';

import { useAuthState } from 'react-firebase-hooks/auth';

import Button from '@/components/Button';
import { auth } from '@/firebase';
import { signOut } from '@/firebase/utils/auth';

export default function Profile() {
    const [user] = useAuthState(auth);

    const handleSignOut = () => signOut();

    console.log(user);

    return (
        <>
            <h1>Profile</h1>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </>
    );
}
