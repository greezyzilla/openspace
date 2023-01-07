import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import NotFound from '../../pages/404';
import { store } from '../../store';

const meta: Meta<typeof NotFound> = {
  title: 'pages/notFound',
  component: NotFound as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof NotFound>;

export const Default: Story = {};
