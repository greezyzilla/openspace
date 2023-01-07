import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { LeftSidebar } from '../../../components/organisms';
import { store } from '../../../store';

const meta: Meta<typeof LeftSidebar> = {
  title: 'organisms/sidebar/left',
  component: LeftSidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => <Provider store={store}><Story /></Provider>,
  ],
};

export default meta;
type Story = StoryObj<typeof LeftSidebar>;

export const Default: Story = {};
