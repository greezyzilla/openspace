import { render, screen } from '@testing-library/react';
import Home from '..';

jest.mock('../../components/templates/dashboard', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../components/organisms/threads', () => jest.fn(() => <div>Threads</div>));
jest.mock('../../hooks', () => ({
  useAppSelector: jest.fn(jest.fn((cb) => cb({
    thread: { present: { threads: [] } },
  }))),
}));

afterAll(() => jest.clearAllMocks());

test('Should render home page correctly', () => {
  render(<Home />);

  expect(screen.queryByText('Threads')).not.toBe(null);
});
