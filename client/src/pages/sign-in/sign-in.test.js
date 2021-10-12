import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignIn from './index';
import { ERROR_MESSAGES } from '../../constant/errors.const';
import { AuthService } from '../../services/auth.service';
import { PAGES_LINKS } from '../../constant/links.const';
import notificationCreator from '../../helpers/notification.helper';

describe('Sign in component view', () => {
  beforeEach(() => render(<SignIn />));

  it('Sign in page exists', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });
  it('Name page exists', () => {
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });
  it('Lock icon exists', () => {
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
  it('Component has 2 inputs', () => {
    expect(document.querySelectorAll('input')).toHaveLength(2);
  });
  it('Button exists', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('Component has 2 links', () => {
    expect(screen.getAllByRole('link')).toHaveLength(2);
  });
  it('Copyright exists', () => {
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
});

describe('Sign in component logic', () => {
  const emailData = 'mail@gmail.com';
  const passwordData = '12345678';

  it('Change email data', () => {
    render(<SignIn />);
    const email = document.getElementsByName('email')[0];
    userEvent.type(email, emailData);
    expect(screen.getByDisplayValue(emailData)).toBeInTheDocument();
  });
  it('Change password data', () => {
    render(<SignIn />);
    const password = document.getElementsByName('password')[0];
    userEvent.type(password, passwordData);
    expect(password.value).toEqual(passwordData);
  });
  it('Button click one time', () => {
    render(<SignIn />);
    const mockHandler = jest.fn();
    const button = screen.getByRole('button');
    button.onclick = mockHandler;
    userEvent.click(button);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });
  it('Email error are exist', () => {
    render(<SignIn />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByText(ERROR_MESSAGES.EMAIL_REQUIRED)).toBeInTheDocument();
  });
  it('Password error are exist', () => {
    render(<SignIn />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByText(ERROR_MESSAGES.PASSWORD_REQUIRED)).toBeTruthy();
  });
  it('Sign in to the application', async () => {
    const history = createMemoryHistory();

    const mockLogin = jest.fn();

    render(
      <Router history={history}>
        <SignIn login={mockLogin} />
      </Router>
    );

    const spyFunc = jest.spyOn(AuthService, 'signIn');
    const mockPost = jest.fn(() => Promise.resolve({ token: '222' }));
    spyFunc.mockImplementation(mockPost);
    const email = document.getElementsByName('email')[0];
    userEvent.type(email, emailData);
    const password = document.getElementsByName('password')[0];
    userEvent.type(password, passwordData);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(spyFunc).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(mockLogin).toBeCalled());
    expect(history.location.pathname).toEqual(PAGES_LINKS.USERS);
  });
  it('Access error to the application', async () => {
    render(<SignIn />);
    const spyFunc = jest.spyOn(AuthService, 'signIn');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnFailure');
    const mockPost = jest.fn(() => Promise.reject(new Error()));
    spyFunc.mockImplementationOnce(mockPost);
    const email = document.getElementsByName('email')[0];
    userEvent.type(email, emailData);
    const password = document.getElementsByName('password')[0];
    userEvent.type(password, passwordData);
    const button = screen.getByRole('button');
    userEvent.click(button);
    await waitFor(() => expect(spyNotification).toHaveBeenCalledTimes(1));
  });
});
