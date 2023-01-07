import { render, screen } from '@testing-library/react';
import { FormEvent } from 'react';
import userEvent from '@testing-library/user-event';
import Button from '../default';

test('Should called onClick() when clicked', async () => {
  const onClickHandle = jest.fn();

  render(<Button onClick={onClickHandle}>Button Default</Button>);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  await userEvent.click(button);

  expect(onClickHandle).toBeCalledTimes(2);
  expect(screen.queryByText('Button Default')).not.toBe(null);
});

test('Should render disabled button when isDisabled is true', async () => {
  const onClickHandle = jest.fn();

  render(<Button onClick={onClickHandle} isDisabled>Button Disabled</Button>);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  await userEvent.click(button);

  expect(onClickHandle).toBeCalledTimes(0);
  expect(screen.queryByText('Button Disabled')).not.toBe(null);
});

test('Should called onSubmtest() when clicked and isSubmit is true', async () => {
  const onSubmitHandle = jest.fn((e: FormEvent) => e.preventDefault());

  render(<form onSubmit={onSubmitHandle}><Button isSubmit>Button Submit</Button></form>);
  const button = screen.getByRole('button');
  await userEvent.click(button);
  await userEvent.click(button);

  expect(onSubmitHandle).toBeCalledTimes(2);
  expect(screen.queryByText('Button Submit')).not.toBe(null);
});

test('Should render primary button when isPrimary is true', async () => {
  render(<Button isPrimary>Button Primary</Button>);
  const button = screen.getByRole('button');

  expect(button.classList.contains('bg-violet-600')).toBe(true);
  expect(button.classList.contains('text-violet-100')).toBe(true);
  expect(screen.queryByText('Button Primary')).not.toBe(null);
});

test('Should render secondary button when isSecondary is true', async () => {
  render(<Button isSecondary>Button Secondary</Button>);
  const button = screen.getByRole('button');

  expect(button.classList.contains('bg-violet-100')).toBe(true);
  expect(button.classList.contains('text-violet-900')).toBe(true);
  expect(screen.queryByText('Button Secondary')).not.toBe(null);
});

test('Should render link when isLink is true', async () => {
  render(<Button isLink href="/internal-link">Button Internal Link</Button>);
  const button = screen.getByRole('link');

  expect(button.tagName).toBe('A');
  expect(button.getAttribute('href')).toBe('/internal-link');
  expect(screen.queryByText('Button Internal Link')).not.toBe(null);
});

test('Should render link when isLink is true', async () => {
  render(<Button isLink isExternal href="/external-link">Button External Link</Button>);
  const button = screen.getByRole('link');

  expect(button.tagName).toBe('A');
  expect(button.getAttribute('href')).toBe('/external-link');
  expect(await screen.queryByText('Button External Link')).not.toBe(null);
});
