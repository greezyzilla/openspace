import { Meta, StoryObj } from '@storybook/react';
import { InputPassword } from '../../../components/atoms';

const meta: Meta<typeof InputPassword> = {
  title: 'atoms/input/password',
  component: InputPassword,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof InputPassword>;

export const Valid: Story = {
  args: {
    isValid: true,
    label: 'Input Password',
    placeholder: 'Type your password here',
    name: 'password',
  },
};

export const Invalid: Story = {
  args: {
    label: 'Input Password',
    isValid: false,
    placeholder: 'Type your password here',
    name: 'password',
  },
};
