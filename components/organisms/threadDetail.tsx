import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import { postComment } from '../../features/thread';
import { PostComment, ThreadDetail as ThreadDetailInterface } from '../../features/thread/thread.interface';
import useAppRequest from '../../hooks';
import { useAppDispatch } from '../../hooks/redux';
import { getRelativeDate } from '../../utils';
import VoteButton from '../molecules/button/vote';
import Comment from '../molecules/comment';
import AddComment from '../molecules/form/addComment';

interface ThreadDetailProps{
    thread: ThreadDetailInterface;
}

export default function ThreadDetails({ thread }: ThreadDetailProps) {
  const dispatch = useAppDispatch();
  const request = useAppRequest();

  const onAddComment = async (comment : PostComment) => (
    request(() => dispatch(postComment(comment)))
  );

  const hasComments = !!thread.comments.length;
  return (
    <article>
      <div className="flex flex-col gap-3 rounded-xl bg-white p-6">
        <h1 className="text-xl font-semibold text-slate-700">{thread.title}</h1>
        <div className="flex gap-3">
          <img src={thread.owner.avatar} className="h-10 w-10 rounded-lg" alt={thread.owner.name} />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-slate-800/80">{thread.owner.name}</p>
            <p className="text-xs font-light text-slate-500">
              {getRelativeDate(thread.createdAt)}
            </p>
          </div>
        </div>
        <div className="text-sm leading-6 text-slate-600/80">{parse(thread.body)}</div>
        <div className="flex justify-between">
          <div className="flex items-center justify-center gap-1 rounded-lg bg-slate-100/80 p-2 text-xs">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-slate-400" />
            <p className="text-slate-500/90">
              {thread.comments.length}
              &nbsp;
              Comment
            </p>
          </div>
          <div className="flex gap-4">
            <VoteButton
              threadId={thread.id}
              votes={thread.upVotesBy}
            />
            <VoteButton
              threadId={thread.id}
              votes={thread.downVotesBy}
              isVoteDown
            />
          </div>
        </div>
      </div>
      <div className="ml-3 mt-5">
        <h2 className="mb-2 font-semibold text-slate-600">Comments</h2>
        <AddComment onSubmit={onAddComment} threadId={thread.id} />
        {
          hasComments ? (
            <div className="flex flex-col gap-4">
              {thread.comments.map((comment) => (
                <Comment {...comment} key={comment.id} threadId={thread.id} />
              ))}
            </div>
          ) : <p className="w-full rounded-md bg-slate-100 p-6 text-center text-sm text-slate-500/80">No Comment yet</p>
        }
      </div>
    </article>
  );
}
