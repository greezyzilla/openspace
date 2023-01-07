import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createComment, createThreadDetail } from '../../../tests/threadHelpers';
import { createOwner, createUser } from '../../../tests/userHelpers';
import ThreadDetails from '../details';
import { ThreadDetail } from '../../../features/thread/thread.interface';
import { useAppSelector, useForm } from '../../../hooks';
import { postComment } from '../../../features/thread';

jest.mock('../../../hooks', () => ({
  useAppDispatch: () => (cb:() => {}) => cb,
  useRequest: () => (cb:() => {}) => cb(),
  useAppSelector: jest.fn(),
  useForm: jest.fn(),
}));

jest.mock('../../../features/thread', () => ({ postComment: jest.fn() }));

afterAll(() => jest.clearAllMocks());

test('Should render thread detail correctly', async () => {
  const owner = createOwner({});
  const user = createUser({ ...owner });
  const comment1 = createComment({ owner }, 1);
  const comment2 = createComment({ owner }, 2);
  const comments = [comment1, comment2];
  const detailThread = createThreadDetail({ owner, comments });
  const mockState = { auth: { user }, thread: { present: { thread: detailThread } } } as any;
  const mockedForm = [{ content: 'test comment', threadId: detailThread.id }, jest.fn(), jest.fn()] as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useForm).mockImplementation(() => mockedForm);

  render(<ThreadDetails thread={detailThread as ThreadDetail} />);
  const button = screen.getByPlaceholderText('What your response about this thing?').parentElement!.parentElement!.parentElement!.childNodes[1]!;
  await userEvent.click(button as any);

  expect(postComment).toBeCalled();
  expect(screen.queryByText(detailThread.title)).not.toBe(null);
  expect(screen.queryByText(`#${detailThread.category}`)).not.toBe(null);
  expect(screen.queryByText(detailThread.body)).not.toBe(null);
  expect(screen.queryAllByText(owner.name).length).not.toBe(0);
  expect(screen.queryByText(comment1.content)).not.toBe(null);
  expect(screen.queryByText(comment2.content)).not.toBe(null);
});

test('Should render thread detail skeleton correctly', async () => {
  const owner = createOwner({});
  const user = createUser({ ...owner });
  const comment1 = createComment({ owner }, 1);
  const comment2 = createComment({ owner }, 2);
  const comments = [comment1, comment2];
  const detailThread = createThreadDetail({ owner, comments });
  const mockState = { auth: { user }, thread: { present: { thread: detailThread } } } as any;
  const mockedForm = [{ content: 'test comment', threadId: detailThread.id }, jest.fn(), jest.fn()] as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useForm).mockImplementation(() => mockedForm);

  const { container } = render(<ThreadDetails.Skeleton />);
  const button = screen.getByPlaceholderText('What your response about this thing?').parentElement!.parentElement!.parentElement!.childNodes[1]!;
  await userEvent.click(button as any);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});

test('Should render thread detail skeleton correctly (no comments)', async () => {
  const owner = createOwner({});
  const user = createUser({ ...owner });
  const detailThread = createThreadDetail({ owner });
  const mockedForm = [{ content: 'test comment', threadId: detailThread.id }, jest.fn(), jest.fn()] as any;
  const mockState = { auth: { user }, thread: { present: { thread: detailThread } } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useForm).mockImplementation(() => mockedForm);

  render(<ThreadDetails thread={detailThread as any} />);

  expect(screen.queryByText('No Comment yet')).not.toBe(null);
});
