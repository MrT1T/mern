import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectsPage from '../index';
import { useFilteredProjects } from '../../../hooks/use-filtered-projects';
import {
  emptyProjectsMock,
  filteredProjectsMock,
  projectsMock
} from '../../../mocks/projects.mock';

jest.mock('../../../hooks/use-filtered-projects', () => ({
  useFilteredProjects: jest.fn()
}));

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }) =>
      children({ height: 1600, width: 1600 })
);

describe('Projects component', () => {
  it('Projects page exists', () => {
    useFilteredProjects.mockImplementation(() => filteredProjectsMock);
    render(<ProjectsPage />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('Projects data null', () => {
    useFilteredProjects.mockImplementation(() => emptyProjectsMock);
    render(<ProjectsPage />);
    expect(screen.getAllByRole('row')).toHaveLength(2); // table header and empty result
  });
  it('Filter data changed', () => {
    useFilteredProjects.mockImplementation(() => filteredProjectsMock);
    render(<ProjectsPage />);
    const selectName = document.querySelectorAll('input')[0];
    userEvent.type(selectName, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8);
    userEvent.type(selectName, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8); // not a change
    userEvent.type(selectName, 'los{enter}');
    expect(screen.getAllByText(projectsMock[0].name)).toHaveLength(2);
  });
});
