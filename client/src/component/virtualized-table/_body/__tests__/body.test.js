import React from 'react';
import { render, screen } from '@testing-library/react';
import TableContent from '../index';
import { cellBodyMock } from '../../../../mocks/table-body.mock';

jest.mock(
  'react-virtualized-auto-sizer',
  () =>
    ({ children }) =>
      children({ height: 600, width: 600 })
);

describe('Table body component', () => {
  it('Table body exist', () => {
    render(<TableContent cellBodyData={cellBodyMock} />);
    expect(screen.getByTestId('tableBody')).toBeInTheDocument();
    cellBodyMock.cellData.forEach(
      (user) => expect(screen.getByText(user.username)).toBeInTheDocument() // all row view
    );
  });
});
