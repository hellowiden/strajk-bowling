import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from '../../src/components/Shoes/Shoes';

test('allows removing a shoe field', () => {
  const mockRemoveShoe = jest.fn();
  render(<Shoes removeShoe={mockRemoveShoe} shoes={[{ id: '1', size: '' }]} />);

  const removeButton = screen.getByText('-');
  fireEvent.click(removeButton);

  expect(mockRemoveShoe).toHaveBeenCalledWith('1');
});
