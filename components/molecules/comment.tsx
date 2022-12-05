import { Comment as CommentInterface } from '../../features/thread/thread.interface';
import { getRelativeDate } from '../../utils';
import VoteButton from './button/vote';

interface CommentProps extends CommentInterface{
  threadId: string;
}

export default function Comment(props: CommentProps) {
  const {
    id, content, createdAt, downVotesBy, owner, upVotesBy, threadId,
  } = props;

  return (
    <div key={id} className="flex flex-col gap-2 rounded-lg bg-white p-5">
      <div className="flex gap-3">
        <img src={owner.avatar} className="h-10 w-10 rounded-lg" alt={owner.name} />
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-slate-800/80">{owner.name}</p>
          <p className="text-xs font-light text-slate-500">
            {getRelativeDate(createdAt)}
          </p>
        </div>
      </div>
      <p className="text-sm leading-6 text-slate-600/80">
        {content}
      </p>
      <div className="flex gap-4">
        <VoteButton commentId={id} votes={upVotesBy} threadId={threadId} />
        <VoteButton commentId={id} votes={downVotesBy} threadId={threadId} isVoteDown />
      </div>
    </div>
  );
}
