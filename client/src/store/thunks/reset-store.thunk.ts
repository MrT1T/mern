import { setGroupsStatus } from '../slices/groups.slice';
import { setUsersStatus } from '../slices/users.slice';
import { STATUS } from '../../constant/status.const';
import type { AppDispatch, VoidThunk } from '../../types/store.type';

export const resetStore = (): VoidThunk => async (dispatch: AppDispatch) => {
  await dispatch(setGroupsStatus(STATUS.IDLE));
  await dispatch(setUsersStatus(STATUS.IDLE));
};
