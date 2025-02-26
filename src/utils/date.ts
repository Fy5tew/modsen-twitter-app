import { Option } from '@/components/Select';
import { MAX_AGE, MAX_DATE_DAY, MIN_AGE } from '@/constants/validation';

export function isValidDay(day: number, month: number, year: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    return day >= 1 && day <= daysInMonth;
}

export function calculateAge(day: number, month: number, year: number) {
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        return age - 1;
    }

    return age;
}

export function getMonthSelectOptions(): Option[] {
    return [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ].map((month, idx) => ({ title: month, value: idx + 1 }));
}

export function getDaySelectOptions(): Option[] {
    return Array.from({ length: MAX_DATE_DAY }, (_, index) => ({
        title: (index + 1).toString().padStart(2, '0'),
        value: index + 1,
    }));
}

export function getYearSelectOptions(
    startYear: number,
    endYear: number
): Option[] {
    return Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
        title: (startYear + index).toString(),
        value: startYear + index,
    })).toReversed();
}

export function getBirthYearSelectOptions() {
    const endYear = new Date().getFullYear() - MIN_AGE;
    const startYear = endYear - MAX_AGE;
    return getYearSelectOptions(startYear, endYear);
}

export function dateToSelectValues(date?: number) {
    if (!date) return { month: 0, day: 0, year: 0 };
    return {
        month: new Date(date).getMonth() + 1,
        day: new Date(date).getDate(),
        year: new Date(date).getFullYear(),
    };
}
