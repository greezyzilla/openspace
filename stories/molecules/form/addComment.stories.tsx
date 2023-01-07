import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { AddCommentForm } from '../../../components/molecules';
import { store } from '../../../store';

const meta: Meta<typeof AddCommentForm> = {
  title: 'molecules/form/addComment',
  component: AddCommentForm,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddCommentForm>;

export const Default: Story = {};
