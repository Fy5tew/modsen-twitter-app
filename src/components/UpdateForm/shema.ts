import * as yup from 'yup';
import { InferType } from 'yup';

import { bio, birthDate, name, phone, userPhoto } from '@/utils/validators';

export type IUpdateForm = InferType<typeof updateForm>;

export const updateForm = yup.object({
    name: name,
    phone: phone,
    photo: userPhoto,
    bio: bio,
    dateOfBirth: birthDate,
});
