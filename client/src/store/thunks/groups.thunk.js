import {
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../slices/groups.slice';
import { GroupsService } from '../../services/groups.service';
import { STATUS } from '../../constant/status.const';

export const getAllGroups = (query) => async (dispatch) => {
  try {
    dispatch(setGroupsStatus(STATUS.LOADING));
    const data = await GroupsService.getAllGroups(query);
    dispatch(setGroupsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user user-edit";
    dispatch(setGroupsError({ errorMessage: error.clientMessage }));
  }
};
