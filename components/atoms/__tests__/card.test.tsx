import { render, screen } from '@testing-library/react';
import Card from '../card';

test('Should render small card if size is sm', async () => {
  render(<Card size="sm">Content</Card>);

  const card = screen.getByText('Content');

  expect(card.classList.contains('max-w-sm')).toBe(true);
});

test('Should render medium card if size is md', async () => {
  render(<Card size="md">Content</Card>);

  const card = screen.getByText('Content');

  expect(card.classList.contains('max-w-md')).toBe(true);
});

test('Should render large card if size is lg', async () => {
  render(<Card size="lg">Content</Card>);

  const card = screen.getByText('Content');

  expect(card.classList.contains('max-w-lg')).toBe(true);
});
