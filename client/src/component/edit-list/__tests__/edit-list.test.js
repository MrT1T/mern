import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import EditList from '../index';
import { allUsersMock } from '../../../mocks/project-edit.mock';
import { PAGES_LINKS } from '../../../constant/links.const';
import { linksHelper } from '../../../helpers/links.helper';

describe('Edit list component', () => {
  it('Edit list exist', () => {
    const name = 'Edit List';
    render(<EditList labelList={name} list={allUsersMock} />);
    expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    allUsersMock.forEach(
      (card) => expect(screen.queryByText(card.name)).toBeInTheDocument() // all cards exists
    );
  });
  it('Card click handle work', () => {
    const testUser = allUsersMock[0].name;
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <EditList list={allUsersMock} link={PAGES_LINKS.PROFILE} />
      </Router>
    );
    userEvent.click(screen.getByText(testUser));
    expect(history.location.pathname).toEqual(
      linksHelper(PAGES_LINKS.PROFILE, testUser)
    );
  });
  it('Button click handle work', () => {
    const onChange = jest.fn();
    const spyStopPropagation = jest.spyOn(Event.prototype, 'stopPropagation');
    render(<EditList list={allUsersMock} onChange={onChange} />);
    userEvent.click(screen.getAllByRole('button')[0]);
    expect(onChange).toBeCalled();
    expect(spyStopPropagation).toBeCalled();
  });
});
