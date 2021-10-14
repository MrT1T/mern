import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GroupsPage from './index';
import { useFilteredGroups } from '../../hooks/use-filtered-groups';
import { filteredGroupsMock } from '../../mocks/groups.mock';

jest.mock('../../hooks/use-filtered-groups', () => ({
  useFilteredGroups: jest.fn()
}));

describe('Groups component', () => {
  beforeEach(() => {
    useFilteredGroups.mockImplementation(() => filteredGroupsMock);
    render(
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '3000px' }}
      >
        <GroupsPage />
      </div>
    );
  });

  it('Groups page exists', () => {
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('Filter data changed', () => {
    jest.mock('../../hooks/use-debounced', () => ({
      useDebounced:
        (func) =>
        (...args) =>
          func(...args)
    }));
    const selectName = document.querySelectorAll('input')[0];
    userEvent.type(selectName, 'los');
    const label = 'Los_Angeles';
    userEvent.click(screen.getByText(label));
    expect(screen.getByText(label)).toBeTruthy();
  });
});
