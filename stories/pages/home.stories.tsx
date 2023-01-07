import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import HomePage from '../../pages';
import { store } from '../../store';

const meta: Meta<typeof HomePage> = {
  title: 'pages/home',
  component: HomePage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};
