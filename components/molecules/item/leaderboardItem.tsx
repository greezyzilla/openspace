import Image from 'next/image';
import PropTypes from 'prop-types';
import { UserPropTypes } from '../../../proptypes';
import { User } from '../../../features/user/user.interface';

interface LeaderboardItemProps{
    /** The correspondent user that will be showed (must have avatar, name and email) */
    user: User,
    /** The index of the item */
    no: number;
    /** The score of the user */
    score: number;
}

export default function LeaderboardItem({ score, user, no } : LeaderboardItemProps) {
  return (
    <div className="flex h-20 items-center gap-3 rounded-2xl bg-white p-6 shadow-md shadow-slate-100">
      <p className="w-10 text-center text-4xl font-extralight text-slate-500">
        {no}
        .
      </p>
      <Image src={user.avatar} className="rounded-lg" width={40} height={40} alt={user.name} />
      <div className="flex-1 overflow-hidden">
        <h3 className="truncate font-medium text-slate-600 sm:max-w-none">{user.name}</h3>
        <p className="truncate text-xs text-slate-500 sm:max-w-none">{user.email}</p>
      </div>
      <p className="flex items-end justify-center text-4xl font-light text-violet-800/80">
        {score}
        <span className="text-2xl font-extralight text-slate-500/80">Pts</span>
      </p>
    </div>
  );
}

LeaderboardItem.Skeleton = function LeaderboardItemSkeleton() {
  return (
    <div className="flex h-20 items-center gap-3 rounded-2xl bg-white p-6">
      <p className="skeleton w-10 text-center text-4xl font-extralight text-slate-500">&nbsp;</p>
      <div className="skeleton h-10 w-full max-w-[40px] rounded-lg" />
      <div className="flex flex-1 flex-col gap-1 overflow-hidden">
        <h3 className="skeleton truncate font-medium text-slate-600 sm:max-w-none">&nbsp;</h3>
        <p className="skeleton truncate text-xs text-slate-500 sm:max-w-none">&nbsp;</p>
      </div>
      <p className="skeleton flex w-20 items-end justify-center text-4xl font-light text-violet-800/80">&nbsp;</p>
    </div>
  );
};

LeaderboardItem.propTypes = {
  user: PropTypes.exact(UserPropTypes).isRequired,
  no: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
