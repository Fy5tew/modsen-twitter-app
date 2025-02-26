export enum Routes {
    HOME = '/',

    AUTH = '/auth',
    LOGIN = `${Routes.AUTH}/login`,
    SIGNUP = `${Routes.AUTH}/signup`,

    APP = '/app',
    PROFILE = `${Routes.APP}/profile`,
    FEED = `${Routes.APP}/feed`,
    TWEET = `${Routes.APP}/tweet`,
}
