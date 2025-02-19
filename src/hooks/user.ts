import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { USER_QUERY_KEY } from '@/constants/queryKeys';
import userService from '@/firebase/services/user';
import { UserUID } from '@/types/user';
import { showError, showSuccess } from '@/utils/notifications';

import { useAuth } from './auth';

export function useUser(userUid: UserUID) {
    return useQuery({
        queryKey: [USER_QUERY_KEY, userUid],
        queryFn: () => userService.getUserByUid({ userUid }),
    });
}

export function useCurrentUser() {
    const [authUser] = useAuth();
    return useUser(authUser?.uid || '');
}

export function useUpdateInfo() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userService.updateInfo,
        onSuccess: (_, { uid }) => {
            showSuccess("You've updated profile!");
            queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY, uid] });
        },
        onError: (error) => showError(error.message),
    });
}
