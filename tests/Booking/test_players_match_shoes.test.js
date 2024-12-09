import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Booking from '../../src/pages/Booking';

test('shows error if players and shoes do not match', () => {
  render(
    React.createElement(Booking, null)
  );

  const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
  const addButton = screen.getByText('+');

  fireEvent.change(playersInput, { target: { value: '2' } });
  fireEvent.click(addButton);

  const submitButton = screen.getByText(/strIIIIIike!/i);
  fireEvent.click(submitButton);

  expect(screen.getByText(/Antalet skor måste stämma överens med antal spelare/i)).toBeInTheDocument();
});
