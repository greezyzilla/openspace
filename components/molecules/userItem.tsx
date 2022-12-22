import { User } from '../../features/user/user.interface';

interface UserItemProps{
    user: User;
}

export default function UserItem({ user } : UserItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg py-2 text-sm text-slate-500/80">
      <img src={user.avatar} className="h-10 w-10 rounded-lg" alt={user.name} />
      <div className="flex w-full flex-col justify-center overflow-hidden">
        <h5 className="truncate text-sm">{user.name}</h5>
        <p className="truncate text-xs font-light">{user.email}</p>
      </div>
    </div>
  );
}

UserItem.Skeleton = function UserItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg py-2 text-sm text-slate-500/80">
      <div className="skeleton h-10 w-full max-w-[40px] rounded-lg" />
      <div className="flex w-full flex-col justify-center gap-1 overflow-hidden">
        <h5 className="skeleton text-sm">&nbsp;</h5>
        <p className="skeleton truncate text-xs font-light">&nbsp;</p>
      </div>
    </div>
  );
};
