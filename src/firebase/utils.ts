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

export const postTweet = APIRequest(api.postTweet, "You've posted tweet!");

export const deleteTweet = APIRequest(api.deleteTweet, "You've deleted tweet!");

export const addTweetLike = APIRequest(api.addTweetLike, "You've liked tweet!");

export const removeTweetLike = APIRequest(
    api.removeTweetLike,
    "You've unliked tweet!"
);

export const getFeed = APIRequest(api.getFeed);

export const searchTweets = APIRequest(api.searchTweets);
