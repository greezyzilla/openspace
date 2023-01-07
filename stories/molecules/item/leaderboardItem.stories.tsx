import { Meta, StoryObj } from '@storybook/react';
import { LeaderboardItem } from '../../../components/molecules';
import { createUser } from '../../../tests/userHelpers';

const meta: Meta<typeof LeaderboardItem> = {
  title: 'molecules/item/leaderboardItem',
  component: LeaderboardItem,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof LeaderboardItem>;

export const Default: Story = {
  args: {
    no: 1,
    score: 3000,
    user: createUser({}),
  },
};
