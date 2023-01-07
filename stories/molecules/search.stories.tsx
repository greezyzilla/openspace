import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Search } from '../../components/molecules';
import { createThread } from '../../tests/threadHelpers';
import { createUser } from '../../tests/userHelpers';
import { store } from '../../store';
import { getThreads } from '../../features/thread';
import { getUsers } from '../../features/user';

const user1 = createUser({}, 1);
const user2 = createUser({}, 2);
const users = [user1, user2];
const thread1 = { ...createThread({ category: 'react', ownerId: user1.id }, 1), totalComments: 0 };
const thread2 = { ...createThread({ category: 'angular', ownerId: user1.id }, 2), totalComments: 0 };
const thread3 = { ...createThread({ category: 'react', ownerId: user2.id }, 3), totalComments: 0 };
const thread4 = { ...createThread({ category: 'vue', ownerId: user2.id }, 4), totalComments: 0 };
const threads = [thread1, thread2, thread3, thread4];

store.dispatch({ type: getThreads.fulfilled.type, payload: { data: { threads } } });
store.dispatch({ type: getUsers.fulfilled.type, payload: { data: { users } } });

const meta: Meta<typeof Search> = {
  title: 'molecules/search',
  component: Search as any,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = { args: { } };
