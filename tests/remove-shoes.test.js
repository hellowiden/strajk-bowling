jest.mock('../src/components/Shoes/Shoes', () => {
    return jest.fn().mockImplementation(() => {
        return {
            shoes: [],
            addShoe: function (id) {
                this.shoes.push({ id, size: '' });
            },
            removeShoe: function (id) {
                this.shoes = this.shoes.filter(shoe => shoe.id !== id);
            },
        };
    });
});

const Shoes = require('../src/components/Shoes/Shoes');

describe('Remove Shoe Size Field', () => {
    let shoesComponent;

    beforeEach(() => {
        shoesComponent = new Shoes();
    });

    test('User should be able to remove a shoe size field for a specific player', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.addShoe('player2');
        shoesComponent.addShoe('player3');

        expect(shoesComponent.shoes.length).toBe(3);

        shoesComponent.removeShoe('player2');

        expect(shoesComponent.shoes.length).toBe(2);
        expect(shoesComponent.shoes.find(shoe => shoe.id === 'player2')).toBeUndefined();
    });

    test('Removing a non-existent shoe size field should not affect the list', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.addShoe('player2');

        expect(shoesComponent.shoes.length).toBe(2);

        shoesComponent.removeShoe('nonexistent-player');

        expect(shoesComponent.shoes.length).toBe(2);
    });

    test('User should be able to remove the last shoe size field', () => {
        shoesComponent.addShoe('player1');

        expect(shoesComponent.shoes.length).toBe(1);

        shoesComponent.removeShoe('player1');

        expect(shoesComponent.shoes.length).toBe(0);
    });
});
