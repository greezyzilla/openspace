import { render, screen } from '@testing-library/react';
import DashboardTemplate from '../dashboard';

jest.mock('../../organisms/header', () => jest.fn(() => <div>Header</div>));
jest.mock('../../organisms/sidebar/left', () => jest.fn(() => <div>Left Sidebar</div>));
jest.mock('../../organisms/sidebar/right', () => jest.fn(() => <div>Right Sidebar</div>));

afterAll(() => jest.clearAllMocks());

test('Should render auth template correctly', () => {
  render(<DashboardTemplate title="Test">Children</DashboardTemplate>);

  expect(screen.queryByText('Children')).not.toBe(null);
  expect(screen.queryByText('Header')).not.toBe(null);
  expect(screen.queryByText('Left Sidebar')).not.toBe(null);
  expect(screen.queryByText('Right Sidebar')).not.toBe(null);
});
