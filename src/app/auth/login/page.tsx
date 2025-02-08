'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import { Routes } from '@/constants/routes';
import { authByEmail } from '@/firebase/utils/auth';
import { ILoginForm, loginForm } from '@/utils/formShema';

import styles from './page.module.scss';

export default function LoginPage() {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({ resolver: yupResolver(loginForm) });

    const onSubmit: SubmitHandler<ILoginForm> = async ({ login, password }) => {
        if ((await authByEmail(login, password)).success) {
            reset();
        }
    };

    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <h1 className={styles.header}>Log in to Twitter</h1>
            <form
                className={styles.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
            >
                <FormField error={errors.login?.message}>
                    <Input
                        placeholder="Phone number, email address"
                        type="email"
                        {...register('login', { required: true })}
                    />
                </FormField>
                <FormField error={errors.password?.message}>
                    <Input
                        placeholder="Password"
                        type="password"
                        {...register('password', { required: true })}
                    />
                </FormField>
                <Button type="submit" variant={ButtonVariant.PRIMARY}>
                    Log In
                </Button>
            </form>
            <Link className={styles.link} href={Routes.SIGNUP}>
                Sign up to Twitter
            </Link>
        </div>
    );
}
