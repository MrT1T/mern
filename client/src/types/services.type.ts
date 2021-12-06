import type { GroupBasic, Item } from './store.type';

export interface AuthBodyType {
  email: string;
  password: string;
}
// Groups Service
export interface UpdateGroupBodyType extends GroupBasic {
  usersList: Array<string>;
}

export interface GroupFetchType extends GroupBasic {
  usersList: Array<Item>;
}
export interface GroupResponseType extends GroupBasic {
  usersList: Array<Record<string, string>>;
}
// Users Service
export interface UpdateUserBodyType extends GroupBasic {
  groupsList: Array<string>;
}

export interface UserFetchType extends GroupBasic {
  groupsList: Array<Item>;
}
export interface UserResponseType extends GroupBasic {
  groupsList: Array<Record<string, string>>;
}
