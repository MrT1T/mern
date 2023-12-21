import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { useDispatch } from 'react-redux';
import ProjectEditPage from '../index';
import { useProject } from '../../../hooks/use-project';
import {
  allUsersMock,
  projectEmptyMock,
  projectErrorMock,
  projectLoadingMock,
  projectMock,
  projectName
} from '../../../mocks/project-edit.mock';
import { useAllUsers } from '../../../hooks/use-all-users';
import { ERROR_MESSAGES } from '../../../constant/errors.const';
import { PAGES_LINKS } from '../../../constant/links.const';
import { ProjectsService } from '../../../services/projects.service';
import notificationCreator from '../../../helpers/notification.helper';
import { resetStore } from '../../../store/thunks/reset-store.thunk';
import { TEST } from '../../../constant/variable.const';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('../../../hooks/use-project', () => ({
  useProject: jest.fn()
}));

jest.mock('../../../hooks/use-all-users', () => ({
  useAllUsers: jest.fn()
}));

jest.mock('../../../store/thunks/reset-store.thunk', () => ({
  resetStore: jest.fn()
}));

describe('Project edit component', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => projectName);
    useAllUsers.mockImplementation(() => allUsersMock);
  });

  it('Project edit page exists', () => {
    useProject.mockImplementation(() => projectMock);
    render(<ProjectEditPage />);
    expect(screen.getByTestId('editHeader')).toBeInTheDocument();
    expect(screen.getByTestId('editContainer')).toBeInTheDocument();
  });
  it('Project loading error ', () => {
    useProject.mockImplementation(() => projectErrorMock);
    render(<ProjectEditPage />);
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });
  it('Project loading', () => {
    useProject.mockImplementation(() => projectLoadingMock);
    render(<ProjectEditPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  it('Change user list', () => {
    const testUser = allUsersMock[0].name;
    useProject.mockImplementation(() => projectMock);
    render(<ProjectEditPage />);
    expect(screen.getAllByTestId('card')).toHaveLength(3);
    userEvent.click(screen.getAllByRole('button')[1]); // delete user from userList
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    const addUser = screen.getByText('Add User');
    userEvent.type(addUser, '{backspace}'); // not adding user to userList
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    userEvent.type(addUser, TEST);
    userEvent.click(screen.getByText(testUser)); // adding user to userList
    expect(screen.getAllByTestId('card')).toHaveLength(3);
  });
  it('Error with empty required field', () => {
    useProject.mockImplementation(() => projectEmptyMock);
    render(<ProjectEditPage />);
    userEvent.click(screen.getByText(/save/i)); // click to save button
    expect(screen.getByText(ERROR_MESSAGES.NAME_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGES.TITLE_REQUIRED)).toBeInTheDocument();
  });
  it('Project update successful response', async () => {
    const history = createMemoryHistory();
    useProject.mockImplementation(() => projectMock);
    useDispatch.mockImplementation(() => jest.fn());
    render(
      <Router history={history}>
        <ProjectEditPage />
      </Router>
    );
    const spyApi = jest.spyOn(ProjectsService, 'updateProject');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnSuccess');
    const mockRequest = jest.fn(() => Promise.resolve());
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    expect(spyApi).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
      expect(resetStore).toBeCalled();
    });
    expect(history.location.pathname).toEqual(PAGES_LINKS.PROJECTS);
  });
  it('Project update error response', async () => {
    useProject.mockImplementation(() => projectMock);
    render(<ProjectEditPage />);
    const spyApi = jest.spyOn(ProjectsService, 'updateProject');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnFailure');
    const mockRequest = jest.fn(() => Promise.reject(new Error()));
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
    });
  });
});
