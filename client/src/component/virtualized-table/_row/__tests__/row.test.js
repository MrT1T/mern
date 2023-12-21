import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  rowEmptyMock,
  rowProjectsMock,
  rowLoadMock,
  rowUsersMock
} from '../../../../mocks/table-body.mock';
import Row from '../index';
import { PAGES_LINKS } from '../../../../constant/links.const';
import { usersMock } from '../../../../mocks/users.mock';
import { projectsMock } from '../../../../mocks/projects.mock';

describe('Row component', () => {
  it('Row exist', () => {
    render(<Row data={rowUsersMock} />);
    expect(screen.getByRole('row')).toBeInTheDocument();
  });
  it('Show result is empty and do not push to another page ', () => {
    render(<Row data={rowEmptyMock} />);
    expect(screen.getByText(/Result is empty/i)).toBeInTheDocument();
    const history = createMemoryHistory();
    const spyHistory = jest.spyOn(history, 'push');
    userEvent.click(screen.getByRole('row')); // click on empty result row
    expect(spyHistory).not.toBeCalled();
  });
  it('Show loading', () => {
    render(<Row data={rowLoadMock} />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
  it('Click and push to link', async () => {
    const history = createMemoryHistory();
    const rowIndex = 0;
    const { rerender } = render(
      <Router history={history}>
        <Row data={rowUsersMock} index={rowIndex} />
      </Router>
    );
    userEvent.click(await screen.findByRole('row')); // push to user edit
    expect(history.location.pathname).toEqual(
      `${PAGES_LINKS.PROFILE}${usersMock[rowIndex].username}`
    );
    await rerender(
      <Router history={history}>
        <Row data={rowProjectsMock} index={rowIndex} />
      </Router>
    );
    userEvent.click(screen.getByRole('row')); // push to project edit
    expect(history.location.pathname).toEqual(
      `${PAGES_LINKS.PROJECT}${projectsMock[rowIndex].name}`
    );
  });
});
