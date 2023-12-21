import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type {
  AppDispatch,
  Project,
  RootState,
  User,
  pagesCountType
} from './store.type';
import { STATUS } from '../constant/status.const';
import type { ProjectDataType, UserDataType } from './services.type';
import type { onInputChangeDelayType } from './func.type';
import type { ProjectsFilterDataType, UsersFilterDataType } from './pages.type';

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

export interface UseFilteredProjectsType {
  (filterData: ProjectsFilterDataType): {
    projects: Project[];
    projectsStatus: STATUS;
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

interface ReturnUseProject extends FetchDataType {
  project: ProjectDataType | null;
}
interface ReturnUseUser extends FetchDataType {
  user: UserDataType | null;
}

export interface UseProjectType {
  (projectName?: string): ReturnUseProject;
}
export interface UseUserType {
  (username?: string): ReturnUseUser;
}
export interface UseNextPage {
  (
    count: pagesCountType,
    currentPage: pagesCountType,
    list: Array<Project | User>
  ): boolean;
}
