import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Header } from '../../components/organisms';
import { store } from '../../store';

const meta: Meta<typeof Header> = {
  title: 'organisms/header',
  component: Header as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
