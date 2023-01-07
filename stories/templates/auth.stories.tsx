import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { AuthTemplate } from '../../components/templates';
import { store } from '../../store';

const meta: Meta<typeof AuthTemplate> = {
  title: 'templates/auth',
  component: AuthTemplate as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof AuthTemplate>;

export const Default: Story = {
  args: {
    children: 'Content',
    title: 'Auth Template',
  },
};
