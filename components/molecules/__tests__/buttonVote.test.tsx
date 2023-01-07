import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import ButtonVote from '../buttonVote';
import { createComment, createThread } from '../../../tests/threadHelpers';
import { createUser } from '../../../tests/userHelpers';
import {
  postVoteDown, postVoteDownComment, postVoteNeutral,
  postVoteNeutralComment, postVoteUp, postVoteUpComment,
} from '../../../features/thread';
import { authReducer } from '../../../features';
import { useAppSelector } from '../../../hooks';

jest.mock('../../../features/thread', () => ({
  postVoteUp: jest.fn(),
  postVoteDown: jest.fn(),
  postVoteNeutral: jest.fn(),
  postVoteUpComment: jest.fn(),
  postVoteDownComment: jest.fn(),
  postVoteNeutralComment: jest.fn(),
}));

jest.mock('../../../hooks', () => ({
  useRequest: () => (cb: () => {}) => cb(),
  useAppDispatch: () => (cb: () => {}) => cb,
  useAppSelector: jest.fn(),
}));

afterAll(() => jest.clearAllMocks());

test('Should render button that vote up thread correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteUp).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId={thread.id} /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteUp).toBeCalledWith({ threadId: thread.id, userId: user.id });
  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Up Vote')).not.toBe(null);
});

test('Should render button that vote down thread correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteDown).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId={thread.id} isVoteDown /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteDown).toBeCalledWith({ threadId: thread.id, userId: user.id });
  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Down Vote')).not.toBe(null);
});

test('Should render button that vote down thread correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteDown).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId={thread.id} isVoteDown /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteDown).toBeCalledWith({ threadId: thread.id, userId: user.id });
  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Down Vote')).not.toBe(null);
});

test('Should render button that vote neutral thread correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteNeutral).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-1']} threadId={thread.id} /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteNeutral).toBeCalledWith({ threadId: thread.id, userId: user.id });
  expect(button.classList.contains('bg-violet-700')).toBe(true);
  expect(screen.queryByText('1')).not.toBe(null);
});

test('Should render button that vote up comment correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const comment = createComment({});
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteUpComment).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId={thread.id} commentId={comment.id} /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteUpComment).toBeCalledWith({
    threadId: thread.id,
    userId: user.id,
    commentId: comment.id,
  });
  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Up Vote')).not.toBe(null);
});

test('Should render button that vote down comment correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const comment = createComment({});
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteDownComment).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId={thread.id} commentId={comment.id} isVoteDown /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteDownComment).toBeCalledWith({
    threadId: thread.id,
    userId: user.id,
    commentId: comment.id,
  });
  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Down Vote')).not.toBe(null);
});

test('Should render button that vote neutral comment correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const user = createUser();
  const thread = createThread({ ownerId: user.id });
  const comment = createComment({});
  const mockState = { auth: { user } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(postVoteNeutralComment).mockReset().mockImplementation(jest.fn());

  render(<Provider store={store}><ButtonVote votes={['user-1']} threadId={thread.id} commentId={comment.id} /></Provider>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(postVoteNeutralComment).toBeCalledWith({
    threadId: thread.id,
    userId: user.id,
    commentId: comment.id,
  });
  expect(button.classList.contains('bg-violet-700')).toBe(true);
  expect(screen.queryByText('1')).not.toBe(null);
});

test('Should render vote button correctly even user not authenticated', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const mockState = { auth: { user: undefined } } as any;
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));

  render(<Provider store={store}><ButtonVote votes={['user-2', 'user-3']} threadId="thread-1" /></Provider>);
  const button = screen.getByRole('button');

  expect(button.classList.contains('bg-slate-100/80')).toBe(true);
  expect(screen.queryByText('2')).not.toBe(null);
  expect(screen.queryByText('Up Vote')).not.toBe(null);
});

test('Should render skeleton for vote button correctly', async () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  const { container } = render(<Provider store={store}><ButtonVote.Skeleton /></Provider>);

  expect(container.querySelector('.skeleton')).not.toBe(0);
});
