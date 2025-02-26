'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Loader from '@/components/Loader';
import Select from '@/components/Select';
import { useCreateUser, useLoginByGoogle } from '@/hooks/auth';
import {
    getBirthYearSelectOptions,
    getDaySelectOptions,
    getMonthSelectOptions,
} from '@/utils/date';

import { ISignupForm, signupForm } from './schema';
import styles from './SignupForm.module.scss';

export default function SignupForm() {
    const { mutate: createUser, isPending } = useCreateUser();
    const { mutate: loginByGoogle } = useLoginByGoogle();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignupForm>({
        resolver: yupResolver(signupForm),
    });

    const onSubmit: SubmitHandler<ISignupForm> = async ({
        name,
        phone,
        email,
        password,
        dateOfBirth: { day, month, year },
    }) => {
        createUser(
            {
                name,
                phone,
                email,
                password,
                photo: '',
                bio: '',
                birthDate: new Date(year, month - 1, day).getTime(),
            },
            {
                onSuccess: () => reset(),
            }
        );
    };

    const handleGoogleAuth = () => {
        loginByGoogle();
    };

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <FormField error={errors.name?.message}>
                <Input placeholder="Name" {...register('name')} />
            </FormField>
            <FormField error={errors.phone?.message}>
                <Input
                    placeholder="Phone number"
                    type="phone"
                    {...register('phone')}
                />
            </FormField>
            <FormField error={errors.email?.message}>
                <Input
                    placeholder="Email"
                    type="email"
                    {...register('email')}
                />
            </FormField>
            <FormField error={errors.password?.message}>
                <Input
                    placeholder="Password"
                    type="password"
                    {...register('password')}
                />
            </FormField>
            <FormField error={errors.passwordConfirmation?.message}>
                <Input
                    placeholder="Confirm password"
                    type="password"
                    {...register('passwordConfirmation')}
                />
            </FormField>
            <Link className={styles.link} href="" onClick={handleGoogleAuth}>
                Use Google
            </Link>
            <h2 className={styles.header}>Date of birth</h2>
            <p className={styles.dateInfo}>
                Your date of birth helps us personalize your experience and
                ensure age-appropriate access. This information won’t be
                publicly visible.
            </p>
            <FormField
                error={
                    errors.dateOfBirth?.message ||
                    errors.dateOfBirth?.root?.message ||
                    errors.dateOfBirth?.month?.message ||
                    errors.dateOfBirth?.day?.message ||
                    errors.dateOfBirth?.year?.message
                }
            >
                <div className={styles.dateInput}>
                    <Select
                        placeholder="Month"
                        options={getMonthSelectOptions()}
                        defaultValue={0}
                        {...register('dateOfBirth.month')}
                    />
                    <Select
                        placeholder="Day"
                        options={getDaySelectOptions()}
                        defaultValue={0}
                        {...register('dateOfBirth.day')}
                    />
                    <Select
                        placeholder="Year"
                        options={getBirthYearSelectOptions()}
                        defaultValue={0}
                        {...register('dateOfBirth.year')}
                    />
                </div>
            </FormField>
            <Button
                type="submit"
                variant={ButtonVariant.PRIMARY}
                disabled={isPending}
            >
                {isPending && <Loader />}
                Next
            </Button>
        </form>
    );
}
