import { useMutation } from '@tanstack/react-query';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@/firebase';
import authService from '@/firebase/services/auth';
import { showError, showSuccess } from '@/utils/notifications';

export function useAuth() {
    return useAuthState(auth);
}

export function useCreateUser() {
    return useMutation({
        mutationFn: authService.createUser,
        onSuccess: () => showSuccess("You've signed up!"),
        onError: (error) => showError(error.message),
    });
}

export function useLoginByEmail() {
    return useMutation({
        mutationFn: authService.loginByEmail,
        onSuccess: () => showSuccess("You've logged in!"),
        onError: (error) => showError(error.message),
    });
}

export function useLoginByGoogle() {
    return useMutation({
        mutationFn: authService.loginByGoogle,
        onSuccess: () => showSuccess("You've logged in with Google!"),
        onError: (error) => showError(error.message),
    });
}

export function useLogout() {
    return useMutation({
        mutationFn: authService.logout,
        onSuccess: () => showSuccess("You've logged out!"),
        onError: (error) => showError(error.message),
    });
}

export function useRequestPasswordChange() {
    return useMutation({
        mutationFn: authService.requestPasswordChange,
        onSuccess: () => showSuccess('Message was sent to your email!'),
        onError: (error) => showError(error.message),
    });
}
