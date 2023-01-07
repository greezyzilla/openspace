import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import AddThread from '../addThread';

jest.mock('react-toastify', () => ({ toast: { error: jest.fn() } }));
jest.mock('next/dynamic', () => () => jest.fn(({ ...args }) => <textarea value="test" {...args} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => args.onChange(e.target.value)} />));

afterAll(() => jest.clearAllMocks());

test('Should provide correct behavior when changing and submitting thread form', async () => {
  const onSubmitHandle = jest.fn();
  const onCancelHandle = jest.fn();

  render(<AddThread onSubmit={onSubmitHandle} onCancel={onCancelHandle} />);
  const inputTitle = screen.getByPlaceholderText('How to, I want to, etc...');
  const inputCategory = screen.getByPlaceholderText('React, Javascript, Typescript, etc...');
  const inputBody = screen.getByPlaceholderText('Hi, i would like to share that...');
  const button = screen.getByText('Publish');
  await userEvent.type(inputTitle, 'A Thread');
  await userEvent.type(inputCategory, 'test');
  await userEvent.type(inputBody, 'This is thread body');
  await userEvent.click(button);

  expect(onSubmitHandle).toBeCalledWith({ title: 'A Thread', category: 'test', body: 'This is thread body' });
  expect(onCancelHandle).toBeCalledTimes(1);
  expect(inputTitle.getAttribute('value')).toBe('A Thread');
  expect(inputCategory.getAttribute('value')).toBe('test');
  expect(inputBody.innerHTML).toBe('This is thread body');
});

test('Should provide correct behavior when submitting thread form with empty body', async () => {
  const onSubmitHandle = jest.fn();
  const onCancelHandle = jest.fn();

  render(<AddThread onSubmit={onSubmitHandle} onCancel={onCancelHandle} />);
  const inputTitle = screen.getByPlaceholderText('How to, I want to, etc...');
  const inputCategory = screen.getByPlaceholderText('React, Javascript, Typescript, etc...');
  const button = screen.getByText('Publish');

  await userEvent.type(inputTitle, 'A Thread');
  await userEvent.type(inputCategory, 'test');
  await userEvent.click(button);

  expect(onSubmitHandle).toBeCalledTimes(0);
  expect(onCancelHandle).toBeCalledTimes(0);
  expect(inputTitle.getAttribute('value')).toBe('A Thread');
  expect(inputCategory.getAttribute('value')).toBe('test');
  expect(toast.error).toBeCalledTimes(1);
  expect(toast.error).toBeCalledWith('Thread Body Should Not Be Empty');
});

test('Should provide correct behavior when thread form canceled', async () => {
  const onSubmitHandle = jest.fn();
  const onCancelHandle = jest.fn();
  render(<AddThread onSubmit={onSubmitHandle} onCancel={onCancelHandle} />);
  const button = screen.getByText('Cancel');

  await userEvent.click(button);

  expect(onSubmitHandle).not.toBeCalled();
  expect(onCancelHandle).toBeCalledTimes(1);
});
