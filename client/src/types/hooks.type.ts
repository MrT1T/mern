import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {
  AppDispatch,
  Group,
  RootState,
  User,
  pagesCountType
} from './store.type';
import { STATUS } from '../constant/status.const';
import type { GroupDataType, UserDataType } from './services.type';
import type { onInputChangeDelayType } from './func.type';
import type { GroupsFilterDataType, UsersFilterDataType } from './pages.type';

export const useAppDispatch: { (): AppDispatch } = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface AuthHookType {
  login: (arg: string) => void;
  logout: () => void;
  isAuth: boolean;
}

export interface UseDebouncedType {
  (func: onInputChangeDelayType, delay: number): () => void;
}

export interface UseFilteredGroupsType {
  (filterData: GroupsFilterDataType): {
    groups: Group[];
    groupsStatus: STATUS;
    pagesCount: pagesCountType;
  };
}
export interface UseFilteredUsersType {
  (filterData: UsersFilterDataType): {
    users: User[];
    usersStatus: STATUS;
    pagesCount: pagesCountType;
  };
}

interface FetchDataType {
  isLoading: boolean;
  error: string | null;
}

interface ReturnUseGroup extends FetchDataType {
  group: GroupDataType | null;
}
interface ReturnUseUser extends FetchDataType {
  user: UserDataType | null;
}

export interface UseGroupType {
  (groupName?: string): ReturnUseGroup;
}
export interface UseUserType {
  (username?: string): ReturnUseUser;
}
export interface UseNextPage {
  (
    count: pagesCountType,
    currentPage: pagesCountType,
    list: Array<Group | User>
  ): boolean;
}
