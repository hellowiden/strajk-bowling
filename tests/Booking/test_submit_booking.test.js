import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Booking from '../../src/pages/Booking';

const server = setupServer(
  rest.post('https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: '12345', price: 1000 }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('submits booking and shows confirmation', async () => {
  render(<Booking />);

  const dateInput = screen.getByLabelText(/Date/i);
  const timeInput = screen.getByLabelText(/Time/i);
  const playersInput = screen.getByLabelText(/Number of awesome bowlers/i);
  const lanesInput = screen.getByLabelText(/Number of lanes/i);
  const submitButton = screen.getByText(/strIIIIIike!/i);

  fireEvent.change(dateInput, { target: { value: '2024-12-31' } });
  fireEvent.change(timeInput, { target: { value: '14:30' } });
  fireEvent.change(playersInput, { target: { value: '4' } });
  fireEvent.change(lanesInput, { target: { value: '1' } });

  fireEvent.click(submitButton);

  expect(await screen.findByText(/Booking number/i)).toBeInTheDocument();
  expect(await screen.findByText(/Total:/i)).toBeInTheDocument();
});
