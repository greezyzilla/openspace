import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import CategoriesPage from '../../pages/categories/[category]';
import { store } from '../../store';

const meta: Meta<typeof CategoriesPage> = {
  title: 'pages/categories',
  component: CategoriesPage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof CategoriesPage>;

export const Default: Story = {};
