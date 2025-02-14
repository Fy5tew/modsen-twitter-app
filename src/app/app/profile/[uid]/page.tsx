'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import ContentInput from '@/components/ContentInput';
import Dialog from '@/components/Dialog';
import FormField from '@/components/FormField';
import Icon from '@/components/Icon';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Tweet from '@/components/Tweet';
import { postTweet, updateUserInfo } from '@/firebase/utils';
import { useFlag } from '@/hooks/useFlag';
import useUser from '@/hooks/useUser';
import useUserTweets from '@/hooks/useUserTweets';
import {
    getBirthYearSelectOptions,
    getDaySelectOptions,
    getMonthSelectOptions,
} from '@/utils/date';
import { IContentForm, IUpdateForm, updateForm } from '@/utils/formShema';

import styles from './page.module.scss';

export default function ProfilePage() {
    const { uid } = useParams();
    const user = useUser(uid as string);
    const userTweets = useUserTweets(user?.uid || '');
    const { flag: isOpen, enable: open, disable: close } = useFlag(false);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IUpdateForm>({
        resolver: yupResolver(updateForm),
    });

    const onPostTweet: (content: IContentForm) => void = async ({ text }) => {
        if (user) {
            await postTweet(user.uid, { text });
        }
    };

    const onEditSubmit: SubmitHandler<IUpdateForm> = async ({
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

    if (!user) {
        return null;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1 className={styles.title}>{user.name}</h1>
                <p className={styles.text}>{userTweets.length} Tweets</p>
            </div>
            <div className={styles.infoWrapper}>
                <div className={styles.info}>
                    <Icon
                        className={styles.photo}
                        src={user.photo || '/profile.svg'}
                        alt=""
                    />
                    <h1 className={styles.title}>{user.name}</h1>
                    <p className={styles.text}>{user.email}</p>
                    <p className={styles.bio}>{user.bio}</p>
                    <div className={styles.followInfo}>
                        <p className={styles.text}>0 Following</p>
                        <p className={styles.text}>0 Followers</p>
                    </div>
                </div>
                <div>
                    <Button onClick={open}>Edit profile</Button>
                </div>
            </div>
            <ContentInput
                placeholder="What’s happening"
                buttonContent="Tweet"
                onSubmit={onPostTweet}
            />
            <h2 className={styles.title}>Tweets</h2>
            {userTweets.map((tweet) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}
            <Dialog open={isOpen} onClose={close}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>Edit profile</h1>
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
                        <Button variant={ButtonVariant.PRIMARY}>Submit</Button>
                    </form>
                </div>
            </Dialog>
        </div>
    );
}
