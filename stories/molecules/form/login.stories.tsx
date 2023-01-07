import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { LoginForm } from '../../../components/molecules';
import { store } from '../../../store';

const meta: Meta<typeof LoginForm> = {
  title: 'molecules/form/login',
  component: LoginForm,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {};
