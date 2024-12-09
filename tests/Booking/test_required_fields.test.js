import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Booking from '../../src/pages/Booking';

test('shows error if required fields are empty', () => {
  render(<Booking />);

  const submitButton = screen.getByText(/strIIIIIike!/i);
  fireEvent.click(submitButton);

  expect(screen.getByText(/Alla fälten måste vara ifyllda/i)).toBeInTheDocument();
});
