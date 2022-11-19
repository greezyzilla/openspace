import { User } from '../../../features/user/user.interface';

interface UserItemProps{
    user: User;
}

export default function UserItem({ user } : UserItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg py-2 text-sm text-slate-500/80">
      <img src={user.avatar} className="h-10 w-10 rounded-lg" alt={user.name} />
      <div className="flex w-full flex-col justify-center overflow-hidden">
        <h5 className="text-sm">{user.name}</h5>
        <p className="truncate text-xs font-light">{user.email}</p>
      </div>
    </div>
  );
}
