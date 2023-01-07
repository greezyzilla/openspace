import Image from 'next/image';
import PropTypes from 'prop-types';
import { User } from '../../../features/user/user.interface';
import { UserPropTypes } from '../../../proptypes';

interface UserItemProps{
    /** The correspondent user that will be showed (must have avatar, name and email) */
    user: User;
}

export default function UserItem({ user } : UserItemProps) {
  return (
    <div className="flex items-center gap-3 rounded-lg py-2 text-sm text-slate-500/80">
      <Image src={user.avatar} className="rounded-lg" width={40} height={40} alt={user.name} />
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

UserItem.propTypes = {
  user: PropTypes.exact(UserPropTypes).isRequired,
};
