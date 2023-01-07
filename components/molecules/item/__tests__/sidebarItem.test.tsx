import { render, screen } from '@testing-library/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import SidebarItem from '../sidebarItem';

jest.mock('next/router', () => ({ useRouter: jest.fn() }));

test('Should render sidebar item correctly', () => {
  const mockedReplace = jest.fn();
  jest.mocked(useRouter).mockReturnValue({ replace: mockedReplace } as any);

  const { container } = render(<SidebarItem Icon={PlusIcon} href="/direction">Click here</SidebarItem>);
  const item = screen.getByRole('link');

  expect(item.getAttribute('href')).toBe('/direction');
  expect(container.querySelector('svg')).not.toBe(null);
  expect(screen.queryByText('Click here')).not.toBe(null);
});

test('Should render sidebar item skeleton correctly', () => {
  const { container } = render(<SidebarItem.Skeleton />);

  expect(container.querySelectorAll('.skeleton').length).not.toBe(0);
});
