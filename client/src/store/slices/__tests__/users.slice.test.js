import usersSlice, {
  initialState,
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../users.slice';
import { STATUS } from '../../../constant/status.const';
import { ERROR_MESSAGES } from '../../../constant/errors.const';
import { usersSliceData } from '../../../mocks/users.mock';

describe('UsersSlice tests', () => {
  it('UsersSlice should return the initial state', () => {
    expect(usersSlice(undefined, {})).toEqual(initialState);
  });
  it('Users status has been changed', () => {
    expect(usersSlice(initialState, setUsersStatus(STATUS.LOADING))).toEqual({
      ...initialState,
      status: STATUS.LOADING
    });
  });
  it('Users reducer has been changed', () => {
    expect(
      usersSlice(initialState, setUsersSuccess({ ...usersSliceData }))
    ).toEqual({
      users: usersSliceData.users,
      pagesCount: usersSliceData.pagesCount,
      status: STATUS.SUCCESS,
      error: null
    });
  });
  it('Users reducer have error', () => {
    expect(
      usersSlice(
        initialState,
        setUsersError({ error: ERROR_MESSAGES.NO_USERS })
      ).error
    ).toEqual(ERROR_MESSAGES.NO_USERS);
  });
});
