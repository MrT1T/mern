import { UsersService } from '../../services/users.service';
import {
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../slices/users.slice';
import { STATUS } from '../../constant/status.const';
import { ERROR_MESSAGES } from '../../constant/errors.const';

export const getAllUsers = (query) => async (dispatch) => {
  try {
    await dispatch(setUsersStatus(STATUS.LOADING));
    const data = await UsersService.getFilteredUsers(query);
    await dispatch(setUsersSuccess({ ...data }));
  } catch (error) {
    dispatch(setUsersError({ errorMessage: ERROR_MESSAGES.NO_USERS }));
  }
};
