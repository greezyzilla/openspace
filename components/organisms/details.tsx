import PropTypes from 'prop-types';
import { postComment } from '../../features/thread';
import { PostComment, ThreadDetail } from '../../features/thread/thread.interface';
import { useRequest, useAppDispatch } from '../../hooks';
import { CommentPropTypes, OwnerPropTypes, ThreadPropTypes } from '../../proptypes';
import { AddCommentForm, Thread, Comment } from '../molecules';

interface ThreadDetailProps{
  /** The correspodent thread that being rendered. Must have (id, title, body,
  * category, createdAt, upVotesBy, downVotesBy, comments, owner) */
  thread: ThreadDetail;
}

export default function ThreadDetails({ thread }: ThreadDetailProps) {
  const dispatch = useAppDispatch();
  const request = useRequest();

  const onAddComment = async (comment : PostComment) => (
    request(() => dispatch(postComment(comment)))
  );

  const threadWithTotalComments = {
    ...thread,
    totalComments: thread.comments.length,
  };

  const hasComments = !!thread.comments.length;
  const { comments, ...threadDisplay } = threadWithTotalComments;

  return (
    <div>
      <Thread thread={threadDisplay} isDetails />
      <div className="ml-3 mt-5">
        <h2 className="mb-2 font-semibold text-slate-600">Comments</h2>
        <AddCommentForm onSubmit={onAddComment} threadId={thread.id} />
        {
          hasComments ? (
            <div className="flex flex-col gap-4">
              {comments.map((comment) => (
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

ThreadDetails.propTypes = {
  thread: PropTypes.exact({
    ...ThreadPropTypes,
    owner: PropTypes.exact(OwnerPropTypes).isRequired,
    comments: PropTypes.arrayOf(PropTypes.exact(CommentPropTypes)).isRequired,
  }).isRequired,
};
