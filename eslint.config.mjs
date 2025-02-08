import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends(
        'next/core-web-vitals',
        'next/typescript',
        'plugin:prettier/recommended'
    ),
    ...compat.plugins('simple-import-sort', 'prettier'),
    {
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-unused-vars': 'warn',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'prettier/prettier': 'error',
        },
    },
];

export default eslintConfig;
