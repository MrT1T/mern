import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupsPage from './index';
import { useFilteredGroups } from '../../hooks/use-filtered-groups';
import {
  emptyGroupsMock,
  filteredGroupsMock,
  groupsMock
} from '../../mocks/groups.mock';

jest.mock('../../hooks/use-filtered-groups', () => ({
  useFilteredGroups: jest.fn()
}));

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }) =>
      children({ height: 1600, width: 1600 })
);

describe('Groups component', () => {
  it('Groups page exists', () => {
    useFilteredGroups.mockImplementation(() => filteredGroupsMock);
    render(<GroupsPage />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('Groups data null', () => {
    useFilteredGroups.mockImplementation(() => emptyGroupsMock);
    render(<GroupsPage />);
    expect(screen.getAllByRole('row')).toHaveLength(2); // table header and empty result
  });
  it('Filter data changed', () => {
    useFilteredGroups.mockImplementation(() => filteredGroupsMock);
    render(<GroupsPage />);
    const selectName = document.querySelectorAll('input')[0];
    userEvent.type(selectName, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8);
    userEvent.type(selectName, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8); // not a change
    userEvent.type(selectName, 'los{enter}');
    expect(screen.getAllByText(groupsMock[0].name)).toHaveLength(2);
  });
});
