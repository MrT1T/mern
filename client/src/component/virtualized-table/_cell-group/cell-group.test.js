import React from 'react';
import { render, screen } from '@testing-library/react';
import CellGroup from './index';
import { usersMock } from '../../../mocks/users.mock';
import { groupsMock } from '../../../mocks/groups.mock';

describe('Cell Group component', () => {
  it('Cell Group exist', () => {
    render(<CellGroup />);
    expect(screen.getAllByRole('cell')).toBeTruthy();
  });
  it('CellGroup for User', () => {
    render(<CellGroup item={usersMock[0]} />);
    Object.values(usersMock[0]).forEach((value) =>
      expect(screen.getByText(value)).toBeInTheDocument()
    );
  });
  it('CellGroup for Group', () => {
    render(<CellGroup item={groupsMock[0]} />);
    Object.values(groupsMock[0]).forEach((value) =>
      expect(screen.getByText(value)).toBeInTheDocument()
    );
  });
});
