import Thread from '../../molecules/thread';
import { Thread as ThreadInterface } from '../../../features/thread/thread.interface';
import { useAppSelector } from '../../../hooks/redux';
import ThreadSkeleton from '../../molecules/thread/skeleton';

interface ThreadsInterface{
  threads?: ThreadInterface[];
}

export default function Threads({ threads } : Partial<ThreadsInterface>) {
  const { users, loading } = useAppSelector((state) => state.user);

  const isLoading = !users.length || !threads?.length || loading;
  if (isLoading) return <div className="flex flex-col gap-4 pb-10">{[...new Array(4)].map((_, index) => <ThreadSkeleton key={`skeleton-thread-${index}`} />)}</div>;

  const mappedThreads = threads.map((thread) => ({
    ...thread,
    owner: users.find((user) => user.id === thread.ownerId)!,
  }));

  return <div className="flex flex-col gap-4 pb-10">{mappedThreads.map((t) => <Thread thread={t} key={t.id} isDetails={false} />)}</div>;
}
