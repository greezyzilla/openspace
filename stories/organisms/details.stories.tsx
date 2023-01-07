import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { ThreadDetails } from '../../components/organisms';
import { store } from '../../store';
import { createOwner } from '../../tests/userHelpers';
import { createThreadDetail } from '../../tests/threadHelpers';

const owner = createOwner({});
const body = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, hic quaerat! Iusto provident minima similique, laudantium fugiat perspiciatis aliquid labore harum ipsum doloribus! Sint ratione animi ullam distinctio officiis natus provident impedit necessitatibus similique eaque magni quod totam eligendi excepturi amet fugit autem ut nisi, ipsum tenetur est voluptatum sed!. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, hic quaerat! Iusto provident minima similique, laudantium fugiat perspiciatis aliquid labore harum ipsum doloribus! Sint ratione animi ullam distinctio officiis natus provident impedit necessitatibus similique eaque magni quod totam eligendi excepturi amet fugit autem ut nisi, ipsum tenetur est voluptatum sed!';
const detailThread = createThreadDetail({ owner, body });

const meta: Meta<typeof ThreadDetails> = {
  title: 'organisms/details',
  component: ThreadDetails as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}><Story /></Provider>,
  ],
};

export default meta;
type Story = StoryObj<typeof ThreadDetails>;

export const Default: Story = {
  args: {
    thread: { ...detailThread, totalComments: 0 } as any,
  },
};
