import { postComment } from '../../../features/thread';
import { PostComment, ThreadDetail as ThreadDetailInterface } from '../../../features/thread/thread.interface';
import useAppRequest from '../../../hooks';
import { useAppDispatch } from '../../../hooks/redux';
import Comment from '../../molecules/comment';
import AddComment from '../../molecules/form/addComment';
import Thread from '../../molecules/thread';

interface ThreadDetailProps{
    thread: ThreadDetailInterface;
}

export default function ThreadDetails({ thread }: ThreadDetailProps) {
  const dispatch = useAppDispatch();
  const request = useAppRequest();

  const onAddComment = async (comment : PostComment) => (
    request(() => dispatch(postComment(comment)))
  );

  const threadDisplay = {
    ...thread,
    totalComments: thread.comments.length,
    ownerId: thread.owner.id,
  };

  const hasComments = !!thread.comments.length;
  return (
    <div>
      <Thread thread={threadDisplay} isDetails />
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
    </div>
  );
}
