import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { DashboardTemplate } from '../../components/templates';
import { store } from '../../store';

const meta: Meta<typeof DashboardTemplate> = {
  title: 'templates/dashboard',
  component: DashboardTemplate as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof DashboardTemplate>;

export const Default: Story = {
  args: {
    children: 'Content',
    title: 'Dashboard Template',
  },
};
