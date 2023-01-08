import { render, screen } from '@testing-library/react';
import Page404 from '../404.page';

jest.mock('../../components/organisms/notFound/page', () => jest.fn(() => <div>Page Not Found</div>));
jest.mock('../../hooks', () => ({
  useAppSelector: jest.fn(jest.fn((cb) => cb({
    thread: { present: { threads: [] } },
  }))),
}));

afterAll(() => jest.clearAllMocks());

test('Should render not found page correctly', () => {
  render(<Page404 />);

  expect(screen.queryByText('Page Not Found')).not.toBe(null);
});
