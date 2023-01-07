import { Meta, StoryObj } from '@storybook/react';
import { InputTextarea } from '../../../components/atoms';

const meta: Meta<typeof InputTextarea> = {
  title: 'atoms/input/textarea',
  component: InputTextarea,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof InputTextarea>;

export const Default: Story = {
  args: {
    label: 'Input Email',
    placeholder: 'Type your email here',
    name: 'email',
  },
};
