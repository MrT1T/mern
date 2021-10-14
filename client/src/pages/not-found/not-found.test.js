import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './index';

describe('Not found component', () => {
  beforeEach(() => render(<NotFound />));

  it('Not found page exists', () => {
    expect(
      document.querySelector('.makeStyles-container-1')
    ).toBeInTheDocument();
  });
  it('Not found image exists', () => {
    expect(document.querySelector('svg')).toBeTruthy();
  });
  it('Heading exists', () => {
    expect(screen.getByText(/not found/i)).toBeTruthy();
  });
  it('Return link exists', () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/Back to/i)).toBeInTheDocument();
  });
});
