import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Comment } from '../../components/molecules';
import { store } from '../../store';
import { createOwner } from '../../tests/userHelpers';
import { createComment } from '../../tests/threadHelpers';

const meta: Meta<typeof Comment> = {
  title: 'molecules/comment',
  component: Comment as any,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Comment>;

const owner = createOwner({});
const comment = createComment({ owner });

export const Default: Story = {
  args: {
    ...comment,
  },
};

export const Skeleton: Story = {
  render: () => <Comment.Skeleton />,
};
