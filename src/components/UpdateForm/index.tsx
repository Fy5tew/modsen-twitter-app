import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Input from '@/components/Input';
import PageLoader from '@/components/PageLoader';
import Select from '@/components/Select';
import { useRequestPasswordChange } from '@/hooks/auth';
import { useCurrentUser, useUpdateInfo } from '@/hooks/user';
import {
    dateToSelectValues,
    getBirthYearSelectOptions,
    getDaySelectOptions,
    getMonthSelectOptions,
} from '@/utils/date';

import FileInput from '../FileInput';
import { IUpdateForm, updateForm } from './shema';
import styles from './UpdateForm.module.scss';

export default function UpdateForm() {
    const { data: user, isLoading } = useCurrentUser();
    const {
        register,
        watch,
        reset,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateForm>({
        resolver: yupResolver(updateForm),
    });
    const { mutate: updateInfo, isPending: isUpdatingPending } =
        useUpdateInfo();
    const { mutate: requestPasswordChange, isPending: isPasswordResetPending } =
        useRequestPasswordChange();

    useEffect(() => {
        reset({
            name: user?.name,
            phone: user?.phone,
            photo: user?.photo,
            bio: user?.bio,
            dateOfBirth: dateToSelectValues(user?.birthDate),
        });
    }, [reset, user]);

    const onEditSubmit: SubmitHandler<IUpdateForm> = ({
        dateOfBirth: { day, month, year },
        ...data
    }) => {
        if (user) {
            updateInfo({
                uid: user.uid,
                info: {
                    ...data,
                    bio: data.bio ?? '',
                    birthDate: new Date(year, month - 1, day).getTime(),
                },
            });
        }
    };

    const handlePasswordChange = () => {
        if (user) {
            requestPasswordChange({ email: user.email });
        }
    };

    if (isLoading) {
        return <PageLoader />;
    }

    if (!user) {
        return null;
    }

    console.log(
        new Date(user.birthDate).getMonth() + 1,
        new Date(user.birthDate).getDate(),
        new Date(user.birthDate).getFullYear()
    );

    return (
        <form
            className={styles.form}
            noValidate
            onSubmit={handleSubmit(onEditSubmit)}
        >
            <div className={styles.photoInput}>
                <div className={styles.photoWrapper}>
                    <Image
                        className={styles.photo}
                        src={watch('photo')}
                        alt=""
                        fill
                    />
                </div>
                <FileInput<IUpdateForm> name="photo" setValue={setValue}>
                    <span className={styles.inputButton}>Choose photo</span>
                </FileInput>
            </div>
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
            <FormField error={errors.bio?.message}>
                <Input placeholder="Bio" {...register('bio')} />
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
            <div className={styles.controls}>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    disabled={isUpdatingPending}
                    type="submit"
                >
                    {isUpdatingPending ? 'Please, wait...' : 'Submit'}
                </Button>
                <Button
                    variant={ButtonVariant.DEFAULT}
                    type="button"
                    onClick={() => reset()}
                >
                    Reset
                </Button>
            </div>
            <Button
                variant={ButtonVariant.PRIMARY}
                className={styles.passwordChangeButton}
                disabled={isPasswordResetPending}
                type="button"
                onClick={handlePasswordChange}
            >
                {isPasswordResetPending
                    ? 'Please, wait...'
                    : 'Request password change'}
            </Button>
        </form>
    );
}
