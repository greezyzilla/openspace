import { User } from '../../../features/user/user.interface';

interface UserItemProps{
    user: User;
}

export default function UserItem({ user } : UserItemProps) {
  return (
    <div className="rounded-lg py-2 flex text-sm items-center gap-3 text-slate-500/80">
      <img src={user.avatar} className="w-10 h-10 rounded-lg" alt={user.name} />
      <div className="flex w-full flex-col justify-center overflow-hidden">
        <h5 className="text-sm">{user.name}</h5>
        <p className="text-xs truncate font-light">{user.email}</p>
      </div>
    </div>
  );
}
