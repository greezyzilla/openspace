import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Thread } from '../../features/thread/thread.interface';
import { useAppSelector } from '../../hooks/redux';
import { DashboardTemplate } from '../../components/templates';
import { Threads } from '../../components/organisms';

export default function ThreadByCategoryPage() {
  const [threadByCategory, setThreadByCategory] = useState<Thread[]>();
  const { loading, threads } = useAppSelector((state) => state.thread);
  const router = useRouter();

  const category = router.query.category as string;

  useEffect(() => {
    if (router.isReady) {
      const filteredThread = threads.filter((t) => t.category === category);
      setThreadByCategory(filteredThread);
    }
  }, [router, loading]);

  return (
    <DashboardTemplate title={`#${category}`}>
      <Threads threads={threadByCategory} />
    </DashboardTemplate>
  );
}
