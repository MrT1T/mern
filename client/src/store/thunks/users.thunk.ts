import { UsersService } from '../../services/users.service';
import {
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../slices/users.slice';
import { STATUS } from '../../constant/status.const';
import { ERROR_MESSAGES } from '../../constant/errors.const';
import type { AppDispatch } from '../../types/store.type';

export const getAllUsers = (query: string) => async (dispatch: AppDispatch) => {
  try {
    await dispatch(setUsersStatus(STATUS.LOADING));
    const data = await UsersService.getFilteredUsers(query);
    await dispatch(setUsersSuccess({ ...data }));
  } catch (error) {
    dispatch(setUsersError({ error: ERROR_MESSAGES.NO_USERS }));
  }
};
