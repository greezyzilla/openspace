import { Meta, StoryObj } from '@storybook/react';
import { ToggleButton } from '../../../components/atoms';

const meta: Meta<typeof ToggleButton> = {
  title: 'atoms/button/toggle',
  component: ToggleButton,
  tags: ['autodocs'],
  args: {
    activeClassname: 'bg-violet-600 text-white py-2 px-3 rounded-md',
    inactiveClassname: 'bg-slate-100 py-2 px-3 text-violet-600 rounded-md',
  },
};

export default meta;
  type Story = StoryObj<typeof ToggleButton>;

export const Active: Story = {
  args: {
    isActive: true,
    children: 'Toggle Button',
  },
};

export const Inactive: Story = {
  args: {
    isActive: false,
    children: 'Toggle Button',
  },
};
