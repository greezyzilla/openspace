import { Meta, StoryObj } from '@storybook/react';
import { ThreadNotFound } from '../../../components/organisms/notFound';

const meta: Meta<typeof ThreadNotFound> = {
  title: 'organisms/notFound/thread',
  component: ThreadNotFound,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThreadNotFound>;

export const Default: Story = {};
