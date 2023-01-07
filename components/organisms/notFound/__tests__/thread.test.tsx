import { render, screen } from '@testing-library/react';
import Thread from '../thread';

test('Should render not found page correctly', () => {
  render(<Thread />);

  expect(screen.queryByAltText('Thread not found Designed by Freepik')).not.toBe(null);
  expect(screen.queryByText('Back to Home')).not.toBe(null);
});
