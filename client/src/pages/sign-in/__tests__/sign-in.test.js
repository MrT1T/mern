import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import SignIn from '../index';
import { ERROR_MESSAGES } from '../../../constant/errors.const';
import { AuthService } from '../../../services/auth.service';
import { PAGES_LINKS } from '../../../constant/links.const';
import notificationCreator from '../../../helpers/notification.helper';

describe('Sign in component', () => {
  const emailData = 'mail@gmail.com';
  const passwordData = '12345678';

  it('Sign in page exists', () => {
    render(<SignIn />);
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(document.querySelector('svg')).toBeInTheDocument();
    expect(document.querySelectorAll('input')).toHaveLength(2);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
  });
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
  it('Email, Password error are exist', () => {
    render(<SignIn />);
    const button = screen.getByRole('button');
    userEvent.click(button);
    expect(screen.getByText(ERROR_MESSAGES.EMAIL_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGES.PASSWORD_REQUIRED)).toBeTruthy();
    userEvent.type(
      document.getElementsByName('email')[0],
      'line length is more than 30 symbols!!!'
    );
    userEvent.click(button);
    expect(screen.getByText(ERROR_MESSAGES.MAX_LENGTH)).toBeTruthy();
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
