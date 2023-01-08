import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import LeaderboardsPage from '../../pages/leaderboard.page';
import { store } from '../../store';

const meta: Meta<typeof LeaderboardsPage> = {
  title: 'pages/leaderboards',
  component: LeaderboardsPage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof LeaderboardsPage>;

export const Default: Story = {};
