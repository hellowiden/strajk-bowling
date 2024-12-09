import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../../src/components/BookingInfo/BookingInfo';

test('does not allow fewer than 1 player', () => {
  const mockUpdateBookingDetails = jest.fn();
  render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);

  const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
  fireEvent.change(playersInput, { target: { value: '0' } });

  expect(mockUpdateBookingDetails).toHaveBeenCalledWith(
    expect.objectContaining({ target: expect.objectContaining({ value: '0' }) })
  );
});
