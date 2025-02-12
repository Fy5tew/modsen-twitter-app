import { useEffect, useState } from 'react';

import { getUser } from '@/firebase/api';
import { User, UserUID } from '@/types/user';

export default function useUser(uid: UserUID): User | null {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        (async () => {
            setUser(await getUser(uid));
        })();
    }, [uid]);

    return user;
}
