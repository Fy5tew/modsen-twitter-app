import * as yup from 'yup';

import {
    MAX_DATE_DAY,
    MAX_DATE_MONTH,
    MAX_DATE_YEAR,
    MAX_NAME_LENGTH,
    MIN_AGE,
    MIN_DATE_DAY,
    MIN_DATE_MONTH,
    MIN_DATE_YEAR,
    MIN_NAME_LENGTH,
    MIN_PASSWORD_LENGTH,
    PHONE_REGEX,
} from '@/constants/validation';
import { calculateAge, isValidDay } from '@/utils/date';

export const name = yup
    .string()
    .required('Name is required')
    .min(
        MIN_NAME_LENGTH,
        `Name must be at least ${MIN_NAME_LENGTH} characters long`
    )
    .max(MAX_NAME_LENGTH, `Name must not exceed ${MAX_NAME_LENGTH} characters`);

export const phone = yup
    .string()
    .required('Phone number is required')
    .matches(PHONE_REGEX, 'Please enter a valid phone number');

export const email = yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address');

export const login = yup
    .string()
    .required('Login is required')
    .email('Please enter a valid email address');

export const date = yup
    .object({
        day: yup
            .number()
            .required('Day is required')
            .min(MIN_DATE_DAY, `Day must be at least ${MIN_DATE_DAY}`)
            .max(MAX_DATE_DAY, `Day cannot be more than ${MAX_DATE_DAY}`)
            .test(
                'valid-day',
                'Invalid day for the selected month',
                (day, context) => {
                    const { month, year } = context.parent;
                    return isValidDay(day, month, year);
                }
            ),
        month: yup
            .number()
            .required('Month is required')
            .min(MIN_DATE_MONTH, `Month must be at least ${MIN_DATE_MONTH}`)
            .max(MAX_DATE_MONTH, `Month cannot be more than ${MAX_DATE_MONTH}`),
        year: yup
            .number()
            .required('Year is required')
            .min(MIN_DATE_YEAR, `Year must be at least ${MIN_DATE_YEAR}`)
            .max(MAX_DATE_YEAR, `Yaer cannot be more than ${MAX_DATE_YEAR}`),
    })
    .required('Date is required');

export const birthDate = date.concat(
    yup
        .object()
        .test(
            'age-check',
            `You must be at least ${MIN_AGE} years old`,
            (date) => {
                const { day, month, year } = date as {
                    day: number;
                    month: number;
                    year: number;
                };
                const age = calculateAge(day, month, year);
                return age >= MIN_AGE;
            }
        )
);

export const password = yup
    .string()
    .required('Password is required')
    .min(
        MIN_PASSWORD_LENGTH,
        `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`
    );

export const passwordConfirmation = (ref = 'password') =>
    yup
        .string()
        .oneOf([yup.ref(ref)], 'Passwords must match')
        .required('Password confirmation is required');
