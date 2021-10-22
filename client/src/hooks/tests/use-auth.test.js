import { act, renderHook } from '@testing-library/react-hooks';
import { useAuth } from '../use-auth';
import { FUNC, TEST } from '../../constant/variable.const';

describe('useAuth tests', () => {
  it('useAuth exist', () => {
    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuth).toBe(false);
    expect(typeof result.current.login).toEqual(FUNC);
    expect(typeof result.current.logout).toEqual(FUNC);
  });
  it('useAuth login work', () => {
    const spyStorage = jest.spyOn(
      Object.getPrototypeOf(localStorage),
      'setItem'
    );
    const { result } = renderHook(() => useAuth());

    act(() => result.current.login(TEST));

    expect(spyStorage).toBeCalled();
    expect(result.current.isAuth).toBe(true);
  });
  it('useAuth logout work', () => {
    const spyStorage = jest.spyOn(
      Object.getPrototypeOf(localStorage),
      'removeItem'
    );
    const { result } = renderHook(() => useAuth());

    act(() => result.current.logout());

    expect(spyStorage).toBeCalled();
    expect(result.current.isAuth).toBe(false);
  });
});
