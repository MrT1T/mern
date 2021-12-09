import type { GroupBasic, Item, UserBasic } from './store.type';

export interface AuthBodyType {
  email: string;
  password: string;
}
// Groups Service
export interface UpdateGroupBodyType extends GroupBasic {
  usersList: Array<string>;
}

export interface GroupDataType extends GroupBasic {
  usersList: Array<Item>;
}
export interface GroupResponseType extends GroupBasic {
  usersList: Array<Record<string, string>>;
}
// Users Service
export interface UpdateUserBodyType extends UserBasic {
  groupsList: Array<string>;
}

export interface UserDataType extends UserBasic {
  groupsList: Array<Item>;
}
export interface UserResponseType extends UserBasic {
  groupsList: Array<Record<string, string>>;
}
