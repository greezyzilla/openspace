import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Search from '../search';
import { createUser } from '../../../tests/userHelpers';
import { createThread } from '../../../tests/threadHelpers';
import { useAppSelector, useToggle } from '../../../hooks';
import { searchThread } from '../../../features/thread';

jest.mock('../../../hooks', () => ({
  useAppDispatch: () => (cb: () => {}) => cb,
  useAppSelector: jest.fn(),
  useToggle: jest.fn(),
}));
jest.mock('../../../features/thread', () => ({ searchThread: jest.fn() }));
const mockIntersectionObserver = () => ({ observe: jest.fn(), disconnect: jest.fn() });
window.IntersectionObserver = jest.fn().mockImplementation(mockIntersectionObserver);

afterAll(() => jest.clearAllMocks());

const user1 = createUser({}, 1);
const user2 = createUser({}, 2);
const users = [user1, user2];
const thread1 = createThread({ category: 'react', ownerId: user1.id }, 1);
const thread2 = createThread({ category: 'react', ownerId: user1.id }, 2);
const thread3 = createThread({ category: 'angular', ownerId: user1.id }, 3);
const thread4 = createThread({ category: 'vue', ownerId: user2.id }, 4);
const threads = [thread1, thread2, thread3, thread4];

test('Should render search correctly when modal closed', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: '' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([false, toggleButton, openButton, closeButton]));

  render(<Search />);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(openButton).toBeCalled();
  expect(screen.queryAllByRole('link').length).toBe(0);
  expect(screen.queryByPlaceholderText('Search thread here...')).toBe(null);
});

test('Should render search correctly when modal closed (ctrl + /)', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: '' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([false, toggleButton, openButton, closeButton]));

  render(<Search />);
  fireEvent(window, new KeyboardEvent('keydown', { code: 'Slash', ctrlKey: true }));

  expect(openButton).toBeCalled();
  expect(screen.queryAllByRole('link').length).toBe(0);
  expect(screen.queryByPlaceholderText('Search thread here...')).toBe(null);
});

test('Should render search correctly when modal open', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: '' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([true, toggleButton, openButton, closeButton]));

  render(<Search />);

  expect(screen.queryAllByRole('link').length).toBe(0);
  expect(screen.queryByPlaceholderText('Search thread here...')).not.toBe(null);
  expect(screen.queryByText('No Result found')).toBe(null);
});

test('Should render search correctly when modal open (filter filled)', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: 'react' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([true, toggleButton, openButton, closeButton]));

  render(<Search />);

  expect(screen.queryAllByRole('link').length).toBe(2);
  expect(screen.queryByPlaceholderText('Search thread here...')).not.toBe(null);
  expect(screen.queryByText('No Result found')).toBe(null);
});

test('Should render search correctly when modal open (not found)', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: 'react-angular-vue' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([true, toggleButton, openButton, closeButton]));

  render(<Search />);

  expect(screen.queryAllByRole('link').length).toBe(0);
  expect(screen.queryByPlaceholderText('Search thread here...')).not.toBe(null);
  expect(screen.queryByText('No Result found')).not.toBe(null);
});

test('Should render search correctly when modal open (typing)', async () => {
  const mockState = { user: { users }, thread: { present: { threads, filter: 'react-angular-vue' } } } as any;
  const toggleButton = jest.fn();
  const openButton = jest.fn();
  const closeButton = jest.fn();
  jest.mocked(useAppSelector).mockImplementation((cb) => cb(mockState));
  jest.mocked(useToggle).mockReset()
    .mockImplementation(() => ([true, toggleButton, openButton, closeButton]));

  render(<Search />);
  const input = screen.getByPlaceholderText('Search thread here...');
  await userEvent.type(input, 'test-input');

  expect(screen.queryAllByRole('link').length).toBe(0);
  expect(searchThread).toBeCalledWith(expect.any(Object));
  expect(screen.queryByText('No Result found')).not.toBe(null);
});
