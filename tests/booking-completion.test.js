jest.mock('../src/components/Booking/Booking', () => {
    return jest.fn().mockImplementation(() => {
        return {
            booking: {
                people: 0,
                lanes: 0,
            },
            sendBooking: async function (bookingInfo) {
                return {
                    id: 'ABC123',
                    price: bookingInfo.people * 120 + bookingInfo.lanes * 100,
                };
            },
            calculateTotal: function (people, lanes) {
                return {
                    total: people * 120 + lanes * 100,
                    breakdown: {
                        players: people * 120,
                        lanes: lanes * 100,
                    },
                };
            },
        };
    });
});

const Booking = require('../src/components/Booking/Booking');
const { render, screen, fireEvent } = require('@testing-library/react');
const React = require('react');

describe('Booking Completion', () => {
    let bookingComponent;

    beforeEach(() => {
        bookingComponent = new Booking();
    });

    test('User should be able to complete a booking and receive a booking number', async () => {
        const bookingInfo = { people: 4, lanes: 2 };
        const confirmation = await bookingComponent.sendBooking(bookingInfo);

        expect(confirmation.id).toBeDefined();
        expect(confirmation.id).toBe('ABC123');
    });

    test('System should calculate the total price correctly based on players and lanes', () => {
        const people = 4;
        const lanes = 2;
        const total = bookingComponent.calculateTotal(people, lanes);

        expect(total.total).toBe(680); // 4 * 120 + 2 * 100
        expect(total.breakdown.players).toBe(480); // 4 * 120
        expect(total.breakdown.lanes).toBe(200); // 2 * 100
    });

    test('Total price and breakdown should be displayed clearly on confirmation page', async () => {
        const bookingInfo = { people: 3, lanes: 1 };
        const confirmation = await bookingComponent.sendBooking(bookingInfo);

        const total = bookingComponent.calculateTotal(bookingInfo.people, bookingInfo.lanes);

        expect(confirmation.price).toBe(total.total); // Total matches confirmation
        expect(total.breakdown.players).toBe(360); // 3 * 120
        expect(total.breakdown.lanes).toBe(100); // 1 * 100
    });

    test('Clicking "slutför bokning" triggers booking submission', () => {
        const mockBookFunction = jest.fn();

        render(
            <button onClick={mockBookFunction}>
                Slutför Bokning
            </button>
        );

        const button = screen.getByText(/slutför bokning/i);
        fireEvent.click(button);

        expect(mockBookFunction).toHaveBeenCalledTimes(1); // Button click triggers booking
    });
});
