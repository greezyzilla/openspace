import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { UserNavigation } from '../../components/molecules';
import { createUser } from '../../tests/userHelpers';
import { store } from '../../store';
import { getAuthenticatedUser } from '../../features/auth';

store.dispatch({
  type: getAuthenticatedUser.fulfilled.type,
  payload: { data: { user: createUser({}) } },
});

const meta: Meta<typeof UserNavigation> = {
  title: 'molecules/userNavigation',
  component: UserNavigation,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}><Story /></Provider>,
  ],
};

export default meta;
type Story = StoryObj<typeof UserNavigation>;

export const Authenticated: Story = {

};

export const NotAuthenticated: Story = {
  render: () => <UserNavigation.NotAuthenticated />,
};
