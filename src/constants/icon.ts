import { IconSources } from '@/types/icon';

const COLORED_ICONS_URL = '/icons/colored';
const DARK_ICONS_URL = '/icons/dark';
const LIGHT_ICONS_URL = '/icons/light';

export const DARK_ICON_SOURCES: IconSources = {
    home: `${DARK_ICONS_URL}/home.svg`,
    explore: `${DARK_ICONS_URL}/explore.svg`,
    notification: `${DARK_ICONS_URL}/notification.svg`,
    message: `${DARK_ICONS_URL}/message.svg`,
    bookmark: `${DARK_ICONS_URL}/bookmark.svg`,
    list: `${DARK_ICONS_URL}/list.svg`,
    profile: `${DARK_ICONS_URL}/profile.svg`,
    more: `${DARK_ICONS_URL}/more.svg`,
    chevron: `${DARK_ICONS_URL}/chevron.svg`,
    cross: `${DARK_ICONS_URL}/cross.svg`,
    trashbin: `${DARK_ICONS_URL}/trashbin.svg`,
    search: `${DARK_ICONS_URL}/search.svg`,
    likeEmpty: `${DARK_ICONS_URL}/likeEmpty.svg`,
    likeFilled: `${COLORED_ICONS_URL}/likeFilled.svg`,
    media: `${COLORED_ICONS_URL}/media.svg`,
};

export const LIGHT_ICON_SOURCES: IconSources = {
    home: `${LIGHT_ICONS_URL}/home.svg`,
    explore: `${LIGHT_ICONS_URL}/explore.svg`,
    notification: `${LIGHT_ICONS_URL}/notification.svg`,
    message: `${LIGHT_ICONS_URL}/message.svg`,
    bookmark: `${LIGHT_ICONS_URL}/bookmark.svg`,
    list: `${LIGHT_ICONS_URL}/list.svg`,
    profile: `${LIGHT_ICONS_URL}/profile.svg`,
    more: `${LIGHT_ICONS_URL}/more.svg`,
    chevron: `${LIGHT_ICONS_URL}/chevron.svg`,
    cross: `${LIGHT_ICONS_URL}/cross.svg`,
    trashbin: `${LIGHT_ICONS_URL}/trashbin.svg`,
    search: `${LIGHT_ICONS_URL}/search.svg`,
    likeEmpty: `${LIGHT_ICONS_URL}/likeEmpty.svg`,
    likeFilled: `${COLORED_ICONS_URL}/likeFilled.svg`,
    media: `${COLORED_ICONS_URL}/media.svg`,
};

export const DEFAULT_ICON_SOURCES = DARK_ICON_SOURCES;
