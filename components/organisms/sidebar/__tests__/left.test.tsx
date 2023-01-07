import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import ReactQuill from 'react-quill';
import LeftSidebar from '../left';
import { postThread } from '../../../../features/thread';
import { createUser } from '../../../../tests/userHelpers';
import { createThread } from '../../../../tests/threadHelpers';
import { useAppSelector, useForm, useToggle } from '../../../../hooks';
import { getTrendingCategoriesFromThreads } from '../../../../utils';

jest.mock('next/router', () => ({ useRouter: () => ({ asPath: '/' }) }));
jest.mock('../../../../hooks', () => ({
  useAppDispatch: () => (cb:() => {}) => cb,
  useRequest: () => (cb:() => {}) => cb(),
  useAppSelector: jest.fn(),
  useToggle: jest.fn(),
  useForm: jest.fn(),
}));
jest.mock('../../../../features/thread', () => ({ postThread: jest.fn() }));
jest.mock('next/dynamic', () => jest.fn(() => ReactQuill));
jest.mock('react-quill', () => jest.fn(({ ...args }) => <textarea value="test" {...args} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => args.onChange(e.target.value)} />));
jest.mock('../../../../utils', () => ({
  importReactQuill: jest.fn(),
  getTrendingCategoriesFromThreads: jest.fn(),
}));

afterAll(() => jest.clearAllMocks());

const mockIntersectionObserver = () => ({ observe: jest.fn(), disconnect: jest.fn() });
window.IntersectionObserver = jest.fn().mockImplementation(mockIntersectionObserver);

const user1 = createUser({}, 1);
const user2 = createUser({}, 2);
const thread1 = createThread({ category: 'react', ownerId: user1.id }, 1);
const thread2 = createThread({ category: 'react', ownerId: user1.id }, 2);
const thread3 = createThread({ category: 'angular', ownerId: user1.id }, 3);
const thread4 = createThread({ category: 'vue', ownerId: user2.id }, 4);
const threads = [thread1, thread2, thread3, thread4];

test('Should render left sidebar correctly', async () => {
  const mockState = { thread: { present: { threads } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([false, toggleButton, openButton, closeButton]));
  jest.mocked(useForm).mockImplementation(() => [{
    title: 'thread title',
    category: 'test',
    body: 'test thread body',
  }, jest.fn()] as any);
  jest.mocked(getTrendingCategoriesFromThreads).mockReturnValue([
    { category: 'react', total: 2 },
    { category: 'angular', total: 1 },
    { category: 'vue', total: 1 },
  ]);

  const { container } = render(<LeftSidebar />);

  expect(container.querySelectorAll('.flex.flex-1.items-center.justify-between.gap-2.overflow-hidden').length).toBe(3);
  expect(screen.queryByText('react')).not.toBe(null);
  expect(screen.queryByText('angular')).not.toBe(null);
  expect(screen.queryByText('vue')).not.toBe(null);
});

test('Should render left sidebar correctly (modal on)', async () => {
  const mockState = { thread: { present: { threads } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([true, toggleButton, openButton, closeButton]));
  jest.mocked(useForm).mockImplementation(() => [{
    title: 'thread title',
    category: 'test',
    body: 'test thread body',
  }, jest.fn()] as any);
  jest.mocked(getTrendingCategoriesFromThreads).mockReturnValue([
    { category: 'react', total: 2 },
    { category: 'angular', total: 1 },
    { category: 'vue', total: 1 },
  ]);

  render(<LeftSidebar />);
  const buttonSubmit = screen.getByText('Publish');
  await userEvent.click(buttonSubmit);

  expect(postThread).toBeCalled();
});

test('Should render left sidebar correctly (loading)', () => {
  const mockState = { thread: { present: { threads: [] } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([false, toggleButton, openButton, closeButton]));

  const { container } = render(<LeftSidebar />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
