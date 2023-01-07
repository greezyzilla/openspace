import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import { Modal } from '../../components/molecules';
import { store } from '../../store';
import { Card } from '../../components/atoms';

const meta: Meta<typeof Modal> = {
  title: 'molecules/modal',
  component: Modal as any,
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
  args: {
    isOpen: false,
    children: <Card className="rounded-lg p-4" size="lg">Content</Card>,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Closed: Story = {
  args: {
    isOpen: false,
  },
};

export const Open: Story = {
  args: {
    isOpen: true,
  },
};
