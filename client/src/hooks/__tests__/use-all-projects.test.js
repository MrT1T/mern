import { act, renderHook } from '@testing-library/react-hooks';
import { useAllProjects } from '../use-all-projects';
import { ProjectsService } from '../../services/projects.service';
import { TEST } from '../../constant/variable.const';

describe('useAllProjects tests', () => {
  it('useAllProjects render', async () => {
    const spyApi = jest.spyOn(ProjectsService, 'getProjects');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result } = renderHook(() => useAllProjects());

    await act(() => mockRequest);

    expect(spyApi).toBeCalled();
    expect(result.current).toEqual(TEST);
  });
});
