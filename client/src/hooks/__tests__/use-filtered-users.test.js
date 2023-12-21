import { renderHook } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { filterData, filterUrl } from '../../mocks/projects.mock';
import { emptyUsersMock, filteredUsersMock } from '../../mocks/users.mock';
import { useFilteredUsers } from '../use-filtered-users';
import { getAllUsers } from '../../store/thunks/users.thunk';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../store/thunks/users.thunk', () => ({
  getAllUsers: jest.fn()
}));

describe('useFilteredUsers tests', () => {
  it('useFilteredUsers return information', () => {
    useSelector.mockImplementation(() => filteredUsersMock);

    const { result } = renderHook(() => useFilteredUsers());

    expect(result.current.users).toEqual(filteredUsersMock.users);
    expect(result.current.usersStatus).toEqual(filteredUsersMock.usersStatus);
    expect(result.current.pagesCount).toEqual(filteredUsersMock.pagesCount);
  });
  it('useFilteredUsers makes a request', () => {
    useSelector.mockImplementation(() => emptyUsersMock);

    renderHook(() => useFilteredUsers());

    expect(useDispatch).toBeCalled();
    expect(getAllUsers).toBeCalled();
  });
  it('useFilteredUsers makes a request with filterData', () => {
    useSelector.mockImplementation(() => filteredUsersMock);

    renderHook(() => useFilteredUsers(filterData));

    expect(useDispatch).toBeCalled();
    expect(getAllUsers).toBeCalledWith(filterUrl);
  });
});
