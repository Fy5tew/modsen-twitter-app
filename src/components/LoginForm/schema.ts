import * as yup from 'yup';
import { InferType } from 'yup';

import { login, password } from '@/utils/validators';

export type ILoginForm = InferType<typeof loginForm>;

export const loginForm = yup.object({
    login: login,
    password: password,
});
