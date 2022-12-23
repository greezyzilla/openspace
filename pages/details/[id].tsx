import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getThreadById } from '../../features/thread';
import { DashboardTemplate } from '../../components/templates';
import { ThreadDetails } from '../../components/organisms';

export default function ThreadDetailPage() {
  const { thread, loading } = useAppSelector((state) => state.thread);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) dispatch(getThreadById({ threadId: router.query.id as string }));
  }, [router, dispatch]);

  const isLoading = !thread || loading;
  return (
    <DashboardTemplate title="Details">
      {
        !isLoading ? <ThreadDetails thread={thread} /> : <ThreadDetails.Skeleton />
      }
    </DashboardTemplate>
  );
}
