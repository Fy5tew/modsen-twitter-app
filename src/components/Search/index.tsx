import { InputHTMLAttributes, ReactNode } from 'react';

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
    result?: ReactNode;
}

export default function Search({ result, ...props }: SearchProps) {
    return (
        <div>
            <input {...props} />
            <div>{result}</div>
        </div>
    );
}
