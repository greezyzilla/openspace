import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ThreadDetail from '../../components/organisms/threadDetail';
import { DashboardTemplate } from '../../components/templates';
import { getThreadById } from '../../features/thread';
import { ThreadDetail as ThreadDetailInterface } from '../../features/thread/thread.interface';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export default function ThreadDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [thread, setThread] = useState<ThreadDetailInterface>();

  const { loading } = useAppSelector((state) => state.thread);
  const id = router.query.id as string;

  useEffect(() => {
    if (router.isReady) {
      dispatch(getThreadById(id)).then((res) => {
        setThread(res.payload.data.detailThread);
      });
    }
  }, [router]);

  if (loading || !thread) return <DashboardTemplate><p>Loading</p></DashboardTemplate>;

  return (
    <DashboardTemplate>
      <ThreadDetail thread={thread!} />
    </DashboardTemplate>
  );
}
