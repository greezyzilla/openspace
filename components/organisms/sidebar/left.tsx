import {
  ChartBarIcon, HashtagIcon, HomeIcon, PlusIcon,
} from '@heroicons/react/24/solid';
import { postThread } from '../../../features/thread';
import { PostThread } from '../../../features/thread/thread.interface';
import { getTrendingCategoriesFromThreads } from '../../../utils';
import { Button, Card } from '../../atoms';
import { AddThreadForm, Modal, SidebarItem } from '../../molecules';
import {
  useAppDispatch, useAppSelector, useToggle, useRequest,
} from '../../../hooks';

export default function LeftSidebar() {
  const [isOpen, _, open, close] = useToggle(false);

  const dispatch = useAppDispatch();
  const request = useRequest();

  const onAddThreadHandle = async (thread: PostThread) => (
    request(() => dispatch(postThread(thread)))
  );

  const { threads, loading } = useAppSelector((state) => state.thread);
  const isLoading = !threads.length || loading;
  return (
    <>
      <Button onClick={open} className="group fixed bottom-8 right-8 flex items-center gap-3 rounded-lg bg-violet-700 p-2 text-sm text-white/90 shadow-xl shadow-black/20 md:hidden">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100/5">
          <PlusIcon className="h-4 w-4 text-white" />
          <p className="absolute top-0 -left-24 hidden whitespace-nowrap rounded-lg bg-white p-2 text-xs text-slate-500 shadow-md group-hover:block">New Thread</p>
        </div>
      </Button>
      <aside className="hidden max-w-[240px] flex-1 flex-col gap-6 border-r-2 border-slate-200/50 pl-6 pt-6 md:flex">
        <Button onClick={open} className="mr-3 flex items-center gap-3 rounded-lg bg-violet-700 px-3 py-2 text-sm text-white/90 shadow-sm shadow-violet-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100/20">
            <PlusIcon className="h-4 w-4 text-white" />
          </div>
          New Thread
        </Button>
        <Modal isOpen={isOpen} onClose={close}>
          <Card size="lg" className="overflow-hidden rounded-2xl transition-all">
            <AddThreadForm onCancel={close} onSubmit={onAddThreadHandle} />
          </Card>
        </Modal>
        <div>
          <h2 className="mb-1 text-xs font-medium text-slate-400">Navigation</h2>
          <div className="flex flex-col gap-1">
            <SidebarItem Icon={HomeIcon} href="/">Home</SidebarItem>
            <SidebarItem Icon={ChartBarIcon} href="/leaderboard">Leaderboard</SidebarItem>
          </div>
        </div>
        <div>
          <h2 className="mb-1 text-xs font-medium text-slate-400">Trending Categories</h2>
          <div className="flex flex-col gap-1">
            {
              !isLoading ? getTrendingCategoriesFromThreads(threads)
                .map(({ category, total }) => (
                  <SidebarItem key={category} href={`/categories/${category}`} Icon={HashtagIcon}>
                    <div className="flex flex-1 items-center justify-between gap-2 overflow-hidden">
                      <p className="flex-1 overflow-hidden truncate">{category}</p>
                      <p className="flex h-6 w-6 items-center justify-center rounded-lg bg-violet-100 text-xs text-violet-400">{total}</p>
                    </div>
                  </SidebarItem>
                )) : (
                [...new Array(5)].map((__, index) => <SidebarItem.Skeleton key={`skeleton-category-${index}`} />)
              )
            }
          </div>
        </div>
      </aside>
    </>
  );
}
