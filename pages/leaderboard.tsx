import { useEffect } from 'react';
import Dashboard from '../components/templates/dashboard';
import { getLeaderboards } from '../features/user';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

export default function Leaderboard() {
  const { leaderboards, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLeaderboards());
  }, []);

  const isLoading = !leaderboards.length || loading;

  return (
    <Dashboard>
      <div className="flex flex-col gap-4">
        {!isLoading ? leaderboards.slice(0, 10).map((leaderboard, index) => (
          <div key={leaderboard.user.id} className="flex h-20 items-center gap-3 rounded-2xl bg-white p-6">
            <p className="w-10 text-center text-4xl font-extralight text-slate-500">
              {index + 1}
              .
            </p>
            <img src={leaderboard.user.avatar} className="h-10 w-10 rounded-lg" alt={leaderboard.user.name} />
            <div className="flex-1 overflow-hidden">
              <h3 className="truncate font-medium text-slate-600 sm:max-w-none">{leaderboard.user.name}</h3>
              <p className="truncate text-xs text-slate-500 sm:max-w-none">{leaderboard.user.email}</p>
            </div>
            <p className="flex items-end justify-center text-4xl font-light text-violet-800/80">
              {leaderboard.score}
              <span className="text-2xl font-extralight text-slate-500/80">Pts</span>
            </p>
          </div>
        )) : [...new Array(10)].map((_, index) => (
          <div key={`skeleton-leaderboard-${index}`} className="flex h-20 items-center gap-3 rounded-2xl bg-white p-6">
            <p className="skeleton w-10 text-center text-4xl font-extralight text-slate-500">&nbsp;</p>
            <div className="skeleton h-10 w-full max-w-[40px] rounded-lg" />
            <div className="flex flex-1 flex-col gap-1 overflow-hidden">
              <h3 className="skeleton truncate font-medium text-slate-600 sm:max-w-none">&nbsp;</h3>
              <p className="skeleton truncate text-xs text-slate-500 sm:max-w-none">&nbsp;</p>
            </div>
            <p className="skeleton flex w-20 items-end justify-center text-4xl font-light text-violet-800/80">&nbsp;</p>
          </div>
        ))}
      </div>
    </Dashboard>
  );
}
