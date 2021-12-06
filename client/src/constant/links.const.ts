import { apiUrl } from './api.const';

export const PAGES_LINKS = {
  USERS: '/users',
  PROFILE: '/user/',
  GROUPS: '/groups',
  GROUP: '/group/',
  NOTFOUND: '/not-found'
} as const;

export const API_LINKS = {
  SING_IN: `${apiUrl}auth/signin`,
  FILTERED_GROUPS: 'group/filter/',
  FILTERED_USERS: 'user/filter/',
  UPDATE_GROUPS: 'group/update',
  UPDATE_USERS: 'user/update',
  GROUP: 'group/',
  USER: 'user/',
  ALL_GROUPS: 'group/all',
  ALL_USERS: 'user/all'
} as const;
