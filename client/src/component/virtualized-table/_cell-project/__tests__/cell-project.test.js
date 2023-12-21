import React from 'react';
import { render, screen } from '@testing-library/react';
import CellProject from '../index';
import { usersMock } from '../../../../mocks/users.mock';
import { projectsMock } from '../../../../mocks/projects.mock';

describe('Cell Project component', () => {
  it('Cell Project exist', () => {
    render(<CellProject />);
    expect(screen.getAllByRole('cell')).toBeTruthy();
  });
  it('CellProject for User', () => {
    render(<CellProject item={usersMock[0]} />);
    Object.values(usersMock[0]).forEach((value) => {
      if (typeof value === 'string') {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        expect(screen.getByText(value[0].name)).toBeInTheDocument();
      }
    });
  });
  it('CellProject for Project', () => {
    render(<CellProject item={projectsMock[0]} />);
    Object.values(projectsMock[0]).forEach((value) => {
      if (typeof value === 'string') {
        expect(screen.getByText(value)).toBeInTheDocument();
      } else {
        expect(screen.getByText(value[0].username)).toBeInTheDocument();
      }
    });
  });
});
