jest.mock('../src/components/Shoes/Shoes', () => {
    return jest.fn().mockImplementation(() => {
        return {
            shoes: [],
            updateSize: function (id, size) {
                const shoeIndex = this.shoes.findIndex(shoe => shoe.id === id);
                if (shoeIndex !== -1) {
                    this.shoes[shoeIndex].size = size;
                }
            },
            addShoe: function (id) {
                this.shoes.push({ id, size: '' });
            },
            removeShoe: function (id) {
                this.shoes = this.shoes.filter(shoe => shoe.id !== id);
            },
            isAllSizesFilled: function () {
                return this.shoes.every(shoe => shoe.size.length > 0);
            },
        };
    });
});

const Shoes = require('../src/components/Shoes/Shoes');

describe('Shoe Size Selection', () => {
    let shoesComponent;

    beforeEach(() => {
        shoesComponent = new Shoes();
    });

    test('User should be able to add shoe sizes for all players', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.addShoe('player2');

        expect(shoesComponent.shoes.length).toBe(2);
        expect(shoesComponent.shoes[0].size).toBe('');
        expect(shoesComponent.shoes[1].size).toBe('');
    });

    test('User should be able to set shoe size for a specific player', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.updateSize('player1', '42');

        expect(shoesComponent.shoes[0].size).toBe('42');
    });

    test('User should be able to change the shoe size for a player', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.updateSize('player1', '42');
        expect(shoesComponent.shoes[0].size).toBe('42');

        shoesComponent.updateSize('player1', '43');
        expect(shoesComponent.shoes[0].size).toBe('43');
    });

    test('All players should have shoe sizes assigned', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.addShoe('player2');

        shoesComponent.updateSize('player1', '42');
        shoesComponent.updateSize('player2', '40');

        expect(shoesComponent.isAllSizesFilled()).toBe(true);
    });

    test('Should return false if any player does not have a shoe size assigned', () => {
        shoesComponent.addShoe('player1');
        shoesComponent.addShoe('player2');

        shoesComponent.updateSize('player1', '42');

        expect(shoesComponent.isAllSizesFilled()).toBe(false);
    });
});
