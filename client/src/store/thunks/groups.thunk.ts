import {
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../slices/groups.slice';
import { GroupsService } from '../../services/groups.service';
import { STATUS } from '../../constant/status.const';
import { ERROR_MESSAGES } from '../../constant/errors.const';
import type { AppDispatch, VoidThunk } from '../../types/store.type';

export const getAllGroups =
  (query: string): VoidThunk =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setGroupsStatus(STATUS.LOADING));
      const data = await GroupsService.getFilteredGroups(query);
      dispatch(setGroupsSuccess({ ...data }));
    } catch (error) {
      dispatch(setGroupsError({ error: ERROR_MESSAGES.NO_GROUPS }));
    }
  };
