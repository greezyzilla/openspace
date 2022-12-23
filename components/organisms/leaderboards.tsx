import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getLeaderboards } from '../../features/user';
import { LeaderboardItem } from '../molecules';

export default function Leaderboard() {
  const { leaderboards, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLeaderboards());
  }, [dispatch]);

  const isLoading = !leaderboards.length || loading;

  return (
    <div className="flex flex-col gap-4">
      {!isLoading ? leaderboards.slice(0, 10).map(({ score, user }, index) => (
        <LeaderboardItem
          key={user.id}
          no={index + 1}
          score={score}
          user={user}
        />
      )) : [...new Array(10)].map((_, index) => (
        <LeaderboardItem.Skeleton
          key={`skeleton-leaderboard-${index}`}
        />
      ))}
    </div>
  );
}
