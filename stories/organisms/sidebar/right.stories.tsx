import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { RightSidebar } from '../../../components/organisms';
import { store } from '../../../store';

const meta: Meta<typeof RightSidebar> = {
  title: 'organisms/sidebar/right',
  component: RightSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}><Story /></Provider>,
  ],
};

export default meta;
type Story = StoryObj<typeof RightSidebar>;

export const Default: Story = {};
