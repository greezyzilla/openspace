import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleButton from '../toggle';

test('Should render and act with active behavior when isActive is true', async () => {
  const onActiveHandle = jest.fn();
  const onInactiveHandle = jest.fn();

  render(<ToggleButton isActive activeClassname="active" onActiveClick={onActiveHandle} onInactiveClick={onInactiveHandle}>Toggle Active</ToggleButton>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(onActiveHandle).toBeCalled();
  expect(button.classList.contains('active')).toBe(true);
  expect(screen.queryByText('Toggle Active')).not.toBe(null);
});

test('Should render and act with inactive behavior when isActive is false', async () => {
  const onActiveHandle = jest.fn();
  const onInactiveHandle = jest.fn();

  render(<ToggleButton isActive={false} inactiveClassname="inactive" onActiveClick={onActiveHandle} onInactiveClick={onInactiveHandle}>Toggle Inactive</ToggleButton>);
  const button = screen.getByRole('button');
  await userEvent.click(button);

  expect(onInactiveHandle).toBeCalled();
  expect(button.classList.contains('inactive')).toBe(true);
  expect(screen.queryByText('Toggle Inactive')).not.toBe(null);
});
