import { render, screen } from '@testing-library/react';
import Leaderboards from '../leaderboard';

jest.mock('../../components/templates/dashboard', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../components/organisms/leaderboards', () => jest.fn(() => <div>Leaderboards</div>));

afterAll(() => jest.clearAllMocks());

test('Should render leaderboards page correctly', () => {
  render(<Leaderboards />);

  expect(screen.queryByText('Leaderboards')).not.toBe(null);
});
