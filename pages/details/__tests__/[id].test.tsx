import { render, screen } from '@testing-library/react';
import DetailPage from '../[id].page';
import { useAppSelector } from '../../../hooks';
import { createThreadDetail } from '../../../tests/threadHelpers';
import { getThreadById } from '../../../features/thread';

jest.mock('next/router', () => ({ useRouter: () => ({ query: { id: 'thread-1' }, isReady: true } as any) }));
jest.mock('../../../hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(() => (cb: () => {}) => cb),
}));

jest.mock('../../../components/templates/dashboard', () => jest.fn(({ children }: any) => <div>{children}</div>));
jest.mock('../../../features/thread', () => ({ getThreadById: jest.fn() }));
jest.mock('../../../components/organisms/notFound/thread', () => jest.fn(() => <div>Thread Not Found</div>));
jest.mock('../../../components/organisms/details', () => {
  const fn = () => (<div>Thread-Detail</div>);
  fn.Skeleton = function ThreadDetailSkeleton() {
    return <div>Thread-Detail-Skeleton</div>;
  };
  return fn;
});

afterAll(() => jest.clearAllMocks());

test('Should render detail page correctly when thread is defined', () => {
  const detailThread = createThreadDetail({});
  const mockState = { thread: { present: { thread: detailThread, loading: false } } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<DetailPage />);

  expect(getThreadById).toBeCalledWith({ threadId: 'thread-1' });
  expect(screen.queryByText('Thread-Detail')).not.toBe(null);
});

test('Should render detail page correctly when state is loading', () => {
  const mockState = { thread: { present: { thread: undefined, loading: true } } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<DetailPage />);

  expect(getThreadById).toBeCalledWith({ threadId: 'thread-1' });
  expect(screen.queryByText('Thread-Detail-Skeleton')).not.toBe(null);
});

test('Should render detail page correctly when thread is undefined', () => {
  const mockState = { thread: { present: { thread: undefined, loading: false } } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<DetailPage />);

  expect(getThreadById).toBeCalledWith({ threadId: 'thread-1' });
  expect(screen.queryByText('Thread Not Found')).not.toBe(null);
});
