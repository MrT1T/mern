import { setGroupsStatus } from '../slices/groups.slice';
import { setUsersStatus } from '../slices/users.slice';
import { STATUS } from '../../constant/status.const';

export const resetStore = () => async (dispatch) => {
  await dispatch(setGroupsStatus(STATUS.IDLE));
  await dispatch(setUsersStatus(STATUS.IDLE));
};
