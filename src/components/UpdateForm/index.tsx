import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import PageLoader from '@/components/PageLoader';
import Select from '@/components/Select';
import { useAuth } from '@/hooks/auth';
import { useUpdateInfo } from '@/hooks/user';
import {
    getBirthYearSelectOptions,
    getDaySelectOptions,
    getMonthSelectOptions,
} from '@/utils/date';

import { IUpdateForm, updateForm } from './shema';
import styles from './UpdateForm.module.scss';

export default function UpdateForm() {
    const [user, isLoading] = useAuth();
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateForm>({
        resolver: yupResolver(updateForm),
    });
    const { mutate: updateInfo, isPending } = useUpdateInfo();

    const onEditSubmit: SubmitHandler<IUpdateForm> = async ({
        name,
        phone,
        password,
        dateOfBirth: { day, month, year },
    }) => {
        if (user) {
            updateInfo(
                {
                    uid: user.uid,
                    info: {
                        name,
                        phone,
                        birthDate: new Date(year, month - 1, day).getTime(),
                    },
                },
                {
                    onSuccess: () => {
                        reset();
                        close();
                    },
                }
            );
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    return (
        <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit(onEditSubmit)}
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
            <Button variant={ButtonVariant.PRIMARY} disabled={isPending}>
                {isPending ? 'Please, wait...' : 'Submit'}
            </Button>
        </form>
    );
}
