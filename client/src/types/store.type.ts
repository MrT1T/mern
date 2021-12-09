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
interface GroupsListItem {
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
  groupsList: Array<GroupsListItem>;
}

export interface UsersSliceType extends SliceBasis {
  users: Array<User>;
}

export type UsersPayloadData = Pick<UsersSliceType, 'users' | 'pagesCount'>;

// GroupsSlice types
export interface UsersListItem {
  username: string;
}

export interface GroupBasic {
  groupId: number;
  name: string;
  title: string;
}

export interface Group extends GroupBasic {
  usersList: Array<UsersListItem>;
}

export interface GroupsSliceType extends SliceBasis {
  groups: Array<Group>;
}

export type GroupsPayloadData = Pick<GroupsSliceType, 'groups' | 'pagesCount'>;

export interface Item {
  name: string;
  value: string;
}
