import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Shoes from '../../src/components/Shoes/Shoes';

test('validates shoe size input', () => {
  const mockUpdateSize = jest.fn();
  render(<Shoes updateSize={mockUpdateSize} shoes={[{ id: '1', size: '' }]} />);

  const shoeInput = screen.getByLabelText(/Shoe size \/ person 1/i);
  fireEvent.change(shoeInput, { target: { value: '45' } });

  expect(mockUpdateSize).toHaveBeenCalledWith(expect.any(Object));
});
