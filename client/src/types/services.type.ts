import type { ProjectBasic, Item, UserBasic } from './store.type';

export interface AuthBodyType {
  email: string;
  password: string;
}
// Projects Service
export interface UpdateProjectBodyType extends ProjectBasic {
  usersList: Array<string>;
}

export interface ProjectDataType extends ProjectBasic {
  usersList: Array<Item>;
}
export interface ProjectResponseType extends ProjectBasic {
  usersList: Array<Record<string, string>>;
}
// Users Service
export interface UpdateUserBodyType extends UserBasic {
  projectsList: Array<string>;
}

export interface UserDataType extends UserBasic {
  projectsList: Array<Item>;
}
export interface UserResponseType extends UserBasic {
  projectsList: Array<Record<string, string>>;
}
