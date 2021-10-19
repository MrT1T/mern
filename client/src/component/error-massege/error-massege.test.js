import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from './index';

describe('Error component', () => {
  it('Error exists', () => {
    const errorMessage = 'Error message exist';
    render(<Error message={errorMessage} />);
    expect(screen.getByTestId('errorMessage')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(document.getElementsByTagName('svg')).toBeTruthy();
  });
  it('No error displayed', () => {
    render(<Error />);
    expect(screen.queryByTestId('errorMessage')).not.toBeInTheDocument();
  });
});
