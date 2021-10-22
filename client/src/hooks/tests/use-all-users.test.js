import { act, renderHook } from '@testing-library/react-hooks';
import { useAllUsers } from '../use-all-users';
import { UsersService } from '../../services/users.service';
import { TEST } from '../../constant/variable.const';

describe('useAllUsers tests', () => {
  it('useAllUsers render', async () => {
    const spyApi = jest.spyOn(UsersService, 'getUsers');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result } = renderHook(() => useAllUsers());

    await act(() => mockRequest);

    expect(spyApi).toBeCalled();
    expect(result.current).toEqual(TEST);
  });
});
