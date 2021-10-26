import { act, renderHook } from '@testing-library/react-hooks';
import { GroupsService } from '../../services/groups.service';
import { TEST } from '../../constant/variable.const';
import { useGroup } from '../use-group';
import { groupName } from '../../mocks/group-edit.mock';

describe('useGroup tests', () => {
  it('useGroup return information', async () => {
    const spyApi = jest.spyOn(GroupsService, 'getGroup');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result } = renderHook(() => useGroup(groupName));

    await act(() => mockRequest);

    expect(spyApi).toBeCalledWith(groupName);
    expect(result.current.group).toEqual(TEST);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
  it('useGroup return error', async () => {
    const spyApi = jest.spyOn(GroupsService, 'getGroup');
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result, waitForNextUpdate } = renderHook(() => useGroup(groupName));

    await waitForNextUpdate();

    expect(result.current.group).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toEqual(TEST);
  });
  it('useGroup empty groupName', async () => {
    const { result } = renderHook(() => useGroup());

    expect(result.current.group).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
});
