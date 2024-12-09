import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../../src/components/BookingInfo/BookingInfo';

test('allows the user to select the number of lanes', () => {
  const mockUpdateBookingDetails = jest.fn();
  render(<BookingInfo updateBookingDetails={mockUpdateBookingDetails} />);

  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  fireEvent.change(lanesInput, { target: { value: '2' } });

  expect(mockUpdateBookingDetails).toHaveBeenCalledTimes(1);
  expect(mockUpdateBookingDetails).toHaveBeenCalledWith(expect.any(Object));
});
