import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { ButtonVote } from '../../components/molecules';
import { store } from '../../store';

const meta: Meta<typeof ButtonVote> = {
  title: 'molecules/buttonVote',
  component: ButtonVote as any,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ButtonVote>;

export const Default: Story = {
  args: {
    votes: [],
  },
};

export const UpVote: Story = {
  args: {
    isVoteDown: false,
    votes: [],
  },
};

export const DownVote: Story = {
  args: {
    votes: [],
    isVoteDown: true,
  },
};

export const Skeleton: Story = {
  render: () => <ButtonVote.Skeleton />,
};
