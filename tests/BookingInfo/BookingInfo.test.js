import { render, screen, fireEvent } from '@testing-library/react';
import BookingInfo from '../components/BookingInfo/BookingInfo';

test('renders booking info form with inputs', () => {
  const updateBookingDetails = jest.fn();

  render(<BookingInfo updateBookingDetails={updateBookingDetails} />);

  // Check if all input fields are rendered
  expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of awesome bowlers/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Number of lanes/i)).toBeInTheDocument();
});

test('calls updateBookingDetails on input change', () => {
  const updateBookingDetails = jest.fn();

  render(<BookingInfo updateBookingDetails={updateBookingDetails} />);

  const dateInput = screen.getByLabelText(/Date/i);
  fireEvent.change(dateInput, { target: { value: '2024-12-15' } });

  expect(updateBookingDetails).toHaveBeenCalledWith(
    expect.objectContaining({
      target: expect.objectContaining({
        value: '2024-12-15',
      }),
    })
  );
});
