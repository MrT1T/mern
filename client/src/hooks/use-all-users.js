import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllUsers } from '../store/thunks/users.thunk';

export const useAllUsers = () => {
  const dispatch = useDispatch();

  const { users, usersStatus } = useSelector((state) => ({
    users: state.usersData.users,
    usersStatus: state.usersData.status
  }));

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(getAllUsers());
    }
  }, [dispatch, users, usersStatus]);

  return users;
};
