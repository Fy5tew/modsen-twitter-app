import * as yup from 'yup';
import { InferType } from 'yup';

import {
    birthDate,
    name,
    password,
    passwordConfirmation,
    phone,
} from '@/utils/validators';

export type IUpdateForm = InferType<typeof updateForm>;

export const updateForm = yup.object({
    name: name,
    phone: phone,
    password: password,
    passwordConfirmation: passwordConfirmation(),
    dateOfBirth: birthDate,
});
