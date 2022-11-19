import { ChatBubbleLeftRightIcon, HandThumbDownIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { Thread as ThreadInterface } from '../../../features/thread/thread.interface';
import { useAppSelector } from '../../../hooks/redux';
import { getRelativeDate } from '../../../utils';
import Button from '../../atoms/button';

interface ThreadProps{
  thread: ThreadInterface;
}

export default function Thread({ thread } : ThreadProps) {
  const { users } = useAppSelector((state) => state.user);
  const date = getRelativeDate(thread.createdAt!);

  if (!users.length) return <p>Loading</p>;
  const user = users.find((u) => u.id === thread.ownerId);

  return (
    <article className="bg-white rounded-xl p-6 flex flex-col gap-3">
      <Button isLink href={`/details/${thread.id}`} className="text-xl font-semibold text-slate-700">{thread.title}</Button>
      <div className="flex gap-3">
        <img src={user?.avatar} className="w-10 h-10 rounded-lg" alt={user?.name} />
        <div className="flex flex-col justify-center">
          <p className="text-slate-800/80 font-medium text-sm">{user?.name || thread.ownerId}</p>
          <p className="text-slate-500 font-light text-xs">
            {date}
          </p>
        </div>
      </div>
      <div className="text-slate-600/80 leading-6 text-sm">{parse(thread.body)}</div>
      <div className="flex justify-between">
        <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
          <ChatBubbleLeftRightIcon className="w-5 h-5 text-slate-400" />
          <p className="text-slate-500/90">
            {thread.totalComments}
            &nbsp;
            Comment
          </p>
        </div>
        <div className="flex gap-4">
          <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
            <HandThumbUpIcon className="w-5 h-5 text-slate-400" />
            <p className="text-slate-500/90">
              {thread.upVotesBy?.length}
              &nbsp;
              Like
            </p>
          </div>
          <div className="p-2 gap-1 text-xs bg-slate-100/80 rounded-lg flex items-center justify-center">
            <HandThumbDownIcon className="w-5 h-5 text-slate-400" />
            <p className="text-slate-500/90">
              {thread.downVotesBy?.length}
              &nbsp;
              Dislike
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
