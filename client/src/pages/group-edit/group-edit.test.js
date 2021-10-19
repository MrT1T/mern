import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Router, useParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { useDispatch } from 'react-redux';
import GroupEditPage from './index';
import { useGroup } from '../../hooks/use-group';
import {
  allUsersMock,
  groupEmptyMock,
  groupErrorMock,
  groupLoadingMock,
  groupMock,
  groupName
} from '../../mocks/group-edit.mock';
import { useAllUsers } from '../../hooks/use-all-users';
import { ERROR_MESSAGES } from '../../constant/errors.const';
import { PAGES_LINKS } from '../../constant/links.const';
import { GroupsService } from '../../services/groups.service';
import notificationCreator from '../../helpers/notification.helper';
import { resetStore } from '../../store/thunks/reset-store.thunk';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn()
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}));

jest.mock('../../hooks/use-group', () => ({
  useGroup: jest.fn()
}));

jest.mock('../../hooks/use-all-users', () => ({
  useAllUsers: jest.fn()
}));

jest.mock('../../store/thunks/reset-store.thunk', () => ({
  resetStore: jest.fn()
}));

describe('Group edit component', () => {
  beforeEach(() => {
    useParams.mockImplementation(() => groupName);
    useAllUsers.mockImplementation(() => allUsersMock);
  });

  it('Group edit page exists', () => {
    useGroup.mockImplementation(() => groupMock);
    render(<GroupEditPage />);
    expect(screen.getByTestId('editHeader')).toBeInTheDocument();
    expect(screen.getByTestId('editContainer')).toBeInTheDocument();
  });
  it('Group loading error ', () => {
    useGroup.mockImplementation(() => groupErrorMock);
    render(<GroupEditPage />);
    expect(screen.getByTestId('notFound')).toBeInTheDocument();
  });
  it('Group loading', () => {
    useGroup.mockImplementation(() => groupLoadingMock);
    render(<GroupEditPage />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
  it('Change user list', () => {
    const testUser = allUsersMock[0].name;
    useGroup.mockImplementation(() => groupMock);
    render(<GroupEditPage />);
    expect(screen.getAllByTestId('card')).toHaveLength(3);
    userEvent.click(screen.getAllByRole('button')[1]); // delete user from userList
    expect(screen.getAllByTestId('card')).toHaveLength(2);
    const addUser = screen.getByText('Add User');
    userEvent.type(addUser, 'Test');
    userEvent.click(screen.getByText(testUser)); // adding user to userList
    expect(screen.getAllByTestId('card')).toHaveLength(3);
  });
  it('Error with empty required field', () => {
    useGroup.mockImplementation(() => groupEmptyMock);
    render(<GroupEditPage />);
    userEvent.click(screen.getByText(/save/i)); // click to save button
    expect(screen.getByText(ERROR_MESSAGES.NAME_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MESSAGES.TITLE_REQUIRED)).toBeInTheDocument();
  });
  it('Group update successful response', async () => {
    const history = createMemoryHistory();
    useGroup.mockImplementation(() => groupMock);
    useDispatch.mockImplementation(() => jest.fn());
    render(
      <Router history={history}>
        <GroupEditPage />
      </Router>
    );
    const spyApi = jest.spyOn(GroupsService, 'updateGroup');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnSuccess');
    const mockRequest = jest.fn(() => Promise.resolve());
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    expect(spyApi).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
      expect(resetStore).toBeCalled();
    });
    expect(history.location.pathname).toEqual(PAGES_LINKS.GROUPS);
  });
  it('Group update error response', async () => {
    useGroup.mockImplementation(() => groupMock);
    render(<GroupEditPage />);
    const spyApi = jest.spyOn(GroupsService, 'updateGroup');
    const spyNotification = jest.spyOn(notificationCreator, 'showOnFailure');
    const mockRequest = jest.fn(() => Promise.reject(new Error()));
    spyApi.mockImplementation(mockRequest);
    userEvent.click(screen.getByText(/save/i));
    await waitFor(() => {
      expect(spyNotification).toBeCalled();
    });
  });
});
