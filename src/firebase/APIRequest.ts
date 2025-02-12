import { FirebaseError } from 'firebase/app';

import { showError, showSuccess } from '@/utils/notifications';

export interface APIResponseSuccess<T> {
    success: true;
    data: T;
}

export interface APIResponseError {
    success: false;
    error: FirebaseError;
}

export type APIResponse<T> = APIResponseSuccess<T> | APIResponseError;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function APIRequest<T extends (...args: any[]) => Promise<any>>(
    fn: T,
    successMessage?: string
): (...args: Parameters<T>) => Promise<APIResponse<Awaited<ReturnType<T>>>> {
    return async function (
        ...args: Parameters<T>
    ): Promise<APIResponse<Awaited<ReturnType<T>>>> {
        try {
            const data = await fn(...args);
            if (successMessage) {
                showSuccess(successMessage);
            }
            return { success: true, data };
        } catch (error) {
            if (error instanceof FirebaseError) {
                console.error(`Error in ${fn.name}:`, error);
                showError(error.message);
                return { success: false, error };
            }
            throw error;
        }
    };
}
