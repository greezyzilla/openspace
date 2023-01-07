import { Meta, StoryObj } from '@storybook/react';
import { InputText } from '../../../components/atoms';

const meta: Meta<typeof InputText> = {
  title: 'atoms/input/text',
  component: InputText,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof InputText>;

export const WithLabel: Story = {
  args: {
    label: 'Input Text',
    placeholder: 'Type your text here',
    name: 'text',
  },
};

export const WithoutLabel: Story = {
  args: {
    label: '',
    placeholder: 'Type your text here',
    name: 'text',
  },
};
