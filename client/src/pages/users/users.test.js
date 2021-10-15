import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersPage from './index';
import { useFilteredUsers } from '../../hooks/use-filtered-users';
import { filteredUsersMock } from '../../mocks/users.mock';

jest.mock('../../hooks/use-filtered-users', () => ({
  useFilteredUsers: jest.fn()
}));

describe('Groups component', () => {
  beforeEach(() => {
    useFilteredUsers.mockImplementation(() => filteredUsersMock);
    render(
      <div
        style={{ display: 'flex', flexDirection: 'column', height: '3000px' }}
      >
        <UsersPage />
      </div>
    );
  });

  it('Users page exists', () => {
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('Users data filter changed', () => {
    jest.mock('../../hooks/use-debounced', () => ({
      useDebounced:
        (func) =>
        (...args) =>
          func(...args)
    }));
    const selectUsername = document.querySelectorAll('input')[0];
    userEvent.type(selectUsername, 'Bris');
    const label = 'Brisa_Will';
    userEvent.click(screen.getByText(label));
    expect(screen.getByText(label)).toBeTruthy();
  });
});
