import { Meta, StoryObj } from '@storybook/react';
import { Provider } from 'react-redux';
import DetailsPage from '../../pages/details/[id].page';
import { store } from '../../store';

const meta: Meta<typeof DetailsPage> = {
  title: 'pages/detail',
  component: DetailsPage as any,
  tags: ['autodocs'],
  decorators: [
    (Story) => (<Provider store={store}><Story /></Provider>),
  ],
};

export default meta;
type Story = StoryObj<typeof DetailsPage>;

export const Default: Story = {};
