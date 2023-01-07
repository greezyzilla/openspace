import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Leaderboards } from '../../components/organisms';
import { store } from '../../store';

const meta: Meta<typeof Leaderboards> = {
  title: 'organisms/leaderboards',
  component: Leaderboards as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof Leaderboards>;

export const Default: Story = {};
