import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from '../modal';

test('Should render modal correctly if isOpen is true', async () => {
  const onCloseHandler = jest.fn();

  const { container } = render(<Modal isOpen onClose={onCloseHandler}><button type="button">Test Modal</button></Modal>);
  const backdrop = container.querySelector('.relative.z-10')!;
  await userEvent.click(backdrop);

  expect(screen.queryByText('Test Modal')).not.toBe(null);
  expect(onCloseHandler).toBeCalled();
});

test('Should render modal correctly if isOpen is false', async () => {
  const onCloseHandler = jest.fn();

  const { container } = render(<Modal isOpen={false} onClose={onCloseHandler}><button type="button">Test Modal</button></Modal>);

  expect(container.querySelector('.relative.z-10')).toBe(null);
  expect(screen.queryByText('Test Modal')).toBe(null);
});
