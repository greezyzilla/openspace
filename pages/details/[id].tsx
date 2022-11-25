import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ThreadDetail from '../../components/organisms/threadDetail';
import { DashboardTemplate } from '../../components/templates';
import { getThreadById } from '../../features/thread';
import { ThreadDetail as ThreadDetailInterface } from '../../features/thread/thread.interface';
import { useAppDispatch } from '../../hooks/redux';

export default function ThreadDetailPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [thread, setThread] = useState<ThreadDetailInterface>();

  useEffect(() => {
    if (router.isReady) {
      const id = router.query.id as string;
      dispatch(getThreadById(id)).then((res) => {
        setThread(res.payload.data.detailThread);
      });
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
