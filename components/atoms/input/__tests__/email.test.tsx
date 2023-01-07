import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputEmail from '../email';

test('Should render and provide correct behavior for InputEmail', async () => {
  const changeHandle = jest.fn();
  const changes = 'some-changes';

  render(<InputEmail label="Email Label" name="email" onChange={changeHandle} value="value@mail.com" placeholder="Input your email" />);
  const input = screen.getByPlaceholderText('Input your email');
  await userEvent.type(input, changes);

  expect(changeHandle).toBeCalledTimes(changes.length);
  expect(input.tagName).toBe('INPUT');
  expect(input.getAttribute('type')).toBe('email');
  expect(input.getAttribute('name')).toBe('email');
  expect(input.getAttribute('value')).toBe('value@mail.com');
  expect(screen.queryByText('Email Label')).not.toBe(null);
});
