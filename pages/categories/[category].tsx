import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';
import { DashboardTemplate } from '../../components/templates';
import { Threads } from '../../components/organisms';

export default function ThreadByCategoryPage() {
  const { threads } = useAppSelector((state) => state.thread);

  const category = useRouter().query.category as string;
  const filteredThread = threads.filter((t) => t.category === category);

  return (
    <DashboardTemplate title={`#${category}`}>
      <Threads threads={filteredThread} />
    </DashboardTemplate>
  );
}
