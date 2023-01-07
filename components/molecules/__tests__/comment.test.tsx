import { render, screen } from '@testing-library/react';
import Comment from '../comment';
import { createOwner } from '../../../tests/userHelpers';
import { createComment, createThreadDetail } from '../../../tests/threadHelpers';
import { getRelativeDate } from '../../../utils';

jest.mock('../../../utils', () => ({ getRelativeDate: jest.fn() }));
jest.mock('../buttonVote', () => {
  const fn = () => (<button type="button">Button Vote</button>);
  fn.Skeleton = function ButtonVoteSkeleton() {
    return <button type="button">Button Vote Skeleton</button>;
  };
  return fn;
});

afterAll(() => jest.clearAllMocks());

test('Should render comment component correctly', () => {
  const owner = createOwner({});
  const comment = createComment({ owner });
  const detailThread = createThreadDetail({ comments: [comment] });

  render(<Comment {...comment} threadId={detailThread.id} />);

  expect(getRelativeDate).toBeCalledWith(comment.createdAt);
  expect(screen.queryByText('User ke-1')).not.toBe(null);
  expect(screen.queryByText('Ini adalah komentar ke-1')).not.toBe(null);
  expect(screen.queryByRole('img')?.getAttribute('alt')).toBe('User ke-1');
  expect(screen.queryAllByText('Button Vote').length).toBe(2);
});

test('Should render comment component correctly', () => {
  const { container } = render(<Comment.Skeleton />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
  expect(screen.queryAllByText('Button Vote Skeleton').length).toBe(2);
});
