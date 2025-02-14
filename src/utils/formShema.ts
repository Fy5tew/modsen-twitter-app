import * as yup from 'yup';
import { InferType } from 'yup';

import {
    birthDate,
    contentText,
    email,
    login,
    name,
    password,
    passwordConfirmation,
    phone,
} from './formValidators';

export type ILoginForm = InferType<typeof loginForm>;
export type IRegisterForm = InferType<typeof registerForm>;
export type IUpdateForm = InferType<typeof updateForm>;
export type IContentForm = InferType<typeof contentForm>;

export const loginForm = yup.object({
    login: login,
    password: password,
});

export const registerForm = yup.object({
    name: name,
    phone: phone,
    email: email,
    password: password,
    passwordConfirmation: passwordConfirmation(),
    dateOfBirth: birthDate,
});

export const updateForm = yup.object({
    name: name,
    phone: phone,
    password: password,
    passwordConfirmation: passwordConfirmation(),
    dateOfBirth: birthDate,
});

export const contentForm = yup.object({
    text: contentText,
});
