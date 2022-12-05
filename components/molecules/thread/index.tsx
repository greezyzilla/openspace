import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { Thread as ThreadInterface } from '../../../features/thread/thread.interface';
import { useAppSelector } from '../../../hooks/redux';
import { getRelativeDate } from '../../../utils';
import Button from '../../atoms/button';
import VoteButton from '../button/vote';

interface ThreadProps{
  thread: ThreadInterface;
}

export default function Thread({ thread } : ThreadProps) {
  const { users, loading } = useAppSelector((state) => ({
    users: state.user.users,
    threads: state.thread.threads,
    loading: state.user.loading,
  }));

  const date = getRelativeDate(thread.createdAt!);
  if (!users.length || loading) return <p>Loading</p>;
  const owner = users.find((u) => u.id === thread.ownerId);

  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-6">
      <Button isLink href={`/details/${thread.id}`} className="text-xl font-semibold text-slate-700 line-clamp-2">{thread.title}</Button>
      <div className="flex gap-3">
        <img src={owner?.avatar} className="h-10 w-10 rounded-lg" alt={owner?.name} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-800/80">{owner?.name || thread.ownerId}</p>
          <p className="text-xs font-light text-slate-500">
            {date}
          </p>
        </div>
      </div>
      <div className="text-sm leading-6 text-slate-600/80 line-clamp-6">
        {parse(thread.body, { trim: true })}
      </div>
      <div className="flex justify-between">
        <Button isLink href={`/details/${thread.id}`} className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
          <p className="text-slate-500/90">
            {thread.totalComments}
            &nbsp;
            Comment
          </p>
        </Button>
        <div className="flex gap-4">
          <VoteButton votes={thread.upVotesBy} threadId={thread.id} />
          <VoteButton votes={thread.downVotesBy} threadId={thread.id} isVoteDown />
        </div>
      </div>
    </article>
  );
}
