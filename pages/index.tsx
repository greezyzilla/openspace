import { Threads } from '../components/organisms';
import { DashboardTemplate } from '../components/templates';
import { useAppSelector } from '../hooks/redux';

export default function Home() {
  const threads = useAppSelector((state) => state.thread.threads);

  return (
    <DashboardTemplate title="Home">
      <Threads threads={threads} />
    </DashboardTemplate>
  );
}
