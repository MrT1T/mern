import { UsersService } from '../../services/users.service';
import {
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../slices/users.slice';
import { STATUS } from '../../constant/status.const';

export const getAllUsers = (query) => async (dispatch) => {
  try {
    await dispatch(setUsersStatus(STATUS.LOADING));
    const data = await UsersService.getFilteredUsers(query);
    await dispatch(setUsersSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user user-edit";
    dispatch(setUsersError({ errorMessage: error.clientMessage }));
  }
};
