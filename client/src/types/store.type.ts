import store from '../store';
import { STATUS } from '../constant/status.const';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

interface SliceBasis {
  pagesCount: null | number;
  status: STATUS;
  error: null | string;
}

export type ErrorPayload = Pick<SliceBasis, 'error'>;

// UsersSlice types
export interface UsersSliceType extends SliceBasis {
  users: [];
}

export type UsersPayloadData = Pick<UsersSliceType, 'users' | 'pagesCount'>;

// GroupsSlice types
export interface GroupsSliceType extends SliceBasis {
  groups: [];
}

export type GroupsPayloadData = Pick<GroupsSliceType, 'groups' | 'pagesCount'>;
