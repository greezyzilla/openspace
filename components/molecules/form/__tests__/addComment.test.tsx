import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddComment from '../addComment';

test('Should provide correct behavior when changing and submitting comment form', async () => {
  const onSubmitHandle = jest.fn();

  render(<AddComment onSubmit={onSubmitHandle} threadId="thread-1" />);
  const input = screen.getByPlaceholderText('What your response about this thing?');
  const resetButton = screen.getByRole('button');
  await userEvent.type(input, 'a comment');
  await userEvent.click(resetButton);

  expect(onSubmitHandle).toBeCalledTimes(1);
  expect(onSubmitHandle).toBeCalledWith({ threadId: 'thread-1', content: 'a comment' });
  expect(input.getAttribute('value')).toBe('');
});
