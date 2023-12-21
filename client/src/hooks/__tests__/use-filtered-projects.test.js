import { renderHook } from '@testing-library/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useFilteredProjects } from '../use-filtered-projects';
import { getAllProjects } from '../../store/thunks/projects.thunk';
import {
  emptyProjectsMock,
  filterData,
  filteredProjectsMock,
  filterUrl
} from '../../mocks/projects.mock';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

jest.mock('../../store/thunks/projects.thunk', () => ({
  getAllProjects: jest.fn()
}));

describe('useFilteredProjects tests', () => {
  it('useFilteredProjects return information', () => {
    useSelector.mockImplementation(() => filteredProjectsMock);

    const { result } = renderHook(() => useFilteredProjects());

    expect(result.current.projects).toEqual(filteredProjectsMock.projects);
    expect(result.current.projectsStatus).toEqual(
      filteredProjectsMock.projectsStatus
    );
    expect(result.current.pagesCount).toEqual(filteredProjectsMock.pagesCount);
  });
  it('useFilteredProjects makes a request', () => {
    useSelector.mockImplementation(() => emptyProjectsMock);

    renderHook(() => useFilteredProjects());

    expect(useDispatch).toBeCalled();
    expect(getAllProjects).toBeCalled();
  });
  it('useFilteredProjects makes a request with filterData', () => {
    useSelector.mockImplementation(() => filteredProjectsMock);

    renderHook(() => useFilteredProjects(filterData));

    expect(useDispatch).toBeCalled();
    expect(getAllProjects).toBeCalledWith(filterUrl);
  });
});
