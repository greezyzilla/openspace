import { DashboardTemplate } from '../components/templates';
import { Leaderboards } from '../components/organisms';

export default function Leaderboard() {
  return (
    <DashboardTemplate title="Leaderboard">
      <Leaderboards />
    </DashboardTemplate>
  );
}
