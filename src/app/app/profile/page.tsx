'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import Dialog from '@/components/Dialog';
import FormField from '@/components/FormField';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import PageLoader from '@/components/PageLoader';
import Select from '@/components/Select';
import { updateUserInfo } from '@/firebase/utils';
import useAuth from '@/hooks/useAuth';
import { useFlag } from '@/hooks/useFlag';
import useUser from '@/hooks/useUser';
import {
    getBirthYearSelectOptions,
    getDaySelectOptions,
    getMonthSelectOptions,
} from '@/utils/date';
import { IUpdateForm, updateForm } from '@/utils/formShema';

import styles from './page.module.scss';

export default function Profile() {
    const [user, loading] = useAuth();
    const userInfo = useUser(user?.uid ?? '');
    const { flag: isOpen, enable: open, disable: close } = useFlag(false);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateForm>({
        resolver: yupResolver(updateForm),
    });

    const onSubmit: SubmitHandler<IUpdateForm> = async ({
        name,
        phone,
        password,
        dateOfBirth: { day, month, year },
    }) => {
        if (user) {
            if (
                (
                    await updateUserInfo(user.uid, {
                        name,
                        phone,
                        bio: '',
                        photo: '',
                        birthDate: new Date(year, month - 1, day).getTime(),
                    })
                ).success
            ) {
                reset();
                close();
            }
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    if (!user || !userInfo) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>{userInfo.name}</h1>
                <p className={styles.text}>0 Tweets</p>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Icon
                        className={styles.photo}
                        src={userInfo.photo || '/profile.svg'}
                        alt=""
                    />
                    <h1 className={styles.title}>{userInfo.name}</h1>
                    <p className={styles.text}>{userInfo.email}</p>
                    <p className={styles.bio}>{userInfo.bio}</p>
                    <div className={styles.followInfo}>
                        <p className={styles.text}>0 Following</p>
                        <p className={styles.text}>0 Followers</p>
                    </div>
                </div>
                <div>
                    <Button onClick={open}>Edit profile</Button>
                </div>
            </div>
            <Dialog open={isOpen} onClose={close}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Edit profile</h1>
                    <form
                        className={styles.form}
                        noValidate
                        onSubmit={handleSubmit(onSubmit)}
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
                        <Button variant={ButtonVariant.PRIMARY}>Submit</Button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
