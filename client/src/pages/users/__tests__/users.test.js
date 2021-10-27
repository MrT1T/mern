import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UsersPage from '../index';
import { useFilteredUsers } from '../../../hooks/use-filtered-users';
import {
  filteredUsersMock,
  emptyUsersMock,
  usersMock
} from '../../../mocks/users.mock';

jest.mock('../../../hooks/use-filtered-users', () => ({
  useFilteredUsers: jest.fn()
}));

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }) =>
      children({ height: 1600, width: 1600 })
);

describe('Groups component', () => {
  it('Users page exists', () => {
    useFilteredUsers.mockImplementation(() => filteredUsersMock);
    render(<UsersPage />);
    expect(screen.getByTestId('filter')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });
  it('Users data null', () => {
    useFilteredUsers.mockImplementation(() => emptyUsersMock);
    render(<UsersPage />);
    expect(screen.getAllByRole('row')).toHaveLength(2); // table header and empty result
  });
  it('Users data filter changed', () => {
    useFilteredUsers.mockImplementation(() => filteredUsersMock);
    render(<UsersPage />);
    const selectUsername = document.querySelectorAll('input')[0];
    userEvent.type(selectUsername, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8);
    userEvent.type(selectUsername, '{backspace}');
    expect(screen.getAllByRole('row')).toHaveLength(8); // not a change
    userEvent.type(selectUsername, 'Bris{enter}');
    expect(screen.getAllByText(usersMock[0].username)).toHaveLength(2);
  });
});
