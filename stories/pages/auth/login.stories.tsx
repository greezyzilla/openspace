import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import LoginPage from '../../../pages/auth/login';
import { store } from '../../../store';

const meta: Meta<typeof LoginPage> = {
  title: 'pages/auth/login',
  component: LoginPage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof LoginPage>;

export const Default: Story = {};
