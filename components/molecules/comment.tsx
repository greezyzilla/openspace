import Image from 'next/image';
import PropTypes from 'prop-types';
import { Comment as CommentInterface } from '../../features/thread/thread.interface';
import { getRelativeDate } from '../../utils';
import ButtonVote from './buttonVote';

interface CommentProps extends CommentInterface{
  threadId: string;
}

export default function Comment(props: CommentProps) {
  const {
    id, content, createdAt, downVotesBy, owner, upVotesBy, threadId,
  } = props;

  return (
    <div key={id} className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow-md shadow-slate-100">
      <div className="flex gap-3">
        <Image src={owner.avatar} className="rounded-lg" width={40} height={40} alt={owner.name} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-800/80">{owner.name}</p>
          <p className="text-xs font-light text-slate-500">{getRelativeDate(createdAt)}</p>
        </div>
      </div>
      <p className="break-all text-sm leading-6 text-slate-600/80">{content}</p>
      <div className="flex h-9 gap-4" data-cy="comment-buttons">
        <ButtonVote commentId={id} votes={upVotesBy} threadId={threadId} />
        <ButtonVote commentId={id} votes={downVotesBy} threadId={threadId} isVoteDown />
      </div>
    </div>
  );
}

Comment.Skeleton = function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-white p-5 shadow-md shadow-slate-100">
      <div className="flex gap-3">
        <div className="skeleton h-10 w-full max-w-[40px] rounded-lg" />
        <div className="flex w-full flex-col justify-center gap-1">
          <p className="skeleton text-sm font-medium text-slate-800/80">&nbsp;</p>
          <p className="skeleton text-xs font-light text-slate-500">&nbsp;</p>
        </div>
      </div>
      <p className="skeleton text-sm leading-6 text-slate-600/80">&nbsp;</p>
      <div className="flex h-9 gap-4">
        <ButtonVote.Skeleton />
        <ButtonVote.Skeleton />
      </div>
    </div>
  );
};

Comment.propTypes = {
  threadId: PropTypes.string.isRequired,
};
