import {
  setGroupsError,
  setGroupsStatus,
  setGroupsSuccess
} from '../../slices/groups.slice';
import { STATUS } from '../../../constant/status.const';
import { getAllGroups } from '../groups.thunk';
import { TEST } from '../../../constant/variable.const';
import { GroupsService } from '../../../services/groups.service';
import { ERROR_MESSAGES } from '../../../constant/errors.const';

jest.mock('../../slices/groups.slice', () => ({
  setGroupsStatus: jest.fn(),
  setGroupsError: jest.fn(),
  setGroupsSuccess: jest.fn()
}));

describe('Groups thunk tests', () => {
  const dispatch = jest.fn();
  const spyApi = jest.spyOn(GroupsService, 'getFilteredGroups');
  it('Groups thunk resolve response', async () => {
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllGroups(TEST)(dispatch);
    expect(spyApi).toHaveBeenCalledWith(TEST);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setGroupsStatus).toHaveBeenCalledWith(STATUS.LOADING);
    expect(setGroupsSuccess).toHaveBeenCalledWith({ ...TEST });
  });
  it('Groups thunk reject response', async () => {
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllGroups(TEST)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setGroupsError).toHaveBeenCalledWith({
      errorMessage: ERROR_MESSAGES.NO_GROUPS
    });
  });
});
