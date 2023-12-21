import { renderHook } from '@testing-library/react-hooks';
import { ProjectsService } from '../../services/projects.service';
import { TEST } from '../../constant/variable.const';
import { useProject } from '../use-project';
import { projectName } from '../../mocks/project-edit.mock';

describe('useProject tests', () => {
  it('useProject return information', async () => {
    const spyApi = jest.spyOn(ProjectsService, 'getProject');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result, waitForNextUpdate } = renderHook(() =>
      useProject(projectName)
    );

    await waitForNextUpdate();

    expect(spyApi).toBeCalledWith(projectName);
    expect(result.current.project).toEqual(TEST);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
  it('useProject return error', async () => {
    const spyApi = jest.spyOn(ProjectsService, 'getProject');
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result, waitForNextUpdate } = renderHook(() =>
      useProject(projectName)
    );

    await waitForNextUpdate();

    expect(result.current.project).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toEqual(TEST);
  });
  it('useProject empty projectName', async () => {
    const { result } = renderHook(() => useProject());

    expect(result.current.project).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
});
