import cn from 'classnames';

import Button, { ButtonVariant } from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';
import Logo from '@/components/Logo';
import Select from '@/components/Select';

import styles from './page.module.scss';

export default function SignupPage() {
    return (
        <div className={styles.wrapper}>
            <Logo className={styles.logo} />
            <h1 className={cn(styles.header, styles.headerLarge)}>
                Create an account
            </h1>
            <Input placeholder="Name" />
            <Input placeholder="Phone number" />
            <Input placeholder="Email" />
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm password" />
            <Link className={styles.link} href="">
                Use Google
            </Link>
            <h2 className={styles.header}>Date of birth</h2>
            <p className={styles.dateInfo}>
                Facilisi sem pulvinar velit nunc, gravida scelerisque amet nibh
                sit. Quis bibendum ante phasellus metus, magna lacinia sed
                augue. Odio enim nascetur leo mauris vel eget. Pretium id
                ullamcorper blandit viverra dignissim eget tellus. Nibh mi massa
                in molestie a sit. Elit congue.
            </p>
            <div className={styles.dateInput}>
                <Select placeholder="Month" options={[]} />
                <Select placeholder="Day" options={[]} />
                <Select placeholder="Year" options={[]} />
            </div>
            <Button variant={ButtonVariant.PRIMARY}>Next</Button>
        </div>
    );
}
