import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ThreadDetail from '../../components/organisms/details';
import ThreadDetailsSkeleton from '../../components/organisms/details/skeleton';
import { DashboardTemplate } from '../../components/templates';
import { getThreadById } from '../../features/thread';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

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
    <DashboardTemplate>
      {
        !isLoading ? <ThreadDetail thread={thread!} />
          : <ThreadDetailsSkeleton />
      }
    </DashboardTemplate>
  );
}
