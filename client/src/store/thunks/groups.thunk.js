import {
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../slices/groups.slice';
import { GroupsService } from '../../services/groups.service';

export const getAllGroups = () => async (dispatch) => {
  try {
    dispatch(setGroupsStatus('loading'));
    const data = await GroupsService.getAllGroups();
    dispatch(setGroupsSuccess({ data }));
  } catch (error) {
    error.clientMessage = "Can't get user profile";
    dispatch(setGroupsError({ errorMessage: error.clientMessage }));
  }
};
