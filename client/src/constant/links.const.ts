import { apiUrl } from './api.const';

export const PAGES_LINKS = {
  USERS: '/users',
  PROFILE: '/user/',
  PROJECTS: '/projects',
  PROJECT: '/project/',
  NOTFOUND: '/not-found'
} as const;

export const API_LINKS = {
  SING_IN: `${apiUrl}auth/signin`,
  FILTERED_PROJECTS: 'project/filter/',
  FILTERED_USERS: 'user/filter/',
  UPDATE_PROJECTS: 'project/update',
  UPDATE_USERS: 'user/update',
  PROJECT: 'project/',
  USER: 'user/',
  ALL_PROJECTS: 'project/all',
  ALL_USERS: 'user/all'
} as const;
