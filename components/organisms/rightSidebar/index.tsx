import { useAppSelector } from '../../../hooks/redux';
import UserItem from './userItem';
import UserItemSkeleton from './userItemSkeleton';

export default function RightSidebar() {
  const { users, loading } = useAppSelector((state) => state.user);

  const isLoading = !users.length || loading;
  return (
    <aside className="hidden max-w-[240px] flex-1 flex-col gap-4 border-r-2 border-slate-200/50 pl-6 pt-4 lg:flex">
      <div>
        <h2 className="mb-1 text-xs font-medium text-slate-400">Recent Users</h2>
        <div className="mr-3 flex flex-col gap-1">
          {
            !isLoading ? users.slice(0, 8).map((user) => <UserItem user={user} key={user.id} />)
              : [...new Array(8)].map((_, index) => <UserItemSkeleton key={`skeleton-user-${index}`} />)
          }
        </div>
      </div>
    </aside>
  );
}
