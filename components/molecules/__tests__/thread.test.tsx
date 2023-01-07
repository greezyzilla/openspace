import { render, screen } from '@testing-library/react';
import parse from 'html-react-parser';
import Thread from '../thread';
import { createThread } from '../../../tests/threadHelpers';
import { createOwner } from '../../../tests/userHelpers';
import { getRelativeDate } from '../../../utils';

jest.mock('../buttonVote', () => {
  const fn = () => (<button type="button">Button Vote</button>);
  fn.Skeleton = function ButtonVoteSkeleton() {
    return <button type="button">Button Vote Skeleton</button>;
  };
  return fn;
});
jest.mock('html-react-parser', () => jest.fn());
jest.mock('../../../utils', () => ({ getRelativeDate: jest.fn() }));

afterAll(() => jest.clearAllMocks());

const owner = createOwner({});
const { ownerId: _, ...thread } = createThread({ ownerId: owner.id });

test('Should render thread component correctly if isDetail is false', () => {
  render(<Thread thread={{ ...thread, totalComments: 0, owner }} isDetails={false} />);

  expect(parse).toBeCalledWith(thread.body, { trim: true });
  expect(getRelativeDate).toBeCalledWith(thread.createdAt);
  expect(screen.queryByText(thread.title)).not.toBe(null);
  expect(screen.queryByText(`#${thread.category}`)).not.toBe(null);
  expect(screen.queryByText(owner.name)).not.toBe(null);
  expect(screen.queryAllByText('Button Vote').length).toBe(2);
  expect(screen.queryAllByRole('link')[0]?.classList.contains('pointer-events-none')).toBe(false);
});

test('Should render thread component correctly if isDetail is true', () => {
  render(<Thread thread={{ ...thread, totalComments: 0, owner }} isDetails />);

  expect(parse).toBeCalledWith(thread.body, { trim: true });
  expect(getRelativeDate).toBeCalledWith(thread.createdAt);
  expect(screen.queryByText(thread.title)).not.toBe(null);
  expect(screen.queryByText(`#${thread.category}`)).not.toBe(null);
  expect(screen.queryByText(owner.name)).not.toBe(null);
  expect(screen.queryAllByText('Button Vote').length).toBe(2);
  expect(screen.queryAllByRole('link')[0]?.classList.contains('pointer-events-none')).toBe(true);
});

test('Should render thread skeleton component correctly', () => {
  const { container } = render(<Thread.Skeleton />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
