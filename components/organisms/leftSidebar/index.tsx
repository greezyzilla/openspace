import { ChartBarIcon, HomeIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { useAppSelector } from '../../../hooks/redux';
import AddThreadForm from '../../molecules/form/addThread';
import Modal from '../../molecules/modal';
import CategoryItem from './categoryItem';
import SidebarItem from './sidebarItem';

export default function LeftSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const threads = useAppSelector((state) => state.thread.threads);
  if (!threads.length) return <p>Loading</p>;
  const categories = threads.map((thread) => (thread.category || '').toLocaleLowerCase());
  const groupedCategories = categories
    .reduce((acc : any, category) => ({ ...acc, [category]: (+acc[category] || 0) + 1 }), {});
  const sortedCategories = Object.keys(groupedCategories)
    .map((category) => ({ category, total: groupedCategories[category] }))
    .sort((a, b) => b.total - a.total);
  const trendingCategories = sortedCategories.slice(0, 5);

  return (
    <aside className="max-w-[240px] pl-6 pt-6 flex-1 border-r-2 border-slate-200/50 flex flex-col gap-6">
      <button type="button" onClick={openModal} className="px-3 rounded-lg py-2 flex text-sm items-center gap-3 text-white/90 bg-violet-700 mr-3">
        <div className="rounded-lg w-8 h-8 flex justify-center items-center bg-slate-100/20">
          <PlusIcon className="w-4 h-4 text-white" />
        </div>
        New Thread
      </button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <AddThreadForm onCancel={closeModal} onSubmit={(v) => console.log(v)} />
      </Modal>
      <div>
        <h2 className="text-slate-400 font-medium text-xs mb-1">
          Navigation
        </h2>
        <div className="flex flex-col gap-1">
          <SidebarItem Icon={HomeIcon} href="/">Home</SidebarItem>
          <SidebarItem Icon={ChartBarIcon} href="/leaderboard">Leaderboard</SidebarItem>
        </div>
      </div>
      <div>
        <h2 className="text-slate-400 font-medium text-xs mb-1">
          Trending Categories
        </h2>
        <div className="flex flex-col gap-1">
          {
            trendingCategories.map(({ category, total }) => (
              <CategoryItem category={category} total={total} key={category} />
            ))
          }
        </div>
      </div>
    </aside>
  );
}
