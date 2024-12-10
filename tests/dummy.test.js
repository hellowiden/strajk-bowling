// dummy.test.js

// A simple function to test
function add(a, b) {
    return a + b;
}

// Another function to test
function subtract(a, b) {
    return a - b;
}

// Jest test suite
describe('Dummy Test Suite', () => {
    test('add(1, 2) should return 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('subtract(5, 3) should return 2', () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test('add(0, 0) should return 0', () => {
        expect(add(0, 0)).toBe(0);
    });

    test('subtract(10, 20) should return -10', () => {
        expect(subtract(10, 20)).toBe(-10);
    });
});

module.exports = { add, subtract };
