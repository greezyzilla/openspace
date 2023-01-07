import { render, screen } from '@testing-library/react';
import AuthTemplate from '../auth';

test('Should render auth template correctly', () => {
  render(<AuthTemplate title="Test">Children</AuthTemplate>);

  expect(screen.queryByText('Children')).not.toBe(null);
});
