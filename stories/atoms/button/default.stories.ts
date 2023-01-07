import { Meta, StoryObj } from '@storybook/react';
import Button from '../../../components/atoms/button/default';

const meta: Meta<typeof Button> = {
  title: 'atoms/button/default',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    isPrimary: true,
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    isSecondary: true,
    children: 'Button',
  },
};

export const ExternalLink: Story = {
  args: {
    isLink: true,
    isExternal: true,
    children: 'Button',
    href: 'https://storybook.js.org/',
  },
};

export const InternalLink: Story = {
  args: {
    isLink: true,
    children: 'Button',
    href: 'http://localhost:3000',
  },
};
