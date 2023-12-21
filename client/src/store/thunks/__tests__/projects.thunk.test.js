import {
  setProjectsError,
  setProjectsStatus,
  setProjectsSuccess
} from '../../slices/projects.slice';
import { STATUS } from '../../../constant/status.const';
import { getAllProjects } from '../projects.thunk';
import { TEST } from '../../../constant/variable.const';
import { ProjectsService } from '../../../services/projects.service';
import { ERROR_MESSAGES } from '../../../constant/errors.const';

jest.mock('../../slices/projects.slice', () => ({
  setProjectsStatus: jest.fn(),
  setProjectsError: jest.fn(),
  setProjectsSuccess: jest.fn()
}));

describe('Projects thunk tests', () => {
  const dispatch = jest.fn();
  const spyApi = jest.spyOn(ProjectsService, 'getFilteredProjects');
  it('Projects thunk resolve response', async () => {
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllProjects(TEST)(dispatch);
    expect(spyApi).toHaveBeenCalledWith(TEST);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setProjectsStatus).toHaveBeenCalledWith(STATUS.LOADING);
    expect(setProjectsSuccess).toHaveBeenCalledWith({ ...TEST });
  });
  it('Projects thunk reject response', async () => {
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);
    await getAllProjects(TEST)(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(setProjectsError).toHaveBeenCalledWith({
      error: ERROR_MESSAGES.NO_PROJECTS
    });
  });
});
