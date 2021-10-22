import { renderHook } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useFilteredGroups } from '../use-filtered-groups';
import { getAllGroups } from '../../store/thunks/groups.thunk';
import {
  emptyGroupsMock,
  filterData,
  filteredGroupsMock,
  filterUrl
} from '../../mocks/groups.mock';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../store/thunks/groups.thunk', () => ({
  getAllGroups: jest.fn()
}));

describe('useFilteredGroups tests', () => {
  it('useFilteredGroups return information', () => {
    useSelector.mockImplementation(() => filteredGroupsMock);

    const { result } = renderHook(() => useFilteredGroups());

    expect(result.current.groups).toEqual(filteredGroupsMock.groups);
    expect(result.current.groupsStatus).toEqual(
      filteredGroupsMock.groupsStatus
    );
    expect(result.current.pagesCount).toEqual(filteredGroupsMock.pagesCount);
  });
  it('useFilteredGroups makes a request', () => {
    useSelector.mockImplementation(() => emptyGroupsMock);

    renderHook(() => useFilteredGroups());

    expect(useDispatch).toBeCalled();
    expect(getAllGroups).toBeCalled();
  });
  it('useFilteredGroups makes a request with filterData', () => {
    useSelector.mockImplementation(() => filteredGroupsMock);

    renderHook(() => useFilteredGroups(filterData));

    expect(useDispatch).toBeCalled();
    expect(getAllGroups).toBeCalledWith(filterUrl);
  });
});
