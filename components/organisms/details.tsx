import { postComment } from '../../features/thread';
import { PostComment, ThreadDetail as ThreadDetailInterface } from '../../features/thread/thread.interface';
import { useRequest, useAppDispatch } from '../../hooks';
import { AddCommentForm, Thread, Comment } from '../molecules';

interface ThreadDetailProps{
    thread: ThreadDetailInterface;
}

export default function ThreadDetails({ thread }: ThreadDetailProps) {
  const dispatch = useAppDispatch();
  const request = useRequest();

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
        <AddCommentForm onSubmit={onAddComment} threadId={thread.id} />
        {
          hasComments ? (
            <div className="flex flex-col gap-4">
              {thread.comments.map((comment) => (
                <Comment {...comment} key={comment.id} threadId={thread.id} />
              ))}
            </div>
          ) : <p className="w-full rounded-md bg-slate-100 p-6 text-center text-sm text-slate-500/60 shadow-sm shadow-slate-200/90">No Comment yet</p>
        }
      </div>
    </div>
  );
}

ThreadDetails.Skeleton = function ThreadDetailsSkeleton() {
  return (
    <div>
      <Thread.Skeleton />
      <div className="ml-3 mt-5">
        <h2 className="mb-2 font-semibold text-slate-600">Comments</h2>
        <AddCommentForm onSubmit={() => {}} threadId="" />
        <div className="flex flex-col gap-4">
          {
            [...new Array(3)].map((_, index) => (
              <Comment.Skeleton key={`skeleton-comment-${index}`} />
            ))
          }
        </div>
      </div>
    </div>
  );
};
