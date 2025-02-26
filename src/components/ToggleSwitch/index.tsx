import { InputHTMLAttributes } from 'react';

import styles from './ToggleSwitch.module.scss';

export type ToggleSwitchProps = InputHTMLAttributes<HTMLInputElement>;

export default function ToggleSwitch(props: ToggleSwitchProps) {
    return <input className={styles.toggleSwitch} type="checkbox" {...props} />;
}
