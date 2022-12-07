import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ThreadDetail from '../../components/organisms/threadDetail';
import { DashboardTemplate } from '../../components/templates';
import { getThreadById } from '../../features/thread';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export default function ThreadDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const thread = useAppSelector((state) => state.thread.thread);

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      dispatch(getThreadById(id));
    }
  }, [router]);

  return (
    <DashboardTemplate>
      {
        (!thread) ? <p>Loading</p> : <ThreadDetail thread={thread!} />
      }
    </DashboardTemplate>
  );
}
