import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { RegisterForm } from '../../../components/molecules';
import { store } from '../../../store';

const meta: Meta<typeof RegisterForm> = {
  title: 'molecules/form/register',
  component: RegisterForm,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RegisterForm>;

export const Default: Story = {};
