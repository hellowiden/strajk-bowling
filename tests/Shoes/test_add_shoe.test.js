import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from '../../src/components/Shoes/Shoes';

test('allows adding a shoe field', () => {
  const mockAddShoe = jest.fn();
  render(<Shoes addShoe={mockAddShoe} shoes={[]} />);

  // Locate the Add button (using its role for accessibility)
  const addButton = screen.getByRole('button', { name: '+' });

  // Assert the button is in the document
  expect(addButton).toBeInTheDocument();

  // Simulate a click event
  fireEvent.click(addButton);

  // Verify the mock function was called once
  expect(mockAddShoe).toHaveBeenCalledTimes(1);
});
