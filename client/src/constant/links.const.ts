import { apiUrl } from './api.const';
import { StringObject } from '../types/objects.type';

export const PAGES_LINKS: StringObject = {
  USERS: '/users',
  PROFILE: '/user/',
  GROUPS: '/groups',
  GROUP: '/group/',
  NOTFOUND: '/not-found'
};

export const API_LINKS: StringObject = {
  SING_IN: `${apiUrl}auth/signin`,
  FILTERED_GROUPS: 'group/filter/',
  FILTERED_USERS: 'user/filter/',
  UPDATE_GROUPS: 'group/update',
  UPDATE_USERS: 'user/update',
  GROUP: 'group/',
  USER: 'user/',
  ALL_GROUPS: 'group/all',
  ALL_USERS: 'user/all'
};
