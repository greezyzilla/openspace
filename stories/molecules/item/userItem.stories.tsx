import { Meta, StoryObj } from '@storybook/react';
import { UserItem } from '../../../components/molecules';
import { createUser } from '../../../tests/userHelpers';

const meta: Meta<typeof UserItem> = {
  title: 'molecules/item/userItem',
  component: UserItem,
  tags: ['autodocs'],
};

export default meta;
  type Story = StoryObj<typeof UserItem>;

export const Default: Story = {
  args: {
    user: createUser({}),
  },
};
