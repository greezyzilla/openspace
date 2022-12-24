import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getThreadById } from '../../features/thread';
import { DashboardTemplate } from '../../components/templates';
import { ThreadNotFound, ThreadDetails } from '../../components/organisms';

export default function ThreadDetailPage() {
  const { thread, loading } = useAppSelector((state) => state.thread.present);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (router.isReady) dispatch(getThreadById({ threadId: router.query.id as string }));
  }, [router, dispatch]);

  let detailPage;
  if (thread) detailPage = <ThreadDetails thread={thread} />;
  else if (!thread && loading) detailPage = <ThreadDetails.Skeleton />;
  else detailPage = <ThreadNotFound />;

  return (
    <DashboardTemplate title="Details">
      {detailPage}
    </DashboardTemplate>
  );
}
