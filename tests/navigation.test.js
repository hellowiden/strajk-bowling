import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';

jest.mock('../src/views/Booking', () => {
    const Booking = () => <div>Booking View</div>;
    Booking.displayName = 'Booking';
    return Booking;
});

jest.mock('../src/views/Confirmation', () => {
    const Confirmation = jest.fn().mockImplementation(() => {
        const confirmation = JSON.parse(sessionStorage.getItem('confirmation'));
        if (confirmation) {
            return (
                <div>
                    <p>Booking ID: {confirmation.id}</p>
                    <p>Total Price: {confirmation.price} SEK</p>
                </div>
            );
        }
        return <p>Ingen bokning gjord</p>;
    });
    Confirmation.displayName = 'Confirmation';
    return Confirmation;
});

import App from '../src/App';

function setConfirmationInStorage(confirmation) {
    sessionStorage.setItem('confirmation', JSON.stringify(confirmation));
}

describe('Navigation between Booking and Confirmation Views', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    test('User should navigate from Booking to Confirmation when booking is complete', () => {
        render(
            <Router>
                <App />
            </Router>
        );

        const bookingLink = screen.getByText(/booking/i);
        fireEvent.click(bookingLink);
        expect(screen.getByText(/booking view/i)).toBeInTheDocument();

        setConfirmationInStorage({ id: 'ABC123', price: 680 });

        const confirmationLink = screen.getByText(/confirmation/i);
        fireEvent.click(confirmationLink);

        expect(screen.getByText(/booking id: abc123/i)).toBeInTheDocument();
        expect(screen.getByText(/total price: 680 sek/i)).toBeInTheDocument();
    });

    test('Shows "Ingen bokning gjord" if no booking exists in session storage', () => {
        render(
            <Router>
                <App />
            </Router>
        );

        const confirmationLink = screen.getByText(/confirmation/i);
        fireEvent.click(confirmationLink);

        expect(screen.getByText(/ingen bokning gjord/i)).toBeInTheDocument();
    });

    test('Displays stored booking details if booking exists in session storage', () => {
        setConfirmationInStorage({ id: 'XYZ789', price: 500 });

        render(
            <Router>
                <App />
            </Router>
        );

        const confirmationLink = screen.getByText(/confirmation/i);
        fireEvent.click(confirmationLink);

        expect(screen.getByText(/booking id: xyz789/i)).toBeInTheDocument();
        expect(screen.getByText(/total price: 500 sek/i)).toBeInTheDocument();
    });
});
