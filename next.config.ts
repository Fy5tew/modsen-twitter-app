import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src', 'styles')],
    },
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
};

export default nextConfig;
