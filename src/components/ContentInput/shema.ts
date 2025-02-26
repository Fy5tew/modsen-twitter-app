import * as yup from 'yup';
import { InferType } from 'yup';

import { contentImage, contentText } from '@/utils/validators';

export type IContentForm = InferType<typeof contentForm>;

export const contentForm = yup.object({
    text: contentText,
    image: contentImage,
});
