import { toast } from 'react-toastify';

export enum NotificationType {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export function notify(text: string, type: NotificationType) {
    toast(text, { type: type });
}

export function showInfo(text: string) {
    notify(text, NotificationType.INFO);
}

export function showSuccess(text: string) {
    notify(text, NotificationType.SUCCESS);
}

export function showWarning(text: string) {
    notify(text, NotificationType.WARNING);
}

export function showError(text: string) {
    notify(text, NotificationType.ERROR);
}
