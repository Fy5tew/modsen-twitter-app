import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import Button, { ButtonVariant } from '@/components/Button';
import FormField from '@/components/FormField';
import Icon from '@/components/Icon';
import Loader from '@/components/Loader';
import useAuth from '@/hooks/useAuth';
import useUser from '@/hooks/useUser';
import { contentForm, IContentForm } from '@/utils/formShema';

import styles from './ContentInput.module.scss';

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
    const [user, loading] = useAuth();
    const userInfo = useUser(user?.uid || '');
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<IContentForm>({
        resolver: yupResolver(contentForm),
    });

    const onSubmit: SubmitHandler<IContentForm> = (content) => {
        submitHandler(content);
        reset();
    };

    if (loading) {
        return <Loader />;
    }

    if (!user || !userInfo) {
        return null;
    }

    return (
        <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
            <Icon className={styles.photo} src={userInfo.photo} alt="" />
            <div className={styles.mainWrapper}>
                <FormField error={errors.text?.message}>
                    <textarea
                        className={styles.input}
                        placeholder={placeholder}
                        {...register('text')}
                    />
                </FormField>
                <div className={styles.controls}>
                    <button type="button" className={styles.iconButton}>
                        <Icon
                            className={styles.icon}
                            src="/mediaButton.svg"
                            alt=""
                        />
                    </button>
                    <Button variant={ButtonVariant.SECONDARY}>
                        {buttonContent}
                    </Button>
                </div>
            </div>
        </form>
    );
}
