import { act, renderHook } from '@testing-library/react-hooks';
import { useAllGroups } from '../use-all-groups';
import { GroupsService } from '../../services/groups.service';
import { TEST } from '../../constant/variable.const';

describe('useAllGroups tests', () => {
  it('useAllGroups render', async () => {
    const spyApi = jest.spyOn(GroupsService, 'getGroups');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result } = renderHook(() => useAllGroups());

    await act(() => mockRequest);

    expect(spyApi).toBeCalled();
    expect(result.current).toEqual(TEST);
  });
});
