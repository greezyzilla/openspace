import {
  ChartBarIcon, HashtagIcon, HomeIcon, PlusIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import Card from '../../atoms/card';
import AddThreadForm from '../../molecules/form/addThread';
import Modal from '../../molecules/modal';
import SidebarItem from './sidebarItem';

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const threads = useAppSelector((state) => state.thread.threads);
  if (!threads.length) return <p>Loading</p>;
  const categories = threads.map((thread) => (thread.category).toLocaleLowerCase());
  const groupedCategories = categories
    .reduce((acc : any, category) => ({ ...acc, [category]: (+acc[category] || 0) + 1 }), {});
  const sortedCategories = Object.keys(groupedCategories)
    .map((category) => ({ category, total: groupedCategories[category] }))
    .sort((a, b) => b.total - a.total);
  const trendingCategories = sortedCategories.slice(0, 5);

  return (
    <aside className="flex max-w-[240px] flex-1 flex-col gap-6 border-r-2 border-slate-200/50 pl-6 pt-6">
      <button type="button" onClick={openModal} className="mr-3 flex items-center gap-3 rounded-lg bg-violet-700 px-3 py-2 text-sm text-white/90">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/20">
          <PlusIcon className="h-4 w-4 text-white" />
        </div>
        New Thread
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <Card size="lg" className="overflow-hidden rounded-2xl transition-all">
          <AddThreadForm onCancel={closeModal} onSubmit={(v) => console.log(v)} />
        </Card>
      </Modal>
      <div>
        <h2 className="mb-1 text-xs font-medium text-slate-400">
          Navigation
        </h2>
        <div className="flex flex-col gap-1">
          <SidebarItem Icon={HomeIcon} href="/">Home</SidebarItem>
          <SidebarItem Icon={ChartBarIcon} href="/leaderboard">Leaderboard</SidebarItem>
        </div>
      </div>
      <div>
        <h2 className="mb-1 text-xs font-medium text-slate-400">
          Trending Categories
        </h2>
        <div className="flex flex-col gap-1">
          {
            trendingCategories.map(({ category, total }) => (
              <SidebarItem key={category} href={`/categories/${category}`} Icon={HashtagIcon}>
                <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                  <p className="flex-1 overflow-hidden truncate">{category}</p>
                  <p className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs text-violet-400">{total}</p>
                </div>
              </SidebarItem>
            ))
          }
        </div>
      </div>
    </aside>
  );
}
