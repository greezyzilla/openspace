import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import RegisterPage from '../../../pages/auth/register.page';
import { store } from '../../../store';

const meta: Meta<typeof RegisterPage> = {
  title: 'pages/auth/register',
  component: RegisterPage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof RegisterPage>;

export const Default: Story = {};
