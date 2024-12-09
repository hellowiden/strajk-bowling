import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../../src/components/BookingInfo/BookingInfo';

test('allows the user to select a time', () => {
  const mockUpdateBookingDetails = jest.fn();
  render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);

  const timeInput = screen.getByLabelText(/Time/i);
  fireEvent.change(timeInput, { target: { value: '14:30' } });

  expect(mockUpdateBookingDetails).toHaveBeenCalledTimes(1);
  expect(mockUpdateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});
