import Threads from '../components/organisms/threads';
import Dashboard from '../components/templates/dashboard';
import { useAppSelector } from '../hooks/redux';

export default function Home() {
  const threads = useAppSelector((state) => state.thread.threads);

  return (
    <Dashboard>
      <Threads threads={threads} />
    </Dashboard>
  );
}
