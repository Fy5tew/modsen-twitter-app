import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Modsen Twitter App',
    description: 'Twitter clone',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
