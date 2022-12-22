import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getThreadById } from '../../features/thread';
import { DashboardTemplate } from '../../components/templates';
import { ThreadDetails } from '../../components/organisms';

export default function ThreadDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { thread, loading } = useAppSelector((state) => state.thread);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      dispatch(getThreadById(id));
    }
  }, [router]);

  const isLoading = !thread || loading;
  return (
    <DashboardTemplate title="Details">
      {
        !isLoading ? <ThreadDetails thread={thread} /> : <ThreadDetails.Skeleton />
      }
    </DashboardTemplate>
  );
}
