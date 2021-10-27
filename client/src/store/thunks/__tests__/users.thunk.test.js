import {
  setUsersError,
  setUsersStatus,
  setUsersSuccess
} from '../../slices/users.slice';
import { STATUS } from '../../../constant/status.const';
import { getAllUsers } from '../users.thunk';
import { TEST } from '../../../constant/variable.const';
import { UsersService } from '../../../services/users.service';
import { ERROR_MESSAGES } from '../../../constant/errors.const';

jest.mock('../../slices/users.slice', () => ({
  setUsersStatus: jest.fn(),
  setUsersSuccess: jest.fn(),
  setUsersError: jest.fn()
}));

describe('Users thunk tests', () => {
  const dispatch = jest.fn();
  const spyApi = jest.spyOn(UsersService, 'getFilteredUsers');
  it('Users thunk resolve response', async () => {
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllUsers(TEST)(dispatch);
    expect(spyApi).toHaveBeenCalledWith(TEST);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setUsersStatus).toHaveBeenCalledWith(STATUS.LOADING);
    expect(setUsersSuccess).toHaveBeenCalledWith({ ...TEST });
  });
  it('Users thunk reject response', async () => {
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllUsers(TEST)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setUsersError).toHaveBeenCalledWith({
      errorMessage: ERROR_MESSAGES.NO_USERS
    });
  });
});
