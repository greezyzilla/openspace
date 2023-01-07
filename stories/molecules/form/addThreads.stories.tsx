import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { AddThreadForm } from '../../../components/molecules';
import { store } from '../../../store';

const meta: Meta<typeof AddThreadForm> = {
  title: 'molecules/form/addThread',
  component: AddThreadForm,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddThreadForm>;

export const Default: Story = {};
