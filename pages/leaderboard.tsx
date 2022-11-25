import { useEffect } from 'react';
import Dashboard from '../components/templates/dashboard';
import { getLeaderboards } from '../features/user';
import { useAppDispatch, useAppSelector } from '../hooks/redux';

export default function Leaderboard() {
  const { loading, leaderboards } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLeaderboards());
  }, []);

  return (
    <Dashboard>
      {
        loading ? <p>Loading</p> : (
          <div className="flex flex-col gap-4">
            {leaderboards.slice(0, 10).map((leaderboard, index) => (
              <div key={leaderboard.user.id} className="flex h-20 items-center gap-3 rounded-2xl bg-white p-6">
                <p className="w-10 text-center text-4xl font-extralight text-slate-500">
                  {index + 1}
                  .
                </p>
                <img src={leaderboard.user.avatar} className="h-10 w-10 rounded-lg" alt={leaderboard.user.name} />
                <div className="flex-1">
                  <h3 className="font-medium text-slate-600">{leaderboard.user.name}</h3>
                  <p className="text-xs text-slate-500">{leaderboard.user.email}</p>
                </div>
                <p className="flex items-end justify-center text-4xl font-light text-violet-800/80">
                  {leaderboard.score}
                  <span className="text-2xl font-extralight text-slate-500/80">Pts</span>
                </p>
              </div>
            ))}
          </div>
        )
      }
    </Dashboard>
  );
}
