import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {
  AppDispatch,
  Group,
  RootState,
  User,
  pagesCount
} from './store.type';
import { STATUS } from '../constant/status.const';
import type { GroupFetchType, UserFetchType } from './services.type';

export const useAppDispatch: { (): AppDispatch } = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface AuthHookType {
  login: (arg: string) => void;
  logout: () => void;
  isAuth: boolean;
}

export interface UseDebouncedType {
  (func: () => void, delay: number): () => void;
}

export interface UseFilteredGroupsType {
  (filterData: Group): {
    groups: Group[];
    groupsStatus: STATUS;
    pagesCount: pagesCount;
  };
}
export interface UseFilteredUsersType {
  (filterData: User): {
    users: User[];
    usersStatus: STATUS;
    pagesCount: pagesCount;
  };
}

interface FetchDataType {
  isLoading: boolean;
  error: string | null;
}

interface ReturnUseGroup extends FetchDataType {
  group: GroupFetchType | null;
}
interface ReturnUseUser extends FetchDataType {
  user: UserFetchType | null;
}

export interface UseGroupType {
  (groupName?: string): ReturnUseGroup;
}
export interface UseUserType {
  (username?: string): ReturnUseUser;
}
export interface UseNextPage {
  (
    count: pagesCount,
    currentPage: pagesCount,
    list: Array<GroupFetchType | UserFetchType>
  ): boolean;
}
