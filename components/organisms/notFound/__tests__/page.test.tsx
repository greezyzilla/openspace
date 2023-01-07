import { render, screen } from '@testing-library/react';
import Page from '../page';

test('Should render not found page correctly', () => {
  render(<Page />);

  expect(screen.queryByAltText('Page not found Designed by Freepik')).not.toBe(null);
  expect(screen.queryByText('Back to Home')).not.toBe(null);
});
