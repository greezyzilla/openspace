import { useAppSelector } from '../../../hooks/redux';
import UserItem from './userItem';

export default function RightSidebar() {
  const { users } = useAppSelector((state) => state.user);

  if (!users.length) return <p>Loading</p>;

  return (
    <aside className="hidden max-w-[240px] flex-1 flex-col gap-4 border-r-2 border-slate-200/50 pl-6 pt-4 lg:flex">
      <div>
        <h2 className="mb-1 text-xs font-medium text-slate-400">
          Recent Users
        </h2>
        <div className="mr-3 flex flex-col gap-1">
          {users.slice(0, 8).map((user) => <UserItem user={user} key={user.id} />)}
        </div>
      </div>
    </aside>
  );
}
