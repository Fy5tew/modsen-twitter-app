export enum Routes {
    HOME = '/',
    AUTH = '/auth',
    LOGIN = `${Routes.AUTH}/login`,
    SIGNUP = `${Routes.AUTH}/signup`,
    PROFILE = '/profile',
}
