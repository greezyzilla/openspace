import PropTypes from 'prop-types';
import { Thread } from '../molecules';
import { Thread as ThreadInterface } from '../../features/thread/thread.interface';
import { useAppSelector } from '../../hooks';
import { ThreadPropTypes } from '../../proptypes';

interface ThreadsInterface{
  threads?: (ThreadInterface & {
    totalComments: number;
    ownerId: string;
  })[];
}

export default function Threads({ threads } : Partial<ThreadsInterface>) {
  const { users, loading } = useAppSelector((state) => state.user);

  const isLoading = !users.length || !threads?.length || loading;
  if (isLoading) return <div className="flex flex-col gap-4 pb-10">{[...new Array(4)].map((_, index) => <Thread.Skeleton key={`skeleton-thread-${index}`} />)}</div>;

  const mappedThreads = threads.map((thread) => {
    const { ownerId, ...newThread } = thread;
    const { email: _, ...owner } = users.find((u) => u.id === ownerId)!;
    return { ...newThread, owner };
  });

  return <div className="flex flex-col gap-4 pb-10">{mappedThreads.map((t) => <Thread thread={t} key={t.id} isDetails={false} />)}</div>;
}

Threads.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.exact({
    ...ThreadPropTypes,
    totalComments: PropTypes.number.isRequired,
    ownerId: PropTypes.string.isRequired,
  })),
};

Threads.defaultProps = {
  threads: [],
};
