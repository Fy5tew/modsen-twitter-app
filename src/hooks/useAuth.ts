import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase';

export default function useAuth() {
    return useAuthState(auth);
}
