import { useEffect } from 'react';
import { stringify } from 'query-string';
import { getAllUsers } from '../store/thunks/users.thunk';
import { STATUS } from '../constant/status.const';
import { useAppDispatch, useAppSelector } from '../types/hooks.type';
import type { UseFilteredUsersType } from '../types/hooks.type';

export const useFilteredUsers: UseFilteredUsersType = (filterData) => {
  const dispatch = useAppDispatch();

  const { users, usersStatus, pagesCount } = useAppSelector((state) => ({
    users: state.usersData.users,
    pagesCount: state.usersData.pagesCount,
    usersStatus: state.usersData.status
  }));

  useEffect(() => {
    if (usersStatus === STATUS.IDLE) {
      dispatch(getAllUsers());
    }
  }, [dispatch, users, usersStatus]);

  useEffect(() => {
    if (usersStatus === STATUS.SUCCESS && filterData) {
      const filterParams = stringify(filterData, {
        skipEmptyString: true,
        skipNull: true
      });
      const filterUrl = `?${filterParams}`;
      dispatch(getAllUsers(filterUrl));
    }
  }, [dispatch, filterData]);

  return { users, usersStatus, pagesCount };
};
