export type UserUID = string;

export interface BaseUserInfo {
    name: string;
    phone: string;
    photo: string;
    bio: string;
    birthDate: number;
}

export interface UserInfo extends BaseUserInfo {
    email: string;
}

export interface User extends UserInfo {
    uid: UserUID;
}

export interface LoginUserInfo {
    email: string;
    password: string;
}

export interface CreateUserInfo extends BaseUserInfo, LoginUserInfo {}
