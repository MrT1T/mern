import { UsersService } from '../../services/users.service';
import {
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../slices/users.slice';

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch(setUsersStatus('loading'));
    const data = await UsersService.getAllUsers();
    dispatch(setUsersSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user profile";
    dispatch(setUsersError({ errorMessage: error.clientMessage }));
  }
};
