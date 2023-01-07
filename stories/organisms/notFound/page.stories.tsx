import { Meta, StoryObj } from '@storybook/react';
import { PageNotFound } from '../../../components/organisms/notFound';

const meta: Meta<typeof PageNotFound> = {
  title: 'organisms/notFound/page',
  component: PageNotFound,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageNotFound>;

export const Default: Story = {};
