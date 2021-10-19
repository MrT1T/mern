import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Header from './index';

describe('Header component', () => {
  const history = createMemoryHistory();
  const logout = jest.fn();
  beforeEach(() => {
    render(
      <Router history={history}>
        <Header logout={logout} />
      </Router>
    );
  });
  it('Header exist', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  it('logout work', () => {
    userEvent.click(screen.getByRole('button', { name: 'Log Out' }));
    expect(logout).toBeCalled();
    expect(history.location.pathname).toEqual('/');
  });
});
