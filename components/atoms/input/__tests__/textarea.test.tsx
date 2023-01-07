import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChangeEvent } from 'react';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import InputTextarea from '../textarea';
import { importReactQuill } from '../../../../utils';

jest.mock('../../../../utils', () => ({ importReactQuill: jest.fn() }));
jest.mock('react-quill', () => jest.fn(({ ...args }) => <textarea value="test" {...args} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => args.onChange(e.target.value)} />));
jest.mock('next/dynamic', () => jest.fn(() => ReactQuill));

afterAll(() => jest.clearAllMocks());

test('Should render and provide correct behavior for InputTextarea', async () => {
  const changeHandle = jest.fn();
  const changes = 'some-changes';

  render(<InputTextarea label="Textarea Label" name="textarea" onChange={changeHandle} value="some text" placeholder="Input your text" />);
  const input = screen.getByPlaceholderText('Input your text');
  await userEvent.type(input, changes);

  expect(dynamic).toBeCalledWith(importReactQuill, { ssr: false });
  expect(changeHandle).toBeCalledTimes(changes.length);
  expect(changeHandle).toBeCalledWith({ target: { name: 'textarea', value: 'some text-' } });
  expect(changeHandle).toBeCalledWith({ target: { name: 'textarea', value: 'some texte' } });
  expect(input.tagName).toBe('TEXTAREA');
  expect(input.innerHTML).toBe('some text');
  expect(screen.getByText('Textarea Label')).not.toBe(null);
});
