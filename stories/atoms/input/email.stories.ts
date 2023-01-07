import { Meta, StoryObj } from '@storybook/react';
import { InputEmail } from '../../../components/atoms';

const meta: Meta<typeof InputEmail> = {
  title: 'atoms/input/email',
  component: InputEmail,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof InputEmail>;

export const Default: Story = {
  args: {
    label: 'Input Email',
    placeholder: 'Type your email here',
    name: 'email',
  },
};
