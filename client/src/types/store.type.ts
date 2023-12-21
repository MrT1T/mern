import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import store from '../store';
import { STATUS } from '../constant/status.const';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type VoidThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export type pagesCountType = null | number;

interface SliceBasis {
  pagesCount: pagesCountType;
  status: STATUS;
  error: null | string;
}

export type ErrorPayload = Pick<SliceBasis, 'error'>;

// UsersSlice types
interface ProjectsListItem {
  name: string;
}

export interface UserBasic {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface User extends UserBasic {
  projectsList: Array<ProjectsListItem>;
}

export interface UsersSliceType extends SliceBasis {
  users: Array<User>;
}

export type UsersPayloadData = Pick<UsersSliceType, 'users' | 'pagesCount'>;

// ProjectsSlice types
export interface UsersListItem {
  username: string;
}

export interface ProjectBasic {
  projectId: number;
  name: string;
  title: string;
}

export interface Project extends ProjectBasic {
  usersList: Array<UsersListItem>;
}

export interface ProjectsSliceType extends SliceBasis {
  projects: Array<Project>;
}

export type ProjectsPayloadData = Pick<
  ProjectsSliceType,
  'projects' | 'pagesCount'
>;

export interface Item {
  name: string;
  value: string;
}
