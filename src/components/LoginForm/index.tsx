'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import { useLoginByEmail } from '@/hooks/auth';

import styles from './LoginForm.module.scss';
import { ILoginForm, loginForm } from './schema';

export default function LoginForm() {
    const { mutate: loginByEmail, isPending } = useLoginByEmail();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginForm>({ resolver: yupResolver(loginForm) });

    const onSubmit: SubmitHandler<ILoginForm> = async ({ login, password }) => {
        loginByEmail({ email: login, password }, { onSuccess: () => reset() });
    };

    return (
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
            <Button
                type="submit"
                variant={ButtonVariant.PRIMARY}
                disabled={isPending}
            >
                {isPending ? 'Please, wait...' : 'Log In'}
            </Button>
        </form>
    );
}
