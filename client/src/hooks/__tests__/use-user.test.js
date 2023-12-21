import { renderHook } from '@testing-library/react-hooks';
import { TEST } from '../../constant/variable.const';
import { useUser } from '../use-user';
import { UsersService } from '../../services/users.service';
import { userName } from '../../mocks/user-edit.mock';

describe('useUser tests', () => {
  it('useUser return information', async () => {
    const spyApi = jest.spyOn(UsersService, 'getUser');
    const mockRequest = Promise.resolve(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result, waitForNextUpdate } = renderHook(() => useUser(userName));

    await waitForNextUpdate();

    expect(spyApi).toBeCalledWith(userName);
    expect(result.current.user).toEqual(TEST);
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
  it('useUser return error', async () => {
    const spyApi = jest.spyOn(UsersService, 'getUser');
    const mockRequest = Promise.reject(TEST);
    spyApi.mockImplementation(() => mockRequest);

    const { result, waitForNextUpdate } = renderHook(() => useUser(userName));

    await waitForNextUpdate();

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toEqual(TEST);
  });
  it('useUser empty userName', async () => {
    const { result } = renderHook(() => useUser());

    expect(result.current.user).toBeNull();
    expect(result.current.isLoading).toBeFalsy();
    expect(result.current.error).toBeNull();
  });
});
