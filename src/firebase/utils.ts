import * as api from './api';
import { APIRequest } from './APIRequest';

export const createUser = APIRequest(api.createUser, "You've signed up!");

export const updateUserInfo = APIRequest(
    api.updateUserInfo,
    "You\'ve updated profile!"
);

export const loginByEmail = APIRequest(api.loginByEmail, "You've logged in!");

export const loginByGoogle = APIRequest(
    api.loginByGoogle,
    "You've logged in with Google!"
);

export const logout = APIRequest(api.logout, "You've logded out!");
