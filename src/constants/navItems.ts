import { IconSources } from '@/types/icon';

import { Routes } from './routes';

interface NavItem {
    title: string;
    href: string;
    icon: keyof IconSources;
}

export const NAV_ITEMS: NavItem[] = [
    {
        title: 'Home',
        href: Routes.HOME,
        icon: 'home',
    },
    {
        title: 'Explore',
        href: Routes.FEED,
        icon: 'explore',
    },
    {
        title: 'Notifications',
        href: '',
        icon: 'notification',
    },
    {
        title: 'Messages',
        href: '',
        icon: 'message',
    },
    {
        title: 'Bookmarks',
        href: '',
        icon: 'bookmark',
    },
    {
        title: 'Lists',
        href: '',
        icon: 'list',
    },
    {
        title: 'Profile',
        href: Routes.HOME,
        icon: 'profile',
    },
    {
        title: 'More',
        href: '',
        icon: 'more',
    },
];
