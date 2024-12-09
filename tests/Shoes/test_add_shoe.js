import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from '../../src/components/Shoes/Shoes';

test('allows adding a shoe field', () => {
  const mockAddShoe = jest.fn();
  render(<Shoes addShoe={mockAddShoe} shoes={[]} />);

  const addButton = screen.getByText('+');
  fireEvent.click(addButton);

  expect(mockAddShoe).toHaveBeenCalledTimes(1);
});
