import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Threads from '../../components/organisms/threads';
import { DashboardTemplate } from '../../components/templates';
import { Thread } from '../../features/thread/thread.interface';
import { useAppSelector } from '../../hooks/redux';

export default function ThreadByCategoryPage() {
  const [threadByCategory, setThreadByCategory] = useState<Thread[]>();
  const { loading, threads } = useAppSelector((state) => state.thread);
  const router = useRouter();

  const category = router.query.category as string;

  useEffect(() => {
    if (router.isReady) {
      const filteredThread = threads.filter((t) => {
        // console.log(t.category);
        if (category === 'unknown') return !t.category;
        return t.category === category;
      });
      console.log(filteredThread);
      setThreadByCategory(filteredThread);
    }
  }, [router, loading]);

  if (!threadByCategory?.length || loading) return <p>Loading</p>;

  return (
    <DashboardTemplate>
      <Threads threads={threadByCategory} />
    </DashboardTemplate>
  );
}
