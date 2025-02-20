import TwitterSearch from '@/components/TwitterSearch';

import ThemeSwitch from '../ThemeSwitch';

export default function Sidebar() {
    return (
        <div>
            <ThemeSwitch />
            <TwitterSearch />
        </div>
    );
}
