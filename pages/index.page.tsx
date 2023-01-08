import { Threads } from '../components/organisms';
import { DashboardTemplate } from '../components/templates';
import { useAppSelector } from '../hooks';

export default function Home() {
  const threads = useAppSelector((state) => state.thread.present.threads);

  return (
    <DashboardTemplate title="Home">
      <Threads threads={threads} />
    </DashboardTemplate>
  );
}
