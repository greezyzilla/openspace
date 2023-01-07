import { render, screen } from '@testing-library/react';
import Categories from '../[category]';
import { createThread } from '../../../tests/threadHelpers';

jest.mock('next/router', () => ({ useRouter: () => ({ query: { category: 'test' } } as any) }));
jest.mock('../../../components/templates/dashboard', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../../components/organisms/threads', () => jest.fn(() => <div>Threads</div>));
jest.mock('../../../hooks', () => ({
  useAppSelector: jest.fn(jest.fn((cb) => cb({
    thread: { present: { threads: [createThread({})] } },
  }))),
}));

afterAll(() => jest.clearAllMocks());

test('Should render home page correctly', () => {
  render(<Categories />);

  expect(screen.queryByText('Threads')).not.toBe(null);
});
