import { useAppSelector } from '../../../hooks/redux';
import UserItem from './userItem';

export default function RightSidebar() {
  const { users } = useAppSelector((state) => state.user);

  if (!users.length) return <p>Loading</p>;

  return (
    <aside className="max-w-[240px] pl-6 pt-4 flex-1 border-r-2 border-slate-200/50 flex flex-col gap-4">
      <div>
        <h2 className="text-slate-400 font-medium text-xs mb-1">
          Recent Users
        </h2>
        <div className="flex flex-col gap-1 mr-3">
          {users.slice(0, 8).map((user) => <UserItem user={user} key={user.id} />)}
        </div>
      </div>
    </aside>
  );
}
