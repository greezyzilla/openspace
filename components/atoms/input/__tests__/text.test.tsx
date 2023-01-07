import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputText from '../text';

test('Should render and provide correct behavior for InputText', async () => {
  const changeHandle = jest.fn();
  const changes = 'some-changes';

  render(<InputText label="Text Label" name="text" onChange={changeHandle} value="some text" placeholder="Input your text" />);
  const input = screen.getByPlaceholderText('Input your text');
  await userEvent.type(input, changes);

  expect(changeHandle).toBeCalledTimes(changes.length);
  expect(input.tagName).toBe('INPUT');
  expect(input.getAttribute('type')).toBe('text');
  expect(input.getAttribute('name')).toBe('text');
  expect(input.getAttribute('value')).toBe('some text');
  expect(screen.queryByText('Text Label')).toBeDefined();
});

test('Should not render label if label not defined', async () => {
  render(<InputText name="text" onChange={() => {}} value="some text" placeholder="Input your text" />);
  const input = screen.getByPlaceholderText('Input your text');

  expect(input.parentNode?.children.length).toBe(1);
  expect(input.parentNode?.children[0].tagName).toBe('INPUT');
});
