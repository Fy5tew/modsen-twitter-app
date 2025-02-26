import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FileInput from '@/components/FileInput';
import FormField from '@/components/FormField';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import { useCurrentUser } from '@/hooks/user';
import { useIcons } from '@/providers/icon';

import styles from './ContentInput.module.scss';
import { contentForm, IContentForm } from './shema';

export interface ContentInputProps {
    buttonContent?: ReactNode;
    placeholder?: string;
    onSubmit?: (content: IContentForm) => void;
}

export default function ContentInput({
    buttonContent = 'Submit',
    placeholder,
    onSubmit: submitHandler = () => {},
}: ContentInputProps) {
    const icons = useIcons();
    const { data: user, isLoading, error } = useCurrentUser();
    const {
        register,
        reset,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<IContentForm>({
        resolver: yupResolver(contentForm),
    });

    const onSubmit: SubmitHandler<IContentForm> = (content) => {
        submitHandler(content);
        reset();
    };

    const onImageReset = () => {
        reset({ image: null });
    };

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        console.error(error);
        return null;
    }

    if (!user) {
        return null;
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <Icon className={styles.photo} src={user.photo} alt="" />
            <div className={styles.mainWrapper}>
                <FormField error={errors.text?.message}>
                    <textarea
                        className={styles.input}
                        placeholder={placeholder}
                        {...register('text')}
                    />
                </FormField>
                {watch('image') && (
                    <div className={styles.previewWrapper}>
                        <Image
                            className={styles.image}
                            src={watch('image') ?? ''}
                            alt=""
                            fill
                        />
                        <button
                            className={styles.imageReset}
                            type="button"
                            onClick={onImageReset}
                        >
                            <Icon src={icons.cross} alt="Delete image" />
                        </button>
                    </div>
                )}
                <div className={styles.controls}>
                    <FileInput<IContentForm> name="image" setValue={setValue}>
                        <Icon
                            className={styles.icon}
                            src={icons.media}
                            alt=""
                        />
                    </FileInput>
                    <Button variant={ButtonVariant.SECONDARY}>
                        {buttonContent}
                    </Button>
                </div>
            </div>
        </form>
    );
}
