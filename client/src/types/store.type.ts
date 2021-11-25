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

interface SliceBasis {
  pagesCount: null | number;
  status: STATUS;
  error: null | string;
}

export type ErrorPayload = Pick<SliceBasis, 'error'>;

// UsersSlice types
interface GroupsListItem {
  name: string;
}

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  groupsList: GroupsListItem[];
}

export interface UsersSliceType extends SliceBasis {
  users: User[];
}

export type UsersPayloadData = Pick<UsersSliceType, 'users' | 'pagesCount'>;

// GroupsSlice types
interface UsersListItem {
  username: string;
}

interface Group {
  name: string;
  title: string;
  usersList: UsersListItem[];
}

export interface GroupsSliceType extends SliceBasis {
  groups: Group[];
}

export type GroupsPayloadData = Pick<GroupsSliceType, 'groups' | 'pagesCount'>;
