import * as yup from 'yup';
import { InferType } from 'yup';

import {
    birthDate,
    email,
    name,
    password,
    passwordConfirmation,
    phone,
} from '@/utils/validators';

export type ISignupForm = InferType<typeof signupForm>;

export const signupForm = yup.object({
    name: name,
    phone: phone,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation(),
    dateOfBirth: birthDate,
});
