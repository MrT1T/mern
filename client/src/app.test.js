import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import App from './App';
import { useAuth } from './hooks/use-auth';
import { authMockAuthorized, authMockUnauthorized } from './mocks/app.mock';
import { PAGES_LINKS } from './constant/links.const';
import store from './store';

jest.mock('./hooks/use-auth', () => ({
  useAuth: jest.fn()
}));

describe('App component', () => {
  const history = createMemoryHistory();

  it('App component work', () => {
    useAuth.mockImplementation(() => authMockUnauthorized);
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(useAuth).toBeCalled();
    expect(history.location.pathname).toEqual('/');
  });
  it('Unauthorized', () => {
    useAuth.mockImplementation(() => authMockUnauthorized);
    render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(
      screen.getByRole('heading', { name: 'Sign in' })
    ).toBeInTheDocument();
  });
  it('Authorized and test routes', () => {
    useAuth.mockImplementation(() => authMockAuthorized);
    render(
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
    userEvent.click(screen.getByRole('tab', { name: 'Users' }));
    expect(history.location.pathname).toEqual(PAGES_LINKS.USERS);
    userEvent.click(screen.getByRole('tab', { name: 'Groups' }));
    expect(history.location.pathname).toEqual(PAGES_LINKS.GROUPS);
  });
});
