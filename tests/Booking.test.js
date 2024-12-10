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

  test('displays error if players exceed max per lane', () => {
    render(
      <MemoryRouter>
        <Booking />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/number of awesome bowlers/i), {
      target: { value: '5' },
    });
    fireEvent.change(screen.getByLabelText(/number of lanes/i), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/striiiiiike!/i));

    expect(screen.getByText(/det får max vara 4 spelare per bana/i)).toBeInTheDocument();
  });
});
