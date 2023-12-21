import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { useDispatch } from 'react-redux';
import { useUser } from '../../../hooks/use-user';
import { useAllProjects } from '../../../hooks/use-all-projects';
import { ERROR_MESSAGES } from '../../../constant/errors.const';
import { PAGES_LINKS } from '../../../constant/links.const';
import notificationCreator from '../../../helpers/notification.helper';
import { resetStore } from '../../../store/thunks/reset-store.thunk';
import UserEditPage from '../index';
import {
  allProjectsMock,
  userErrorsMock,
  userErrorMock,
  userLoadingMock,
  userMock,
  userName
} from '../../../mocks/user-edit.mock';
import { UsersService } from '../../../services/users.service';
import { TEST } from '../../../constant/variable.const';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('../../../hooks/use-user', () => ({
  useUser: jest.fn()
}));

jest.mock('../../../hooks/use-all-projects', () => ({
  useAllProjects: jest.fn()
}));

jest.mock('../../../store/thunks/reset-store.thunk', () => ({
  resetStore: jest.fn()
}));

describe('User edit component', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => userName);
    useAllProjects.mockImplementation(() => allProjectsMock);
  });

  it('User edit page exists', () => {
    useUser.mockImplementation(() => userMock);
    render(<UserEditPage />);
    expect(screen.getByTestId('editHeader')).toBeInTheDocument();
    expect(screen.getByTestId('editContainer')).toBeInTheDocument();
  });
  it('User loading error ', () => {
    useUser.mockImplementation(() => userErrorMock);
    render(<UserEditPage />);
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });
  it('User loading', () => {
    useUser.mockImplementation(() => userLoadingMock);
    render(<UserEditPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  it('Change project list', () => {
    const testProject = allProjectsMock[0].name;
    useUser.mockImplementation(() => userMock);
    render(<UserEditPage />);
    expect(screen.getAllByTestId('card')).toHaveLength(3);
    userEvent.click(screen.getAllByRole('button')[1]); // delete project from projectsList
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    const addProject = screen.getByText('Add Project');
    userEvent.type(addProject, '{backspace}'); // not adding project to projectsList
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    userEvent.type(addProject, TEST);
    userEvent.click(screen.getByText(testProject)); // adding project to projectsList
    expect(screen.getAllByTestId('card')).toHaveLength(3);
  });
  it('Error field on UserEditPage', () => {
    useUser.mockImplementation(() => userErrorsMock);
    render(<UserEditPage />);
    userEvent.click(screen.getByText(/save/i)); // click to save button
    expect(screen.getByText(ERROR_MESSAGES.USERNAME_REQUIRED)).toBeTruthy();
    expect(screen.getByText(ERROR_MESSAGES.FIRSTNAME_REQUIRED)).toBeTruthy();
    expect(screen.getByText(ERROR_MESSAGES.LASTNAME_REQUIRED)).toBeTruthy();
    expect(screen.getByText(ERROR_MESSAGES.EMAIL_NOT_VALID)).toBeTruthy();
  });
  it('User update successful response', async () => {
    const history = createMemoryHistory();
    useUser.mockImplementation(() => userMock);
    useDispatch.mockImplementation(() => jest.fn());
    render(
      <Router history={history}>
        <UserEditPage />
      </Router>
    );
    const spyApi = jest.spyOn(UsersService, 'updateUser');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnSuccess');
    const mockRequest = jest.fn(() => Promise.resolve());
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    expect(spyApi).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
      expect(resetStore).toBeCalled();
    });
    expect(history.location.pathname).toEqual(PAGES_LINKS.USERS);
  });
  it('User update error response', async () => {
    useUser.mockImplementation(() => userMock);
    render(<UserEditPage />);
    const spyApi = jest.spyOn(UsersService, 'updateUser');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnFailure');
    const mockRequest = jest.fn(() => Promise.reject(new Error()));
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
    });
  });
});
