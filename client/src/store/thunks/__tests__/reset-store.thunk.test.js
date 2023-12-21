import { setProjectsStatus } from '../../slices/projects.slice';
import { resetStore } from '../reset-store.thunk';
import { STATUS } from '../../../constant/status.const';
import { setUsersStatus } from '../../slices/users.slice';

jest.mock('../../slices/projects.slice', () => ({
  setProjectsStatus: jest.fn()
}));

jest.mock('../../slices/users.slice', () => ({
  setUsersStatus: jest.fn()
}));

describe('Reset-store thunk tests', () => {
  const dispatch = jest.fn();
  it('Reset-store all actions called', async () => {
    await resetStore()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setProjectsStatus).toHaveBeenCalledWith(STATUS.IDLE);
    expect(setUsersStatus).toHaveBeenCalledWith(STATUS.IDLE);
  });
});
