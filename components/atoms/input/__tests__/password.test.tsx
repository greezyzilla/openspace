import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputPassword from '../password';

test('Should render and provide correct behavior for InputPassword', async () => {
  const changeHandle = jest.fn();
  const changes = 'some-changes';

  render(<InputPassword label="Password Label" name="password" onChange={changeHandle} value="some text" placeholder="Input your password" />);
  const input = screen.getByPlaceholderText('Input your password');
  await userEvent.type(input, changes);

  expect(changeHandle).toBeCalledTimes(changes.length);
  expect(input.tagName).toBe('INPUT');
  expect(input.getAttribute('type')).toBe('password');
  expect(input.getAttribute('name')).toBe('password');
  expect(input.getAttribute('value')).toBe('some text');
  expect(screen.queryByText('Password Label')).not.toBe(null);
});

test('Should render danger ring if isValid is false', async () => {
  render(<InputPassword label="Password Label" name="text" onChange={() => {}} value="some text" placeholder="Input your password" isValid={false} />);
  const input = screen.getByPlaceholderText('Input your password');

  expect(input.classList.contains('border-red-400')).toBe(true);
  expect(input.classList.contains('ring-red-200')).toBe(true);
});
