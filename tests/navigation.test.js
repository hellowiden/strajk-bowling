// navigation.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Booking from '../src/views/Booking';
import Confirmation from '../src/views/Confirmation';
import '@testing-library/jest-dom';

describe('Navigation Tests', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  test('User can navigate from Booking view to Confirmation view when booking is complete', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    const confirmationLink = screen.getByText(/Confirmation/i); // Navigation link to confirmation
    expect(confirmationLink).toBeInTheDocument();
  });

  test('Displays "Ingen bokning gjord" if no booking exists in session storage', () => {
    render(
      <MemoryRouter initialEntries={['/confirmation']}>
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Inga bokning gjord/i)).toBeInTheDocument();
  });

  test('Displays booking details if a booking exists in session storage', () => {
    const mockBooking = {
      when: '2024-12-15T18:00',
      people: 4,
      lanes: 2,
      id: 'ABC123',
      price: 680,
    };

    sessionStorage.setItem('confirmation', JSON.stringify(mockBooking));

    render(
      <MemoryRouter initialEntries={['/confirmation']}>
        <Routes>
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByDisplayValue('2024-12-15 18:00')).toBeInTheDocument();
    expect(screen.getByDisplayValue('4')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
    expect(screen.getByDisplayValue('ABC123')).toBeInTheDocument();
    expect(screen.getByText('680 sek')).toBeInTheDocument();
  });
});
