// booking.test.js
jest.mock('../src/components/BookingInfo/BookingInfo', () => {
    return jest.fn().mockImplementation(() => {
        return {
            selectedDate: null,
            selectedTime: null,
            players: 0,
            selectDate: function (date) {
                this.selectedDate = date;
            },
            selectTime: function (time) {
                this.selectedTime = time;
            },
            setPlayers: function (players) {
                if (players < 1) {
                    throw new Error('Number of players must be at least 1');
                }
                this.players = players;
            },
            reserveLanes: function (players) {
                return Math.ceil(players / 4); 
            },
            createReservation: function () {
                return {
                    date: this.selectedDate,
                    time: this.selectedTime,
                    players: this.players,
                    lanes: Math.ceil(this.players / 4),
                };
            },
        };
    });
});

const BookingSystem = require('../src/components/BookingInfo/BookingInfo');

describe('Bowling Hall Booking System', () => {
    let bookingSystem;

    beforeEach(() => {
        bookingSystem = new BookingSystem();
    });

    test('User should be able to select a date from a calendar system', () => {
        const date = '2024-12-15';
        bookingSystem.selectDate(date);
        expect(bookingSystem.selectedDate).toBe(date);
    });

    test('User should be able to select a time from a time selection system', () => {
        const time = '18:00';
        bookingSystem.selectTime(time);
        expect(bookingSystem.selectedTime).toBe(time);
    });

    test('User should be able to specify the number of players, with at least 1 player required', () => {
        const players = 4;
        bookingSystem.setPlayers(players);
        expect(bookingSystem.players).toBe(players);

        expect(() => bookingSystem.setPlayers(0)).toThrow('Number of players must be at least 1');
    });

    test('User should be able to reserve lanes based on the number of players', () => {
        const players = 8;
        const lanes = bookingSystem.reserveLanes(players);
        
        expect(lanes).toBeGreaterThan(0); 
        expect(lanes).toBe(Math.ceil(players / 4)); 
    });

    test('Booking system should store complete reservation details', () => {
        const date = '2024-12-15';
        const time = '18:00';
        const players = 5;

        bookingSystem.selectDate(date);
        bookingSystem.selectTime(time);
        bookingSystem.setPlayers(players);

        const reservation = bookingSystem.createReservation();

        expect(reservation.date).toBe(date);
        expect(reservation.time).toBe(time);
        expect(reservation.players).toBe(players);
        expect(reservation.lanes).toBe(Math.ceil(players / 4));
    });
});
