import { Meta, StoryObj } from '@storybook/react';
import { Card } from '../../components/atoms';

const meta: Meta<typeof Card> = {
  title: 'atoms/card',
  component: Card as any,
  tags: ['autodocs'],
  args: {
    className: 'bg-violet-100 text-slate-800 p-2 text-center',
  },
};

export default meta;
  type Story = StoryObj<typeof Card>;

export const Small: Story = {
  args: {
    children: 'content',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'content',
    size: 'md',
  },
};
export const Large: Story = {
  args: {
    children: 'content',
    size: 'lg',
  },
};
