import Icon from '@/components/Icon';
import { User } from '@/types/user';

export interface UserPreviewProps {
    user: User;
}

export default function UserPreview({
    user: { name, email, photo },
}: UserPreviewProps) {
    return (
        <div>
            <Icon src={photo || '/profile.svg'} alt="" />
            <div>
                <span>{name}</span>
                <span>{email}</span>
            </div>
        </div>
    );
}
