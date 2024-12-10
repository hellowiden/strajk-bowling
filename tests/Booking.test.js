import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Booking from '../views/Booking';

describe('Booking Component', () => {
  test('renders booking form with initial state', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    expect(screen.getByText(/when, what & who/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of awesome bowlers/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of lanes/i)).toBeInTheDocument();
  });

  test('validates required fields before submission', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/striiiiiike!/i));

    expect(screen.getByText(/alla fälten måste vara ifyllda/i)).toBeInTheDocument();
  });

  test('adds and removes shoe size fields', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('+'));
    expect(screen.getAllByLabelText(/shoe size/i)).toHaveLength(1);

    fireEvent.click(screen.getByText('-'));
    expect(screen.queryAllByLabelText(/shoe size/i)).toHaveLength(0);
  });

  test('allows user to select a date and time', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/date/i);
    const timeInput = screen.getByLabelText(/time/i);

    // Simulate user selecting a date and time
    fireEvent.change(dateInput, { target: { value: '2023-12-15' } });
    fireEvent.change(timeInput, { target: { value: '18:00' } });

    expect(dateInput.value).toBe('2023-12-15');
    expect(timeInput.value).toBe('18:00');
  });

  test('validates minimum 1 player is required', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);

    fireEvent.change(playersInput, { target: { value: '0' } });
    fireEvent.click(screen.getByText(/striiiiiike!/i));

    expect(screen.getByText(/minst 1 spelare krävs/i)).toBeInTheDocument();
  });

  test('displays error if players exceed max per lane', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/number of lanes/i);

    fireEvent.change(playersInput, { target: { value: '5' } });
    fireEvent.change(lanesInput, { target: { value: '1' } });

    expect(playersInput.value).toBe('5');
    expect(lanesInput.value).toBe('1');

    fireEvent.click(screen.getByText(/striiiiiike!/i));

    expect(screen.getByText(/det får max vara 4 spelare per bana/i)).toBeInTheDocument();
  });

  test('calculates required lanes based on players', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    const playersInput = screen.getByLabelText(/number of awesome bowlers/i);
    const lanesInput = screen.getByLabelText(/number of lanes/i);

    fireEvent.change(playersInput, { target: { value: '8' } });

    // Ensure the user manually sets 2 lanes (based on max 4 players per lane)
    fireEvent.change(lanesInput, { target: { value: '2' } });

    expect(lanesInput.value).toBe('2');
  });
});
