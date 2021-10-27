import {
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../slices/groups.slice';
import { GroupsService } from '../../services/groups.service';
import { STATUS } from '../../constant/status.const';
import { ERROR_MESSAGES } from '../../constant/errors.const';

export const getAllGroups = (query) => async (dispatch) => {
  try {
    dispatch(setGroupsStatus(STATUS.LOADING));
    const data = await GroupsService.getFilteredGroups(query);
    dispatch(setGroupsSuccess({ ...data }));
  } catch (error) {
    dispatch(setGroupsError({ errorMessage: ERROR_MESSAGES.NO_GROUPS }));
  }
};
