import { Meta, StoryObj } from '@storybook/react';
import { HomeIcon } from '@heroicons/react/24/solid';
import { SidebarItem } from '../../../components/molecules';

const meta: Meta<typeof SidebarItem> = {
  title: 'molecules/item/sidebarItem',
  component: SidebarItem as any,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof SidebarItem>;

export const Default: Story = {
  args: {
    Icon: HomeIcon,
    children: 'Home',
    href: '/',
  },
};
