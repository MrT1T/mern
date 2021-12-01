import { apiUrl } from './api.const';
import type { LinksObject, ApiLinksObject } from '../types/objects.type';

export const PAGES_LINKS: LinksObject = {
  USERS: '/users',
  PROFILE: (id) => `/user/${id}`,
  GROUPS: '/groups',
  GROUP: (id) => `/group/${id}`,
  NOTFOUND: '/not-found'
};

export const API_LINKS: ApiLinksObject = {
  SING_IN: `${apiUrl}auth/signin`,
  FILTERED_GROUPS: (query) => `group/filter/${query}`,
  FILTERED_USERS: (query) => `user/filter/${query}`,
  UPDATE_GROUPS: 'group/update',
  UPDATE_USERS: 'user/update',
  GROUP: (groupname) => `group/${groupname}`,
  USER: (username) => `user/${username}`,
  ALL_GROUPS: 'group/all',
  ALL_USERS: 'user/all'
};
