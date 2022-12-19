import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { Thread as ThreadInterface } from '../../../features/thread/thread.interface';
import { getRelativeDate } from '../../../utils';
import Button from '../../atoms/button';
import VoteButton from '../button/vote';

interface ThreadProps{
  thread: ThreadInterface & {
    owner: {
      id: string;
      name: string;
      email: string;
      avatar: string;
    }
  }
  isDetails: boolean;
}

export default function Thread({ thread, isDetails = true } : ThreadProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-6">
      <Button isLink href={`/details/${thread.id}`} className="text-xl font-semibold text-slate-700 line-clamp-2" isDisabled={isDetails}>{thread.title}</Button>
      <div className="flex gap-3">
        <img src={thread.owner.avatar} className="h-10 w-10 rounded-lg" alt={thread.owner.name} />
        <div className="flex flex-1 items-end justify-between gap-20">
          <div className="flex h-full flex-col justify-center">
            <p className="text-sm font-medium text-slate-800/80">{thread.owner.name}</p>
            <p className="text-xs font-light text-slate-500">
              {getRelativeDate(thread.createdAt)}
            </p>
          </div>
          <Button
            isLink
            href={`/categories/${thread.category}`}
            className="h-fit max-w-[160px] overflow-hidden truncate rounded-md p-2 text-center text-sm font-medium text-violet-800/70 hover:text-violet-800/80"
          >
            #
            {thread.category}
          </Button>
        </div>
      </div>
      <div>
        <div className={`text-sm leading-6 text-slate-600/80 ${!isDetails && 'line-clamp-5'}`}>
          {parse(thread.body, { trim: true })}
        </div>
      </div>
      <div className="flex justify-between">
        <Button isLink isDisabled={isDetails} href={`/details/${thread.id}`} className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
          <p className="text-slate-500/90">
            &nbsp;
            {thread.totalComments}
            &nbsp;
            <span className="hidden sm:inline-flex">Comment</span>
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
