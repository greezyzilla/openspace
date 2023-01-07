import { render, screen } from '@testing-library/react';
import { useAppSelector } from '../../../hooks';
import { createThread } from '../../../tests/threadHelpers';
import { createUser } from '../../../tests/userHelpers';
import Threads from '../threads';

jest.mock('../../../hooks', () => ({ useAppSelector: jest.fn() }));
jest.mock('../../molecules/thread', () => {
  const fn = () => <div>Thread</div>;
  fn.Skeleton = function ThreadSkeleton() {
    return <div>Thread-Skeleton</div>;
  };
  return fn;
});

afterAll(() => jest.clearAllMocks());

test('Should render threads correctly when isLoading is false', () => {
  const user1 = createUser({}, 1);
  const user2 = createUser({}, 2);
  const users = [user1, user2];
  const thread1 = { ...createThread({ ownerId: user1.id }, 1), totalComments: 0 };
  const thread2 = { ...createThread({ ownerId: user2.id }, 2), totalComments: 0 };
  const threads = [thread1, thread2] as any;
  const mockState = { user: { users, loading: false } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<Threads threads={threads} />);

  expect(screen.queryAllByText('Thread').length).toBe(2);
});

test('Should render threads correctly when isLoading is true', () => {
  const mockState = { user: { users: [], loading: true } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<Threads threads={[]} />);

  expect(screen.queryAllByText('Thread').length).toBe(0);
  expect(screen.queryAllByText('Thread-Skeleton').length).toBe(4);
});
