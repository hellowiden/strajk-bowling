import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../../src/components/BookingInfo/BookingInfo';

test('allows the user to select a date', () => {
  const mockUpdateBookingDetails = jest.fn();
  render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);

  const dateInput = screen.getByLabelText(/Date/i);
  fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

  expect(mockUpdateBookingDetails).toHaveBeenCalledTimes(1);
  expect(mockUpdateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});
