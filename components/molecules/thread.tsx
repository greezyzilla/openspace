import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Thread as ThreadInterface } from '../../features/thread/thread.interface';
import { getRelativeDate } from '../../utils';
import { Button } from '../atoms';
import ButtonVote from './buttonVote';
import { ThreadPropTypes, UserPropTypes } from '../../proptypes';
import { User } from '../../features/user/user.interface';

interface ThreadProps{
  thread: ThreadInterface & {
    owner: User
  }
  isDetails: boolean;
}

export default function Thread({ thread, isDetails = true } : ThreadProps) {
  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-md shadow-slate-100">
      <Button isLink href={`/details/${thread.id}`} className="text-xl font-semibold text-slate-700 line-clamp-2" isDisabled={isDetails}>{thread.title}</Button>
      <div className="flex gap-3">
        <Image src={thread.owner.avatar} className="rounded-lg" width={40} height={40} alt={thread.owner.name} />
        <div className="flex flex-1 items-end justify-between gap-4 sm:gap-20">
          <div className="flex h-full flex-col justify-center">
            <p className="text-sm font-medium text-slate-800/80">{thread.owner.name}</p>
            <p className="text-xs font-light text-slate-500">{getRelativeDate(thread.createdAt)}</p>
          </div>
          <Button
            isLink
            href={`/categories/${thread.category}`}
            className="h-fit max-w-[160px] overflow-hidden  truncate rounded-md px-2 text-center text-sm font-medium text-violet-800/70 hover:text-violet-800/80"
          >
            #
            {thread.category}
          </Button>
        </div>
      </div>
      <div className={`text-sm leading-6 text-slate-600/80 ${!isDetails && 'line-clamp-5'}`}>{parse(thread.body, { trim: true })}</div>
      <div className="flex justify-between">
        <Button isLink isDisabled={isDetails} href={`/details/${thread.id}`} className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs shadow-sm shadow-slate-200 hover:bg-slate-200/50 hover:text-slate-500">
          <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
          <p className="text-slate-500/90 shadow-md shadow-slate-100">
            &nbsp;
            {thread.totalComments}
            &nbsp;
            <span className="hidden sm:inline-flex">Comment</span>
          </p>
        </Button>
        <div className="flex gap-4 ">
          <ButtonVote votes={thread.upVotesBy} threadId={thread.id} />
          <ButtonVote votes={thread.downVotesBy} threadId={thread.id} isVoteDown />
        </div>
      </div>
    </article>
  );
}

Thread.Skeleton = function ThreadSkeleton() {
  return (
    <article className="flex flex-col gap-3 rounded-xl bg-white p-6 shadow-md shadow-slate-100">
      <p className="skeleton h-min text-xl font-semibold text-slate-700 line-clamp-2">&nbsp;</p>
      <div className="flex items-end justify-between">
        <div className="flex flex-1 gap-3">
          <div className="skeleton h-10 w-10 rounded-lg">&nbsp;</div>
          <div className="flex flex-1 flex-col justify-center gap-1">
            <p className="skeleton w-7/12 text-sm font-medium text-slate-800/80">&nbsp;</p>
            <p className="skeleton w-6/12 text-xs font-light text-slate-500">&nbsp;</p>
          </div>
        </div>
        <div className="skeleton h-fit w-40 rounded-md p-1">&nbsp;</div>
      </div>
      <div className="skeleton w-full text-sm leading-6 text-slate-600/80 line-clamp-6">&nbsp;</div>
      <div className="flex justify-between">
        <div className="skeleton w-14 rounded-lg p-2 text-xs shadow-md shadow-slate-200 sm:w-28">&nbsp;</div>
        <div className="flex gap-4">
          <div className="skeleton w-14 rounded-lg p-2 text-xs shadow-md shadow-slate-200 sm:w-28">&nbsp;</div>
          <div className="skeleton w-14 rounded-lg p-2 text-xs shadow-md shadow-slate-200 sm:w-28">&nbsp;</div>
        </div>
      </div>
    </article>
  );
};

Thread.propTypes = {
  thread: PropTypes.exact({
    ...ThreadPropTypes,
    owner: PropTypes.exact(UserPropTypes),
  }).isRequired,
  isDetails: PropTypes.bool.isRequired,
};
